"use client";

import Image from "next/image";
import { CheckCircle2, XCircle } from "lucide-react";
import Product from "./../../../public/images/pro7.png";

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
    <section className="bg-white py-16 ">
      <div className="max-w-[1092px]  mx-auto flex justify-between items-end">
        <div className="flex flex-col  lg:text-left">
          <Image src={Product} alt="Z7 Bracket" className="max-w-[250px]" />
          <h2 className="text-[112px] font-semibold leading-[100%] mb-4">
            Why Wear <br /> <span className="text-[#EF1F24]">Z7 Bracket?</span>
          </h2>
          <p className="mt-4 text-[#222222] text-lg max-w-[650px] mr-auto">
            Everything is a proper fit. Align the backplate with the middle of
            your shoulder pads to correct it. Slowly tighten the straps to
            ensure the brace rests appropriately on both sides. Once in
            position, move your head to check your range of motion. You should
            feel confident yet not rigid.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-10 max-w-[415px] w-full">
          <h3 className="text-lg font-extrabold text-[#545454] mb-4 max-w-32 leading-[100%]">
            <span className="text-[#EF1F24]">Z7 Bracket</span>{" "}
            <span className="text-muted">VS</span> Other Head Protection
          </h3>
          <div className="">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center  border-t border-t-primary py-6"
              >
                <div className="col-span-6">
                  <p className="max-w-24 text-base font-semibold text-muted">
                    {item.label}
                  </p>
                </div>
                <div className="flex justify-center col-span-3">
                  {item.qcollar ? (
                    <CheckCircle2 className="fill-primary stroke-white w-7 h-7" />
                  ) : (
                    <XCircle className="fill-[#ff0000] stroke-white  w-7 h-7" />
                  )}
                </div>
                <div className="flex justify-center col-span-3">
                  {item.other ? (
                    <CheckCircle2 className="fill-primary stroke-white  w-7 h-7" />
                  ) : (
                    <XCircle className="fill-[#ff0000] stroke-white  w-7 h-7" />
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
