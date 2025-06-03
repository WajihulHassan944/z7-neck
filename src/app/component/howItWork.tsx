import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import BrainImage from "./../../../public/images/science-brain-cc-29379.webp";
import { Trophy, Award, Shield, Activity } from "lucide-react";

const cardData = [
  {
    title: "Football Players",
    description:
      "Especially linemen and linebackers facing frequent contact and collisions.",
  },
  {
    title: "Rugby Players",
    description:
      "Crucial during scrums and intense physical play because of the high impact forces.",
  },
  {
    title: "Motocross & BMX Riders",
    description:
      "Essential for neck support during high-speed impact or crashes and falls.",
  },
  {
    title: "Wrestlers & Martial Artists",
    description:
      "Helps protect during takedowns, grapples, and explosive movements.",
  },
];

const cardIcons = [Shield, Trophy, Activity, Award];

export default function HowItWorks() {
  return (
    <section className="bg-[#222222] text-white py-12 px-4 md:px-16">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 flex justify-center">
          <Image src={BrainImage} alt="Brain z7 Neck Brackets" />
        </div>

        <div className="md:w-1/2">
          <h2 className="text-5xl font-extrabold mb-5">
            Who Needs the <span className="text-[#EF1F24]">Z7?</span>?
          </h2>
          <p className="text-secondary text-lg mb-5">
            The Z7 is vital neck protection for athletes in high-impact sports.
            Whether {"you're"} a pro or a student athlete, it supports long-term
            health by reducing injury risks—because prevention should be
            standard, not optional.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {cardData.map((card, index) => {
              const Icon = cardIcons[index];
              return (
                <Card
                  key={index}
                  className="bg-[#313131] border-none text-white rounded-md"
                >
                  <CardContent className="pt-6">
                    <Icon className="text-[#EF1F24] h-10 w-10 mb-4" />
                    <h3 className="font-semibold text-xl mb-2">{card.title}</h3>
                    <p className="text-base text-secondary">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
