"use client";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';
import { Input } from "@/components/ui/input";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from "react";
import { useCheckout } from '../context/CheckoutContext';

// Payment Form Component
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
  });
  const { deliveryFormComplete, deliveryMethodSelected } = useCheckout();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Log cart and delivery data
      const cartData = localStorage.getItem('cartData');
      const deliveryMethod = localStorage.getItem('deliveryMethod');
     

      const parsedCart = cartData ? JSON.parse(cartData) : null;
      const parsedDelivery = deliveryMethod ? JSON.parse(deliveryMethod) : null;

  

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parsedCart.total,
          deliveryFee: parsedDelivery.price,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error:', errorData);
        throw new Error('Payment intent creation failed');
      }

      const data = await response.json();
      
      if (!data.clientSecret) {
        throw new Error('No client secret received');
      }

      // Confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: billingDetails.name,
            address: {
              line1: billingDetails.address,
              city: billingDetails.city,
              state: billingDetails.state,
              postal_code: billingDetails.postal_code,
            }
          }
        }
      });


      if (result.error) {
        setError(result.error.message || 'Payment failed');
        console.error("Payment Error:", result.error);
      } else {
        window.location.href = '/checkout/success';
      }
    } catch (err) {
      console.error("Caught Error:", err);
      setError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#044588',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    },
  };

  const isFormValid = () => {
    return (
      deliveryFormComplete &&
      deliveryMethodSelected &&
      billingDetails.name &&
      billingDetails.address &&
      billingDetails.city &&
      billingDetails.state &&
      billingDetails.postal_code
    );
  };

  return (
    <Card className="mx-auto bg-white rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-[#EF1F24] mb-3 flex items-center gap-2">
        <CreditCard className="w-6 h-6" />
        Payment Details
      </h2>
      <Separator />
      
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Card Holder Name */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#EF1F24]">
            Card Holder Name
          </label>
          <Input
            required
            type="text"
            value={billingDetails.name}
            onChange={(e) => setBillingDetails({...billingDetails, name: e.target.value})}
            placeholder="Name on card"
            className="h-10"
          />
        </div>

        {/* Card Details */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-[#EF1F24]">
            Card Information
          </label>
          <div className="border rounded-md p-4 bg-white">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* Billing Address */}
        <div className="space-y-4">
          <label className="text-base font-semibold text-[#EF1F24]">
            Billing Address
          </label>
          <Input
            required
            placeholder="Street address"
            value={billingDetails.address}
            onChange={(e) => setBillingDetails({...billingDetails, address: e.target.value})}
            className="h-10"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              required
              placeholder="City"
              value={billingDetails.city}
              onChange={(e) => setBillingDetails({...billingDetails, city: e.target.value})}
              className="h-10"
            />
            <Input
              required
              placeholder="State"
              value={billingDetails.state}
              onChange={(e) => setBillingDetails({...billingDetails, state: e.target.value})}
              className="h-10"
            />
          </div>
          <Input
            required
            placeholder="ZIP Code"
            value={billingDetails.postal_code}
            onChange={(e) => setBillingDetails({...billingDetails, postal_code: e.target.value})}
            className="h-10"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-md flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">
            Your payment information is secured with SSL encryption
          </span>
        </div>

        <button
          type="submit"
          disabled={isProcessing || !stripe || !isFormValid()}
          className="w-full bg-[#EF1F24] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#b75f62] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isProcessing ? 'Processing...' : 
           !isFormValid() ? 'Place Order' : 'Place Order'}
        </button>

        <div className="flex items-center justify-center pt-4 border-t">
        <p className="text-base text-gray-500 mt-5">
        By placing an order, you agree to our{" "}
        <a href="/terms-and-conditions" className="underline">Terms of Service</a> and{" "}
        <a href="/privacy-policy" className="underline">Privacy Policy</a>.
      </p>
        </div>
      </form>
    </Card>
  );
};

// Wrap the payment section with Stripe Elements
const PaymentSection = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

  const options = {
    fonts: [
      {
        cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
      },
    ],
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentSection; 