/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
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

// Helper to compute remaining local time until 12:00 AM midnight tonight
function getRemainingTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  const diffMs = midnight.getTime() - now.getTime();
  
  if (diffMs <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}

// -------------------------------------------------------------
// COMPONENT: StickyPromoBar
// -------------------------------------------------------------
function StickyPromoBar() {
  const [timeLeft, setTimeLeft] = useState(getRemainingTimeUntilMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getRemainingTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] bg-gradient-to-r from-[#C9A84C] via-[#FAF8F5] to-[#C9A84C] text-[#0D0D12] shadow-[0_4px_25px_rgba(201,168,76,0.35)] flex items-center justify-between px-3 md:px-6 py-2.5 transition-all duration-300">
      <div className="flex-1 flex items-center justify-center gap-2 md:gap-4 text-center overflow-hidden">
        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0 hidden xs:inline-block" />
        <p className="font-mono text-[9px] md:text-xs font-bold uppercase tracking-wider leading-none truncate">
          <span className="inline md:hidden">⚡ LIMITED OFFER: FREE SPOT (ENDS AT 12:00 AM)</span>
          <span className="hidden md:inline">⚡ LIMITED-TIME PROMO: UPGRADE TO PREMIUM &amp; GET A FREE SPOT (ENDS AT 12:00 AM TONIGHT)</span>
        </p>
        <div className="flex items-center gap-1 bg-[#0D0D12]/10 border border-[#0D0D12]/20 px-2 py-0.5 rounded-md shrink-0">
          <span className="font-mono text-[10px] md:text-[11px] font-extrabold text-[#0D0D12] tracking-wider leading-none">
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
      <a 
        href="#claim-offer-section" 
        className="bg-[#0D0D12] text-[#C9A84C] hover:bg-stone-900 hover:text-white font-sans text-[8px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full transition-all active:scale-95 leading-none shrink-0"
      >
        Claim Spot
      </a>
    </div>
  );
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
      category: "Alexandria Specialty Café",
      tagline: "Building a beautiful look and brand to help Alexandria's favorite cafe get more weekend customers.",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800",
      logoText: "JIMMY'S",
      isReal: true,
      link: "https://jimmycoffee.netlify.app/",
      stats: "Alexandria's Premier Spot · Brand Design"
    },
    {
      title: "Volt Gym",
      category: "Nile Fitness Club",
      tagline: "Helping a premium gym attract new members with a clean, high-end design that stands out locally.",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800",
      logoText: "VOLT.",
      isReal: false,
      link: "#",
      stats: "Premium Cairo Gym · Design Style"
    },
    {
      title: "Terra Skincare",
      category: "Local Skincare Shop",
      tagline: "Helping an organic skincare brand look professional and trustworthy so customers can book services easily.",
      image: terraSkincareImg,
      logoText: "TERRA",
      isReal: false,
      link: "#",
      stats: "Organic Skincare Brand · Design Style"
    },
  ];

  return (
    <div className="relative min-h-screen selection:bg-champagne selection:text-obsidian overflow-hidden pt-11 md:pt-12">
      {/* Dynamic top-bar for Limited-Time Offer */}
      <StickyPromoBar />

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
              [ Our Services ]
            </span>
            <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-ivory font-semibold mb-6">
              Three ways we help your local business <span className="font-serif italic text-champagne font-medium">attract more customers</span>.
            </h2>
            <p className="text-slate-custom/80 font-sans text-sm md:text-base leading-relaxed">
              We make the process simple. We design high-end websites and brands that make you stand out locally, build instant trust, and get clients calling.
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
    <header className={`fixed ${scrolled ? 'top-12' : 'top-[52px] md:top-[60px]'} left-0 w-full z-50 px-4 transition-all duration-300`}>
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
            <span>Talk on WhatsApp →</span>
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
              <span>Talk on WhatsApp →</span>
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
  
  // 1. Countdown Timer State for Urgency (Targeting exactly 12:00 AM local time midnight)
  const [timeLeft, setTimeLeft] = useState(getRemainingTimeUntilMidnight());
  
  // 2. Spots Scarcity State (Simulates a real-time spot being claimed to drive massive action)
  const [spotsClaimed, setSpotsClaimed] = useState(7);
  const [spotClaimedNotification, setSpotClaimedNotification] = useState(false);

  // 3. Form States
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  // Urgency Timer Effect (Synchronized local midnight timer)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getRemainingTimeUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulating live spot reservation after 12 seconds
  useEffect(() => {
    const spotTimer = setTimeout(() => {
      setSpotsClaimed(8);
      setSpotClaimedNotification(true);
      // Fade out notification after 4 seconds
      setTimeout(() => setSpotClaimedNotification(false), 4000);
    }, 12000);

    // Another simulated spot after 45 seconds
    const spotTimerTwo = setTimeout(() => {
      setSpotsClaimed(9);
      setSpotClaimedNotification(true);
      setTimeout(() => setSpotClaimedNotification(false), 4000);
    }, 45000);

    return () => {
      clearTimeout(spotTimer);
      clearTimeout(spotTimerTwo);
    };
  }, []);

  const handleClaimSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !contactInfo) return;

    setIsSubmitting(true);
    
    // Simulate premium verification and validation
    setTimeout(() => {
      const randomCode = `AV-PREM-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedCode(randomCode);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <section 
      ref={containerRef}
      id="claim-offer-section"
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center py-28 md:py-36 px-4 z-20 scroll-mt-20"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[#0D0D12] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(201,168,76,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Exclusivity banner floating container */}
      <div className="w-full max-w-5xl relative z-10 flex flex-col gap-8 md:gap-10">
        
        {/* Urgent Live Pulse Toast Notification */}
        <AnimatePresence>
          {spotClaimedNotification && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-[#0D0D12] font-mono text-[11px] font-bold py-2 px-5 rounded-full shadow-[0_10px_30px_rgba(201,168,76,0.3)] z-50 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              <span>ALERT: Another Cairo business just lock-in their spot. {10 - spotsClaimed} remaining!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. HERO MAIN CARD (BENTO BOX) */}
        <div className="w-full bg-gradient-to-br from-[#1C1C26] via-[#121219] to-[#0A0A0E] border border-[#FAF8F5]/5 rounded-[2.5rem] p-6 sm:p-8 md:p-14 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row gap-10 lg:gap-12 items-stretch group/hero-bento transition-all duration-500">
          
          {/* Dynamic ambient gold glowing orbs */}
          <div className="absolute -top-24 -left-24 w-[350px] h-[350px] rounded-full bg-[#C9A84C]/10 blur-[100px] pointer-events-none select-none z-0" />
          <div className="absolute -bottom-24 -right-24 w-[350px] h-[350px] rounded-full bg-[#C9A84C]/5 blur-[100px] pointer-events-none select-none z-0" />

          {/* Left Text & Highlight Content */}
          <div className="flex-1 flex flex-col justify-between relative z-10">
            <div>
              {/* Limited Time Offer badge */}
              <div className="inline-flex items-center gap-2 bg-[#C9A84C]/15 border border-[#C9A84C]/35 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C] animate-spin" />
                <span className="font-mono text-[10px] md:text-xs text-[#C9A84C] uppercase tracking-[0.2em] font-semibold">
                  LIMITED TIME EXCLUSIVE OFFER
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              </div>

              {/* suggested Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-sans font-semibold text-[#FAF8F5] tracking-tight leading-[1.1]">
                Upgrade to Premium <br className="hidden sm:inline" />
                <span className="font-serif italic text-[#C9A84C] mt-2 block">&amp; Get a FREE Spot.</span>
              </h1>

              {/* suggested Subheadline */}
              <p className="font-sans text-[#FAF8F5]/70 text-sm md:text-base font-light leading-relaxed max-w-xl mt-6">
                For a limited time, every Premium membership includes a free spot at no extra cost. Secure your place before the offer ends and expand your reach instantly.
              </p>

              {/* Value list items */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] shrink-0 border border-[#C9A84C]/25">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs md:text-sm text-[#FAF8F5]/80 font-sans">
                    <strong>Include an Extra Partner</strong> completely free (Value of $150+)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] shrink-0 border border-[#C9A84C]/25">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs md:text-sm text-[#FAF8F5]/80 font-sans">
                    <strong>Egypt's Premier Brand Strategy</strong> &amp; high-converting architecture
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] shrink-0 border border-[#C9A84C]/25">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs md:text-sm text-[#FAF8F5]/80 font-sans">
                    <strong>100% Satisfaction Guarantee</strong> with custom live WhatsApp status support
                  </span>
                </div>
              </div>
            </div>

            {/* Urgency Indicators Grid (Timer + Spots remaining) */}
            <div className="mt-10 pt-8 border-t border-[#FAF8F5]/5 grid grid-cols-2 gap-4">
              {/* Urgency 1: Countdown Clock */}
              <div className="bg-[#14141E] border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                <span className="font-mono text-[9px] text-[#C9A84C] uppercase tracking-widest block mb-2">OFFER EXPIRES IN</span>
                <div className="flex items-baseline gap-1 font-mono text-lg md:text-xl font-bold text-ivory tracking-wider">
                  <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[#C9A84C] animate-pulse">:</span>
                  <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[#C9A84C] animate-pulse">:</span>
                  <span className="text-[#C9A84C]/80">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
                <span className="font-sans text-[9px] text-[#FAF8F5]/40 mt-1">Strict time limitation</span>
              </div>

              {/* Urgency 2: Spots claiming tracker */}
              <div className="bg-[#14141E] border border-white/5 rounded-2xl p-4 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[9px] text-red-400 uppercase tracking-widest font-semibold">URGENCY RADAR</span>
                  <span className="font-mono text-[10px] text-ivory font-bold">{10 - spotsClaimed} Left</span>
                </div>
                {/* Custom glowing progress bar */}
                <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden border border-white/5 relative mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-[#C9A84C] rounded-full transition-all duration-1000"
                    style={{ width: `${spotsClaimed * 10}%` }}
                  />
                </div>
                <span className="font-sans text-[9px] text-[#FAF8F5]/40 mt-2">
                  {spotsClaimed}/10 Premium places claimed
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Sign-up / Claim Form with animations */}
          <div className="w-full lg:w-[380px] bg-[#14141C] border border-[#FAF8F5]/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative min-h-[420px] shrink-0">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="claim-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold font-sans text-[#FAF8F5] tracking-tight mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#C9A84C] fill-current" />
                      <span>Lock-In Your Promo</span>
                    </h3>
                    <p className="text-xs text-[#FAF8F5]/50 leading-relaxed font-sans mb-6">
                      No credit card required. Instantly reserve your premium spot and get the extra seats included today.
                    </p>

                    <form onSubmit={handleClaimSubmit} className="space-y-4">
                      {/* Name input */}
                      <div>
                        <label className="font-mono text-[9px] text-[#FAF8F5]/40 uppercase tracking-wider block mb-1">YOUR FULL NAME *</label>
                        <input 
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Aly Ibrahim"
                          className="w-full bg-stone-950 border border-white/5 focus:border-[#C9A84C]/45 rounded-xl px-4 py-3 text-xs text-ivory placeholder-stone-600 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Contact input */}
                      <div>
                        <label className="font-mono text-[9px] text-[#FAF8F5]/40 uppercase tracking-wider block mb-1">EMAIL OR WHATSAPP NUMBER *</label>
                        <input 
                          type="text"
                          required
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                          placeholder="e.g. aly@mybrand.com / +20 1..."
                          className="w-full bg-stone-950 border border-white/5 focus:border-[#C9A84C]/45 rounded-xl px-4 py-3 text-xs text-ivory placeholder-stone-600 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Business name input */}
                      <div>
                        <label className="font-mono text-[9px] text-[#FAF8F5]/40 uppercase tracking-wider block mb-1">CAFÉ, SHOP, OR STORE NAME (OPTIONAL)</label>
                        <input 
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="e.g. Lotus Roastery"
                          className="w-full bg-stone-950 border border-white/5 focus:border-[#C9A84C]/45 rounded-xl px-4 py-3 text-xs text-ivory placeholder-stone-600 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Explicit claim button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#C9A84C] hover:bg-[#DAB85A] text-[#0D0D12] text-xs font-bold uppercase tracking-widest py-3.5 rounded-full mt-6 shadow-[0_4px_20px_rgba(201,168,76,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-[#0D0D12] border-t-transparent rounded-full animate-spin" />
                            <span>PROCESSING REQUEST...</span>
                          </>
                        ) : (
                          <>
                            <span>Claim My Offer</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  <span className="text-[10px] text-stone-500 font-sans text-center mt-6 block">
                    ★ Secure 256-bit connection node. Your details are private.
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="claim-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-between text-center py-6"
                >
                  <div className="flex flex-col items-center">
                    {/* Circle Success layout */}
                    <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] flex items-center justify-center mb-6 relative">
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-[#C9A84C]/5 rounded-full"
                      />
                      <CheckCircle2 className="w-8 h-8 relative z-10" />
                    </div>

                    <span className="font-mono text-[9px] text-[#C9A84C] uppercase tracking-[0.2em] font-bold block mb-2">
                      RESERVATION SECURED
                    </span>
                    <h4 className="text-xl font-bold text-ivory tracking-tight mb-2">
                      Congratulations, {fullName.split(' ')[0]}!
                    </h4>
                    <p className="text-xs text-[#FAF8F5]/60 px-2 leading-relaxed font-sans mb-4">
                      The FREE spot is now locked under your profile code. Our director will establish contact shortly.
                    </p>

                    {/* Booking metadata display */}
                    <div className="bg-stone-950 border border-white/5 rounded-2xl p-4 w-full text-left font-mono text-[11px] text-stone-400 space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span>PROFILE CODE:</span>
                        <span className="text-[#C9A84C] font-bold">{generatedCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>BUSINESS:</span>
                        <span className="text-ivory truncate max-w-[150px]">{businessName || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>BONUS SPOT:</span>
                        <span className="text-emerald-400 font-bold">FREE LOCKED</span>
                      </div>
                      <div className="flex justify-between">
                        <span>STATUS:</span>
                        <span className="text-emerald-400 font-semibold animate-pulse">Awaiting Verification</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppURL(
                      `Hi Avanta Team! I just verified my Premium Offer reservation with Code *${generatedCode}*. My name is ${fullName}, business is ${businessName || "Not Specified"}. Please guide me on launching our free spot!`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#C9A84C] hover:bg-[#DAB85A] text-[#0D0D12] text-xs font-bold uppercase tracking-widest py-3.5 rounded-full shadow-[0_4px_20px_rgba(201,168,76,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Finish Setup on WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* 2. LOWER TRUST BAR WITH SOCIAL PROOF & METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-[#16161D] to-[#0D0D12] border border-[#FAF8F5]/5 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden group/metric">
            <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/20 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-[#FAF8F5]/40 uppercase tracking-wider block">TRUST FACTOR</span>
              <span className="text-sm font-bold text-ivory block mt-0.5">140+ Clubs &amp; Cafés</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#16161D] to-[#0D0D12] border border-[#FAF8F5]/5 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden group/metric">
            <div className="bg-[#C9A84C]/10 text-[#C9A84C] p-2.5 rounded-xl border border-C9A84C/20 shrink-0">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-[#FAF8F5]/40 uppercase tracking-wider block">RATING VERIFIED</span>
              <span className="text-sm font-bold text-ivory block mt-0.5">5-Star Excellence</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#16161D] to-[#0D0D12] border border-[#FAF8F5]/5 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden group/metric">
            <div className="bg-blue-500/10 text-blue-400 p-2.5 rounded-xl border border-blue-500/20 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-[#FAF8F5]/40 uppercase tracking-wider block">GUARANTEED RISK</span>
              <span className="text-sm font-bold text-ivory block mt-0.5">No Credit Card Required</span>
            </div>
          </div>
        </div>

      </div>
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
      label: "BRAND DESIGN", 
      metric: "01 / Brand Style", 
      title: "Unique Logo & Matching Colors", 
      desc: "Creating beautiful color palettes, logos, and fonts that make your cafe or shop stand out." 
    },
    { 
      id: 2, 
      label: "CLEAR CHAT COPY", 
      metric: "02 / Simple Messaging", 
      title: "Simple & Clear Copywriting", 
      desc: "Writing friendly, persuasive English copy that speaks directly to Cairo and Alexandria business customers." 
    },
    { 
      id: 3, 
      label: "READY-TO-USE ASSETS", 
      metric: "03 / Brand Kit", 
      title: "Complete Printing Media Kit", 
      desc: "Delivering your final logo and images beautifully formatted for physical prints, social media, and Google Maps." 
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
          <span className="font-mono text-[10px] text-[#FAF8F5]/40 uppercase tracking-widest">[ SHUFFLER DIRECTORY ]</span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-sans text-ivory tracking-tight mb-2">
          Professional Brand Mockups
        </h3>
        <p className="text-xs md:text-sm text-[#FAF8F5]/60 leading-relaxed font-sans mb-8">
          We draft and refine your brand colors, custom logos, and fonts together to make sure your business looks exceptionally professional.
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
                    <span className="text-[8px] font-mono text-[#DAB85A]">STATUS: READY</span>
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
    "> STARTING customer_chat_setup.sh",
    "> BUILDING client_welcome_profile... READY",
    "> ROUTING customer_inquiries: 'Egypt_business'",
    "> ACCELERATING website: 'Loads instantly'",
    "> ATTACHED: Direct chat to WhatsApp",
    "> STATUS: Live message delivery...",
    "> CONNECTED: Instant chat button ready",
    "> READY: Mobile friendly speed optimized"
  ];

  const valueProps = [
    "Beautiful design layout",
    "Optimized to get you more calls",
    "Instant booking buttons",
    "Super fast load speeds"
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
            <span className="text-emerald-400 font-semibold">[ REALTIME CHAT ]</span>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-sans text-ivory tracking-tight mb-2">
          WhatsApp Customer Connect
        </h3>
        <p className="text-xs md:text-sm text-[#FAF8F5]/60 leading-relaxed font-sans mb-6">
          Converting local visitors into paying customers by adding simple, direct chat buttons that connect clients straight to your phone.
        </p>
      </div>

      {/* The Monospace Typewriter Visual Element */}
      <div className="flex-1 w-full bg-[#0D0D12] border border-[#FAF8F5]/5 rounded-xl p-4 font-mono text-xs flex flex-col justify-between shadow-inner h-[200px]">
        <div className="space-y-1 overflow-hidden">
          <div className="flex justify-between border-b border-white/5 pb-2 mb-2 text-[9px] text-stone-500">
            <span>FILE: MOBILE_CHAT_SETUP.SYS</span>
            <span>LIVE CHAT CONNECTED</span>
          </div>
          <div className="text-stone-500 text-[10px]">&gt; DIRECT WHATSAPP BUTTON ADDED</div>
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
          <span className="font-mono text-[10px] text-[#FAF8F5]/40 uppercase tracking-widest">[ 7-DAY DELIVERY GUARANTEE ]</span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-sans text-ivory tracking-tight mb-2">
          7-Day Launch Promise
        </h3>
        <p className="text-xs md:text-sm text-[#FAF8F5]/60 leading-relaxed font-sans mb-6">
          Your entire new website is designed, written, and launched live onto the web in exactly one week. No delays, no stress. Guaranteed.
        </p>
      </div>

      {/* The Calendar & Virtual Clicking Animation Container */}
      <div className="relative flex-1 w-full bg-[#0D0D12]/80 border border-[#FAF8F5]/5 rounded-xl p-4 flex flex-col justify-between h-[200px] overflow-hidden select-none">
        
        {/* Days Header */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-[8.5px] text-stone-500 uppercase">CREATIVE DESIGN WEEK</span>
            <span className="font-mono text-[9px] text-champagne bg-champagne/10 px-2 py-0.5 rounded border border-champagne/30">
              {schedulerStep === 3 ? "WEBSITE LIVE" : "LAUNCH STAGES"}
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
            <span className="text-[7.5px] font-mono text-stone-500 uppercase">WEBSITE LAUNCH STATUS</span>
            <span className="text-[11px] font-sans text-ivory font-bold truncate">
              {schedulerStep === 3 ? "✓ jimmycoffee.netlify.app/ LIVE" : "Awaiting final launch..."}
            </span>
          </div>

          <button 
            className={`font-mono text-[8px] tracking-widest uppercase py-1 px-3.5 rounded transition-all duration-300 ${
              savePressed 
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold' 
                : 'bg-stone-800 text-stone-400 border border-white/5'
            }`}
          >
            {savePressed ? "LAUNCHED" : "READY"}
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
            [ OUR MISSION ]
          </span>
          
          <div className="space-y-8">
            <div className="manifesto-reveal">
              <span className="font-mono text-[10px] text-[#FAF8F5]/40 uppercase block mb-1.5">TRADITIONAL BOTTLENECKS //</span>
              <p className="text-sm md:text-base font-light text-stone-400 font-sans leading-relaxed">
                Most design studios and web agencies focus exclusively on <span className="text-[#FAF8F5] font-semibold">unnecessarily complex code</span>, infinite multi-month layouts, and excessive invoice rates. Small business owners pay thousands just to end up standing still.
              </p>
            </div>

            <div className="manifesto-reveal border-t border-[#FAF8F5]/5 pt-6">
              <span className="font-mono text-[10px] text-[#C9A84C] uppercase block mb-1.5">THE AVANTA APPROACH //</span>
              <h2 className="text-xl md:text-2xl font-bold font-sans text-[#FAF8F5] tracking-tight leading-relaxed">
                We focus purely on <span className="font-serif italic text-[#C9A84C] text-2.5xl md:text-3xl font-medium block sm:inline">helping your brand stand out.</span> Clean, high-end branding, lightning-fast delivery in 7 days, and direct client call buttons that work seamlessly.
              </h2>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:block w-px h-56 bg-[#FAF8F5]/10 self-stretch relative z-10" />

        {/* Grid of detail numbers following Bento Design stats block */}
        <div className="manifesto-reveal grid grid-cols-2 gap-6 w-full lg:w-auto shrink-0 select-none relative z-10">
          <div className="flex flex-col bg-[#0D0D12] p-6 rounded-2xl border border-[#FAF8F5]/5 min-w-[130px] shadow-inner">
            <span className="text-4xl font-light font-sans text-[#C9A84C] leading-none">7</span>
            <span className="text-[9px] font-mono text-[#FAF8F5]/40 uppercase tracking-widest mt-2 block">Days Delivery</span>
          </div>
          <div className="flex flex-col bg-[#0D0D12] p-6 rounded-2xl border border-[#FAF8F5]/5 min-w-[130px] shadow-inner">
            <span className="text-4xl font-light font-sans text-[#C9A84C] leading-none">$250</span>
            <span className="text-[9px] font-mono text-[#FAF8F5]/40 uppercase tracking-widest mt-2 block">Starting Price</span>
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
      title: "Design Your Brand & Logos",
      desc: "We build a beautiful, high-end visual look for your business (logo, colors, clear simple fonts) to tell Alexandria and Cairo customers that you offer premium quality.",
      visual: "spin"
    },
    {
      num: "02",
      title: "Build Your Fast New Website",
      desc: "Our team creates a custom, easy-to-use website that loads immediately on all phones and desktops. We make sure it is designed solely to turn local visitors into paying regulars.",
      visual: "laser"
    },
    {
      num: "03",
      title: "Connect WhatsApp & Launch",
      desc: "We add direct chat buttons that let customers call, book, or order easily with one click. Your brand and website goes live in exactly 7 days.",
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
          [ HOW WE WORK ]
        </span>
        <h2 className="text-3xl md:text-5xl font-sans font-bold text-ivory tracking-tight mb-4">
          Our simple 3-step design process
        </h2>
        <p className="text-sm font-sans text-stone-400 max-w-xl mx-auto">
          We combine premium branding, fast launch, and direct WhatsApp buttons to make starting your project effortless.
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
                STEP {step.num}
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
                      <span>DESIGN BUILD:</span>
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
                    WHATSAPP CONNECTED
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
              [ OUR RECENT WORK ]
            </span>
            <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-ivory font-bold">
              Designs that help local brands <span className="font-serif italic text-champagne font-medium">grow and stand out</span>.
            </h2>
          </div>
          <p className="text-stone-400 font-sans text-sm max-w-sm md:text-right leading-relaxed mb-1">
            Browse our beautiful designs crafted specifically for local gyms, skincare shops, and cafes in Cairo and Alexandria.
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
                      LIVE CLIENT WEBSITE
                    </span>
                  ) : (
                    <span className="font-mono text-[9px] bg-[#0D0D12]/90 text-[#FAF8F5]/60 px-2.5 py-1 rounded-full uppercase tracking-widest border border-[#FAF8F5]/10">
                      CONCEPT DESIGN STYLE
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
                        <span>See Our Work →</span>
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#FAF8F5]/40">{caseStudy.stats}</span>
                      <a 
                        href={getWhatsAppURL(`Hi Avanta, I really like the '${caseStudy.title}' design style. Can we do something similar for my business?`)}
                        className="inline-flex items-center gap-1 font-mono text-[10px] text-[#FAF8F5]/60 hover:text-[#C9A84C] transition-colors uppercase tracking-widest"
                      >
                        <span>Start Your Project →</span>
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
      name: "Professional Brand Design",
      price: "$150",
      time: "5–7 Days Delivery",
      desc: "For local shops and cafes that have loyal customers but want to look highly professional and modern.",
      features: [
        "Complete Logo Package",
        "Beautiful & Clear Fonts",
        "Professional Color Palette",
        "Ready-to-print logo files",
        "Formatted graphics for social media"
      ],
      cta: "Start Your Project →",
      highlight: false
    },
    {
      name: "The Complete Online Package",
      price: "$250",
      time: "7–10 Days Delivery",
      desc: "Our best-selling package. We design your unique brand look and build your fast, customer-getting website all in one.",
      features: [
        "Everything in Professional Brand Design",
        "Fast, High-Converting Website",
        "Fully optimized for mobile screens",
        "Built-in WhatsApp booking button",
        "100% ownership of design & files",
        "Optimized for local search in Egypt"
      ],
      cta: "Start Your Project →",
      highlight: true
    },
    {
      name: "Nile Launch Offer",
      price: "$120",
      time: "3–5 Days Delivery",
      desc: "A rapid, single-page website to launch your business online. Perfect for getting direct bookings immediately via social media.",
      features: [
        "One-page custom-coded website",
        "Clear call-to-action sections",
        "Integrated WhatsApp button",
        "Lightning-fast mobile load speed",
        "Free hosting setup help"
      ],
      cta: "Start Your Project →",
      highlight: false
    }
  ];

  return (
    <section id="investment" className="relative py-24 md:py-32 px-6 bg-[#09090D] z-10 border-t border-slate-custom/20">
      <div className="max-w-7xl mx-auto">
        {/* Title block */}
        <div className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs text-champagne uppercase tracking-[0.25em] block mb-4">
            [ SIMPLE UPFRONT PLANS ]
          </span>
          <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-ivory font-bold mb-4">
            No hidden fees. Simple upfront prices.
          </h2>
          <p className="text-stone-400 font-sans text-sm md:text-base">
            Simple 7-day delivery targets. Start with a 50% deposit, and pay the rest only after you are completely happy with the final launch.
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
                    ★ RECOMMENDED COMPLETE PLAN
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
                  <span className="font-mono text-[9px] text-[#FAF8F5]/40 uppercase tracking-widest block mb-4">WHAT IS INCLUDED</span>
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
              We create beautiful brand logos and build ultra-fast websites to help Egyptian cafes, gyms, and shops attract regular, paying customers.
            </p>
          </div>

          {/* Quick links block */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-[#DAB85A] uppercase tracking-[0.2em] block">STUDIO LINKS</span>
            <ul className="space-y-2 text-xs font-mono text-stone-500">
              <li><a href="#services" className="hover:text-champagne transition-colors">OUR SERVICES</a></li>
              <li><a href="#protocol" className="hover:text-champagne transition-colors">HOW IT WORKS</a></li>
              <li><a href="#case-studies" className="hover:text-champagne transition-colors">CASE STUDIES</a></li>
              <li><a href="#investment" className="hover:text-champagne transition-colors">PRICING PACKAGES</a></li>
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
            <span>AVANTA STUDIO · ALEXANDRIA &amp; CAIRO · EST. 2026</span>
          </div>

          <div>
            <span>© 2026 AVANTA INC. · BUILT WITH PASSION &amp; PRIDE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
