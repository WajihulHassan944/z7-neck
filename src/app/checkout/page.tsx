import DeliveryForm from "./deliveryForm";
import DeliveryMethod from "./deliveryMethod";
import OrderSummary from "./orderSummary";
import PaymentSection from "./paymentMethod";
import { CheckoutProvider } from "../context/CheckoutContext";
import Image from "next/image";
import logo from "../../../public/images/thelogo.png";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <div className="mx-auto p-4 md:p-6 bg-[#f3f4f6] min-h-screen">
        <div className="max-w-[1240px] mx-auto">
          <Link href="/">
            <Image
              src={logo}
              alt="Checkout"
              className="max-w-[100px] mx-auto"
            />
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#EF1F24] mb-8">
            Checkout
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="order-1 lg:order-2 lg:col-span-1 top-6 h-fit">
              <OrderSummary />
            </div>

            <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
              <DeliveryForm />
              <DeliveryMethod />
              <PaymentSection />
            </div>
          </div> 
        </div>
      </div>
    </CheckoutProvider>
  );
}
