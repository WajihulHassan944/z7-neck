import Image from "next/image";
import HeadPhone from "./../../public/images/pro7.png";
import Image1 from "./../../public/images/pro7.png";

const Activate = () => {
  return (
    <section className="bg-[#ef1f23d3] max-w-7xl mx-auto px-4 md:pl-12 pb-10 pt-8 rounded-3xl overflow-hidden relative mb-20">
      <div className="flex flex-col md:flex-row items-center justify-between relative z-20 gap-8 md:gap-0">
        <div className="flex flex-col justify-between w-full md:w-auto">
          <div className="mb-6 md:mb-10 hidden md:flex justify-center md:justify-start">
            <Image
              src={Image1}
              alt="Left Icon"
              className="object-contain w-40 h-28 md:w-[352px] md:h-[270px] -mt-14"
            />
          </div>
          <div className="text-white max-w-xl mx-auto md:mx-0 px-1">
            <h2 className="text-xl md:text-5xl font-bold mb-3 leading-tight">
              Why Neck Protection in Sports Matters More Than Ever?
            </h2>
            <p className="text-base md:text-xl font-semibold">
              Though they may not often make the news like concussions or
              ruptured ACLs, neck injuries are nevertheless rather severe. A
              hurt neck can put an athlete out for weeks, perhaps months, and in
              rare situations, forever. 
            </p>
          </div>
          <div className="mt-4 md:mt-6 px-1">
             <p className="text-base md:text-xl font-semibold text-white mr-0 md:mr-4">
             Given this, the Z7 Neck Bracket is
              beneficial and required. It offers a preventive approach that
              {"doesn't disrupt an athlete's"} confidence or routine. Players
              perform better knowing that their neck and back support their
              equipment.
             </p>
          </div>
        </div>
        <div className="relative w-full flex justify-center md:block md:static md:w-[500px] md:h-[520px] mt-8 md:mt-0 -mr-10">
          <Image
            src={HeadPhone}
            alt="Transparency Mode"
            className="w-48 h-48 md:w-full md:h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Activate;
