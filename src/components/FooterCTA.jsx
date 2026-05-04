import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageSquare, Send } from 'lucide-react';
import Hls from 'hls.js';

function HlsVideo({ src, className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls;

    // Use native HLS if available (Safari/iOS) as it's always faster
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.play().catch(() => {});
    } 
    // Fallback to Hls.js for Chrome/Firefox/etc.
    else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        maxBufferLength: 30,
        startLevel: 0, // Force lowest quality segment first for INSTANT playback
        autoStartLoad: true
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      loop
      muted
      playsInline
      autoPlay
      preload="auto"
      poster={`https://image.mux.com/${src.split('/')[3].split('.')[0]}/thumbnail.jpg?width=1200`}
    />
  );
}

export default function FooterCTA() {
  const [showContact, setShowContact] = useState(false);

  return (
    <section className="relative w-full pt-32 flex flex-col items-center justify-center bg-black overflow-hidden z-20">
      <div className="absolute inset-0 z-0">
        <HlsVideo 
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-black to-transparent z-20" />
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
      </div>
      
      <div className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center mt-10">
        <h2 className="text-[clamp(2.5rem,10vw,4rem)] sm:text-5xl md:text-7xl lg:text-8xl font-heading italic text-white leading-[0.85] mb-8 max-w-4xl">
          Stop building.<br/>Start shipping.
        </h2>
        <p className="text-white/60 font-body font-light text-base md:text-lg max-w-2xl mb-12">
          Experience the future of web infrastructure. Join developers using bharcel to deploy production-ready sites with AI debugging and industrial-grade reliability.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-24">
          <button 
            onClick={() => setShowContact(true)}
            className="liquid-glass-strong rounded-full px-8 py-4 flex items-center gap-2 text-sm font-bold transition-all hover:scale-105 text-white uppercase tracking-widest"
          >
            Let's Talk
          </button>
          <button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} 
            className="bg-white text-black rounded-full px-8 py-4 text-sm font-bold transition-all hover:scale-105 uppercase tracking-widest"
          >
            View Pricing
          </button>
        </div>

        <div className="w-full mt-32 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
          <div className="text-white/40 text-xs font-light">
            &copy; 2026 bharcel. All rights reserved.
          </div>
          <div className="flex gap-6 text-white/40 text-xs font-light">
            <a href="https://github.com/Keshavcodes3/Shipify" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
            <button onClick={() => setShowContact(true)} className="hover:text-white transition-colors">Contact</button>
            <button 
              onClick={() => window.location.href = '/docs'}
              className="hover:text-white transition-colors"
            >
              Docs
            </button>
          </div>
        </div>
      </div>

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
