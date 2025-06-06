import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken, getUserBySessionToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { orders, orderItems, orderShipping, users } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

// Define types for database results
interface OrderRow {
  id: number;
  user_id: number;
  order_number: string;
  total_amount: string;
  status: string;
  payment_status: string;
  payment_intent_id: string | null;
  delivery_method: string;
  delivery_fee: string;
  created_at: string;
  updated_at: string;
}

interface OrderItemRow {
  id: number;
  product_name: string;
  product_id: string | null;
  quantity: number;
  price: string;
}

interface ShippingRow {
  recipient_name: string;
  email: string;
  phone: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export async function GET(
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
    
    // Get the order with associated user information
    const orderResult = await db
      .select({
        id: orders.id,
        userId: orders.userId,
        orderNumber: orders.orderNumber,
        totalAmount: orders.totalAmount,
        status: orders.status,
        paymentStatus: orders.paymentStatus,
        paymentIntentId: orders.paymentIntentId,
        deliveryMethod: orders.deliveryMethod,
        deliveryFee: orders.deliveryFee,
        createdAt: orders.createdAt,
        updatedAt: orders.updatedAt,
        userEmail: users.email
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .where(eq(orders.id, orderId))
      .limit(1);
    
    if (orderResult.length === 0) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    const order = orderResult[0];
    
    // Only the order owner or admin can view order details
    if (order.userId !== user.id && !user.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Get order items
    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));
    
    // Get shipping information
    const shipping = await db
      .select()
      .from(orderShipping)
      .where(eq(orderShipping.orderId, order.id))
      .limit(1);
    
    
    // Format the response
    const orderDetails = {
      id: order.id,
      userId: order.userId,
      userEmail: order.userEmail,
      orderNumber: order.orderNumber,
      totalAmount: parseFloat(order.totalAmount.toString()),
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentIntentId: order.paymentIntentId,
      deliveryMethod: order.deliveryMethod,
      deliveryFee: parseFloat(order.deliveryFee.toString()),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: items.map((item) => ({
        id: item.id,
        productName: item.productName,
        productId: item.productId,
        quantity: item.quantity,
        price: parseFloat(item.price.toString()),
      })),
      shipping: shipping[0] ? {
        recipientName: shipping[0].recipientName,
        email: shipping[0].email,
        phone: shipping[0].phone,
        addressLine1: shipping[0].addressLine1,
        addressLine2: shipping[0].addressLine2,
        city: shipping[0].city,
        state: shipping[0].state,
        postalCode: shipping[0].postalCode,
        country: shipping[0].country,
      } : null,
    };
    
    return NextResponse.json(orderDetails);
  } catch (error) {
    console.error('Error fetching order details:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 