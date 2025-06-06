"use client";

import { useState, useEffect, useRef, JSX } from "react";
import { Star, ChevronUp, ChevronDown } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

// Example image imports

import Pro1 from "./../../public/images/pro1.png";
import Pro2 from "./../../public/images/pro2.png";
import Pro3 from "./../../public/images/pro3.png";
import Pro4 from "./../../public/images/pro4.png";
import Pro5 from "./../../public/images/pro5.png";
import Pro6 from "./../../public/images/pro6.png";
import Pro7 from "./../../public/images/pro7.png";

// Define types
interface ProductBenefit {
  id: number;
  text: string;
}

interface PaymentOptions {
  installmentAmount: string;
}

interface ProductDataType {
  name: string;
  price: string;
  rating: number;
  reviewCount: number;
  description: string;
  sizes: number[];
  benefits: ProductBenefit[];
  paymentOptions: PaymentOptions;
}

type ExtendedDivRef = HTMLDivElement & {
  scrollTimeout?: NodeJS.Timeout;
};

export function ProductSection(): JSX.Element {
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
  const [showTopArrow, setShowTopArrow] = useState<boolean>(false);
  const [showBottomArrow, setShowBottomArrow] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const timelineRef = useRef<ExtendedDivRef | null>(null);
  const router = useRouter();

  const productData: ProductDataType = {
    name: "Z7 Bracket",
    price: "$399",
    rating: 4.8,
    reviewCount: 138,
    description:
      "Proven to help protect athletes' brains in a way other equipment can't...",
    sizes: [11, 12, 13, 14, 15, 16, 17, 18],
    benefits: [
      { id: 1, text: "FSA/HSA Eligible" },
      { id: 2, text: "Free Shipping" },
      { id: 3, text: "FDA-Cleared" },
    ],
    paymentOptions: {
      installmentAmount: "$17.96",
    },
  };

  const thumbnailHeight = 144;
  const images: StaticImageData[] = [
    Pro1,
    Pro2,
    Pro3,
    Pro4,
    Pro5,
    Pro6,
    Pro7,
  ];

  useEffect(() => {
    setMainImageIndex(0);
    checkScrollPosition();
  }, []);

  const checkScrollPosition = (): void => {
    if (!timelineRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = timelineRef.current;
    setShowTopArrow(scrollTop > 10);
    setShowBottomArrow(scrollTop + clientHeight < scrollHeight - 10);
  };

  const scrollToIndex = (index: number): void => {
    if (timelineRef.current) {
      timelineRef.current.scrollTo({
        top: index * thumbnailHeight,
        behavior: "smooth",
      });
    }
    setMainImageIndex(index);
    setTimeout(checkScrollPosition, 400);
  };

  const scrollUp = () => {
    if (!timelineRef.current) return;
    const currentIndex = Math.floor(
      timelineRef.current.scrollTop / thumbnailHeight
    );
    scrollToIndex(Math.max(currentIndex - 1, 0));
  };

  const scrollDown = () => {
    if (!timelineRef.current) return;
    const currentIndex = Math.floor(
      timelineRef.current.scrollTop / thumbnailHeight
    );
    scrollToIndex(Math.min(currentIndex + 1, images.length - 1));
  };

  const handleScroll = () => {
    if (!timelineRef.current) return;
    checkScrollPosition();

    const scrollTop = timelineRef.current.scrollTop;
    const nearestIndex = Math.round(scrollTop / thumbnailHeight);
    const targetIndex = Math.max(0, Math.min(nearestIndex, images.length - 1));

    if (timelineRef.current.scrollTimeout) {
      clearTimeout(timelineRef.current.scrollTimeout);
    }

    timelineRef.current.scrollTimeout = setTimeout(() => {
      if (timelineRef.current) {
        timelineRef.current.scrollTo({
          top: targetIndex * thumbnailHeight,
          behavior: "smooth",
        });
      }
      setMainImageIndex(targetIndex);
    }, 150);
  };
  

  const renderRatingStars = (): JSX.Element[] => {
    const fullStars = Math.floor(productData.rating);
    const hasHalfStar = productData.rating % 1 !== 0;
    const stars: JSX.Element[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-5 h-5 fill-[#30d70b]" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative">
          <Star
            className="w-5 h-5 fill-[#30d70b] "
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
          <Star
            className="w-5 h-5 text-gray-300 absolute top-0 left-0"
            style={{ clipPath: "inset(0 0 0 50%)" }}
          />
        </div>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  // Parse price as number (remove $ and commas)
  const unitPrice = Number(productData.price.replace(/[^0-9.]/g, ""));
  const totalPrice = (unitPrice * quantity).toFixed(2);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    localStorage.setItem(
      "cartData",
      JSON.stringify({
        quantity: quantity,
        price: unitPrice,
        total: totalPrice,
      })
    );
    router.push("/checkout");
  };

  return (
    <section id="product" className="max-w-[1240px] mx-auto mb-20 px-2 md:px-0">
      <div className="flex flex-col md:flex-row gap-8 md:h-[654px]">
        <div className="flex flex-col md:flex-row w-full md:w-auto">
          {/* Thumbnails: hide on mobile */}
          <div className="hidden md:flex flex-col mr-4 h-[654px] relative">
            {showTopArrow && (
              <button
                className="absolute top-0 left-0 right-0 bg-[#EF1F24] py-3 z-10 flex justify-center"
                onClick={scrollUp}
              >
                <ChevronUp className="w-8 h-8 stroke-3 text-[#000]" />
              </button>
            )}
            <div
              ref={timelineRef}
              className="flex flex-col gap-4 overflow-y-auto h-full"
              onScroll={handleScroll}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollSnapType: "y mandatory",
              }}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`w-[165px] h-[150px] border flex-shrink-0 cursor-pointer bg-gray-100 ${
                    mainImageIndex === index
                      ? "border-black border-2"
                      : "border-gray-300"
                  }`}
                  onClick={() => scrollToIndex(index)}
                  style={{ scrollSnapAlign: "start" }}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="h-full w-full object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
            {showBottomArrow && (
              <button
                className="absolute bottom-0 left-0 right-0 bg-[#EF1F24] py-3 z-10 flex justify-center"
                onClick={scrollDown}
              >
                <ChevronDown className="w-8 h-8 stroke-3 text-[#000]" />
              </button>
            )}
          </div>
          {/* Main image */}
          <div className="bg-gray-100 overflow-hidden w-full h-[260px] md:h-[654px] md:w-[643px] relative flex items-center justify-center mb-4 md:mb-0">
            <Image
              src={images[mainImageIndex]}
              alt="Main product"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Thumbnails: show horizontally on mobile */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <div
                key={index}
                className={`w-20 h-16 border flex-shrink-0 cursor-pointer bg-gray-100 ${
                  mainImageIndex === index
                    ? "border-black border-2"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImageIndex(index)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="h-full w-full object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product details */}
        <div className="flex flex-col h-full w-full md:w-auto mt-6 md:mt-0">
          <div className="flex-1 flex flex-col">
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                <h2 className="text-2xl md:text-[40px] font-semibold text-[#222222]">
                  {productData.name}
                </h2>
                <span className="text-2xl md:text-[40px] font-semibold text-[#222222]">
                  {productData.price}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex">{renderRatingStars()}</div>
                <a href="#reviews" className="ml-2 text-[#000] underline text-sm md:text-base">
                  {productData.reviewCount} Reviews
                </a>
              </div>
              <p className="mt-4 text-base md:text-lg text-[#444]">
                The Z7 Bracket is engineered for athletes who demand the best in protection and performance. Designed with advanced materials and tested in the toughest conditions, it offers unparalleled comfort and security, making it the top choice for professionals and enthusiasts alike.
              </p>
              <div className="mt-4 md:mt-6">
                <p className="text-[#000] text-sm md:text-base">
                  {productData.description}
                  <a
                    href="#learn-more"
                    className="text-[#EF1F24] hover:underline ml-1 font-semibold"
                  >
                    Learn how it works.
                  </a>
                </p>
              </div>
            </div>
            <div className="flex-1" />
          </div>
          {/* Quantity selector and Add to Cart button */}
          <div className="mt-6 md:mt-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base md:text-lg">Quantity:</span>
                <button
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-200"
                  onClick={decrementQuantity}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="mx-2 min-w-[24px] text-center">{quantity}</span>
                <button
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xl font-bold hover:bg-gray-200"
                  onClick={incrementQuantity}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="font-semibold text-base md:text-lg">
                Total: <span className="text-[#EF1F24]">${totalPrice}</span>
              </span>
            </div>
            <div className="flex justify-end items-baseline">
              <button
                className="bg-[#EF1F24] cursor-pointer text-white px-6 md:px-8 py-4 md:py-6 w-full rounded-lg text-base md:text-lg font-bold hover:bg-[#EF1F24]/90 transition"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
