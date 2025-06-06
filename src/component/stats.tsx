"use client"
import Image, { StaticImageData } from "next/image";
import { Button } from "../components/ui/button";

import athleteSmiling from "./../../public/images/pro2.png";
import collarProduct from "./../../public/images/pro7.png";
import collarHelmet from "./../../public/images/pro3.png";

type StatImageSection = {
  type: "image";
  src: StaticImageData;
  alt: string;
  className: string;
};

type StatTextSection = {
  type: "text";
  bg: string;
  percent: string;
  title: string;
  desc: string;
  buttonText: string;
  buttonVariant: "default" | "secondary";
  image: StaticImageData;
  imagePosition: string;
  dark?: boolean;
};

type StatItem = StatImageSection | StatTextSection;

// --- Data array ---
const statsData: StatItem[] = [
  {
    type: "image",
    src: athleteSmiling,
    alt: "Athlete smiling with z7 Neck Brackets",
    className: "w-full object-cover h-[830px]",
  },
  {
    type: "text",
    bg: "bg-white",
    percent: "Real Athletes, Real Results",
    title:
      "The Z7 Neck Bracket has received accolades at all degrees of competition",
    desc: `The finest endorsements come from those who put the equipment to the test. The Z7 Neck Bracket has received accolades at all degrees of competition. One linebacker remarked, "My neck feels way better after a hit, but I hardly notice it once the game starts." I crashed at 40 mph and walked away with no neck stiffness. That was previously unheard of. Parents of young players have also spoken out, happy to notice less neck pain and fewer physical therapist appointments.
`,
    buttonText: "Buy Now for Only $399",
    buttonVariant: "secondary",
    image: collarProduct,
    imagePosition: "absolute -right-24 top-48",
  },
  {
    type: "text",
    bg: "bg-[#222222]",
    percent: "What Makes the Z7 Different?",
    title: "The Z7 functions out of the box, unlike others that call for costly add-ons or bespoke fittings",
    desc: `Many braces are available on the market. Some emphasize stiffness, some comfort. Very few, however, can do both without sacrifice. The Z7 Neck Bracket is unique because it was created to provide really effective wearable protection.
    The Z7 functions out of the box, unlike other items that call for costly add-ons or bespoke fittings. It fits under standard sporting gear, changes quickly, and lasts season after season. Field tests have revealed it operating amid sweat, rain, snow, and repetitive abuse.
Most importantly, it cooperated with actual athletes, physical therapists, and sports scientists. The outcome is a product that knows the game and the body.`,
    buttonText: "Get it Now for Only $399",
    buttonVariant: "default",
    image: collarProduct,
    imagePosition: "absolute top-36 -left-10",
    dark: true,
  },
  {
    type: "image",
    src: collarHelmet,
    alt: "Athlete with helmet and z7 Neck Brackets",
    className: "w-full object-cover h-[830px]",
  },
];

const scrollToProduct = () => {
  const el = document.getElementById('product');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// --- Component ---
export default function StatsSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {statsData.map((item, index) => {
        if (item.type === "image") {
          return (
            <div key={index} className="w-full">
              <Image src={item.src} alt={item.alt} className={`${item.className} h-[300px] md:h-[830px]`} />
            </div>
          );
        }

        return (
          <div
            key={index}
            className={`${item.bg} px-4 md:px-10 py-8 md:py-0 flex flex-col justify-center relative overflow-hidden`}
          >
            <div className={`${item.imagePosition} max-w-[220px] md:max-w-none mx-auto md:mx-0`}>
              <Image src={item.image} alt="z7 Neck Brackets" className="opacity-70 w-full" />
            </div>
            <div className="z-10">
              <p className="text-4xl md:text-[88px] leading-[40px] md:leading-[80px] font-extrabold text-[#EF1F24] mb-2 mt-4 md:mt-0">
                {item.percent}
              </p>
              <h3
                className={`text-xl md:text-4xl font-extrabold ${
                  item.dark ? "text-white" : "text-[#030712]"
                } mb-3 md:mb-4`}
              >
                {item.title}
              </h3>
              <p
                className={`text-sm md:text-base mb-3 md:mb-4 ${
                  item.dark ? "text-secondary" : "text-[#0b0b0b]"
                }`}
              >
                {item.desc}
              </p>
              <Button
                variant={item.buttonVariant}
                onClick={scrollToProduct}
                className="py-3 px-6 max-w-[190px] w-full h-12 md:h-14 rounded-lg cursor-pointer"
              >
                {item.buttonText}
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
