import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from 'next/navigation';

const ProductSection = () => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const basePrice = 6.99;

  

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const calculatePrice = () => {
    return (basePrice * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    // Store cart data in localStorage
    localStorage.setItem('cartData', JSON.stringify({
      quantity: quantity,
      price: basePrice,
      total: (basePrice * quantity).toFixed(2)
    }));
    
    router.push('/checkout');
  };

  const images = [
    "/images/about-3.png",
    "/images/about-4.png",
    "/images/about-6.png",
    "/images/about-7.png",
    "/images/about-8.png",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left side - Product Images */}
      <div className="flex flex-row gap-4">
        {/* Thumbnails - Vertical */}
        <div className="flex flex-col gap-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-20 aspect-square relative bg-gray-100 rounded-lg overflow-hidden ${
                currentImage === index ? "ring-2 ring-green-500" : ""
              }`}
            >
              <Image
                src={img}
                alt={`Z7 Neck Brackets view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Main large image */}
        <div className="flex-1 aspect-square relative rounded-lg overflow-hidden">
          <Image
            src={images[currentImage]}
            alt="Z7 Neck Brackets Main"
            fill
            className="object-contain rounded-xl"
          />
        </div>
      </div>

      {/* Right side - Product Info */}
      <div className="flex flex-col h-full">
        {/* Top content */}
        <div className="flex-1">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Z7 Neck Brackets</h1>
            <div className="flex items-center gap-2">
              <div className="flex text-green-500">
                {"★".repeat(4)}
                {"★".repeat(1).replace("★", "☆")}
              </div>
              <span className="text-gray-600">538 Reviews</span>
            </div>
          </div>

          <p className="text-gray-700 mt-6">
            Z7 Neck Brackets is a refreshing and invigorating drink that is perfect
            for any occasion. It is made with a blend of natural ingredients and
            is sure to satisfy your thirst. It is a great way to stay hydrated
            and healthy.
          </p>
          <p className="text-gray-700 mt-6">
            It&apos;s double identity is one of several distinguishing features
            of Z7 Neck Brackets. At once, it&apos;s nourishing and intoxicating.Most
            drinks with alcohol dehydrate you. They&apos;re full of sugar and
            make you feel tired. This varies.
          </p>
        </div>

        {/* Bottom content */}
        <div className="space-y-6 mt-auto pt-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold">${calculatePrice()}</span>
            <div className="flex items-center border rounded-full">
              <button
                onClick={decrementQuantity}
                className="px-4 py-2 hover:bg-gray-100 rounded-l-full"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-4 py-2 hover:bg-gray-100 rounded-r-full"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full py-4 bg-[#044588] text-white font-semibold rounded-full hover:bg-[#2c4155] transition-colors cursor-pointer"
          >
            Add to Cart
          </button>

          <div className="flex items-center justify-between border-y py-4">
            <span>Natural Ingredients</span>
            <span>Intoxicating</span>
            <span>Sugar Free</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
