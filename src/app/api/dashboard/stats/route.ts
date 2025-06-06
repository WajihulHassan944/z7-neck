import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken, getUserBySessionToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';
import { sql, desc, count, eq } from 'drizzle-orm';

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
    
    // Get total count of orders
    const totalOrdersResult = await db.select({ count: count() }).from(orders);
    const totalOrders = totalOrdersResult[0].count || 0;
    
    // Get order counts by status
    const statusCounts = await db
      .select({
        status: orders.status,
        count: count(),
      })
      .from(orders)
      .groupBy(orders.status);
    
    const ordersByStatus = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };
    
    statusCounts.forEach(item => {
      if (item.status in ordersByStatus) {
        ordersByStatus[item.status as keyof typeof ordersByStatus] = item.count;
      }
    });
    
    // Get orders by month for the current year
    const currentYear = new Date().getFullYear();
    const monthlyOrdersResult = await db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${orders.createdAt})::integer`,
        count: count(),
      })
      .from(orders)
      .where(sql`EXTRACT(YEAR FROM ${orders.createdAt}) = ${currentYear}`)
      .groupBy(sql`EXTRACT(MONTH FROM ${orders.createdAt})`)
      .orderBy(sql`EXTRACT(MONTH FROM ${orders.createdAt})`);
    
    // Initialize monthly orders with zeros
    const monthlyOrders = Array(12).fill(0);
    
    monthlyOrdersResult.forEach(item => {
      if (item.month >= 1 && item.month <= 12) {
        monthlyOrders[item.month - 1] = item.count;
      }
    });
    
    // Calculate monthly revenue
    const monthlyRevenueResult = await db
      .select({
        month: sql<number>`EXTRACT(MONTH FROM ${orders.createdAt})::integer`,
        revenue: sql<number>`SUM(${orders.totalAmount})`,
      })
      .from(orders)
      .where(sql`EXTRACT(YEAR FROM ${orders.createdAt}) = ${currentYear}`)
      .groupBy(sql`EXTRACT(MONTH FROM ${orders.createdAt})`)
      .orderBy(sql`EXTRACT(MONTH FROM ${orders.createdAt})`);
    
    // Initialize monthly revenue with zeros
    const monthlyRevenue = Array(12).fill(0);
    
    monthlyRevenueResult.forEach(item => {
      if (item.month >= 1 && item.month <= 12) {
        monthlyRevenue[item.month - 1] = Number(item.revenue) || 0;
      }
    });
    
    // Get recent orders
    const recentOrders = await db
      .select({
        id: orders.id,
        orderNumber: orders.orderNumber,
        totalAmount: orders.totalAmount,
        status: orders.status,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(5);
    
    return NextResponse.json({
      totalOrders,
      ordersByStatus,
      monthlyOrders,
      monthlyRevenue,
      recentOrders,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Export a config that forces this to run in Node.js environment, not the Edge
export const config = {
  runtime: 'nodejs'
}; 