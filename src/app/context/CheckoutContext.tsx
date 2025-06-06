'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface CheckoutContextType {
  deliveryFormComplete: boolean;
  setDeliveryFormComplete: (complete: boolean) => void;
  deliveryMethodSelected: boolean;
  setDeliveryMethodSelected: (selected: boolean) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [deliveryFormComplete, setDeliveryFormComplete] = useState(false);
  const [deliveryMethodSelected, setDeliveryMethodSelected] = useState(false);

  return (
    <CheckoutContext.Provider value={{
      deliveryFormComplete,
      setDeliveryFormComplete,
      deliveryMethodSelected,
      setDeliveryMethodSelected,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (undefined === context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
} 