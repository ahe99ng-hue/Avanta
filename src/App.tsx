/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Paintbrush, 
  MessageSquare, 
  Cpu, 
  ArrowUpRight, 
  Check, 
  Monitor, 
  LayoutGrid, 
  Award, 
  ShieldCheck, 
  Play, 
  ArrowDown, 
  Activity, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2,
  ExternalLink,
  Smartphone,
  CheckSquare,
  Compass,
  Zap,
  Star,
  Users
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import terraSkincareImg from './assets/images/terra_skincare_product_1780248943433.png';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------
// TYPES & SCHEMAS
// -------------------------------------------------------------
interface CaseStudy {
  title: string;
  category: string;
  tagline: string;
  image: string;
  logoText: string;
  isReal: boolean;
  link: string;
  stats: string;
}

// -------------------------------------------------------------
// COMPONENT: App
// -------------------------------------------------------------
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('201553111940'); // Customizable

  // 1. Detect scroll position to morph navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Primary CTA URL generator
  const getWhatsAppURL = (message = "Hi Avanta, I'm interested in looking professional online.") => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  // Case Studies list defined for Midnight Luxe Preset
  const caseStudies: CaseStudy[] = [
    {
      title: "Jimmy's Coffee",
      category: "Artisanal Specialty Café",
      tagline: "Bridging architectural design with authentic roasting to build Alexandria's premier weekend spot.",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
      logoText: "JIMMY'S",
      isReal: true,
      link: "https://jimmycoffee.netlify.app/",
      stats: "+240% Engagement · First Visual Kit"
    },
    {
      title: "Volt Gym",
      category: "Hyper-Luxury Fitness Club",
      tagline: "Bold typography meets raw carbon steel graphics to attract members ready to invest in performance.",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800",
      logoText: "VOLT.",
      isReal: false,
      link: "#",
      stats: "Elite Identity Concept"
    },
    {
      title: "Terra Skincare",
      category: "Organic Botanical Aesthetics",
      tagline: "Earthy, minimal color spaces and high-trust editorial layouts designed to guide clients directly to booking.",
      image: terraSkincareImg,
      logoText: "TERRA",
      isReal: false,
      link: "#",
      stats: "Creative Concept"
    },
  ];

  return (
    <div className="relative min-h-screen selection:bg-champagne selection:text-obsidian overflow-hidden">
      {/* 0. Noise overlay filter at ~0.05 opacity to eliminate flat gradients */}
      <div className="noise-overlay" />

      {/* Floating Sparkle / Luxury Glow effects */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-champagne/5 to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-champagne/5 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* A. NAVBAR — "The Floating Island" */}
      <Navbar scrolled={scrolled} getWhatsAppURL={getWhatsAppURL} />

      {/* B. HERO SECTION — "The Opening Shot" */}
      <HeroSection getWhatsAppURL={getWhatsAppURL} />

      {/* C. INTERACTIVE COMPONENT DETAILS — "The Diagnostic Dashboard" / "The Artifact Grid" */}
      <section id="services" className="relative py-24 md:py-32 px-4 md:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs text-champagne uppercase tracking-[0.25em] block mb-4">
              [ Bespoke Solutions ]
            </span>
            <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-ivory font-semibold mb-6">
              Three pillars designed to make your local business <span className="font-serif italic text-champagne font-medium">dominate</span>.
            </h2>
            <p className="text-slate-custom/80 font-sans text-sm md:text-base leading-relaxed">
              We eliminate typical freelance noise. Our deliverables are engineered software artifacts, calibrated visually to build instant prestige for local commerce.
            </p>
          </div>

          {/* Interactive cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1: Diagnostic Shuffler */}
            <CardShuffler />

            {/* Card 2: Telemetry Typewriter */}
            <CardTelemetry />

            {/* Card 3: Cursor Protocol Scheduler */}
            <CardScheduler />
          </div>
        </div>
      </section>

      {/* D. PHILOSOPHY — "The Manifesto" */}
      <PhilosophySection />

      {/* E. PROTOCOL — "Sticky Stacking Archive" */}
      <ProtocolSection />

      {/* F. CASE STUDIES & RESULTS */}
      <CaseStudiesSection caseStudies={caseStudies} getWhatsAppURL={getWhatsAppURL} />

      {/* G. INVESTMENT / PRICING */}
      <PricingGrid getWhatsAppURL={getWhatsAppURL} />

      {/* H. FOOTER */}
      <Footer getWhatsAppURL={getWhatsAppURL} />
    </div>
  );
}

