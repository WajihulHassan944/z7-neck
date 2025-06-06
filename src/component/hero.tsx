"use client"
import { Button } from "../components/ui/button";
import Image from "next/image";
import logo from "./../../public/images/thelogo.png";
import Navbar from "./navbar";

const Hero = () => {
  const scrollToProduct = () => {
    const el = document.getElementById('product');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white h-screen flex items-center justify-center overflow-hidden pb-16"
    >
      <Navbar />

      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/images/provid.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Black overlay with 60% opacity */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      <div className="relative z-20 max-w-[1140px] w-full mx-auto flex flex-col items-center justify-center text-center px-4 mt-16 md:mt-28">
       <Image src={logo} alt="Z7 Neck Bracket" className="w-20 md:w-28 flex justify-center" />
        <div className="bg-[#1E1E1E] inline-flex items-center text-xs md:text-sm px-3 md:px-4 py-1 rounded-full mb-4">
          <span className="text-[#84af3d] mr-2">★★★★★</span> Trusted by 400+
          athletes
        </div>
        <h1 className="text-2xl md:text-[54px] font-semibold leading-[110%] md:leading-[100%] mb-4 md:mb-6 text-[#f10808]">
          Built for Impact. <br />
          <span className="text-white text-3xl md:text-[64px] font-semibold leading-[110%] md:leading-[100%] block md:inline">
            Z7 Neck Bracket Is Changing the <br className="hidden md:block" /> Game in Sports Safety
          </span>
        </h1>
        <p className="text-[#fff] text-base md:text-lg mb-4 md:mb-6 max-w-md md:max-w-5xl mx-auto">
          The last thing you want to consider is your neck when running toward
          a touchdown or diving for the puck. Whiplash and neck injuries,
          however, are all too prevalent in high-impact sports. A vital yet
          sensitive location, the neck absorbs much trauma during rapid
          impact.
        </p>
        <p className="text-[#fff] text-base md:text-lg mb-4 md:mb-6 max-w-md md:max-w-5xl mx-auto">
          The Z7 Neck Bracket was designed just for it.{" It's"} not just
          another piece of equipment;{" it's"} protection allowing you to play
          hard without endangering significant injury. More crucially, it is
          made for actual athletes in actual circumstances when comfort and
          movement are as critical as safety.
        </p>
        <Button className="py-3 px-6 min-w-[160px] md:min-w-[190px] h-12 md:h-14 rounded-lg cursor-pointer font-semibold text-base md:text-lg" onClick={scrollToProduct}>
          Get Your Z7 Neck Bracket
        </Button>
      </div>
    </section>
  );
};

export default Hero;
