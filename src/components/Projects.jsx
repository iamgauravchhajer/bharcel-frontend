import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const LiveProjectButton = () => {
  return (
    <button className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors">
      Live Project
    </button>
  );
};

const projects = [
  {
    num: "01",
    client: "Client",
    name: "Nextlevel Studio",
    images: {
      col1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      col1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    }
  },
  {
    num: "02",
    client: "Personal",
    name: "Aura Brand Identity",
    images: {
      col1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      col1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    }
  },
  {
    num: "03",
    client: "Client",
    name: "Solaris Digital",
    images: {
      col1_1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      col1_2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    }
  }
];

const ProjectCard = ({ project, index, totalCards, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const topOffset = isMobile ? 96 + index * 20 : 128 + index * 28;

  return (
    <div className="h-[85vh] flex items-center justify-center sticky" style={{ top: `${topOffset}px` }}>
      <motion.div 
        style={{ scale }}
        className="w-full max-w-6xl flex flex-col rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#000000] p-4 sm:p-6 md:p-8"
      >
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 gap-6">
          <div className="flex items-center gap-6 sm:gap-10">
            <span className="font-heading italic font-normal text-[clamp(3rem,8vw,100px)] text-[#D7E2EA] leading-[0.9]">
              {project.num}
            </span>
            <div className="flex flex-col">
              <h3 className="font-heading italic font-normal text-[#D7E2EA] text-3xl sm:text-4xl md:text-5xl">{project.name}</h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        {/* Bottom Row - Images */}
        <div className="flex gap-4 sm:gap-6 flex-1 h-full">
          {/* Left Column (40%) */}
          <div className="flex flex-col gap-4 sm:gap-6 w-[40%]">
            <div className="w-full h-[clamp(130px,16vw,230px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
              <img loading="lazy" src={project.images.col1_1} alt="Project detail 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[clamp(160px,22vw,340px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
              <img loading="lazy" src={project.images.col1_2} alt="Project detail 2" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* Right Column (60%) */}
          <div className="w-[60%] h-full min-h-[300px] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
            <img loading="lazy" src={project.images.col2} alt="Project main" className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section className="bg-[#000000] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 py-24 sm:py-32 pb-32">
      <div className="flex flex-col items-center justify-center mb-16 sm:mb-24">
        <h2 className="hero-heading font-heading italic font-normal text-[clamp(3rem,12vw,160px)] leading-[1.1]">
          Project
        </h2>
        <p className="text-[#D7E2EA] text-lg sm:text-xl md:text-2xl font-light opacity-80 mt-4 text-center">
          Deployed hassle-free from our platform
        </p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-6xl mx-auto">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - 1 - i) * 0.03;
          return (
            <ProjectCard 
              key={project.num}
              project={project}
              index={i}
              totalCards={projects.length}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
