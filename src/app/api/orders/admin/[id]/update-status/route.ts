import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken, getUserBySessionToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { orders, orderItems, orderShipping, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { Resend } from 'resend';
import OrderConfirmationEmail from '@/app/emails/order-confirmation';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Define update status schema
const updateStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']).optional(),
  sendNotification: z.boolean().optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: any
) {
  try {
    const orderId = parseInt(params.id);
    
    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }
    
    // Get session token from cookies
    const sessionToken = getSessionToken(request);
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Get user by session token
    const user = await getUserBySessionToken(sessionToken);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Session expired or invalid' },
        { status: 401 }
      );
    }
    
    // Check if user is admin
    if (!user.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Parse and validate request
    const body = await request.json();
    const validationResult = updateStatusSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { status, paymentStatus, sendNotification } = validationResult.data;
    
    // Check if order exists
    const orderCheck = await db
      .select({ id: orders.id })
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);
    
    if (orderCheck.length === 0) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Update order status
    const updateData: any = {
      status,
      updatedAt: new Date()
    };
    
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }
    
    await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, orderId));
    
    // Send notification if requested
    if (sendNotification) {
      // Get order details for email
      const [order] = await db
        .select({
          id: orders.id,
          orderNumber: orders.orderNumber,
          totalAmount: orders.totalAmount,
          deliveryFee: orders.deliveryFee,
          createdAt: orders.createdAt,
          userEmail: users.email
        })
        .from(orders)
        .innerJoin(users, eq(orders.userId, users.id))
        .where(eq(orders.id, orderId))
        .limit(1);
      
      if (order) {
        // Get order items
        const items = await db
          .select()
          .from(orderItems)
          .where(eq(orderItems.orderId, orderId));
        
        // Get shipping info
        const [shipping] = await db
          .select()
          .from(orderShipping)
          .where(eq(orderShipping.orderId, orderId))
          .limit(1);
        
        if (shipping) {
          // Format data for email
          const emailData = {
            orderNumber: order.orderNumber,
            customerName: shipping.recipientName,
            items: items.map((item) => ({
              name: item.productName,
              quantity: item.quantity,
              price: parseFloat(item.price.toString()),
            })),
            subtotal: parseFloat(order.totalAmount.toString()) - parseFloat(order.deliveryFee.toString()),
            shipping: parseFloat(order.deliveryFee.toString()),
            total: parseFloat(order.totalAmount.toString()),
            shippingAddress: {
              line1: shipping.addressLine1,
              line2: shipping.addressLine2 || undefined,
              city: shipping.city,
              state: shipping.state,
              postalCode: shipping.postalCode,
              country: shipping.country,
            },
            orderDate: new Date(order.createdAt).toLocaleDateString(),
          };
          
          // Send status update email
          await resend.emails.send({
            from: 'orders@suckapunch.com',
            to: order.userEmail,
            subject: `Order #${order.orderNumber} Status Update: ${status.toUpperCase()}`,
            react: OrderConfirmationEmail(emailData),
          });
        }
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 