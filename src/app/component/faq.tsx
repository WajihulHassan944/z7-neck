"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Image1 from "./../../../public/images/pro3.png";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  isOpen?: boolean;
};

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number>(2);

  const faqItems: FAQItem[] = [
    {
      id: "01",
      question: "Easy to Use, Hard to Break",
      answer:
        "Built for strength. Designed for speed. These Z7 neck brackets are engineered to perform under pressure — without slowing you down.",
    },
    {
      id: "02",
      question: "Pre-Assembled for Fast Installation",
      answer:
        "No time-consuming prep — each bracket comes pre-assembled so your team can bolt and go, saving hours on-site.",
    },
    {
      id: "03",
      question: "Universal Fit Design",
      answer:
        "Engineered to work across multiple mounting systems and profiles, minimizing inventory and simplifying procurement.",
    },
    {
      id: "04",
      question: "Heavy-Duty Galvanized Steel",
      answer:
        "Made from high-grade galvanized steel to resist corrosion and ensure long-lasting structural integrity in any environment.",
    },
    {
      id: "05",
      question: "Optimized Neck Angle",
      answer:
        "The Z7 neck shape distributes load more efficiently, reducing stress on both the bracket and the surface it supports.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <section className="bg-gray-100 py-16 px-4 md:px-8 mb-20">
      <div className="max-w-7xl mx-auto">
        <div className="inline-block mb-6">
          <div className="px-4 py-1 border border-muted rounded-full text-sm font-medium">
            Z7 Bracket
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 max-w-xl">
              We care about your future, not just this season
            </h2>

            <div className="relative overflow-hidden mb-4">
              <Image
                src={Image1}
                alt="Person wearing headphones"
                className="w-[450px] h-[300px] object-cover bg-[#d8a48f]"
              />
            </div>

            <h3 className="text-2xl font-bold mb-2">
              Is The Z7 Bracket Really Important?
            </h3>
            <p className="text-muted max-w-[400px]">
              By using the Z7 as a teaching tool, coaches can stress the need
              for neck protection during drills. Even amid erratic play, parents
              will value knowing their kid is safer on the field. Emphasizing
              safety helps teams to trust one another and motivates athletes to
              speak out if something seems wrong. Though petite, it can have
              significant consequences both physically and mentally.
            </p>
          </div>

          <div>
            <p className="text-muted font-medium mb-8">
              You stretch your body to its limits, and every muscle and movement
              helps you gain an advantage. {"Shouldn't"} your equipment follow
              suit? The Z7 Neck Bracket is not only a brace. It is mental peace.{" "}
              {"It's"}
              the liberty to work out more, strike harder, and play longer.
              {" It's"}
              the assurance that results from knowing you are shielded by
              something created to absorb the blow before you do.
              <br />
              <br />
              The Z7 is ready for you if {"you're"} serious about safety—if you wish
              to remain in the game and forget whiplash. The top players {"don't"}
              play only to win; they play to endure.
            </p>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`border border-gray-500 rounded-lg overflow-hidden transition-colors ${
                    index === activeIndex ? "bg-[#EF1F24]" : ""
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex items-center">
                      <span
                        className={`mr-2 ${
                          index === activeIndex ? "text-white" : "text-muted"
                        }`}
                      >
                        /{item.id}
                      </span>
                      <span
                        className={`font-medium ${
                          index === activeIndex ? "text-white" : ""
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>
                    <div
                      className={`p-1 rounded border ${
                        index === activeIndex
                          ? "border-white bg-white"
                          : "border-muted"
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </button>
                  {index === activeIndex && (
                    <div className="p-4 pt-0 text-white">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
