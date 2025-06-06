"use client"

import { useState } from "react"
import Image from "next/image"
import Image1 from "./../../../public/images/pro7.png"
import Image2 from "./../../../public/images/pro6.png"
import Image3 from "./../../../public/images/pro6.png"

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
    title: "Comfort That Doesn’t Quit",
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
    <section className="max-w-7xl mx-auto mb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] md:h-[500px] bg-gray-100 overflow-hidden rounded-lg mb-4">
        <div className="absolute inset-0 z-10 p-8 md:p-16 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-muted mb-4">
            {heroData.title.split(",").map((part, index) => (
              <span key={index}>
                {part}
                {index === 0 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-muted max-w-[500px] text-lg">{heroData.description}</p>
        </div>
        <div className="absolute right-0 top-0 h-full">
          <Image
            src={heroData.image || "/placeholder.svg"}
            alt="Person wearing premium headphones"
            className="h-full w-full object-contain object-left"
            priority
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" key={currentFeatureIndex}>
        {/* Display the current feature */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden h-[360px]">
          <div className="absolute inset-0 z-10 p-8 flex flex-col justify-start">
            <h2 className={`text-4xl font-bold text-muted mb-2 leading-[100%] ${currentFeature.titleAlignment}`}>
              {currentFeature.title.split(" of ").map((part, i) => (
                <span key={i}>
                  {part}
                  {i === 0 && <br />}
                  {i === 0 && " "}
                </span>
              ))}
            </h2>
            <p className={`text-muted max-w-xs leading-[22px] ${currentFeature.descriptionAlignment}`}>
              {currentFeature.description}
            </p>
          </div>
          <div
            className={`absolute bottom-0 ${
              currentFeature.imagePosition === "right" ? "-right-28 top-0" : "left-0 right-0"
            }`}
          >
            <Image
              src={currentFeature.image || "/placeholder.svg"}
              alt={`${currentFeature.title} image`}
              className="h-full w-full object-contain"
            />
          </div>

        
        </div>

        {/* Second feature card (static) */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden h-[360px]">
          <div className="absolute inset-0 z-10 p-8 flex flex-col justify-start">
            <h2 className="text-4xl font-bold text-muted mb-2 leading-[100%]">
            Comfort That 
              <br /> Doesn’t Quit
            </h2>
            <p className="text-muted max-w-xs leading-[22px]">
            Simply strap it on and leave. Its victory in both practice and game-day situations comes from that smooth integration.
            </p>
          </div>
          
          <div className="absolute bottom-0 top-0  -right-28">
            <Image
              src={Image1 || "/placeholder.svg"}
              alt="Premium headphones"
              className="h-full w-full object-contain"
            />
          </div>
         
        </div>
      </div>
    </section>
  )
}