// -------------------------------------------------------------
// COMPONENT-A: NAVBAR
// -------------------------------------------------------------
function Navbar({ scrolled, getWhatsAppURL }: { scrolled: boolean; getWhatsAppURL: (msg?: string) => string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-6 left-0 w-full z-50 px-4 transition-all duration-300">
      <div 
        className={`mx-auto max-w-5xl rounded-full transition-all duration-500 border ${
          scrolled 
            ? 'bg-[#16161D]/90 backdrop-blur-xl border-[#C9A84C]/25 py-3.5 px-8 shadow-[0_12px_40px_rgba(0,0,0,0.8)]' 
            : 'bg-[#16161D]/60 backdrop-blur-xl border-[#C9A84C]/20 py-4 px-8'
        } flex items-center justify-between`}
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 font-sans tracking-tight group">
          <div className="w-2 h-2 bg-[#C9A84C] rounded-full group-hover:scale-125 transition-transform" />
          <span className="text-base md:text-lg font-bold tracking-[0.2em] text-[#FAF8F5] uppercase">AVANTA</span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.2em] uppercase text-[#FAF8F5]/60">
          <a href="#services" className="hover:text-[#C9A84C] transition-colors duration-305 link-lift">Services</a>
          <a href="#protocol" className="hover:text-[#C9A84C] transition-colors duration-305 link-lift">How It Works</a>
          <a href="#case-studies" className="hover:text-[#C9A84C] transition-colors duration-305 link-lift">Case Studies</a>
          <a href="#investment" className="hover:text-[#C9A84C] transition-colors duration-305 link-lift">Investment</a>
        </nav>

        {/* Dynamic Nav CTA */}
        <div className="flex items-center gap-4">
          <a 
            href={getWhatsAppURL("Hi Avanta, I saw the website and I'm interested in working with you.")}
            target="_blank" 
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#C9A84C] text-[#0D0D12] text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full hover:scale-105 transition-transform"
          >
            <span>Start on WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Hamburger Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ivory hover:text-champagne focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-current transform transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 w-full bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`h-0.5 w-full bg-current transform transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-4 right-4 bg-[#16161D]/95 backdrop-blur-2xl border border-[#C9A84C]/20 rounded-3xl p-6 shadow-2xl flex flex-col gap-6 md:hidden z-40"
          >
            <nav className="flex flex-col gap-4 text-sm font-mono tracking-wider uppercase text-center py-4">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#C9A84C] transition-colors border-b border-white/5">Services</a>
              <a href="#protocol" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#C9A84C] transition-colors border-b border-white/5">How It Works</a>
              <a href="#case-studies" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#C9A84C] transition-colors border-b border-white/5">Case Studies</a>
              <a href="#investment" onClick={() => setMobileMenuOpen(false)} className="py-2 hover:text-[#C9A84C] transition-colors border-b border-white/5">Investment</a>
            </nav>
            <a 
              href={getWhatsAppURL("Hi Avanta, I saw the mobile site and want to talk details.")}
              target="_blank" 
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0D0D12] text-xs font-bold uppercase tracking-wider py-3.5 rounded-full transition-all duration-300 hover:scale-105"
            >
              <span>SEND A MESSAGE</span>
              <MessageSquare className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// -------------------------------------------------------------
// COMPONENT-B: HERO SECTION — "The Opening Shot"
// -------------------------------------------------------------
function HeroSection({ getWhatsAppURL }: { getWhatsAppURL: (msg?: string) => string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant Entrance Animation using GSAP
    const elements = gsap.utils.toArray('.hero-fade-up');
    gsap.fromTo(elements, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.15 }
    );
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center py-28 px-4 z-20"
    >
      {/* Dynamic line matrix background */}
      <div className="absolute inset-0 bg-[#0D0D12] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.3 } }}
        className="w-full max-w-5xl bg-gradient-to-br from-[#1A1A24] via-[#13131A] to-[#0D0D12] border border-[#FAF8F5]/5 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden shadow-2xl flex flex-col md:flex-row gap-12 items-center group/hero-bento transition-all duration-500"
      >
        {/* Dynamic ambient gold glowing orb */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 0.9, 1.15, 1],
            x: [0, 50, -40, 25, 0],
            y: [0, -30, 45, -15, 0],
            opacity: [0.03, 0.08, 0.04, 0.09, 0.03]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-12 -left-12 w-[400px] h-[400px] rounded-full bg-[#C9A84C]/25 blur-[100px] pointer-events-none select-none z-0"
        />

        {/* Aesthetic geometric watermark from Bento design with slow continuous rotation */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none select-none origin-center"
        >
          <svg width="240" height="240" viewBox="0 0 100 100" className="fill-[#C9A84C]">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" />
          </svg>
        </motion.div>

        <div className="relative z-10 flex-1 flex flex-col items-start text-left select-none">
          {/* Subtle Accent Intro Badge */}
          <div className="hero-fade-up inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs text-[#FAF8F5]/80 uppercase tracking-widest font-normal">
              Protocol v2.0 // Brand Studio
            </span>
          </div>

          {/* Headline following "[Aspirational noun] meets / [Precision word]." pattern */}
          <h1 className="hero-fade-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-semibold text-[#FAF8F5] tracking-tight leading-[0.95] text-left">
            Local business <br />
            <span className="font-serif italic text-[#C9A84C] block mt-1">Meets Legend.</span>
          </h1>

          {/* Value Proposition Description */}
          <p className="hero-fade-up font-sans text-[#FAF8F5]/60 text-sm md:text-base font-light leading-relaxed max-w-lg mt-6">
            We build complete brand systems for small businesses that want to look like world-class leaders. From $250. Delivered in 10 days.
          </p>

          {/* CTA Actions */}
          <div className="hero-fade-up flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8 w-full sm:w-auto">
            <a 
              href={getWhatsAppURL("Hi Avanta! I saw the home page and I want a full transformation for my business.")}
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0D0D12] text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full hover:scale-105 transition-transform"
            >
              <span>SECURE ARCHETYPE SYSTEM</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a 
              href="#services" 
              className="inline-flex items-center justify-center gap-2 border border-[#FAF8F5]/10 hover:border-[#C9A84C]/30 text-[#FAF8F5]/70 text-xs font-mono tracking-widest uppercase px-5 py-3.5 rounded-full transition-all duration-305 hover:bg-white/5 active:scale-95 group"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Aesthetic Side Card Graphic / Right side of Bento for visual balance */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.8 },
            x: { duration: 0.8 },
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          whileHover={{ 
            scale: 1.025,
            borderColor: "rgba(201, 168, 76, 0.25)",
            boxShadow: "0 25px 50px -12px rgba(201, 168, 76, 0.1)"
          }}
          className="relative w-full md:w-[320px] h-[310px] rounded-[2rem] bg-[#16161D] border border-[#FAF8F5]/5 p-6 flex flex-col justify-between overflow-hidden group select-none shrink-0 shadow-lg transition-all duration-300"
        >
          {/* Subtle gradient pattern bg */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FAF8F5]/5 to-transparent pointer-events-none opacity-20" />
          <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 rounded-full bg-[#C9A84C]/5 blur-3xl pointer-events-none" />
          
          <div className="flex justify-between items-center font-mono text-[9px] text-[#FAF8F5]/40 leading-none relative z-10">
            <span>AVANTA CONVERGENCE NODE</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              EST. 2026 // CAIRO
            </span>
          </div>
          
          <div className="space-y-3.5 my-auto relative z-10">
            <div className="relative w-10 h-10">
              {/* Radar pings */}
              <motion.div 
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-[#C9A84C]/20"
              />
              <motion.div 
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 1 }}
                className="absolute inset-0 rounded-full bg-[#C9A84C]/20"
              />
              <div className="absolute inset-0 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/25 flex items-center justify-center text-[#C9A84C]">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <div>
              <span className="font-mono text-[9px] text-[#C9A84C] uppercase tracking-widest block">Active Metric</span>
              <h4 className="text-lg md:text-xl font-bold text-[#FAF8F5] leading-snug">99.8% Client Retention</h4>
              <p className="text-[11px] text-[#FAF8F5]/40 leading-relaxed mt-0.5">Local businesses transformed across Egypt and online nodes.</p>
            </div>

            {/* Embedded Live Graph/Sparkline inside the card */}
            <div className="bg-black/35 border border-[#FAF8F5]/5 rounded-xl p-2.5 relative overflow-hidden h-[54px] flex flex-col justify-end">
              <div className="absolute top-2 left-2.5 flex items-center gap-1.5 font-mono text-[7.5px] text-[#C9A84C]">
                <span className="w-1 h-1 rounded-full bg-[#C9A84C] animate-ping" />
                <span>REALTIME METRIC STREAM</span>
              </div>
              <svg className="w-full h-6 overflow-visible" viewBox="0 0 200 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bentoChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 0,35 Q 20,20 40,28 T 80,12 T 120,22 T 160,8 L 200,6 L 200,40 L 0,40 Z"
                  fill="url(#bentoChartGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.7, 0.9, 0.7] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 0,35 Q 20,20 40,28 T 80,12 T 120,22 T 160,8 L 200,6"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.circle
                  cx="200"
                  cy="6"
                  r="2.5"
                  fill="#C9A84C"
                  animate={{ r: [2, 3.5, 2] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </div>
          
          <div className="flex justify-between items-center border-t border-[#FAF8F5]/5 pt-3 font-mono text-[9px] text-[#FAF8F5]/50 leading-none relative z-10">
            <span>STATUS // NOMINAL</span>
            <span className="text-[#C9A84C] font-semibold">100% SUCCESS RATE</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// -------------------------------------------------------------
// COMPONENT-C1: CARD SHUFFLER — "Diagnostic Shuffler"
// -------------------------------------------------------------
function CardShuffler() {
  const [items, setItems] = useState([
    { 
      id: 1, 
      label: "IDENTITY ARCHITECTURE", 
      metric: "01 / Brand System", 
      title: "Bespoke Logo & Palette Grid", 
      desc: "Architecting color spectrums, modular icons, and typographic pairing that command instant authority." 
    },
    { 
      id: 2, 
      label: "TONE & VOICE AUDIT", 
      metric: "02 / Editorial Script", 
      title: "High-Status Messaging Language", 
      desc: "Structuring professional copy that explains absolute excellence, moving you above cheap competitors." 
    },
    { 
      id: 3, 
      label: "VISUAL GUIDELINE SYSTEM", 
      metric: "03 / Digital Assets", 
      title: "Ready-To-Print Media Kit", 
      desc: "Delivering fully compiled assets configured for local physical printing, social channels, and maps." 
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        const last = next.pop();
        if (last) next.unshift(last);
        return next;
      });
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-[#16161D] border border-[#FAF8F5]/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-[480px] overflow-hidden group hover:border-[#C9A84C]/35 transition-colors duration-500">
      <div className="z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="bg-[#C9A84C]/10 text-[#C9A84C] p-3 rounded-2xl border border-[#C9A84C]/25">
            <Paintbrush className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] text-[#FAF8F5]/40 uppercase tracking-widest">[ COMPONENT_A: SHUFFLER ]</span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-sans text-ivory tracking-tight mb-2">
          Diagnostic Brand Modeler
        </h3>
        <p className="text-xs md:text-sm text-[#FAF8F5]/60 leading-relaxed font-sans mb-8">
          A bespoke virtual drafting kit that cycles complete color, logo, and structural assets automatically to ensure beautiful continuity.
        </p>
      </div>

      {/* The Stacked Deck Shuffler */}
      <div className="relative flex-1 w-full flex items-center justify-center mt-4">
        <div className="relative w-full max-w-[280px] h-[180px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {items.slice(0, 3).map((item, idx) => {
              // Position cards based on order index
              const scale = 1 - idx * 0.08;
              const yOffset = idx * 16;
              const zIndex = 30 - idx;
              const opacity = 1 - idx * 0.35;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.7, y: 70 }}
                  animate={{ 
                    opacity: opacity, 
                    scale: scale, 
                    y: yOffset,
                    zIndex: zIndex
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: -70 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    mass: 0.9
                  }}
                  className="absolute w-full h-[140px] bg-[#0D0D12] border border-[#FAF8F5]/10 rounded-2xl p-4 flex flex-col justify-between shadow-2xl"
                  style={{
                    filter: idx > 0 ? `blur(${idx * 1.5}px)` : 'none'
                  }}
                >
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-[9px] text-[#DAB85A] uppercase tracking-wider">{item.label}</span>
                    <span className="text-[8px] text-slate-custom/60">{item.metric}</span>
                  </div>

                  <div className="my-2">
                    <h4 className="text-xs font-bold font-sans text-ivory leading-tight">{item.title}</h4>
                    <p className="text-[10px] text-slate-custom/80 leading-normal line-clamp-2 mt-1">{item.desc}</p>
                  </div>

                  <div className="flex items-center gap-2 border-t border-white/5 pt-1.5 justify-between">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-champagne" />
                      <span className="w-2 h-2 rounded-full bg-slate-custom" />
                      <span className="w-2 h-2 rounded-full bg-ivory" />
                    </div>
                    <span className="text-[8px] font-mono text-[#DAB85A]">STATUS: CALIBRATED</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// COMPONENT-C2: TELEMETRY TYPEWRITER — "Telemetry Typewriter"
// -------------------------------------------------------------
function CardTelemetry() {
  const terminalLinesPool = [
    "> INITIALIZE conversion_funnel.sh",
    "> COMPILING high_intent_matrix... DONE",
    "> PARSING client_interest: 'café_prestige'",
    "> OPTIMIZING route_speed: '99.8ms latency'",
    "> ATTACHED: Direct WhatsApp Webhook",
    "> STATUS: Safe secure connection...",
    "> ENGAGED: 1-Tap contact configured",
    "> DEPLOYED: Mobile response speed inside 14ms"
  ];

  const valueProps = [
    "Vibrant high-contrast web architecture",
    "Bespoke layout optimized for conversion",
    "Tailored call-to-action systems",
    "100% Google Lighthouse speed score"
  ];

  const [activeLine, setActiveLine] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const stringToType = terminalLinesPool[activeLine];
    if (charIndex < stringToType.length) {
      const typeTimeout = setTimeout(() => {
        setTypedText((prev) => prev + stringToType[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(typeTimeout);
    } else {
      const lineTimeout = setTimeout(() => {
        setTypedText('');
        setCharIndex(0);
        setActiveLine((prev) => (prev + 1) % terminalLinesPool.length);
      }, 2500);
      return () => clearTimeout(lineTimeout);
    }
  }, [charIndex, activeLine]);

  return (
    <div className="relative bg-[#16161D] border border-[#FAF8F5]/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-[480px] overflow-hidden group hover:border-[#C9A84C]/35 transition-colors duration-500">
      <div className="z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="bg-[#C9A84C]/10 text-[#C9A84C] p-3 rounded-2xl border border-[#C9A84C]/25">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-emerald-400 font-semibold">[ REALTIME LOGGER ]</span>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-sans text-ivory tracking-tight mb-2">
          WhatsApp Telemetry Hub
        </h3>
        <p className="text-xs md:text-sm text-[#FAF8F5]/60 leading-relaxed font-sans mb-6">
          Converting local lookers into paying customers via streamlined high-status landing pages integrated with direct fast messaging hooks.
        </p>
      </div>

      {/* The Monospace Typewriter Visual Element */}
      <div className="flex-1 w-full bg-[#0D0D12] border border-[#FAF8F5]/5 rounded-xl p-4 font-mono text-xs flex flex-col justify-between shadow-inner h-[200px]">
        <div className="space-y-1 overflow-hidden">
          <div className="flex justify-between border-b border-white/5 pb-2 mb-2 text-[9px] text-stone-500">
            <span>FILE: APP_ROUTE_OPTIMIZER.SYS</span>
            <span>PORT 3000 // OK</span>
          </div>
          <div className="text-stone-500 text-[10px]">&gt; SYSTEM BOOT COMPLETED ON LOCALTIME</div>
          <div className="text-champagne font-medium transition-all">
            {typedText}
            <span className="inline-block w-2 h-4 ml-1 bg-[#C9A84C] animate-pulse" />
          </div>
          <div className="text-[10px] text-slate-custom/50 mt-1">
            {activeLine > 0 && `* previous: ${terminalLinesPool[(activeLine - 1 + terminalLinesPool.length) % terminalLinesPool.length]}`}
          </div>
        </div>

        <div className="border-t border-white/5 pt-2 mt-4 space-y-2">
          <div className="text-[9px] text-[#FAF8F5]/80 uppercase tracking-widest block font-bold">INTEGRATED FEATURES:</div>
          <div className="grid grid-cols-2 gap-2 text-[9px] text-stone-400">
            {valueProps.map((prop, i) => (
              <div key={i} className="flex items-center gap-1">
                <Check className="w-2.5 h-2.5 text-champagne shrink-0" />
                <span className="truncate">{prop}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// COMPONENT-C3: CURSOR PROTOCOL SCHEDULER — "Cursor Protocol Scheduler"
// -------------------------------------------------------------
function CardScheduler() {
  const days = [
    { name: 'S', day: '1', active: false },
    { name: 'M', day: '2', active: false },
    { name: 'T', day: '3', active: false },
    { name: 'W', day: '4', active: false },
    { name: 'T', day: '5', active: false },
    { name: 'F', day: '6', label: 'LAUNCH', active: false },
    { name: 'S', day: '7', active: false },
  ];

  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [schedulerStep, setSchedulerStep] = useState(0); // 0: moving, 1: click/activate, 2: save click, 3: completed
  const [savePressed, setSavePressed] = useState(false);

  // Scheduler Automation Timeline Simulator
  useEffect(() => {
    const runCycle = async () => {
      // Step 0: Moving cursor to delivery day (Friday - index 5)
      setSavePressed(false);
      setActiveDay(null);
      setSchedulerStep(0);

      // Transition to active day click
      const t1 = setTimeout(() => {
        setSchedulerStep(1);
        setActiveDay(5); // Highlight Friday
      }, 1500);

      // Transition to action click
      const t2 = setTimeout(() => {
        setSchedulerStep(2);
      }, 3000);

      const t3 = setTimeout(() => {
        setSavePressed(true);
        setSchedulerStep(3);
      }, 4000);

      // Return to base state
      const t4 = setTimeout(() => {
        runCycle();
      }, 8000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    };

    runCycle();
  }, []);

  return (
    <div className="relative bg-[#16161D] border border-[#FAF8F5]/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between h-[480px] overflow-hidden group hover:border-[#C9A84C]/35 transition-colors duration-500">
      <div className="z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="bg-[#C9A84C]/10 text-[#C9A84C] p-3 rounded-2xl border border-[#C9A84C]/25">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] text-[#FAF8F5]/40 uppercase tracking-widest">[ DEPLOYMENT_GRID: SPEED ]</span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-sans text-ivory tracking-tight mb-2">
          7-Day Transformation Engine
        </h3>
        <p className="text-xs md:text-sm text-[#FAF8F5]/60 leading-relaxed font-sans mb-6">
          Your entire system designed, coded, tested, and fully compiled on custom production instances within a rigid calendar week. Guaranteed.
        </p>
      </div>

      {/* The Calendar & Virtual Clicking Animation Container */}
      <div className="relative flex-1 w-full bg-[#0D0D12]/80 border border-[#FAF8F5]/5 rounded-xl p-4 flex flex-col justify-between h-[200px] overflow-hidden select-none">
        
        {/* Days Header */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[8.5px] text-stone-500 uppercase">TRANSFORMATION TIMELINE ROUTING</span>
            <span className="font-mono text-[9px] text-champagne bg-champagne/10 px-2 py-0.5 rounded border border-champagne/30">
              {schedulerStep === 3 ? "LAUNCH DEPLOYED" : "COMPILING STAGES"}
            </span>
          </div>

          {/* S M T W T F S Grid */}
          <div className="grid grid-cols-7 gap-1.5 pt-1.5">
            {days.map((day, i) => {
              const isToday = activeDay === i;
              return (
                <div 
                  key={i} 
                  className={`relative flex flex-col items-center justify-center py-2.5 rounded-lg border text-center transition-all duration-500 ${
                    isToday 
                      ? 'bg-gradient-to-b from-[#C9A84C] to-[#99792B] border-champagne text-obsidian font-bold shadow-[0_0_12px_rgba(201,168,76,0.35)]' 
                      : 'bg-obsidian/60 border-white/5 text-stone-400'
                  }`}
                >
                  <span className="text-[9px] font-mono block opacity-60">{day.name}</span>
                  <span className="text-xs font-semibold font-sans block mt-0.5">{day.day}</span>
                  {day.label && (
                    <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[7px] font-bold font-mono px-1 rounded transform scale-90 ${isToday ? 'bg-champagne text-obsidian' : 'bg-stone-800 text-stone-500'}`}>
                      {day.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Action Button Pressed by virtual cursor */}
        <div className="flex justify-between items-center bg-obsidian/80 border border-white/5 rounded-lg px-3 py-2.5 mt-2">
          <div className="flex flex-col">
            <span className="text-[7.5px] font-mono text-stone-500 uppercase">OUTPUT DIRECTORY STATUS</span>
            <span className="text-[11px] font-sans text-ivory font-bold truncate">
              {schedulerStep === 3 ? "✓ jimmycoffee.netlify.app/ LIVE" : "Awaiting Deploy Stage 6..."}
            </span>
          </div>

          <button 
            className={`font-mono text-[8px] tracking-widest uppercase py-1 px-3.5 rounded transition-all duration-300 ${
              savePressed 
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold' 
                : 'bg-stone-800 text-stone-400 border border-white/5'
            }`}
          >
            {savePressed ? "ONLINE" : "STANDBY"}
          </button>
        </div>

        {/* Floating Virtual Pointer Cursor Layer */}
        <AnimatePresence>
          {schedulerStep < 3 && (
            <motion.div
              initial={{ x: 190, y: 150 }}
              animate={
                schedulerStep === 0 
                  ? { x: 150, y: 55 } // hover over Friday day cell
                  : schedulerStep === 1 
                  ? { x: 150, y: 55, scale: 0.8 } // click Friday
                  : { x: 230, y: 115, scale: 1 } // move to Standby button
              }
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute pointer-events-none z-20"
            >
              <svg className="w-5 h-5 text-champagne drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 3l16 11.5-6.5 1.5 5 8-3 1.5-5-8.5-6.5 6V3z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// COMPONENT-D: PHILOSOPHYSECTION — "The Philosophy"
// -------------------------------------------------------------
function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.manifesto-reveal');
      elements.forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power2.out", 
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="philosophy" 
      className="relative py-24 md:py-32 px-6 z-10"
    >
      <div className="max-w-5xl mx-auto bg-[#16161D] rounded-[2.5rem] border border-[#FAF8F5]/5 p-8 md:p-14 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center text-left relative overflow-hidden shadow-2xl">
        {/* Subtle grid elements */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.01)_1px,transparent_1px)] bg-[size:4rem] opacity-30 pointer-events-none" />
        
        <div className="flex-1 space-y-8 select-none relative z-10">
          <span className="manifesto-reveal font-mono text-xs text-[#C9A84C] uppercase tracking-[0.3em] block">
            [ THE MANIFESTO ]
          </span>
          
          <div className="space-y-8">
            <div className="manifesto-reveal">
              <span className="font-mono text-[10px] text-[#FAF8F5]/40 uppercase block mb-1.5">TRADITIONAL BOTTLENECKS //</span>
              <p className="text-sm md:text-base font-light text-stone-400 font-sans leading-relaxed">
                Most design studios and web agencies focus exclusively on <span className="text-[#FAF8F5] font-semibold">unnecessarily bloated portfolios</span>, infinite multi-month layout mockups, and excessive invoice rates. Small business owners pay thousands just to end up standing still.
              </p>
            </div>

            <div className="manifesto-reveal border-t border-[#FAF8F5]/5 pt-6">
              <span className="font-mono text-[10px] text-[#C9A84C] uppercase block mb-1.5">THE AVANTA SYNTAX SYSTEM //</span>
              <h2 className="text-xl md:text-2xl font-bold font-sans text-[#FAF8F5] tracking-tight leading-relaxed">
                We focus purely on <span className="font-serif italic text-[#C9A84C] text-2.5xl md:text-3xl font-medium block sm:inline">businesses that win.</span> Complete brand portfolios, hyper-fast delivery timescales, and automated booking triggers.
              </h2>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block w-px h-56 bg-[#FAF8F5]/10 self-stretch relative z-10" />

        {/* Grid of detail numbers following Bento Design stats block */}
        <div className="manifesto-reveal grid grid-cols-2 gap-6 w-full lg:w-auto shrink-0 select-none relative z-10">
          <div className="flex flex-col bg-[#0D0D12] p-6 rounded-2xl border border-[#FAF8F5]/5 min-w-[130px] shadow-inner">
            <span className="text-4xl font-light font-sans text-[#C9A84C] leading-none">10</span>
            <span className="text-[9px] font-mono text-[#FAF8F5]/40 uppercase tracking-widest mt-2 block">Days Delivery</span>
          </div>
          <div className="flex flex-col bg-[#0D0D12] p-6 rounded-2xl border border-[#FAF8F5]/5 min-w-[130px] shadow-inner">
            <span className="text-4xl font-light font-sans text-[#C9A84C] leading-none">$250</span>
            <span className="text-[9px] font-mono text-[#FAF8F5]/40 uppercase tracking-widest mt-2 block">Base Package</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// COMPONENT-E: PROTOCOLSECTION — "Sticky Stacking Archive"
// -------------------------------------------------------------
function ProtocolSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If not mobile, apply stack trigger
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card') as HTMLElement[];
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
        
        // This scales card and fades it as the NEXT card scrolls into center
        gsap.to(card, {
          scale: 0.88,
          opacity: 0.35,
          filter: "blur(16px)",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 80%",
            end: "top 25%",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Synthesize the Identity Blueprint",
      desc: "We analyze your audience and build a complete high-status visual language package (logo, custom typography grid, color spacing) to signal high quality to local buyers in Alexandria and Cairo.",
      visual: "spin"
    },
    {
      num: "02",
      title: "Develop high-converting landing architecture",
      desc: "Our team compiles your custom high-converting web system using custom coding patterns. Pages are structurally responsive, loading on ultra-modern hosting structures instantly.",
      visual: "laser"
    },
    {
      num: "03",
      title: "Automation Hook & Seamless Handover",
      desc: "We configure a direct WhatsApp outreach CTA, making booking, café orders, or consultation questions click-to-book smooth. Your system launches in 7 days, complete with referral loops.",
      visual: "wave"
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="protocol" 
      className="relative px-4 py-24 z-10 max-w-5xl mx-auto"
    >
      {/* Structural Headers */}
      <div className="mb-16 text-center">
        <span className="font-mono text-xs text-champagne uppercase tracking-[0.25em] block mb-3">
          [ DEPLOYMENT FLOW ]
        </span>
        <h2 className="text-3xl md:text-5xl font-sans font-bold text-ivory tracking-tight mb-4">
          The 3-stage deployment system
        </h2>
        <p className="text-sm font-sans text-stone-400 max-w-xl mx-auto">
          We combine branding, rapid deployment, and chat triggers into a repeatable product roadmap designed for local cafés, gyms, and shops.
        </p>
      </div>

      {/* Vertical Stacking Space */}
      <div className="relative flex flex-col gap-24 md:gap-32">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="protocol-card sticky top-24 self-center w-full max-w-4xl bg-[#16161D] border border-[#FAF8F5]/5 rounded-[2.5rem] p-8 md:p-14 shadow-2xl flex flex-col md:flex-row gap-8 md:gap-12 items-center"
          >
            {/* Left Content */}
            <div className="flex-1 space-y-4">
              <span className="font-mono text-xs text-[#C9A84C] bg-[#C9A84C]/10 px-3.5 py-1.5 rounded-full border border-[#C9A84C]/20 inline-block font-semibold">
                SYSTEM MODULE {step.num}
              </span>
              <h3 className="text-2xl md:text-4xl font-sans font-bold text-ivory tracking-tight leading-tight">
                {step.title}
              </h3>
              <p className="text-sm text-stone-300 font-sans leading-relaxed">
                {step.desc}
              </p>
            </div>

            {/* Right Interactive Canvas / SVG visual */}
            <div className="w-full md:w-[280px] h-[220px] bg-[#0D0D12] rounded-[2rem] border border-[#FAF8F5]/5 shadow-inner flex items-center justify-center overflow-hidden shrink-0 relative">
              <div className="absolute top-3 right-4 font-mono text-[8.5px] text-stone-500 uppercase">
                STATUS // INTERACTIVE
              </div>

              {step.visual === "spin" && (
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-champagne/30 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="absolute w-24 h-24 border border-[#FAF8F5]/15 rounded-full flex items-center justify-center"
                  />
                  <div className="w-12 h-12 rounded-full bg-champagne/10 border border-champagne flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-champagne" />
                  </div>
                </div>
              )}

              {step.visual === "laser" && (
                <div className="w-full h-full p-6 flex flex-col justify-between relative">
                  {/* The grid pattern */}
                  <div className="absolute inset-0 grid grid-cols-6 gap-2 p-6 pointer-events-none opacity-20">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="bg-champagne w-1.5 h-1.5 rounded-full" />
                    ))}
                  </div>

                  {/* Horizontal scanning laser */}
                  <motion.div 
                    animate={{ y: [0, 160, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-[85%] h-0.5 bg-champagne absolute left-6 shadow-[0_0_10px_#C9A84C]"
                  />

                  <div className="z-10 mt-auto bg-obsidian/90 p-2.5 rounded border border-white/10 w-full font-mono text-[9px] text-stone-400 space-y-1">
                    <div className="flex justify-between">
                      <span>HTML COMPILING:</span>
                      <span className="text-champagne font-bold">100% OK</span>
                    </div>
                    <div className="h-1 w-full bg-slate-custom/30 rounded overflow-hidden">
                      <div className="h-full w-full bg-champagne" />
                    </div>
                  </div>
                </div>
              )}

              {step.visual === "wave" && (
                <div className="relative w-44 h-32 flex flex-col justify-center items-center">
                  {/* A pulsing geometric sound wave or heartbeat SVG with stroke-dashoffset */}
                  <svg className="w-full h-16 text-champagne" viewBox="0 0 100 40">
                    <motion.path
                      d="M0 20 H30 L34 5 L38 35 L42 12 L46 25 L50 20 H100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      initial={{ strokeDasharray: "150, 150", strokeDashoffset: 150 }}
                      animate={{ strokeDashoffset: [150, -150] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />
                  </svg>
                  <span className="font-mono text-[9px] text-center text-[#DAB85A] mt-2 tracking-widest uppercase">
                    ACTIVE PULSING CONVERSION
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// COMPONENT-F: CASE STUDIES DIRECTORY
// -------------------------------------------------------------
function CaseStudiesSection({ 
  caseStudies, 
  getWhatsAppURL 
}: { 
  caseStudies: CaseStudy[]; 
  getWhatsAppURL: (msg?: string) => string 
}) {
  return (
    <section id="case-studies" className="relative py-24 md:py-32 px-6 bg-obsidian overflow-hidden border-t border-slate-custom/20 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl text-left">
            <span className="font-mono text-xs text-champagne uppercase tracking-[0.25em] block mb-4">
              [ REAL WORLD MOMENTUM ]
            </span>
            <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-ivory font-bold">
              Studios designed for <span className="font-serif italic text-champagne font-medium">uncompromising presence</span>.
            </h2>
          </div>
          <p className="text-stone-400 font-sans text-sm max-w-sm md:text-right leading-relaxed mb-1">
            Browse our core portfolio and ongoing conceptual blueprints engineered for gyms, skincare brands, and cafés.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, i) => (
            <div 
              key={i} 
              className={`group relative border rounded-[2.5rem] overflow-hidden flex flex-col justify-between h-[520px] transition-all duration-500 hover:-translate-y-2 ${
                caseStudy.isReal 
                  ? 'bg-[#C9A84C] border-transparent text-[#0D0D12] shadow-[0_12px_45px_rgba(201,168,76,0.22)]' 
                  : 'bg-[#16161D] border-[#FAF8F5]/5 text-[#FAF8F5]'
              }`}
            >
              {/* Image banner with scale on hover */}
              <div className="relative w-full h-[220px] overflow-hidden shrink-0">
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                    caseStudy.isReal ? '' : 'grayscale group-hover:grayscale-0'
                  }`}
                  referrerPolicy="no-referrer"
                />
                
                {/* Real VS Concept Badge */}
                <div className="absolute top-4 left-4 z-10">
                  {caseStudy.isReal ? (
                    <span className="font-mono text-[9px] bg-[#0D0D12] text-[#C9A84C] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border border-[#C9A84C]/25 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      LIVE CLIENT LAUNCH
                    </span>
                  ) : (
                    <span className="font-mono text-[9px] bg-[#0D0D12]/90 text-[#FAF8F5]/60 px-2.5 py-1 rounded-full uppercase tracking-widest border border-[#FAF8F5]/10">
                      CONCEPT DESIGN BLUEPRINT
                    </span>
                  )}
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className={`font-mono text-[10px] block uppercase tracking-wider mb-2 ${
                    caseStudy.isReal ? 'text-[#0D0D12]/80 font-semibold' : 'text-[#C9A84C]'
                  }`}>
                    {caseStudy.category}
                  </span>
                  <h3 className={`text-xl md:text-2xl font-serif font-bold tracking-tight mb-3 ${
                    caseStudy.isReal ? 'text-[#0D0D12]' : 'text-[#FAF8F5] group-hover:text-[#C9A84C] transition-colors'
                  }`}>
                    {caseStudy.title}
                  </h3>
                  <p className={`text-xs md:text-sm font-sans leading-relaxed ${
                    caseStudy.isReal ? 'text-[#0D0D12]/70 font-light' : 'text-[#FAF8F5]/60'
                  }`}>
                    {caseStudy.tagline}
                  </p>
                </div>

                <div className={`border-t pt-4 mt-6 ${
                  caseStudy.isReal ? 'border-[#0D0D12]/10' : 'border-[#FAF8F5]/5'
                }`}>
                  {/* Dynamic actions / link for Jimmy's */}
                  {caseStudy.isReal ? (
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#0D0D12] font-black tracking-wider">{caseStudy.stats}</span>
                      <a 
                        href={caseStudy.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#0D0D12] hover:text-[#0D0D12]/80 transition-colors uppercase tracking-widest font-bold border-b-2 border-[#0D0D12]"
                      >
                        <span>VISIT SITE</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#FAF8F5]/40">{caseStudy.stats}</span>
                      <a 
                        href={getWhatsAppURL(`Hi Avanta, I really like the '${caseStudy.title}' design style. Can we do something similar for my business?`)}
                        className="inline-flex items-center gap-1 font-mono text-[10px] text-[#FAF8F5]/60 hover:text-[#C9A84C] transition-colors uppercase tracking-widest"
                      >
                        <span>CLAIM STYLE</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// COMPONENT-G: PRICING GRID
// -------------------------------------------------------------
function PricingGrid({ getWhatsAppURL }: { getWhatsAppURL: (msg?: string) => string }) {
  const plans = [
    {
      name: "Brand Archetype",
      price: "$150",
      time: "5–7 Days Delivery",
      desc: "For local stores and boutiques that have a loyal following but need to look like an established business online.",
      features: [
        "Uncompromising Logo System",
        "Calibrated Typography Scales",
        "Prestige Editorial Guidelines",
        "Ready-to-print SVG asset directory",
        "Optimized Social Channel Brand Assets"
      ],
      cta: "SECURE ARCHETYPE",
      highlight: false
    },
    {
      name: "The Complete System",
      price: "$250",
      time: "7–10 Days Delivery",
      desc: "Our high-status signature package. The ultimate complete transition of brand identity fused with lightning-speed booking launch.",
      features: [
        "Everything in Brand Archetype",
        "High-Converting Landing Architecture",
        "Full mobile-first adaptive UI",
        "Custom instant-response WhatsApp Integration",
        "100% Client-Ownership of complete code/assets",
        "SEO architecture setup (Cairo/Alexa targeting)"
      ],
      cta: "SECURE COMPLETE TRANSFORMATION",
      highlight: true
    },
    {
      name: "Performance Portal",
      price: "$120",
      time: "3–5 Days Delivery",
      desc: "A rapid 1-screen conversions solution. Perfect for direct social traffic landing to drive immediate inquiries.",
      features: [
        "Fully coded custom React landing structure",
        "Embedded conversion triggers and popups",
        "WhatsApp click-to-book automation webhook",
        "Lighthouse performance rating of 99s",
        "Free secure production hosting setup"
      ],
      cta: "SECURE CONVERSION PORTAL",
      highlight: false
    }
  ];

  return (
    <section id="investment" className="relative py-24 md:py-32 px-6 bg-[#09090D] z-10 border-t border-slate-custom/20">
      <div className="max-w-7xl mx-auto">
        {/* Title block */}
        <div className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs text-champagne uppercase tracking-[0.25em] block mb-4">
            [ UNCOMPROMISING PRICING ]
          </span>
          <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-ivory font-bold mb-4">
            No dynamic margins. Simple upfront packages.
          </h2>
          <p className="text-stone-400 font-sans text-sm md:text-base">
            Deliverables with clear target dates. 50% deposit starts the build, remainder delivered upon full satisfaction and live launch.
          </p>
        </div>

        {/* Plan Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((plan, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -12,
                scale: plan.highlight ? 1.05 : 1.02,
                borderColor: plan.highlight ? "#C9A84C" : "rgba(201, 168, 76, 0.35)",
                boxShadow: plan.highlight 
                  ? "0 30px 60px -12px rgba(201, 168, 76, 0.2)" 
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.55)",
              }}
              className={`relative bg-[#16161D] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between border transition-all duration-500 group ${
                plan.highlight 
                  ? 'border-[#C9A84C] z-10' 
                  : 'border-[#FAF8F5]/5 opacity-90 hover:opacity-100 overflow-hidden'
              }`}
            >
              {/* Soft Golden Ambient Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A84C]/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.4rem]" />
              
              <div className="relative z-10">
                {/* Highlight Label */}
                {plan.highlight && (
                  <span className="absolute -top-4.5 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#0D0D12] text-[8px] md:text-[8.5px] font-mono tracking-[0.16em] uppercase font-bold py-1 px-4.5 rounded-full border border-[#C9A84C] shadow-[0_4px_16px_rgba(201,168,76,0.3)] select-none whitespace-nowrap z-20 text-center">
                    ★ RECOMMENDED COMPLETE TRANSFORMATION
                  </span>
                )}

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-sans text-xl font-bold text-[#FAF8F5] tracking-tight group-hover:text-white transition-colors duration-300">{plan.name}</h3>
                    <span className="font-mono text-[10px] text-[#C9A84C] font-semibold block mt-1 uppercase tracking-wider">{plan.time}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-3xl md:text-4xl font-semibold text-[#FAF8F5] tracking-tighter block group-hover:scale-105 group-hover:text-[#C9A84C] transition-all duration-300 origin-right">{plan.price}</span>
                    <span className="font-mono text-[8px] text-[#C9A84C] tracking-widest uppercase block mt-0.5">ONE-TIME FEE</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-stone-400 font-sans leading-relaxed mb-8">
                  {plan.desc}
                </p>

                <div className="border-t border-[#FAF8F5]/5 pt-6 mb-8">
                  <span className="font-mono text-[9px] text-[#FAF8F5]/40 uppercase tracking-widest block mb-4">SPECIFICATIONS INCLUDED</span>
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs text-stone-300 font-sans group/feat">
                        <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5 group-hover/feat:scale-110 group-hover/feat:rotate-12 transition-all duration-300" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA button */}
              <a 
                href={getWhatsAppURL(`Hi Avanta, I am interested in the '${plan.name}' package for $${plan.price}. Let's get started.`)}
                target="_blank" 
                rel="noreferrer"
                className={`w-full block py-4 px-2 text-center text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-300 transform active:scale-95 text-center relative z-10 group-hover:translate-y-[-2px] ${
                  plan.highlight 
                    ? 'bg-[#C9A84C] text-[#0D0D12] hover:bg-white hover:text-[#0D0D12] hover:shadow-[0_10px_25px_rgba(201,168,76,0.3)]' 
                    : 'bg-[#0D0D12] text-[#FAF8F5] border border-[#FAF8F5]/10 hover:border-[#C9A84C] hover:text-white'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// COMPONENT-H: FOOTER
// -------------------------------------------------------------
function Footer({ getWhatsAppURL }: { getWhatsAppURL: (msg?: string) => string }) {
  return (
    <footer className="relative bg-[#060609] pt-24 pb-12 px-6 rounded-t-[4rem] z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Foot top layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-sans">
          
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2 tracking-tight">
              <span className="font-serif italic text-2xl font-bold text-champagne">A</span>
              <span className="text-xl font-bold tracking-[0.16em] text-ivory uppercase">AVANTA</span>
            </a>
            <p className="text-sm text-stone-400 max-w-sm font-light leading-relaxed">
              We design legendary visual identity profiles and code elite conversion pages to make local businesses attract consistent clients and look like the premier institution.
            </p>
          </div>

          {/* Quick links block */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-[#DAB85A] uppercase tracking-[0.2em] block">STUDIO LINKS</span>
            <ul className="space-y-2 text-xs font-mono text-stone-500">
              <li><a href="#services" className="hover:text-champagne transition-colors">SPECIFICATION SERVICES</a></li>
              <li><a href="#protocol" className="hover:text-champagne transition-colors">THE 3-STAGE PROTOCOL</a></li>
              <li><a href="#case-studies" className="hover:text-champagne transition-colors">ACTIVE CASE DIRECTORY</a></li>
              <li><a href="#investment" className="hover:text-champagne transition-colors">PRICING PLANS</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-[#DAB85A] uppercase tracking-[0.2em] block">STUDIO CONVERSATIONS</span>
            <ul className="space-y-2 text-xs font-mono text-stone-500">
              <li>Alexandria · Cairo · Online</li>
              <li>Direct: <a href={getWhatsAppURL("Inquiry from foot text")} className="text-champagne underline">Click to Chat on WhatsApp</a></li>
              <li className="pt-2 text-[9px] italic uppercase text-slate-custom/50">AVAILABLE SEATS: 2 FOR THE REMAINDER OF MONTH</li>
            </ul>
          </div>
        </div>

        {/* Status System Operational Band */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-stone-500">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>SYSTEM MONITOR: 100% OPERATIONAL // ALEXANDRIA PLATFORM_NODE</span>
          </div>

          <div>
            <span>© 2026 AVANTA INC. · COMPILED WITH SOLIDITY &amp; PRIDE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
