'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Header from './components/Header';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Link from 'next/link';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Months array for labels
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Interface for dashboard stats
interface DashboardStats {
  totalOrders: number;
  ordersByStatus: {
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
  monthlyOrders: number[];
  monthlyRevenue: number[];
  recentOrders: {
    id: number;
    orderNumber: string;
    totalAmount: number;
    status: string;
    createdAt: string;
  }[];
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalOrders: 0,
    ordersByStatus: {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    },
    monthlyOrders: Array(12).fill(0),
    monthlyRevenue: Array(12).fill(0),
    recentOrders: []
  });
  
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    // Redirect if not admin
    if (!loading && user && !user.isAdmin) {
      router.push('/');
      return;
    }
    
    // Fetch dashboard stats if admin
    if (user && user.isAdmin) {
      fetchDashboardStats();
    }
  }, [user, loading, router]);
  
  const fetchDashboardStats = async () => {
    setIsLoading(true);
    
    try {
      // Fetch stats from API
      const response = await fetch('/api/dashboard/stats');
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard statistics');
      }
      
      const data = await response.json();
      setDashboardStats(data);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      
      // Set fallback data if an error occurs (for demo purposes)
      if (window.confirm('Error loading data. Would you like to use sample data instead?')) {
        setDashboardStats({
          totalOrders: 156,
          ordersByStatus: {
            pending: 32,
            processing: 48,
            shipped: 36,
            delivered: 32,
            cancelled: 8
          },
          monthlyOrders: [12, 19, 15, 21, 22, 18, 15, 19, 13, 18, 16, 12],
          monthlyRevenue: [1200, 1900, 1500, 2100, 2200, 1800, 1500, 1900, 1300, 1800, 1600, 1200],
          recentOrders: []
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };
  
  // Chart data for orders by status
  const orderStatusData = {
    labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        label: 'Orders by Status',
        data: [
          dashboardStats.ordersByStatus.pending,
          dashboardStats.ordersByStatus.processing,
          dashboardStats.ordersByStatus.shipped,
          dashboardStats.ordersByStatus.delivered,
          dashboardStats.ordersByStatus.cancelled
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(46, 204, 113, 0.7)',
          'rgba(231, 76, 60, 0.7)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(231, 76, 60, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Monthly order data
  const monthlyOrderData = {
    labels: months,
    datasets: [
      {
        label: 'Orders',
        data: dashboardStats.monthlyOrders,
        fill: false,
        borderColor: 'rgb(4, 69, 136)',
        backgroundColor: 'rgba(4, 69, 136, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  // Revenue data
  const revenueData = {
    labels: months,
    datasets: [
      {
        label: 'Revenue ($)',
        data: dashboardStats.monthlyRevenue,
        backgroundColor: 'rgba(4, 69, 136, 0.6)',
        borderColor: 'rgb(4, 69, 136)',
        borderWidth: 1,
      },
    ],
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#044588] mx-auto"></div>
          <p className="mt-4 text-[#044588] font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!user || !user.isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Header user={user} handleLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Orders card */}
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-[#044588] rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {isLoading ? (
                          <div className="animate-pulse h-6 w-12 bg-gray-200 rounded"></div>
                        ) : (
                          dashboardStats.totalOrders
                        )}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/admin/orders" className="font-medium text-[#044588] hover:text-[#033366]">
                  View all orders
                </Link>
              </div>
            </div>
          </div>
          
          {/* Pending Orders card */}
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Orders</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {isLoading ? (
                          <div className="animate-pulse h-6 w-12 bg-gray-200 rounded"></div>
                        ) : (
                          dashboardStats.ordersByStatus.pending
                        )}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/admin/orders?status=pending" className="font-medium text-[#044588] hover:text-[#033366]">
                  View pending orders
                </Link>
              </div>
            </div>
          </div>
          
          {/* Delivered Orders card */}
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Delivered Orders</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {isLoading ? (
                          <div className="animate-pulse h-6 w-12 bg-gray-200 rounded"></div>
                        ) : (
                          dashboardStats.ordersByStatus.delivered
                        )}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/admin/orders?status=delivered" className="font-medium text-[#044588] hover:text-[#033366]">
                  View delivered orders
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Orders Status Chart */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Orders by Status</h3>
            {isLoading ? (
              <div className="animate-pulse flex flex-col items-center justify-center h-64">
                <div className="rounded-full h-16 w-16 border-4 border-l-[#044588] border-r-[#044588] border-b-[#044588] border-t-transparent animate-spin"></div>
                <p className="mt-4 text-gray-500">Loading chart data...</p>
              </div>
            ) : (
              <div className="h-64">
                <Doughnut 
                  data={orderStatusData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.raw as number;
                            const total = (context.chart.data.datasets[0].data as number[]).reduce((a, b) => (a as number) + (b as number), 0) as number;
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                          }
                        }
                      }
                    },
                  }} 
                />
              </div>
            )}
          </div>
          
          {/* Monthly Orders Chart */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Orders ({new Date().getFullYear()})</h3>
            {isLoading ? (
              <div className="animate-pulse flex flex-col items-center justify-center h-64">
                <div className="rounded-full h-16 w-16 border-4 border-l-[#044588] border-r-[#044588] border-b-[#044588] border-t-transparent animate-spin"></div>
                <p className="mt-4 text-gray-500">Loading chart data...</p>
              </div>
            ) : (
              <div className="h-64">
                <Line 
                  data={monthlyOrderData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0
                        }
                      },
                    },
                  }} 
                />
              </div>
            )}
          </div>
          
          {/* Revenue Chart */}
          <div className="bg-white p-6 shadow rounded-lg lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue ({new Date().getFullYear()})</h3>
            {isLoading ? (
              <div className="animate-pulse flex flex-col items-center justify-center h-64">
                <div className="rounded-full h-16 w-16 border-4 border-l-[#044588] border-r-[#044588] border-b-[#044588] border-t-transparent animate-spin"></div>
                <p className="mt-4 text-gray-500">Loading chart data...</p>
              </div>
            ) : (
              <div className="h-64">
                <Bar 
                  data={revenueData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: function(value) {
                            return '$' + value;
                          }
                        }
                      },
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                              label += ': ';
                            }
                            if (context.parsed.y !== null) {
                              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                          }
                        }
                      }
                    }
                  }} 
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="px-6 py-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <button 
              onClick={() => router.push('/admin/orders')}
              className="inline-flex items-center px-4 py-2 border border-[#044588] text-sm font-medium rounded-md text-[#044588] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#044588] cursor-pointer shadow-sm hover:shadow transition-all"
            >
              View All Orders
            </button>
            <button
              onClick={() => router.push('/admin/users')}
              className="inline-flex items-center px-4 py-2 border border-[#044588] text-sm font-medium rounded-md text-[#044588] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#044588] cursor-pointer shadow-sm hover:shadow transition-all"
            >
              Manage Users
            </button>
            <button
              onClick={() => router.push('/admin/settings')}
              className="inline-flex items-center px-4 py-2 border border-[#044588] text-sm font-medium rounded-md text-[#044588] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#044588] cursor-pointer shadow-sm hover:shadow transition-all"
            >
              Admin Settings
            </button>
          </div>
        </div>
        
        {/* Recent Orders */}
        {dashboardStats.recentOrders.length > 0 && (
          <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardStats.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : order.status === 'cancelled' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(order.totalAmount))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/admin/orders/${order.id}`} className="text-[#044588] hover:text-[#033366]">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 