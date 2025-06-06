'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/images/thelogo.png';

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

interface ShippingDetails {
  recipientName: string;
  email: string;
  phone: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Order {
  id: number;
  orderNumber: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  deliveryMethod: string;
  deliveryFee: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shipping: ShippingDetails | null;
}

export default function ProfilePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !user) {
      router.push('/login');
      return;
    }
    
    // Fetch orders only after we confirm we have a user
    if (user) {
      fetchOrders();
    }
  }, [user, loading, router]);
  
  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/orders');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error fetching orders:', err);
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
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#044588] mx-auto"></div>
          <p className="mt-4 text-[#044588]">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="Z7 Neck Brackets"
              className="max-w-[80px]"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.firstName || user?.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-[#044588] hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-start md:justify-between">
          <div className="md:w-1/4 bg-white shadow rounded-lg p-6 md:sticky md:top-8 mb-8 md:mb-0 md:mr-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Account</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'orders'
                    ? 'bg-[#044588] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Order History
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'bg-[#044588] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Profile Information
              </button>
            </nav>
          </div>
          
          <div className="md:w-3/4">
            {activeTab === 'orders' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Order History</h3>
                </div>
                
                {error && (
                  <div className="p-6 bg-red-50 border-l-4 border-red-400 text-red-700">
                    <p>{error}</p>
                  </div>
                )}
                
                {isLoading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#044588] mx-auto"></div>
                    <p className="mt-2 text-gray-500">Loading orders...</p>
                  </div>
                ) : selectedOrder ? (
                  <div className="p-6">
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="mb-6 text-sm font-medium text-[#044588] hover:underline flex items-center"
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to orders
                    </button>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Order #{selectedOrder.orderNumber}</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.paymentStatus)}`}>
                          Payment: {selectedOrder.paymentStatus}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          {formatDate(selectedOrder.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h5 className="font-medium text-gray-900 mb-2">Items</h5>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {selectedOrder.items.map((item) => (
                              <tr key={item.id}>
                                <td className="px-4 py-3 text-sm text-gray-900">{item.productName}</td>
                                <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                                <td className="px-4 py-3 text-sm text-gray-900 text-right">${item.price.toFixed(2)}</td>
                                <td className="px-4 py-3 text-sm text-gray-900 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="bg-gray-50">
                            <tr>
                              <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Subtotal</td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                                ${(selectedOrder.totalAmount - selectedOrder.deliveryFee).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Shipping ({selectedOrder.deliveryMethod})</td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">${selectedOrder.deliveryFee.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td colSpan={3} className="px-4 py-3 text-sm font-bold text-gray-900 text-right">Total</td>
                              <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">${selectedOrder.totalAmount.toFixed(2)}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                    
                    {selectedOrder.shipping && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Shipping Information</h5>
                        <div className="border rounded-md p-4 bg-gray-50">
                          <p className="text-sm text-gray-700 mb-1">{selectedOrder.shipping.recipientName}</p>
                          <p className="text-sm text-gray-700 mb-1">{selectedOrder.shipping.addressLine1}</p>
                          {selectedOrder.shipping.addressLine2 && (
                            <p className="text-sm text-gray-700 mb-1">{selectedOrder.shipping.addressLine2}</p>
                          )}
                          <p className="text-sm text-gray-700 mb-1">
                            {selectedOrder.shipping.city}, {selectedOrder.shipping.state} {selectedOrder.shipping.postalCode}
                          </p>
                          <p className="text-sm text-gray-700">{selectedOrder.shipping.country}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-6 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {`You haven't placed any orders yet.`}
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#044588] hover:bg-[#033366]"
                      >
                        Start shopping
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order
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
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{order.orderNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(order.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${order.totalAmount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="text-[#044588] hover:text-[#033366]"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Email</h4>
                      <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">First Name</h4>
                        <p className="mt-1 text-sm text-gray-900">{user?.firstName || '—'}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Last Name</h4>
                        <p className="mt-1 text-sm text-gray-900">{user?.lastName || '—'}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={handleLogout}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#044588] hover:bg-[#033366]"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 