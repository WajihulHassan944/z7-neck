'use client'
import { ShoppingCart } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Drink from './../../../public/images/juice-9-2.png';
import Drink1 from './../../../public/images/Jar.png';
import Profile from './../../../public/images/images.jpg';
import { Button } from '@/components/ui/button';

export default function ElectrolyteProductShowcase() {
  const curveTextRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const scrollSpeed = 0.5;
    let position = 0;
    
    const animateCurvedText = () => {
      if (curveTextRef.current) {
        position -= scrollSpeed;
        if (position <= -200) position = 0;
        curveTextRef.current.style.transform = `translateX(${position}px)`;
      }
      requestAnimationFrame(animateCurvedText);
    };
    
    const animation = requestAnimationFrame(animateCurvedText);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="relative w-full overflow-hiddenmb-7 md:mb-10 lg:mb-20">
      <div className="absolute w-full top-[430px] overflow-hidden bg-secondary">
        <div 
          ref={curveTextRef}
          className="flex whitespace-nowrap text-primary text-xl font-medium"
          style={{ 
            transform: 'translateX(0)',
            width: 'max-content',
          }}
        >
          <div className="flex items-center" style={{ transform: 'perspective(500px) rotateX(8deg)' }}>
            <span className="mx-4">BE THE DIFFERENCE THAT MATTERS</span>
            <span className="mx-2">★</span>
            <span className="mx-4">BE THE DIFFERENCE THAT MATTERS</span>
            <span className="mx-2">★</span>
            <span className="mx-4">BE THE DIFFERENCE THAT MATTERS</span>
            <span className="mx-2">★</span>
            <span className="mx-4">BE THE DIFFERENCE THAT MATTERS</span>
            <span className="mx-2">★</span>
            <span className="mx-4">BE THE DIFFERENCE THAT MATTERS</span>
            <span className="mx-2">★</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center mb-3 md:mb-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-blue-400 flex-shrink-0 ">
              <Image src={Profile} alt="Athlete profile" className="w-full h-full object-cover rotate-0 md:rotate-3" />
            </div>
            <div className="ml-0 md:ml-6 text-center">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">ELECTROLYTE</h1>
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">POWDER DRINK MIX</h2>
            </div>
          </div>

          <p className="text-gray-800 text-base md:text-lg text-center mb-6 md:mb-8 max-w-2xl">
            Hydration Multiplier +Energy Is A Great-Tasting, Non-GMO Electrolyte
            <br />
            Drink That Hydrates While You Energize.
          </p>

          <div className="relative flex justify-center w-full my-8">
            <div className="relative z-20 transform scale-100">
              <Image src={Drink1} alt="Electrolyte powder package" className="h-80 object-contain " />
            </div>
            <div className="absolute right-1/4 top-8 z-30">
              <Image src={Drink} alt="Single serving packet" className="h-64 object-contain transform rotate-12 hidden lg:block" />
            </div>
            <div className="absolute right-24 -top-8">
              <Image src={Drink} alt="Flavor variant" className="h-32 w-32 object-contain hidden lg:block" />
            </div>
          </div>

          <div className="mt-8 md:mt-12">
            <Button variant="secondary" className="min-w-44">
              <span className="font-medium">SHOP NOW</span>
              <ShoppingCart size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
