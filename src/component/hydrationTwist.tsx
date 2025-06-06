"use client";
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HydrationTwist = () => {
  const contentSlides = [
    {
      title: "Two Roles, One Bottle",
      description:
        "It&apos;s double identity is one of several distinguishing features of Z7 Neck Brackets. At once, it&apos;s nourishing and intoxicating. Most drinks with alcohol dehydrate you. They&apos;re full of sugar and make you feel tired. This is unique. The buzz here is bundled with the fundamentals of hydration—clean water, individual control, and a revitalizing lift. You need not decide between enjoyment and thirst.",
    },
    {
      title: "A Smart Trade-Off",
      description:
        "Usually, alcohol hits hard and makes you feel weighted. Z7 Neck Brackets alters that story. You are consuming water. You&apos;re tasting. You&apos;re also receiving that nice alcohol lift. The outcome? No swelling. No sugar crash. Just good feelings. You don&apos;t get burdened. You feel incredible, light, and more in charge of your evening.",
    },
    {
      title: "Goodbye Hangovers, Hello Chill",
      description:
        "Z7 Neck Brackets naturally promotes improved hydration since it advocates mixing with water. When it comes to hangover prevention, that&apos;s a big victory. You are less prone to get up with a parched throat or a pounding head. It&apos;s one minor adjustment that significantly affects your next-day mood.",
    },
    {
      title: "More Room to Play",
      description:
        "Having a drink that doesn&apos;t require accessories is liberating. No elegant mixers, no ice. Simply your preferred booster and water. That means less cleaning, more room in your backpack, and less concern about shattered glass. You receive the pleasure, less the logistical hassle.",
    },
    {
      title: "Made for the Mindful Sipper",
      description:
        "It&apos;s for those who understand how to pace themselves. For individuals who enjoy a light and vibrant atmosphere. Z7 Neck Brackets provides the ideal middle ground whether you desire a little taste in your daily activities or you control your alcohol consumption. It&apos;s purposeful and hydrating with a twist.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: {
      perView: 1,
      spacing: 0,
    },
  });

  const handlePrevClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    instanceRef.current?.prev();
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    instanceRef.current?.next();
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-12 h-screen mb-20">
      <div className="relative h-48 md:col-span-5 md:h-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/bg-pattern-3.jpg')` }}
        />
      </div>

      <div className="relative h-48 md:col-span-7 md:h-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/about-2.png')`,
          }}
        />
      </div>

      <div className="absolute left-4 right-4 md:left-24 top-[30%] md:top-[20%] bg-white z-10 p-6 md:p-8 w-auto md:w-96 md:w-full md:max-w-2xl rounded-md shadow-lg">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#044588] mb-2">
            Hydration with a Twist (Literally)
          </h2>
          <p className="text-sm md:text-gray-700">
            It&apos;s double identity is one of several distinguishing features
            of Z7 Neck Brackets. At once, it&apos;s nourishing and intoxicating.Most
            drinks with alcohol dehydrate you. They&apos;re full of sugar and
            make you feel tired. This varies.
          </p>
        </div>

        <div ref={sliderRef} className="keen-slider overflow-hidden">
          {contentSlides.map((slide, index) => (
            <div key={index} className="keen-slider__slide">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary">
                {slide.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600">{slide.description}</p>
            </div>
          ))}
        </div>

        {loaded && (
          <div className="flex items-center justify-center space-x-4 mt-6">
            <button
              onClick={handlePrevClick}
              className="p-1 rounded-full border border-primary transition-all"
            >
              <ChevronLeft className="w-4 md:w-5 h-4 md:h-5 text-primary" />
            </button>

            <div className="flex space-x-2">
              {contentSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === idx ? "bg-primary w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextClick}
              className="p-1 rounded-full border border-primary transition-all"
            >
              <ChevronRight className="w-4 md:w-5 h-4 md:h-5 text-primary" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HydrationTwist;
