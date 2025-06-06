'use client';
import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from 'next/link';

interface OrderData {
  orderNumber: string;
  cartData: {
    quantity: number;
    price: number;
    total: string;
  };
  deliveryMethod: {
    method: string;
    price: number;
  };
}

interface ShippingDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
}

export default function SuccessPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [emailStatus, setEmailStatus] = useState<string>('');
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);

  useEffect(() => {
    const storeAndSendOrder = async (orderData: OrderData, email: string, shipping: ShippingDetails | null) => {
      try {
        
        // Store order in database
        const response = await fetch('/api/store-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderData,
            email,
            shipping,
          }),
        });
        
        if (!response.ok) {
          console.error('Failed to store order:', await response.text());
        }

        // Send confirmation email
        await fetch('/api/send-order-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderData,
            email,
          }),
        });
        
        setEmailStatus('sent');
      } catch (error) {
        console.error('Error processing order:', error);
        setEmailStatus('failed');
      }
    };

    const generateOrderNumber = () => {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `SP-${timestamp}-${random}`;
    };

    const cartData = localStorage.getItem('cartData');
    const deliveryMethod = localStorage.getItem('deliveryMethod');
    const email = localStorage.getItem('email');
    const shippingData = localStorage.getItem('shippingDetails');

    if (cartData && deliveryMethod) {
      const parsedShipping = shippingData ? JSON.parse(shippingData) : null;
      setShippingDetails(parsedShipping);
      
      const emailValue = email ? JSON.parse(email) : '';
      
      const newOrderData = {
        orderNumber: generateOrderNumber(),
        cartData: JSON.parse(cartData),
        deliveryMethod: JSON.parse(deliveryMethod)
      };

      setOrderData(newOrderData);
      storeAndSendOrder(newOrderData, emailValue, parsedShipping);

      // Clear cart data
      localStorage.removeItem('cartData');
      localStorage.removeItem('deliveryMethod');
      localStorage.removeItem('email');
      localStorage.removeItem('shippingDetails');
    }
  }, []);

  if (!orderData) return null;

  const totalAmount = (
    parseFloat(orderData.cartData.total) + 
    orderData.deliveryMethod.price
  ).toFixed(2);

  // Add email status message to the UI
  const renderEmailStatus = () => {
    if (emailStatus === 'sent') {
      return (
        <p className="text-green-600 text-sm mt-2">
          Order confirmation email has been sent to your inbox!
        </p>
      );
    } else if (emailStatus === 'failed') {
      return (
        <p className="text-red-600 text-sm mt-2">
          Failed to send confirmation email. Please contact support.
        </p>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="p-6 md:p-8">
          <div className="text-center mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-bold text-[#044588] mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600">
              Thank you for your order. {"We'll"} send you a confirmation email shortly.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="font-semibold text-[#044588] mb-1">Order Number</h2>
              <p className="text-lg font-mono">{orderData.orderNumber}</p>
            </div>

            <div className="border-t pt-6">
              <h2 className="font-semibold text-[#044588] mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Z7 Neck Brackets Original</p>
                    <p className="text-sm text-gray-600">Quantity: {orderData.cartData.quantity}</p>
                  </div>
                  <p className="font-medium">${orderData.cartData.total}</p>
                </div>

                <div className="flex justify-between text-sm">
                  <p>{orderData.deliveryMethod.method === 'standard' ? 'Standard Delivery' : 'Express Delivery'}</p>
                  <p>${orderData.deliveryMethod.price.toFixed(2)}</p>
                </div>

                <div className="border-t pt-4 flex justify-between font-semibold">
                  <p>Total</p>
                  <p className="text-[#044588]">${totalAmount}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/"
                className="inline-block bg-[#044588] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#033466] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {renderEmailStatus()}
          </div>
        </Card>
      </div>
    </div>
  );
} 