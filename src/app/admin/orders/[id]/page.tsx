'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Header from '../../components/Header';
import Link from 'next/link';

interface OrderItem {
  id: number;
  productName: string;
  productId: string | null;
  quantity: number;
  price: number;
}

interface ShippingInfo {
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

interface OrderDetail {
  id: number;
  orderNumber: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentIntentId: string | null;
  deliveryMethod: string;
  deliveryFee: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shipping: ShippingInfo | null;
  userId: number | null;
  userEmail?: string;
}

export default function OrderDetailPage({
  params,
}: {
  params: any;
}) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const orderId = parseInt(params.id);
  
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
    
    // Fetch order if admin
    if (user && user.isAdmin && !isNaN(orderId)) {
      fetchOrderDetails();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, router, orderId]);
  
  const fetchOrderDetails = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Order not found');
        }
        throw new Error('Failed to fetch order details');
      }
      
      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error fetching order details:', err);
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
  
  const updateOrderStatus = async (newStatus: string) => {
    setUpdatingStatus(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/orders/admin/${orderId}/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          sendNotification: true,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update order status');
      }
      
      // Refresh order details
      fetchOrderDetails();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error updating order status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' at ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
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
  
  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#044588] mx-auto"></div>
          <p className="mt-4 text-[#044588] font-medium">Loading...</p>
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
        <div className="mb-6 flex items-center">
          <Link 
            href="/admin/orders" 
            className="flex items-center text-[#044588] hover:text-[#033366]"
          >
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </Link>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            <p>{error}</p>
          </div>
        )}
        
        {isLoading ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#044588] mx-auto"></div>
            <p className="mt-4 text-[#044588] font-medium">Loading order details...</p>
          </div>
        ) : !order ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-100">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-medium text-gray-900">Order Not Found</h2>
            <p className="mt-2 text-gray-600">The order you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.</p>
          </div>
        ) : (
          <>
            {/* Order Overview Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-mono uppercase">
                      ORDER #{order.orderNumber}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Customer Information */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-md font-bold text-gray-700 uppercase font-mono">Customer Information</h3>
                </div>
                <div className="px-6 py-4">
                  {order.shipping ? (
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.shipping.recipientName}</p>
                      <p className="text-sm text-gray-600">{order.shipping.email}</p>
                      {order.shipping.phone && (
                        <p className="text-sm text-gray-600">{order.shipping.phone}</p>
                      )}
                    </div>
                  ) : order.userEmail ? (
                    <div>
                      <p className="text-sm text-gray-600">{order.userEmail}</p>
                    </div>
                  ) : (
                    <p className="text-sm italic text-gray-500">No customer information available</p>
                  )}
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-md font-bold text-gray-700 uppercase font-mono">Shipping Address</h3>
                </div>
                <div className="px-6 py-4">
                  {order.shipping ? (
                    <div>
                      <p className="text-sm text-gray-600">{order.shipping.addressLine1}</p>
                      {order.shipping.addressLine2 && (
                        <p className="text-sm text-gray-600">{order.shipping.addressLine2}</p>
                      )}
                      <p className="text-sm text-gray-600">
                        {order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}
                      </p>
                      <p className="text-sm text-gray-600">{order.shipping.country}</p>
                    </div>
                  ) : (
                    <p className="text-sm italic text-gray-500">No shipping address available</p>
                  )}
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-md font-bold text-gray-700 uppercase font-mono">Payment Information</h3>
                </div>
                <div className="px-6 py-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Total:</span> {formatCurrency(order.totalAmount)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Delivery Method:</span> {order.deliveryMethod}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Delivery Fee:</span> {formatCurrency(order.deliveryFee)}
                  </p>
                  {order.paymentIntentId && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Payment ID:</span> {order.paymentIntentId}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-md font-bold text-gray-700 uppercase font-mono">Order Items</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                            {item.productId && (
                              <div className="text-sm text-gray-500">ID: {item.productId}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatCurrency(item.price)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.quantity}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(item.price * item.quantity)}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                          No items found for this order
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                        Subtotal
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                        {formatCurrency(order.totalAmount - order.deliveryFee)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                        Delivery Fee
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                        {formatCurrency(order.deliveryFee)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                        Total
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            {/* Actions Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-md font-bold text-gray-700 uppercase font-mono">Order Actions</h3>
              </div>
              
              <div className="px-6 py-5">
                <div className="flex flex-wrap gap-4">
                  <select
                    className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#044588] focus:border-[#044588] sm:text-sm rounded-md"
                    defaultValue={order.status}
                    onChange={(e) => updateOrderStatus(e.target.value)}
                    disabled={updatingStatus}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#044588]"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Order
                  </button>
                </div>
                
                {updatingStatus && (
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <div className="mr-2 h-4 w-4 border-t-2 border-b-2 border-[#044588] rounded-full animate-spin"></div>
                    Updating order status...
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
} 