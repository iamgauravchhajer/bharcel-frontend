import React, { useEffect, Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import MarqueeSection from '../components/MarqueeSection';
import FooterCTA from '../components/FooterCTA';

const MockupFeatures = lazy(() => import('../components/MockupFeatures'));
const AboutBharcel = lazy(() => import('../components/AboutBharcel'));
const Pricing = lazy(() => import('../components/Pricing'));
const Services = lazy(() => import('../components/Services'));
const Projects = lazy(() => import('../components/Projects'));

export default function LandingPage() {
  // Ensure the page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#0C0C0C] overflow-x-clip text-[#D7E2EA]">
      {/* 
        The prompt specifies "then this all except the hero in this : Build a 3D Creator portfolio... 
        SECTION ORDER
        Hero
        MarqueeSection
        MockupFeatures (contains Why Us)
        AboutBharcel (contains About Bharcel + What Founders Say)
        Pricing
        Services
        Projects
        FooterCTA
      */}
      <Hero />
      <MarqueeSection />
      
      <Suspense fallback={<div className="h-20 w-full flex items-center justify-center bg-black"><span className="text-white/20">Loading...</span></div>}>
        <MockupFeatures />
        <section id="about">
          <AboutBharcel />
        </section>
        <Pricing />
        <Services />
        <Projects />
      </Suspense>
      
      <FooterCTA />
    </div>
  );
}
