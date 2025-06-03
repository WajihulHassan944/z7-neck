import Image from "next/image";
import BrainImage from "./../../../public/images/pro6.png";

export function BrainProtectionSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#2b2b2b] rounded-xl overflow-hidden mb-12">
          <div className="relative">
            <div className="p-8 md:px-12 z-10 flex items-end">
              <div className="max-w-md py-10">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
                  How to Get the Best Fit?
                </h2>
                <div className="w-20 h-1 bg-[#EF1F24] mb-6"></div>

                <p className="text-white text-base mb-8">
                  Everything is a proper fit. Align the backplate with the
                  middle of your shoulder pads to correct it. Slowly tighten the
                  straps to ensure the brace rests appropriately on both sides.
                  Once in position, move your head to check your range of
                  motion. You should feel confident yet not rigid.
                </p>
              </div>
              <div className="absolute flex right-0 justify-end">
                <Image
                  src={BrainImage}
                  alt="3D brain scan with z7 Neck Brackets"
                  className="h-full w-full object-contain max-w-[250px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold mb-6 text-[#2B2B2B]">
              Repetitive Sub-Concussive
              <br />
              Impacts
            </h3>

            <p className="text-[#2B2B2B] max-w-2xl">
              During the first setup, take your time. More time spent now on
              adjustment might significantly affect comfort and performance
              later. Athletes who hurry the fitting process might lose the
              actual advantages of the brace. Eliminating distractions, then, a
              perfect fit increases physical comfort and improves concentration.
              During first fittings, coaches can help athletes ensure everything
              is in line. Players should do a brief warm-up with the brace on
              once fitted correctly to guarantee nothing needs fine-tuning. With
              a bit of experience, it becomes second nature and quickly becomes
              part of your standard gear routine.
            </p>
          </div>
          <div className="relative h-full">
            <div className="absolute bottom-4 right-12 bg-[#f4f4f4] text-black p-12 rounded-lg shadow-lg max-w-xs">
              <div>
                <span className="text-[#EF1F24] text-[88px] font-bold">
                  83<span className="text-5xl align-super">%</span>
                </span>
                <p className="text-sm mt-2">
                  of athletes not wearing a Z7 Neck Bracket showed significant
                  changes in brain tissue after a season of play versus 17% of
                  those who were wearing a Z7 Neck Bracket.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
