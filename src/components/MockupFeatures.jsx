import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hls from 'hls.js';
import { Zap, Terminal, Rocket, Shield } from 'lucide-react';
import authService from '../services/authService';

const HlsVideo = ({ src, className, style }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls;

    const initVideo = () => {
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: false });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => { });
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(() => { });
        });
      }
    };

    initVideo();

    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  return <video ref={videoRef} className={className} style={style} loop muted playsInline />;
};

const SectionBadge = ({ children }) => (
  <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body inline-block mb-6">
    {children}
  </div>
);

const SectionHeading = ({ children }) => (
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] mb-4">
    {children}
  </h2>
);

const SectionSubtext = ({ children }) => (
  <p className="text-white/60 font-body font-light text-sm md:text-base max-w-2xl">
    {children}
  </p>
);

const LazyVideo = ({ src, className }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!video.src) video.src = src;
    video.play().catch(() => { });
  }, [src]);

  return <video ref={videoRef} className={className} preload="none" loop muted playsInline />;
};

export default function MockupFeatures() {
  const nav = useNavigate();
  return (
    <div className="bg-black text-white overflow-hidden relative z-10 w-full font-body">



      {/* 5. FEATURES CHESS */}
      <section className="py-24 relative z-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <SectionBadge>Capabilities</SectionBadge>
            <SectionHeading>Pro features. Zero complexity.</SectionHeading>
          </div>

          <div className="flex flex-col gap-24">
            {/* Row 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 flex flex-col items-start text-left">
                <h3 className="text-3xl md:text-4xl font-heading italic text-white tracking-tight leading-tight mb-4">
                  Everything you need. All in one place.
                </h3>
                <p className="text-white/70 font-body font-light text-base leading-relaxed mb-8">
                  Stop switching between tabs. We bring all your data, analytics, and tools into a single, unified interface that works for you.
                </p>
                <button onClick={() => window.location.href = authService.getGithubAuthUrl()} className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:scale-105">
                  Learn more
                </button>
              </div>
              <div className="flex-1 w-full flex justify-center items-center">
                <div className="liquid-glass rounded-[24px] overflow-hidden aspect-[1.1] sm:aspect-[4/3] w-full sm:w-[96%] md:w-[92%] relative flex flex-col items-center pt-8 sm:pt-12 group">
                  {/* Glass Border Overlay drawn on top of the video */}
                  <div 
                    className="absolute inset-0 rounded-[24px] pointer-events-none z-50" 
                    style={{
                      padding: '1.4px',
                      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 20%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 0.15) 80%, rgba(255, 255, 255, 0.45) 100%)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude'
                    }} 
                  />
                  {/* Background Video */}
                  <div className="absolute inset-0 z-0">
                    <HlsVideo
                      src="https://stream.mux.com/BuGGTsiXq1T00WUb8qfURrHkTCbhrkfFLSv4uAOZzdhw.m3u8"
                      className="w-full h-full object-cover scale-[1.4] translate-y-[10%] group-hover:scale-[1.35] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#0f0f13]/20 z-10 pointer-events-none" />
                  </div>

                  {/* Container Inner Text & Buttons */}
                  <div className="relative z-20 flex flex-col items-center text-center px-4 w-full">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading italic text-white tracking-tight leading-none mb-3">
                      Ship faster,<br />Deploy smarter.
                    </h2>
                    <p className="text-white/80 font-body font-light text-[11px] sm:text-[13px] max-w-[280px] sm:max-w-sm mb-3">
                      Connect your GitHub repo, configure your environment, and deploy to a global edge network — all in under 60 seconds.
                    </p>
                    <div className="flex items-center justify-center mb-6 font-body">
                      <button onClick={() => window.location.href = authService.getGithubAuthUrl()} className="bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-[5px] px-5 py-1.5 text-[9px] sm:text-[10px] font-medium transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                        Get Started
                      </button>
                    </div>
                  </div>

                  {/* HTML Dashboard Mockup */}
                  <div className="relative z-20 w-[90%] sm:w-[86%] bg-[#0f0f13]/60 backdrop-blur-3xl border border-white/20 border-b-0 rounded-t-xl flex flex-col overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.8)] flex-grow mt-auto translate-y-4 group-hover:translate-y-2 transition-transform duration-700 text-left font-body">
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3 text-purple-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <span className="text-white font-medium text-[9px]">bharcel</span>
                      </div>
                      <div className="flex items-center gap-3 w-1/2 justify-between">
                        <span className="text-white/90 font-medium text-[10px] hidden sm:block">Deployments</span>
                        <div className="hidden sm:flex items-center bg-black/40 rounded px-2 py-1 border border-white/10 w-24">
                          <span className="text-white/30 text-[7px]">Search repos...</span>
                        </div>
                      </div>
                    </div>
                    {/* Dashboard Body */}
                    <div className="flex flex-1 overflow-hidden p-2 gap-2 bg-white/[0.01]">
                      {/* Sidebar */}
                      <div className="w-[60px] sm:w-[90px] border-r border-white/10 pr-1 flex flex-col gap-2 hidden sm:flex">
                        <div>
                          <div className="text-white/40 text-[7px] uppercase mb-1.5 font-medium">Projects</div>
                          <div className="flex flex-col gap-0.5">
                            <div className="bg-[#a855f7] text-white text-[8px] px-1.5 py-1 rounded-[4px] font-medium shadow-[0_0_10px_rgba(168,85,247,0.3)]">All Deploys</div>
                            <div className="text-white/60 text-[8px] px-1.5 py-1 hover:text-white transition-colors cursor-pointer">Env Vars</div>
                            <div className="text-white/60 text-[8px] px-1.5 py-1 hover:text-white transition-colors cursor-pointer">Domains</div>
                          </div>
                        </div>
                        <div className="mt-1">
                          <div className="text-white/40 text-[7px] uppercase mb-1.5 font-medium">Settings</div>
                          <div className="flex flex-col gap-0.5">
                            <div className="text-white/60 text-[8px] px-1.5 py-1 hover:text-white transition-colors cursor-pointer">Usage</div>
                          </div>
                        </div>
                      </div>
                      {/* Main Area */}
                      <div className="flex-1 pl-1">
                        <div className="text-white text-[9px] sm:text-[10px] font-medium mb-2">Recent Deployments</div>
                        <div className="w-full">
                          <div className="flex text-white/40 text-[7px] uppercase border-b border-white/10 pb-1 mb-1 font-medium">
                            <div className="flex-[1.5]">Repository</div>
                            <div className="flex-1">Status</div>
                            <div className="flex-1 hidden md:block">Branch</div>
                            <div className="flex-1 hidden lg:block">Build</div>
                            <div className="flex-1 hidden sm:block text-right pr-2">Time</div>
                          </div>
                          {[
                            { repo: 'my-portfolio', status: 'Live', branch: 'main', build: 'npm run build', time: '32s', col: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' },
                            { repo: 'saas-landing', status: 'Building', branch: 'dev', build: 'vite build', time: '1m 04s', col: 'text-amber-400 bg-amber-400/10 border border-amber-400/20' },
                            { repo: 'api-backend', status: 'Live', branch: 'main', build: 'tsc && node', time: '28s', col: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' },
                          ].map((r, i) => (
                            <div key={i} className="flex text-white/80 text-[8px] py-1 border-b border-white/5 last:border-0 items-center">
                              <div className="flex-[1.5]">{r.repo}</div>
                              <div className="flex-1">
                                <span className={`px-1 py-0.5 rounded-[3px] ${r.col} text-[7px] inline-block`}>{r.status}</span>
                              </div>
                              <div className="flex-1 hidden md:block text-white/60">{r.branch}</div>
                              <div className="flex-1 hidden lg:block text-white/60 font-mono">{r.build}</div>
                              <div className="flex-1 hidden sm:block text-right pr-2 text-white/50">{r.time}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
              <div className="flex-1 flex flex-col items-start text-left">
                <h3 className="text-3xl md:text-4xl font-heading italic text-white tracking-tight leading-tight mb-4">
                  Bhavable, build And Ship
                </h3>
                <p className="text-white/70 font-body font-light text-base leading-relaxed mb-8">
                  Your project builds on its own. Our platform handles every branch, commit, and deployment—then ships it in real time. No manual devops. Ever.
                </p>
                <button onClick={() => window.location.href = authService.getGithubAuthUrl()} className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:scale-105">
                  See how it works
                </button>
              </div>
              <div className="flex-1 w-full">
                <div className="liquid-glass rounded-2xl overflow-hidden aspect-[4/3] p-2 relative flex items-center justify-center">
                  <LazyVideo
                    src="https://dfdx9u0psdezh.cloudfront.net/courses/lovableVideo.webm"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURES GRID WITH VIDEO BG */}
      <section className="relative w-full py-32 flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HlsVideo
            src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'saturate(0)' }}
          />
          <div className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-black to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <div className="mb-16 text-center">
            <SectionBadge>Why Us</SectionBadge>
            <SectionHeading>The difference is everything.</SectionHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Instant AI Fixes", desc: "Stop reading cryptic logs. Our AI automatically analyzes failures and pushes the exact code fix in seconds." },
              { icon: Terminal, title: "Deep Context", desc: "It doesn't just guess. Bharcel reads your entire codebase to provide highly accurate, context-aware debugging." },
              { icon: Rocket, title: "Zero-Config Deploys", desc: "Connect your repository and we handle the rest. From build to global edge network without the headache." },
              { icon: Shield, title: "Built to Scale", desc: "Enterprise-grade infrastructure. Start small and grow massive with built-in DDoS mitigation and auto-scaling." }
            ].map((feat, i) => (
              <div key={i} className="liquid-glass rounded-2xl p-6 flex flex-col items-start text-left">
                <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center mb-6">
                  <feat.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-medium text-white mb-3">{feat.title}</h4>
                <p className="text-white/60 font-light text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}
