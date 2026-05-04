import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, MessageSquare, Mail, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import authService from '../services/authService';

const SectionBadge = ({ children }) => (
  <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-6">
    {children}
  </div>
);

const SectionHeading = ({ children }) => (
  <h2 className="text-[clamp(2.25rem,8vw,4rem)] font-heading italic text-white tracking-tighter mb-4 text-center">
    {children}
  </h2>
);

export default function Pricing() {
  const nav = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const plans = [
    {
      name: "Hobby",
      price: "Free",
      desc: "Perfect for students and indie hackers starting out.",
      features: [
        "100 Credits / month",
        "1 Active Project",
        "Basic Build & Deploy",
        "Standard Edge Network",
        "Automatic CI/CD"
      ],
      button: "Start for free",
      isPopular: false
    },
    {
      name: "Startup",
      price: "$29",
      period: "/month",
      desc: "For small teams shipping features fast and reliably.",
      features: [
        "1,000 Credits / month",
        "Unlimited Projects",
        "Instant AI Bug Fixes",
        "Priority Build Queue",
        "Team Collaboration Tools"
      ],
      button: "Get Started",
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Dedicated infrastructure for large-scale applications.",
      features: [
        "Unlimited Credits",
        "Custom Infrastructure",
        "Advanced DDoS Mitigation",
        "99.99% Uptime SLA",
        "Dedicated Support"
      ],
      button: "Contact Sales",
      isPopular: false
    }
  ];

  return (
    <section id="pricing" className="relative w-full pt-12 pb-24 sm:pt-16 sm:pb-32 flex items-center justify-center bg-black overflow-hidden font-body">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="mb-16 text-center flex flex-col items-center">
          <SectionBadge>Pricing</SectionBadge>
          <SectionHeading>Simple, transparent pricing.</SectionHeading>
          <p className="text-white/60 font-light text-base max-w-xl text-center mt-4">
            Start for free and scale as you grow. No hidden fees, just seamless deployments and AI-powered debugging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mt-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative flex flex-col transform transition-transform hover:-translate-y-2 duration-500"
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#a855f7] text-white text-[10px] uppercase tracking-wider font-bold px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] z-20">
                  Most Popular
                </div>
              )}

              <div className={`relative flex flex-col flex-grow p-8 sm:p-10 rounded-[32px] ${plan.isPopular ? 'liquid-glass-strong border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.1)]' : 'liquid-glass'}`}>
                <div className="mb-8">
                  <h3 className="text-white/80 font-medium text-lg mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-heading italic text-white tracking-tight">{plan.price}</span>
                    {plan.period && <span className="text-white/50 text-sm font-light">{plan.period}</span>}
                  </div>
                  <p className="text-white/50 text-sm font-light mt-4 leading-relaxed">
                    {plan.desc}
                  </p>
                </div>

                <div className="h-px w-full bg-white/10 mb-8" />

                <ul className="flex flex-col gap-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                        <Check className="w-3.5 h-3.5 text-[#a855f7]" />
                      </div>
                      <span className="text-white/80 text-sm font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => {
                    if (plan.button === "Contact Sales") {
                      setShowContact(true);
                    } else {
                      localStorage.setItem('login_intent', 'upgrade');
                      window.location.href = authService.getGithubAuthUrl();
                    }
                  }} 
                  className={`w-full py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 mt-auto ${plan.isPopular ? 'bg-[#a855f7] hover:bg-[#9333ea] text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}
                >
                  {plan.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Sales Popup */}
      <AnimatePresence>
        {showContact && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContact(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0C0C0C] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
            >
              <div className="p-8 md:p-12">
                <button 
                  onClick={() => setShowContact(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-white/40 hover:text-white" />
                </button>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">Get in touch</h3>
                    <p className="text-white/40 text-sm">We're here to help you scale.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all">
                    <div className="flex items-center gap-4 mb-2">
                      <Mail className="w-5 h-5 text-white/40" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white/40">Direct Email</span>
                    </div>
                    <a href="mailto:support@gmail.com" className="text-xl font-medium text-white hover:text-purple-400 transition-colors">
                      support@gmail.com
                    </a>
                  </div>

                  <p className="text-white/40 text-sm leading-relaxed px-2">
                    Have questions or need custom infrastructure? We're here to help you scale without the headache. Drop us a line and our engineers will get back to you within 24 hours.
                  </p>

                  <button 
                    onClick={() => window.location.href = 'mailto:support@gmail.com'}
                    className="w-full py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
