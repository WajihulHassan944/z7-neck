"use client"

import { useRef, useEffect } from "react"
import Slider from "react-slick"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Product from './../../../public/images/square.webp'
import Image, { StaticImageData } from "next/image"
import { Button } from "@/components/ui/button"

type Review = {
  id: string
  name: string
  date: string
  rating: number
  title: string
  content: string
  product: string
  productImage: StaticImageData
  isVerified: boolean
}

const reviews: Review[] = [
    {
      id: "1",
      name: "Myra W.",
      date: "04/15/25",
      rating: 5,
      title: "DEXTER WILSON -CATAWBA INDIANS",
      content:
        "The z7 Neck Brackets is definitely a Game Changer. It makes me feel safer like I have an advantage on the field. I feel like I have an extra layer of defense and protection on the field.",
      product: "z7 Neck Brackets",
      productImage: Product,
      isVerified: true,
    },
    {
      id: "2",
      name: "Debi H.",
      date: "04/15/25",
      rating: 5,
      title: "Peace of mind",
      content:
        "I often wonder why more kids are not wearing a z7 Neck Brackets. My son plays high school and travel lacrosse. Wearing the collar gives me peace of mind as it is protects his brain. He has... Read more",
      product: "z7 Neck Brackets Sleeve",
      productImage: Product,
      isVerified: true,
    },
    {
      id: "3",
      name: "Brian P.",
      date: "04/09/25",
      rating: 5,
      title: "Great product!",
      content: "Adds a nice level of comfort and can change out to match the sport I'm playing!",
      product: "z7 Neck Brackets Sleeve",
      productImage: Product,
      isVerified: true,
    },
    {
      id: "4",
      name: "Brian I.",
      date: "04/08/25",
      rating: 5,
      title: "Love it!",
      content: "Love the comfort and protection. Makes me feel better on the field.",
      product: "z7 Neck Brackets",
      productImage: Product,
      isVerified: true,
    },
  ]
  

export function TestimonialCarousel() {
  const sliderRef = useRef<Slider | null>(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,        
    autoplaySpeed: 3000,  
    slidesToShow: 3.6,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  // Use useEffect to ensure all cards have equal height
  useEffect(() => {
    const equalizeCardHeights = () => {
      if (typeof window !== 'undefined') {
        // Reset heights first
        const cards = document.querySelectorAll('.testimonial-card');
        cards.forEach(card => {
          (card as HTMLElement).style.height = 'auto';
        });

        // Find the tallest card
        let maxHeight = 0;
        cards.forEach(card => {
          maxHeight = Math.max(maxHeight, card.getBoundingClientRect().height);
        });

        // Set all cards to the height of the tallest card
        cards.forEach(card => {
          (card as HTMLElement).style.height = `${maxHeight}px`;
        });
      }
    };

    // Run on initial load and window resize
    equalizeCardHeights();
    window.addEventListener('resize', equalizeCardHeights);

    // Setup a mutation observer to watch for DOM changes that might affect card heights
    const observer = new MutationObserver(equalizeCardHeights);
    const container = document.querySelector('.slick-track');
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('resize', equalizeCardHeights);
      observer.disconnect();
    };
  }, []);

  const goToPrev = () => sliderRef.current?.slickPrev()
  const goToNext = () => sliderRef.current?.slickNext()

  return (
    <section className="py-16 px-4 max-w-[1440px] mx-auto">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2 bg-[#f4f4f4] w-fit mx-auto py-1 px-2 rounded-full">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 fill-primary text-[#EF1F24]" />
            ))}
          </div>
          <span className="text-base font-semibold">984 reviews</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-semibold">Real Customers, Real Reviews</h2>
      </div>

      <div className="relative mb-6">
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-2xl shadow-black"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="">
          <Slider ref={sliderRef} {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="px-2">
                <div className="testimonial-card border rounded-lg p-6 flex flex-col justify-between bg-white ">
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className="font-bold">
                        {review.name}{" "}
                        {review.isVerified && (
                          <span className="text-[#6D7588] text-sm">✓ Verified Buyer</span>
                        )}
                      </p>
                      <p className="text-gray-500 text-xs">{review.date}</p>
                    </div>

                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= review.rating
                              ? "fill-primary text-[#EF1F24]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <h3 className="font-bold text-lg mb-2">{review.title}</h3>
                    <p className="text-[#2B2B2B] text-sm mb-4">{review.content}</p>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-8 h-8 rounded overflow-hidden mr-2">
                      <Image
                        src={review.productImage}
                        alt={review.product}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-sm text-gray-600">{review.product}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-2xl shadow-black"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="text-center ">
        <Button variant="secondary" className="h-14 max-w-[358px] w-full">
          Read all reviews
        </Button>
      </div>
    </section>
  )}