import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken, getUserBySessionToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { orders, users, orderShipping } from '@/lib/db/schema';
import { eq, desc, and, count, sql } from 'drizzle-orm';

// Define types for database results
interface OrderRow {
  id: number;
  user_id: number;
  user_email: string;
  order_number: string;
  total_amount: string;
  status: string;
  payment_status: string;
  delivery_method: string;
  delivery_fee: string;
  created_at: string;
  updated_at: string;
  recipient_name: string;
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
    
    // Check if user is admin
    if (!user.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Get query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;
    const status = url.searchParams.get('status');
    
    // Build query conditions
    let whereClause = {};
    if (status) {
      whereClause = eq(orders.status, status);
    }
    
    // Get total count for pagination
    const [countResult] = await db
      .select({ total: count() })
      .from(orders)
      .where(status ? eq(orders.status, status) : undefined);
    
    // Get orders
    const orderList = await db
      .select({
        id: orders.id,
        userId: orders.userId,
        userEmail: users.email,
        orderNumber: orders.orderNumber,
        totalAmount: orders.totalAmount,
        status: orders.status,
        paymentStatus: orders.paymentStatus,
        deliveryMethod: orders.deliveryMethod,
        deliveryFee: orders.deliveryFee,
        createdAt: orders.createdAt,
        updatedAt: orders.updatedAt,
        recipientName: orderShipping.recipientName
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .leftJoin(orderShipping, eq(orders.id, orderShipping.orderId))
      .where(status ? eq(orders.status, status) : undefined)
      .orderBy(desc(orders.createdAt))
      .limit(limit)
      .offset(offset);
    
    // Format the response
    const formattedOrders = orderList.map(order => ({
      id: order.id,
      userId: order.userId,
      userEmail: order.userEmail,
      orderNumber: order.orderNumber,
      totalAmount: parseFloat(order.totalAmount.toString()),
      status: order.status,
      paymentStatus: order.paymentStatus,
      deliveryMethod: order.deliveryMethod,
      deliveryFee: parseFloat(order.deliveryFee.toString()),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      recipientName: order.recipientName,
    }));
    
    return NextResponse.json({
      orders: formattedOrders,
      pagination: {
        total: countResult.total,
        page,
        limit,
        totalPages: Math.ceil(countResult.total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 