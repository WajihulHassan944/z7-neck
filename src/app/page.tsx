import React from "react";
import Hero from "../component/hero";
import HowItWorks from "../component/howItWork";
import StatsSection from "../component/stats";
import { TestimonialCarousel } from "../component/review";
import WhyWearQCollar from "../component/whyWear";
import { BrainProtectionSection } from "../component/brainProtection";
import { ProductSection } from "../component/product";
import Blog from "../component/blog";
import Activate from "../component/activate";
import { FAQ } from "../component/faq";
import { Showcase } from "../component/showcase";
import Video from "../component/video";
import Footer from "../component/footer";
const page = () => {
  return (
    <div>
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <Blog />
      </div>
      <div id="activate">
        <Activate />
      </div>
      <div id="design">
        <HowItWorks />
      </div>
      <div id="techbehind">
        <Showcase />
      </div>
      <div id="difference">
        <StatsSection />
      </div>
      <div id="whywear">
        <WhyWearQCollar />
      </div>
      <div id="video">
        <Video />
      </div>
      <div id="product">
        <ProductSection />
      </div>
      <div id="brainprotection">
        <BrainProtectionSection />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="review">
        <TestimonialCarousel />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default page;
