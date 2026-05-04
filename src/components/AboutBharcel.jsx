import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

const AnimatedText = ({ text }) => {
  const { scrollYProgress } = useScroll({
    offset: ['start 0.8', 'end 0.2']
  });

  const words = text.split(" ");

  return (
    <p className="text-[#D7E2EA] text-center leading-relaxed max-w-[800px] text-lg sm:text-xl font-light">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        return (
          <span key={i} className="relative inline-block mr-1.5">
            <span className="invisible">{word}</span>
            <motion.span style={{ opacity }} className="absolute left-0 top-0">
              {word}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};

const SectionBadge = ({ children }) => (
  <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-6">
    {children}
  </div>
);

const SectionHeading = ({ children }) => (
  <h2 className="text-3xl md:text-5xl font-heading italic text-white tracking-tight mb-4 text-center">
    {children}
  </h2>
);

export default function AboutBharcel() {
  return (
    <>
      {/* ABOUT BHARCEL SECTION */}
      <section id="about" className="bg-[#000000] min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
        
        {/* Decorative Images */}
        <FadeIn delay={0.1} duration={0.9} x={-80} y={0} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] hidden sm:block">
          <img loading="lazy" src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="Moon" className="w-full object-contain" />
        </FadeIn>
        
        <FadeIn delay={0.25} duration={0.9} x={-80} y={0} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] hidden sm:block">
          <img loading="lazy" src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="3D Object" className="w-full object-contain" />
        </FadeIn>

        <FadeIn delay={0.15} duration={0.9} x={80} y={0} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] hidden sm:block">
          <img loading="lazy" src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="Lego" className="w-full object-contain" />
        </FadeIn>

        <FadeIn delay={0.3} duration={0.9} x={80} y={0} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] hidden sm:block">
          <img loading="lazy" src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="3D Group" className="w-full object-contain" />
        </FadeIn>

        <FadeIn delay={0} y={40} className="text-center z-10 flex flex-col items-center">
          <h2 className="hero-heading font-heading italic font-normal leading-[0.9] tracking-tight text-[clamp(2.5rem,8vw,100px)]">
            About Bharcel
          </h2>
        </FadeIn>

        <div className="z-10 mt-10 sm:mt-14 md:mt-16 flex flex-col items-center">
          <AnimatedText text="Deploying web apps is too complex for indie developers, students, and small teams. Existing platforms are powerful but opaque — when deployments fail, developers are left debugging raw logs alone. There's no AI layer that explains why something failed or what to do next. Bharcel fills this gap." />
        </div>

        <div className="z-10 mt-16 sm:mt-20 md:mt-24">
          <ContactButton />
        </div>

      </section>

      {/* WHAT FOUNDERS SAY SECTION */}
      <section className="py-24 relative z-20 bg-black font-body">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <SectionBadge>What Founders Say</SectionBadge>
            <SectionHeading>This started with our own frustration.</SectionHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "AI never understood my bugs. Prompts were messy and I wasted tokens explaining. Bharcel fixes this by giving AI the exact context instantly.",
                name: "Gaurav", role: "Co-founder, Bharcel"
              },
              {
                quote: "Debugging wasn't the problem—the process was. Switching tabs and writing prompts broke my flow. We built Bharcel to make resolving errors a single click.",
                name: "Devansh", role: "Co-founder, Bharcel"
              },
              {
                quote: "My downloads folder was full of screenshots, and my prompts were never good enough. Bharcel eliminates all that manual work so you just deploy.",
                name: "Keshav", role: "Techlead, Bharcel"
              }
            ].map((t, i) => (
              <div key={i} className="liquid-glass rounded-2xl p-8 flex flex-col text-left">
                <p className="text-white/80 font-body font-light text-sm italic leading-relaxed mb-8 flex-grow">
                  "{t.quote}"
                </p>
                <div>
                  <div className="text-white font-body font-medium text-sm">{t.name}</div>
                  <div className="text-white/50 font-body font-light text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
