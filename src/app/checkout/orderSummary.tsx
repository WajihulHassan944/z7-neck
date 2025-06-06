'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from 'react';

export default function OrderSummary() {
  const [cartData, setCartData] = useState({ quantity: 0, price: 0, total: "0" });
  const [deliveryMethod, setDeliveryMethod] = useState({ method: 'standard', price: 4.99 });
  const basePrice = 6.99;

  useEffect(() => {
    // Initial load
    const loadData = () => {
      const savedCartData = localStorage.getItem('cartData');
      const savedDeliveryMethod = localStorage.getItem('deliveryMethod');
      
      if (savedCartData) {
        setCartData(JSON.parse(savedCartData));
      }
      if (savedDeliveryMethod) {
        setDeliveryMethod(JSON.parse(savedDeliveryMethod));
      }
    };

    // Load initial data
    loadData();

    // Create a storage event listener that works for the same tab
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'deliveryMethod') {
        const newDeliveryMethod = e.newValue ? JSON.parse(e.newValue) : null;
        if (newDeliveryMethod) {
          setDeliveryMethod(newDeliveryMethod);
        }
      }
      if (e.key === 'cartData') {
        const newCartData = e.newValue ? JSON.parse(e.newValue) : null;
        if (newCartData) {
          setCartData(newCartData);
        }
      }
    };

    // Add event listener for storage changes from other tabs
    window.addEventListener('storage', handleStorageChange);

    // Set up interval to check localStorage every second
    const interval = setInterval(() => {
      const currentDeliveryMethod = localStorage.getItem('deliveryMethod');
      if (currentDeliveryMethod) {
        const parsedMethod = JSON.parse(currentDeliveryMethod);
        if (parsedMethod.method !== deliveryMethod.method || 
            parsedMethod.price !== deliveryMethod.price) {
          setDeliveryMethod(parsedMethod);
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalWithDelivery = (Number(cartData.total) + deliveryMethod.price).toFixed(2);

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-semibold text-[#EF1F24] mb-3">Order Summary</h2>
        <Separator />
        <div className="space-y-4 mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Z7 Neck Brackets Original</h3>
              <p className="text-base">Berry Blast - Qty: {cartData.quantity}</p>
            </div>
            <p className="font-semibold text-[#EF1F24] mt-1">${cartData.total}</p>
          </div>
          <Separator />

          <div className="flex justify-between text-base">
            <p className="flex items-center gap-2">
              {deliveryMethod.method === 'standard' ? (
                <>
                  Standard Delivery
                  <span className="text-sm text-gray-500">(3-5 business days)</span>
                </>
              ) : (
                <>
                  Express Delivery
                  <span className="text-sm text-gray-500">(1-2 business days)</span>
                </>
              )}
            </p>
            <p>${deliveryMethod.price.toFixed(2)}</p>
          </div>
          <Separator />

          <div className="flex justify-between font-bold text-lg">
            <p>Total</p>
            <p className="text-[#EF1F24]">${totalWithDelivery}</p>
          </div>

          <div className="flex items-center text-green-700 text-sm bg-blue-50 p-3 rounded-md">
            <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Free delivery on orders over $50!
          </div>

          <div className="flex items-center justify-center text-base text-gray-500 mt-4">
            <ShieldCheck className="h-4 w-4 mr-1" />
            100% Secure Transaction
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
