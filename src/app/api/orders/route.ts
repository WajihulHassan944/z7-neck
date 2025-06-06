import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken, getUserBySessionToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { orders, orderItems, orderShipping } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

// Define types for database results
interface OrderRow {
  id: number;
  order_number: string;
  total_amount: string;
  status: string;
  payment_status: string;
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

export async function GET(request: NextRequest) {
  try {
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
    
    // Get user orders
    const userOrders = await db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        totalAmount: orders.totalAmount,
        status: orders.status,
        paymentStatus: orders.paymentStatus,
        deliveryMethod: orders.deliveryMethod,
        deliveryFee: orders.deliveryFee,
        createdAt: orders.createdAt,
        updatedAt: orders.updatedAt
      })
      .from(orders)
      .where(eq(orders.userId, user.id))
      .orderBy(desc(orders.createdAt));
    
    // Format orders
    const formattedOrders = await Promise.all(
      userOrders.map(async (order) => {
        // Get order items
        const items = await db
          .select({
            id: orderItems.id,
            productName: orderItems.productName,
            productId: orderItems.productId,
            quantity: orderItems.quantity,
            price: orderItems.price
          })
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id));
        
        // Get shipping information
        const shipping = await db
          .select({
            recipientName: orderShipping.recipientName,
            email: orderShipping.email,
            phone: orderShipping.phone,
            addressLine1: orderShipping.addressLine1,
            addressLine2: orderShipping.addressLine2,
            city: orderShipping.city,
            state: orderShipping.state,
            postalCode: orderShipping.postalCode,
            country: orderShipping.country
          })
          .from(orderShipping)
          .where(eq(orderShipping.orderId, order.id))
          .limit(1);
        
        return {
          id: order.id,
          orderNumber: order.orderNumber,
          totalAmount: parseFloat(order.totalAmount.toString()),
          status: order.status,
          paymentStatus: order.paymentStatus,
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
      })
    );
    
    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 