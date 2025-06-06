"use client";

import Image from "next/image";
import { CheckCircle2, XCircle } from "lucide-react";
import Product from "./../../public/images/pro7.png";

const comparisons = [
  {
    label: "Reduces Brain Movement",
    qcollar: true,
    other: false,
  },
  {
    label: "Backed by Clinical Research",
    qcollar: true,
    other: false,
  },
  {
    label: "FDA Cleared",
    qcollar: true,
    other: false,
  },
  {
    label: "FSA/HSA Eligible",
    qcollar: true,
    other: false,
  },
];

export default function WhyWearQCollar() {
  return (
    <section className="bg-white pt-10 md:pt-16 pb-16 md:pb-36">
      <div className="max-w-[1092px] mx-auto flex flex-col md:flex-row justify-between items-end gap-10 md:gap-0 px-4">
        <div className="flex flex-col items-center md:items-start lg:text-left w-full md:w-auto">
          <Image src={Product} alt="Z7 Bracket" className="max-w-[180px] md:max-w-[250px] mb-4 md:mb-0" />
          <h2 className="text-4xl md:text-[112px] font-semibold leading-[110%] md:leading-[100%] mb-4 text-center md:text-left">
            Why Wear <br /> <span className="text-[#EF1F24]">Z7 Bracket?</span>
          </h2>
          <p className="mt-2 md:mt-4 text-[#222222] text-base md:text-lg max-w-full md:max-w-[650px] mx-auto md:mr-auto text-center md:text-left">
            Everything is a proper fit. Align the backplate with the middle of
            your shoulder pads to correct it. Slowly tighten the straps to
            ensure the brace rests appropriately on both sides. Once in
            position, move your head to check your range of motion. You should
            feel confident yet not rigid.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-10 max-w-full md:max-w-[415px] w-full mt-8 md:mt-0">
          <h3 className="text-base md:text-lg font-extrabold text-[#545454] mb-4 max-w-32 leading-[100%] text-center md:text-left">
            <span className="text-[#EF1F24]">Z7 Bracket</span>{" "}
            <span className="text-[#000]">VS</span> Other Head Protection
          </h3>
          <div>
            {comparisons.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center border-t border-t-primary py-4 md:py-6"
              >
                <div className="col-span-6">
                  <p className="max-w-24 text-xs md:text-base font-semibold text-[#000]">
                    {item.label}
                  </p>
                </div>
                <div className="flex justify-center col-span-3">
                  {item.qcollar ? (
                    <CheckCircle2 className="fill-[#30d70b] stroke-white w-6 h-6 md:w-7 md:h-7" />
                  ) : (
                    <XCircle className="fill-[#ff0000] stroke-white w-6 h-6 md:w-7 md:h-7" />
                  )}
                </div>
                <div className="flex justify-center col-span-3">
                  {item.other ? (
                    <CheckCircle2 className="fill-[] stroke-white w-6 h-6 md:w-7 md:h-7" />
                  ) : (
                    <XCircle className="fill-[#ff0000] stroke-white w-6 h-6 md:w-7 md:h-7" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
