import Image from "next/image";
import headsetImage from "./../../../public/images/pro6.png";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-[url('/images/hp-intro-z7 Neck Brackets-cc-29379.png')] bg-cover bg-center bg-no-repeat text-white py-16 px-6 md:px-20 h-screen">
      <div className="absolute inset-0 bg-gradient-to-t from-[#222] via-[#222]/50 to-transparent z-0" />

      <div className="relative z-10 max-w-[1440px] mx-auto h-full flex flex-col justify-center">
        <div className="flex justify-end mb-6">
          <Image
            src={headsetImage}
            alt="z7 Neck Brackets Device"
            className="w-[520px] object-cover"
          />
        </div>

        <div className="absolute top-16">
          <div className="bg-[#1E1E1E] inline-flex items-center text-sm px-4 py-1.5 rounded-full mb-4">
            <span className="text-[#84af3d] mr-2">★★★★★</span> Trusted by 400+
            athletes
          </div>
          <h1 className="text-[64px] font-semibold leading-[100%] mb-6">
            Built for Impact. <br />
            <span className="text-[#EF1F24]">
              Z7 Neck Bracket Is Changing the Game in Sports Safety
            </span>
          </h1>
          <p className="text-[#fff] text-lg mb-6">
            The last thing you want to consider is your neck when running toward
            a touchdown or diving for the puck. Whiplash and neck injuries,
            however, are all too prevalent in high-impact sports. A vital yet
            sensitive location, the neck absorbs much trauma during rapid
            impact.
          </p>
          <p className="text-[#fff] text-lg mb-6">
            The Z7 Neck Bracket was designed just for it.{" It's"} not just
            another piece of equipment;{" it's"} protection allowing you to play
            hard without endangering significant injury. More crucially, it is
            made for actual athletes in actual circumstances when comfort and
            movement are as critical as safety.
          </p>
          <Button className="py-3 px-6 min-w-[190px] h-14 rounded-lg cursor-pointer font-semibold">
            Get Your Z7 Neck Bracket
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
