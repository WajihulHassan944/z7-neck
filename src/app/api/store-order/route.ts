import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders, orderItems, orderShipping } from '@/lib/db/schema';
import { getUserBySessionToken } from '@/lib/auth';
import { Resend } from 'resend';
import OrderConfirmationEmail from '@/app/emails/order-confirmation';
import crypto from 'crypto';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Generate a unique order number
function generateOrderNumber() {
  const prefix = 'SP';
  const timestamp = Date.now().toString().slice(-6);
  const random = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

// Define properly typed shipping address for email
interface EmailShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export async function POST(request: Request) {
  try {
    const { orderData, email, shipping } = await request.json();
    

    // Create a unique order number if not provided
    const orderNumber = orderData.orderNumber || generateOrderNumber();
    
    // Try to get the authenticated user
    let userId = null;
    
    // Get session token from cookies
    const cookies = request.headers.get('cookie');
    if (cookies) {
      // Extract the auth_session cookie value
      const cookieArray = cookies.split(';');
      const sessionCookie = cookieArray.find(cookie => cookie.trim().startsWith('auth_session='));
      
      if (sessionCookie) {
        const sessionToken = sessionCookie.split('=')[1];
        
        if (sessionToken) {
          // Get user by session token
          const user = await getUserBySessionToken(sessionToken);
          
          if (user) {
            userId = user.id;
          }
        }
      }
    }
    
    // Calculate total amount
    const totalAmount = parseFloat(orderData.cartData.total) + orderData.deliveryMethod.price;
    
    // Insert order
    const [orderResult] = await db.insert(orders)
      .values({
        userId: userId,
        orderNumber: orderNumber,
        totalAmount: totalAmount.toString(),
        status: 'pending',
        paymentStatus: 'paid', // Assuming payment was successful
        paymentIntentId: orderData.paymentIntent?.id || null,
        deliveryMethod: orderData.deliveryMethod.method,
        deliveryFee: orderData.deliveryMethod.price.toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning({ id: orders.id });
    
    const orderId = orderResult.id;
    
    // Insert order items
    if (orderData.cartData.items && Array.isArray(orderData.cartData.items)) {
      for (const item of orderData.cartData.items) {
        await db.insert(orderItems)
          .values({
            orderId: orderId,
            productName: item.name,
            productId: item.id || null,
            quantity: item.quantity,
            price: item.price.toString(),
            createdAt: new Date()
          });
      }
    } else {
      // For simple cart just add a single item
      await db.insert(orderItems)
        .values({
          orderId: orderId,
          productName: 'Product', // Generic product name
          quantity: orderData.cartData.quantity,
          price: orderData.cartData.total.toString(),
          createdAt: new Date()
        });
    }
    
    // Insert shipping information using the new format
    if (shipping) {
      
      try {
        await db.insert(orderShipping)
          .values({
            orderId: orderId,
            recipientName: shipping.fullName,
            email: shipping.email || email,
            phone: shipping.phone || null,
            addressLine1: shipping.address,
            addressLine2: null, // No address line 2 in the new format
            city: shipping.city,
            state: shipping.city, // Using city as state (needs to be fixed in future)
            postalCode: shipping.zipCode,
            country: 'United States', // Default country
            createdAt: new Date()
          });
          
      } catch (shippingError) {
        console.error('Error inserting shipping info:', shippingError);
      }
    }
    // Fallback to the old format if shipping is not provided
    else if (orderData.deliveryForm) {
      await db.insert(orderShipping)
        .values({
          orderId: orderId,
          recipientName: `${orderData.deliveryForm.firstName} ${orderData.deliveryForm.lastName}`,
          email: email,
          phone: orderData.deliveryForm.phone || null,
          addressLine1: orderData.deliveryForm.address,
          addressLine2: orderData.deliveryForm.addressLine2 || null,
          city: orderData.deliveryForm.city,
          state: orderData.deliveryForm.state,
          postalCode: orderData.deliveryForm.zip,
          country: orderData.deliveryForm.country || 'United States',
          createdAt: new Date()
        });
    }
    
    // Send order confirmation email
    try {
      // Format data for email
      const items = orderData.cartData.items 
        ? orderData.cartData.items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: parseFloat(item.price),
          }))
        : [{ name: 'Product', quantity: orderData.cartData.quantity, price: parseFloat(orderData.cartData.total) }];
      
      // Prepare customer name
      let customerName = '';
      if (shipping) {
        customerName = shipping.fullName;
      } else if (orderData.deliveryForm) {
        customerName = `${orderData.deliveryForm.firstName} ${orderData.deliveryForm.lastName}`;
      }
      
      // Prepare shipping address with proper typing
      const shippingAddress: EmailShippingAddress = {
        line1: shipping?.address || orderData.deliveryForm?.address || 'Unknown address',
        city: shipping?.city || orderData.deliveryForm?.city || 'Unknown city',
        state: shipping?.city || orderData.deliveryForm?.state || 'Unknown state', // Using city as state for shipping
        postalCode: shipping?.zipCode || orderData.deliveryForm?.zip || 'Unknown',
        country: orderData.deliveryForm?.country || 'United States'
      };
      
      // Add optional line2 only if it exists
      if (orderData.deliveryForm?.addressLine2) {
        shippingAddress.line2 = orderData.deliveryForm.addressLine2;
      }
      
      const emailData = {
        orderNumber,
        customerName,
        items,
        subtotal: parseFloat(orderData.cartData.total),
        shipping: parseFloat(orderData.deliveryMethod.price),
        total: totalAmount,
        shippingAddress,
        orderDate: new Date().toLocaleDateString(),
      };
      
      if (email) {
        await resend.emails.send({
          from: 'orders@suckapunch.com',
          to: email,
          subject: `Your Z7 Neck Brackets Order #${orderNumber}`,
          react: OrderConfirmationEmail(emailData),
        });
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Continue with the order process even if email fails
    }

    return NextResponse.json({ 
      success: true,
      orderId,
      orderNumber
    });
  } catch (error) {
    console.error('Failed to store order:', error);
    return NextResponse.json({ error: 'Failed to store order' }, { status: 500 });
  }
} 