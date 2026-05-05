import React from 'react';
import FadeIn from './FadeIn';

const services = [
  {
    num: "01",
    name: "Auth & Repos",
    desc: "GitHub OAuth login. Fetch all user repos. Select branch and subdirectory for deployment."
  },
  {
    num: "02",
    name: "Environment",
    desc: "Add, edit, delete env variables. Specify subdirectory and build configurations for your project."
  },
  {
    num: "03",
    name: "Live Logs",
    desc: "Real-time deployment log streaming via WebSockets. Colour-coded errors, warnings, info."
  },
  {
    num: "04",
    name: "AI Debugging",
    desc: "On failure: AI reads logs, explains the issue in plain English, suggests exact fixes."
  },
  {
    num: "05",
    name: "bhavable Ai website builder",
    desc: "Prompt to build. Our AI generates a production-ready website for you in seconds. Edit, customize, and ship instantly."
  },
  {
    num: "06",
    name: "Redeploy",
    desc: "Retrigger any past deployment with same config. Auto-redeploy on git push (webhook)."
  }
];

export default function Services() {
  return (
    <section className="bg-[#000000] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn delay={0} y={40} className="flex justify-center">
        <h2 className="font-heading italic font-normal text-white text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28 leading-[0.9]">
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col">
        {services.map((svc, i) => (
          <FadeIn 
            key={svc.num} 
            delay={i * 0.1} 
            duration={0.7} 
            y={20}
            className="flex flex-col sm:flex-row border-b border-white/10 py-8 sm:py-10 md:py-12 gap-6 sm:gap-10 md:gap-16 items-start"
          >
            <div className="font-heading italic font-normal text-[clamp(3rem,10vw,140px)] text-white leading-[0.9] shrink-0 w-[120px] sm:w-[180px] md:w-[220px]">
              {svc.num}
            </div>
            <div className="flex flex-col gap-2 sm:gap-4 mt-2 sm:mt-4">
              <h3 className="font-heading italic font-normal text-[clamp(1.5rem,2.2vw,2.1rem)] text-white">
                {svc.name}
              </h3>
              <p className="font-light leading-relaxed max-w-2xl text-lg sm:text-xl text-white/50">
                {svc.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
