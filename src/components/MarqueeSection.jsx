import React, { useRef, useState, useEffect } from 'react';

// Cloudinary quality transform for faster streaming
const transform = (url) => url.replace('/video/upload/', '/video/upload/q_auto:low,vc_auto/');

const videos1 = [
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750329/ezgif-75c9cf4225a00f08_mzxmvm.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750328/ezgif-78b13395f59c8feb_qaqymy.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750327/ezgif-73cb2ff4d4a19b41_f7yhqi.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750327/ezgif-76ff989ef09be5c6_fxzhsy.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750326/ezgif-7764b46f24415658_txsz0e.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750325/ezgif-7248501fce29dee9_xwq4vn.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750325/ezgif-7e819089fde742de_ilmsej.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750325/ezgif-7c0170653cd84e17_mkg6fh.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750325/ezgif-7c30b9c355c54a98_insf1j.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750325/ezgif-74b0115624bb6a24_ph5fja.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750324/ezgif-7c982f4abb28a912_apke8f.webm",
].map(transform);

const videos2 = [
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750323/ezgif-7f4b1e57dc52390c_b9xkox.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750323/ezgif-7e58495bb8c9dc7c_jbvdfl.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750323/ezgif-7ee374e4e82448ca_jvbwmd.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750323/ezgif-778ba361d875bc4b_v7d9hc.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750321/ezgif-75d946a18ec112fc_qsyemq.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750320/ezgif-7b70d17fa473a4da_gno8qb.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750320/ezgif-754a44919448e274_ctf0kn.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750320/ezgif-72b0d59e811b5e5e_hxelr3.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750320/ezgif-78a88d317f0033a3_pzsile.webm",
  "https://res.cloudinary.com/dke3edflq/video/upload/v1777750320/ezgif-7c4ea59502c6899f_obqewa.webm",
].map(transform);

function MarqueeVideo({ src, priority }) {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onCanPlay = () => setLoaded(true);
    video.addEventListener('canplay', onCanPlay);
    return () => video.removeEventListener('canplay', onCanPlay);
  }, []);

  return (
    <div className="w-[420px] h-[270px] rounded-2xl shrink-0 overflow-hidden relative bg-[#1a1a1a]">
      {!loaded && <div className="absolute inset-0 bg-[#222] animate-pulse z-0" />}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload={priority ? "auto" : "metadata"}
        className="w-full h-full object-cover"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
      />
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    let rafId;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const sectionTop = sectionRef.current.offsetTop;
        const parallax = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

        if (row1Ref.current) row1Ref.current.style.transform = `translateX(${parallax - 200}px)`;
        if (row2Ref.current) row2Ref.current.style.transform = `translateX(${-(parallax - 200)}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // 2 copies for enough width to scroll without gaps
  const row1 = [...videos1, ...videos1];
  const row2 = [...videos2, ...videos2];

  return (
    <section
      ref={sectionRef}
      className="bg-[#000000] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden flex flex-col gap-3"
    >
      {/* Row 1 — moves right on scroll */}
      <div className="overflow-hidden w-full">
        <div ref={row1Ref} className="flex gap-3 w-max" style={{ willChange: 'transform' }}>
          {row1.map((src, i) => (
            <MarqueeVideo key={`r1-${i}`} src={src} priority={i < videos1.length} />
          ))}
        </div>
      </div>

      {/* Row 2 — moves left on scroll */}
      <div className="overflow-hidden w-full">
        <div ref={row2Ref} className="flex gap-3 w-max" style={{ willChange: 'transform' }}>
          {row2.map((src, i) => (
            <MarqueeVideo key={`r2-${i}`} src={src} priority={i < videos2.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
