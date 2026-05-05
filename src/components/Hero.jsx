import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronDown, BarChart3, BookOpen, Users, Rocket, GitBranch, GitCommitVertical, Settings, Box, Terminal } from 'lucide-react';
import { API_BASE } from '../lib/api';

const LazyVideo = ({ src, className }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = src;
          }
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return <video ref={videoRef} className={className} preload="none" loop muted playsInline />;
};

export default function Hero() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('analyse');

  useEffect(() => {
    const tabs = ['analyse', 'train', 'testing', 'deploy'];
    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = tabs.indexOf(current);
        return tabs[(currentIndex + 1) % tabs.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white font-['Inter'] w-full">
      {/* NAVIGATION */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 fill-black" />
          <span className="text-lg font-semibold text-black">Bharcel</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => window.location.href = '/docs'}
            className="flex items-center gap-1 text-sm text-gray-700 hover:text-black"
          >
            Read Docs <ChevronDown className="w-4 h-4" />
          </button>
          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm text-gray-700 hover:text-black"
          >
            Pricing
          </button>
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm text-gray-700 hover:text-black"
          >
            About Us
          </button>
          <a 
            href="https://discord.gg/yuMWZz4QG" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-gray-700 hover:text-black"
          >
            Community
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => window.location.href = `${API_BASE}/auth/github/auth`}
            className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Sign-up with Github
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="px-6 pt-24 pb-16 max-w-7xl mx-auto text-center">
        {/* Reviews Badge */}
        <div className="inline-flex items-center gap-2 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
            <Star className="w-4 h-4 fill-black" />
          </div>
          <span className="text-sm font-medium text-black">The Only Platform You Need To Scale Your Startup.</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-[clamp(2.5rem,6vw,80px)] md:text-[clamp(3.5rem,7vw,90px)] font-heading italic font-normal leading-[0.9] tracking-tight mb-5 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <span className="block text-black">Build Faster. Deploy Faster.</span>
          <span className="block bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 bg-clip-text text-transparent text-[clamp(2rem,5vw,70px)] md:text-[clamp(3rem,6vw,80px)] mt-2">AI Powers You Up.</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Deploy your web apps in seconds with one click. When things break, our AI explains why and how to fix it.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => window.location.href = `${API_BASE}/auth/github/auth`}
          className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors mb-12 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          Begin Free Trial
        </button>

        {/* Tab Bar */}
        <div className="flex justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gray-100 rounded-lg p-1">
            {/* Mobile Tabs */}
            <div className="grid grid-cols-2 md:hidden gap-1">
              <button onClick={() => setActiveTab('analyse')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'analyse' ? 'bg-white text-black shadow-sm' : 'text-gray-600'}`}>
                <BarChart3 className="w-4 h-4" /> Connect Github
              </button>
              <button onClick={() => setActiveTab('train')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'train' ? 'bg-white text-black shadow-sm' : 'text-gray-600'}`}>
                <BookOpen className="w-4 h-4" /> Choose Project
              </button>
              <button onClick={() => setActiveTab('testing')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'testing' ? 'bg-white text-black shadow-sm' : 'text-gray-600'}`}>
                <Users className="w-4 h-4" /> AI Debug
              </button>
              <button onClick={() => setActiveTab('deploy')} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'deploy' ? 'bg-white text-black shadow-sm' : 'text-gray-600'}`}>
                <Rocket className="w-4 h-4" /> Deploy
              </button>
            </div>
            {/* Desktop Tabs */}
            <div className="hidden md:flex items-center">
              <button onClick={() => setActiveTab('analyse')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'analyse' ? 'bg-white text-black shadow-sm' : 'text-gray-600'}`}>
                <BarChart3 className="w-4 h-4" /> Connect Github
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button onClick={() => setActiveTab('train')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'train' ? 'bg-white text-black shadow-sm' : 'text-gray-600'}`}>
                <BookOpen className="w-4 h-4" /> Choose Project
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button onClick={() => setActiveTab('testing')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'testing' ? 'bg-white text-black shadow-sm' : 'text-gray-600'}`}>
                <Users className="w-4 h-4" /> AI Debug
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <button onClick={() => setActiveTab('deploy')} className={`flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'deploy' ? 'bg-white text-black shadow-sm' : 'text-gray-600'}`}>
                <Rocket className="w-4 h-4" /> Deploy
              </button>
            </div>
          </div>
        </div>

        {/* Video + Overlay Section */}
        <div className="mt-8 relative rounded-3xl overflow-hidden h-[400px] md:h-[500px] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <LazyVideo
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4"
            className="w-full h-full object-cover"
          />

          {/* Overlays */}
          {activeTab === 'analyse' && (
            <div className="absolute inset-0 bg-black/20 animate-fade-in-overlay flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-xl w-[300px] h-[340px] animate-slide-up-overlay absolute top-1/2 left-1/2 flex flex-col">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-black fill-current" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-black text-sm">Connect Git Provider</h3>
                </div>
                <div className="space-y-2.5 mt-4">
                  {[
                    { name: 'bharcel-frontend', active: true, time: '2m ago' },
                    { name: 'bharcel-api', active: false, time: '1h ago' },
                    { name: 'auth-service', active: false, time: '5h ago' }
                  ].map((repo, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-2.5 rounded-lg border ${repo.active ? 'bg-gray-100 border-gray-200' : 'bg-gray-50 border-gray-100'} transition-all hover:bg-gray-100 cursor-pointer`}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
                          <GitCommitVertical className="w-2.5 h-2.5 text-black" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-800 leading-tight">{repo.name}</span>
                          <span className="text-[9px] text-gray-500 leading-tight mt-0.5">{repo.time}</span>
                        </div>
                      </div>
                      {repo.active ? <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)] animate-pulse shrink-0" /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />}
                    </div>
                  ))}
                </div>
                <button className="mt-auto w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  Import Repository
                </button>
              </div>
            </div>
          )}
          {activeTab === 'train' && (
            <div className="absolute inset-0 bg-black/20 animate-fade-in-overlay flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-xl w-[300px] h-[370px] animate-slide-up-overlay absolute top-1/2 left-1/2 flex flex-col">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-black fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-black text-sm">Project Config</h3>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1"><GitBranch className="w-3 h-3" /> Branch</label>
                    <div className="bg-gray-50 border border-gray-200 p-2 rounded-lg flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="px-1.5 py-0.5 bg-black text-white rounded text-[10px] font-mono">main</div>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1"><Box className="w-3 h-3" /> Environment Variables</label>
                    <div className="bg-gray-50 border border-gray-200 p-2 rounded-lg shadow-sm space-y-1.5">
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="text-gray-400">KEY</span>
                        <span className="text-gray-300">=</span>
                        <span className="text-gray-600">DATABASE_URL</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="text-gray-400">KEY</span>
                        <span className="text-gray-300">=</span>
                        <span className="text-gray-600">API_SECRET</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1"><Terminal className="w-3 h-3" /> Build</label>
                    <div className="bg-gray-50 border border-gray-200 p-2 rounded-lg shadow-sm">
                      <code className="text-xs text-gray-700 font-mono">npm run build</code>
                    </div>
                  </div>
                </div>

                <button className="mt-auto w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  Save Configuration
                </button>
              </div>
            </div>
          )}
          {activeTab === 'testing' && (
            <div className="absolute inset-0 bg-black/20 animate-fade-in-overlay flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-xl w-[300px] h-[340px] animate-slide-up-overlay absolute top-1/2 left-1/2 flex flex-col">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-black fill-none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-black text-sm">AI Debug</h3>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                      <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider">Build Error</span>
                    </div>
                    <p className="text-[11px] text-gray-800 font-mono break-all leading-relaxed bg-white border border-gray-100 p-1.5 rounded">Error: lucide-react not found</p>
                  </div>

                  <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-current" stroke="currentColor" strokeWidth="2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-black tracking-wide">AI Solution</span>
                      <p className="text-xs text-gray-600 leading-snug">
                        Run <code className="bg-white text-black px-1.5 py-0.5 rounded border border-gray-200 text-[10px] font-mono">npm i lucide-react</code>
                      </p>
                    </div>
                  </div>
                </div>

                <button className="mt-auto w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  Apply Fix
                </button>
              </div>
            </div>
          )}
          {activeTab === 'deploy' && (
            <div className="absolute inset-0 bg-black/20 animate-fade-in-overlay flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-xl w-[300px] h-[340px] animate-slide-up-overlay absolute top-1/2 left-1/2 flex flex-col">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Rocket className="w-4 h-4 text-black" />
                  </div>
                  <h3 className="font-semibold text-black text-sm">Deploying</h3>
                </div>

                <div className="space-y-2.5 mt-4">
                  {['Build Image', 'Run CI/CD', 'Provision Nodes', 'Start Containers'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-lg border border-gray-100 shadow-sm transition-all">
                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_4px_rgba(34,197,94,0.5)]"></div>
                      </div>
                      <span className="font-medium text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-auto w-full bg-black text-white py-2.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  View Deployment
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Company Logos & Callout */}
        {/* Don't Have A Project Callout (Replacing Logos) */}
        <div className="mt-32 mb-0 flex flex-col items-center opacity-0 animate-fade-in-up w-full px-5" style={{ animationDelay: '0.8s' }}>
          <h2 className="font-heading italic font-normal text-[clamp(2rem,6vw,80px)] text-[#0C0C0C] mb-6 text-center leading-[0.9] tracking-tight">
            Don't Have A Project?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl text-lg sm:text-xl font-light mb-10">
            Build directly from our curated list of pre-built, production-ready templates.
          </p>
          <button
            className="rounded-full text-white font-medium px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-sm sm:text-base md:text-lg hover:opacity-90 transition-opacity"
            style={{
              background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
              outline: '2px solid white',
              outlineOffset: '-3px'
            }}
          >
            Explore Templates ↓
          </button>
        </div>
      </main>
    </div>
  );
}
