"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCheckout } from '../context/CheckoutContext';

const DeliveryMethod = () => {
  const { setDeliveryMethodSelected } = useCheckout();
  const [selectedMethod, setSelectedMethod] = useState("standard");

  // Set delivery method as selected on component mount since standard is selected by default
  useEffect(() => {
    // Set delivery method as selected
    setDeliveryMethodSelected(true);
    
    // Also initialize localStorage with the default standard delivery
    if (!localStorage.getItem('deliveryMethod')) {
      localStorage.setItem('deliveryMethod', JSON.stringify({
        method: 'standard',
        price: 4.99
      }));
    }
  }, [setDeliveryMethodSelected]);

  const handleMethodChange = (method: string) => {
    setSelectedMethod(method);
    setDeliveryMethodSelected(true);
    localStorage.setItem('deliveryMethod', JSON.stringify({
      method: method,
      price: method === 'standard' ? 4.99 : 9.99
    }));
  };

  return (
    <div className="mb-10">
    <Card className=" mx-auto bg-white rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-[#EF1F24] mb-3 flex items-center gap-2">
        <span role="img" aria-label="delivery">
          🚚
        </span>{" "}
        Delivery Method
      </h2>
      <Separator />
      <div className="space-y-4 ">
        {/* Standard Delivery */}
        <Card
          onClick={() => handleMethodChange("standard")}
          className={`cursor-pointer p-4 transition-all rounded-md shadow-none ${
            selectedMethod === "standard"
              ? "bg-blue-50 border border-[#044588]"
              : "border border-gray-300"
          }`}
        >
          <label className="flex items-center gap-3 cursor-pointer w-full">
            <input
              type="radio"
              name="delivery"
              checked={selectedMethod === "standard"}
              onChange={() => handleMethodChange("standard")}
              className="mt-1 accent-blue-600"
            />
            <div>
              <p className="font-semibold text-[#EF1F24]">Standard Delivery</p>
              <p className="text-sm text-gray-500">3–5 business days</p>
            </div>
            <div className="ml-auto text-lg text-[#1b5f08] font-semibold">
            
              $4.99
            </div>
          </label>
        </Card>

        {/* Express Delivery */}
        <Card
          onClick={() => handleMethodChange("express")}
          className={`cursor-pointer p-4 transition-all rounded-md shadow-none ${
            selectedMethod === "express"
              ? "bg-blue-50 border border-[#044588] rounded-md"
              : "border border-gray-300"
          }`}
        >
          <label className="flex items-center gap-3 cursor-pointer w-full">
            <input
              type="radio"
              name="delivery"
              checked={selectedMethod === "express"}
              onChange={() => handleMethodChange("express")}
              className="mt-1 accent-blue-600 rounded-md"
            />
            <div>
              <p className="font-semibold text-[#EF1F24]">Express Delivery</p>
              <p className="text-sm text-gray-500">1–2 business days</p>
            </div>
            <div className="ml-auto text-lg font-semibold text-[#1b5f08]">
              $9.99
            </div>
          </label>
        </Card>
      </div>
    </Card>
    </div>
  );
};

export default DeliveryMethod;
