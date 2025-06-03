import React from 'react'
import Hero from './component/hero'
import HowItWorks from './component/howItWork'
import StatsSection from './component/stats'
import { TestimonialCarousel } from './component/review'
import WhyWearQCollar from './component/whyWear'
import { BrainProtectionSection } from './component/brainProtection'
import { ProductSection } from './component/product'
import Blog from './component/blog'
import Activate from './component/activate'
import { FAQ } from './component/faq'
import { Showcase } from './component/showcase'

const page = () => {
  return (
    <div>
      <Hero/>
      <Blog/>
      <Activate/>
      <Showcase/>
      <HowItWorks/>
      <StatsSection/>
      <TestimonialCarousel/>
      <WhyWearQCollar/>
      <BrainProtectionSection/>
      <ProductSection/>
      
      <FAQ/>
     
    </div>
  )
}

export default page
