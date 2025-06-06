import Image from "next/image";
import HeadPhone from "./../../../public/images/pro7.png";
import Image1 from "./../../../public/images/pro7.png";

const Activate = () => {
  return (
    <section className="bg-[#ef1f23d3] max-w-7xl mx-auto pl-12 pb-10 rounded-3xl overflow-hidden relative mb-20">
      <div className="flex flex-col md:flex-row items-center justify-between relative z-20">
        <div className="flex flex-col justify-between">
          <div className=" mb-10">
            <Image
              src={Image1}
              alt="Left Icon"
              className="object-contain top-0 w-[352px] h-[270px] -mt-3.5"
            />
          </div>
          <div className=" text-white mt-24 md:mt-0 max-w-lg">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
              Why Neck Protection in Sports Matters More Than Ever?
            </h2>
            <p className="text-lg md:text-xl font-semibold">
              Though they may not often make the news like concussions or
              ruptured ACLs, neck injuries are nevertheless rather severe. A
              hurt neck can put an athlete out for weeks, perhaps months, and in
              rare situations, forever. 
            </p>
          </div>
          <div className="mt-6">
             <p className="text-lg md:text-xl font-semibold text-white mr-4">
             Given this, the Z7 Neck Bracket is
              beneficial and required. It offers a preventive approach that
              {"doesn't disrupt an athlete's"} confidence or routine. Players
              perform better knowing that their neck and back support their
              equipment.
             </p>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-[500px] h-[520px]">
          <Image
            src={HeadPhone}
            alt="Transparency Mode"
            className="w-full h-full rotate-y-180 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Activate;
