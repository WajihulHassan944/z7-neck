"use client"

import { useState } from "react"
import Image from "next/image"
import Image1 from "./../../public/images/pro7.png"
import Image2 from "./../../public/images/pro6.png"
import Image3 from "./../../public/images/pro6.png"

const heroData = {
  title: "The Technology Behind the Z7",
  description: "The Z7 is not constructed of common polymers or basic foam. Built from robust yet lightweight, impact-dispersing technologies, this is a brace. The Z7 takes control when force strikes the athlete's upper body, redirecting and reducing the shock to the cervical spine. This reduces the likelihood of injury in a fall or collision. From its fundamental structure to the exquisite stitching, everything is designed with comfort and biomechanics in mind. Though the engineering is modest, the effect—literally—is enormous.",
  image: Image3,
}

const featureData = [
  {
    id: 1,
    title: "Built for High-Impact Action",
    description: "Finding the sweet spot is difficult, but Z7 got it right.",
    image: Image2,
    imagePosition: "center",
    titleAlignment: "text-center",
    descriptionAlignment: "text-center mx-auto",
  },
  {
    id: 2,
    title: "Comfort That Doesn't Quit",
    description: "Simply strap it on and leave.",
    image: Image1,
    imagePosition: "right",
    titleAlignment: "",
    descriptionAlignment: "",
  },
]

export function Showcase() {
  const [currentFeatureIndex] = useState(0)

  // Get the current feature to display
  const currentFeature = featureData[currentFeatureIndex]

  return (
    <section className="max-w-7xl mx-auto my-16 md:my-28 px-2 md:px-0">
      {/* Hero Section */}
      <div className="relative w-full h-auto md:h-[500px] bg-gray-100 overflow-hidden rounded-lg mb-4">
        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-[#000] mb-3">
              {heroData.title}
            </h1>
            <p className="text-[#000] text-base">{heroData.description}</p>
          </div>
          <div className="w-full h-[200px] relative">
            <Image
              src={heroData.image || "/placeholder.svg"}
              alt="Person wearing premium headphones"
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block relative h-full">
          <div className="absolute inset-0 z-10 p-16 flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#000] mb-4">
              {heroData.title.split(",").map((part, index) => (
                <span key={index}>
                  {part}
                  {index === 0 && <br />}
                </span>
              ))}
            </h1>
            <p className="text-[#000] max-w-[500px] text-lg">{heroData.description}</p>
          </div>
          <div className="absolute right-0 top-0 h-full w-full">
            <Image
              src={heroData.image || "/placeholder.svg"}
              alt="Person wearing premium headphones"
              className="h-full w-full object-contain object-right absolute"
              priority
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4" key={currentFeatureIndex}>
        {/* First feature card */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden h-auto">
          {/* Mobile Layout */}
          <div className="flex flex-col md:hidden">
            <div className="p-4">
              <h2 className={`text-2xl font-bold text-[#000] mb-2 ${currentFeature.titleAlignment}`}>
                {currentFeature.title}
              </h2>
              <p className={`text-[#000] text-base ${currentFeature.descriptionAlignment}`}>
                {currentFeature.description}
              </p>
            </div>
            <div className="w-full flex justify-center p-4">
              <Image
                src={currentFeature.image || "/placeholder.svg"}
                alt={`${currentFeature.title} image`}
                className="object-contain w-48 h-auto"
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-row h-[360px]">
            <div className="flex-1 z-10 p-8 flex flex-col justify-start">
              <h2 className={`text-4xl font-bold text-[#000] mb-2 leading-[100%] ${currentFeature.titleAlignment}`}>
                {currentFeature.title}
              </h2>
              <p className={`text-[#000] max-w-xs text-base leading-[22px] ${currentFeature.descriptionAlignment}`}>
                {currentFeature.description}
              </p>
            </div>
            <div className="flex justify-center items-center w-1/2">
              <Image
                src={currentFeature.image || "/placeholder.svg"}
                alt={`${currentFeature.title} image`}
                className="object-contain w-[320px] h-auto"
              />
            </div>
          </div>
        </div>

        {/* Second feature card */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden h-auto">
          {/* Mobile Layout */}
          <div className="flex flex-col md:hidden">
            <div className="p-4">
              <h2 className="text-2xl font-bold text-[#000] mb-2">
                Comfort That Doesn&apos;t Quit
              </h2>
              <p className="text-[#000] text-base">
                Simply strap it on and leave. Its victory in both practice and game-day situations comes from that smooth integration.
              </p>
            </div>
            <div className="w-full flex justify-center p-4">
              <Image
                src={Image1 || "/placeholder.svg"}
                alt="Premium headphones"
                className="object-contain w-48 h-auto"
              />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block relative h-[360px]">
            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-start">
              <h2 className="text-4xl font-bold text-[#000] mb-2 leading-[100%]">
                Comfort That<br /> Doesn&apos;t Quit
              </h2>
              <p className="text-[#000] max-w-xs text-base leading-[22px]">
                Simply strap it on and leave. Its victory in both practice and game-day situations comes from that smooth integration.
              </p>
            </div>
            <div className="absolute bottom-0 top-0 -right-28">
              <Image
                src={Image1 || "/placeholder.svg"}
                alt="Premium headphones"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
