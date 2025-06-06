import Image from "next/image";
import Headphone from "./../../../public/images/pro4.png";

const Blog = () => {
  return (
    <section className="px-4 py-16 bg-white max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-20 items-center justify-between">
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-muted">
            What Is the <br />{" "}
            <span className="text-[#EF1F24]">Z7 Neck Bracket?</span>
          </h2>
          <hr className="border-gray-300 mb-6" />
          <p className="text-muted text-lg mb-4">
            Designed for athletes participating in high-impact activities, the
            Z7 Neck Bracket is a particular neck support device. Your neck is
            exposed to fast, powerful movement whether you are sprinting down a
            football field, negotiating rough terrain on a motocross bike,
            delivering a hit in hockey, or entering the octagon for an MMA bout.
            The {"Z7's"} concept is straightforward yet strong: stop those
            intense jerks and jolts from becoming something more severe.
          </p>
          <p className="text-muted text-lg mb-4">
            Designed with accuracy and high-performance materials, the Z7 neck
            wraps and attaches smoothly with upper-body equipment. The aim is to
            limit dangerous motion—significantly that rapid whip-forward or
            backward that causes whiplash—not to restrict movement.
          </p>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <Image
            src={Headphone}
            alt="Woman with headphones"
            width={500}
            height={500}
            className="rounded-2xl"
          />
        </div>
      </div>
      <div>
        <p className="text-muted text-lg mb-4">
          What is remarkable is how it accomplishes all this without causing you
          to feel as though you are donning additional armor. Sleek, thin, and
          intended to fit naturally with shoulder pads and helmets, the Z7
        </p>
        <p className="text-muted text-lg">
          Many sportsmen call the Z7 a second skin after acclimating to it.
          {"That'"}s significant. Wearing it should feel comfortable; otherwise,
          it
          {"won't"} reach the field.
        </p>
      </div>
    </section>
  );
};

export default Blog;
