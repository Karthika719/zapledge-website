"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnimatedButton from './ui/AnimatedButton';

type DropdownType = 'what-we-do' | 'industries' | null;

export interface NavLinkItem {
  label: string;
  href: string;
}

// 4 actual services as defined across the site
const whatWeDoServices: NavLinkItem[] = [
  { label: 'AI Transformation & Consulting', href: '/services/ai-transformation-consulting' },
  { label: 'AI Engineering', href: '/services/ai-engineering' },
  { label: 'AI Automation', href: '/services/ai-automation ' },
  { label: 'IoT & Intelligent Operations', href: '/services/iot-intelligent-operations' },
];

// Actual priority & secondary industries as defined in IndustriesSection
const priorityIndustries: NavLinkItem[] = [
  { label: 'Manufacturing Tech', href: '/industries/manufacturing-tech' },
  { label: 'FinTech', href: '/industries#fintech' },
  { label: 'WealthTech', href: '/industries#wealthtech' },
  { label: 'HealthTech', href: '/industries#healthtech' },
];

const secondaryIndustries: NavLinkItem[] = [
  { label: 'EdTech', href: '/industries#edtech' },
  { label: 'MarineTech', href: '/industries#marinetech' },
  { label: 'Construction', href: '/industries#construction' },
  { label: 'Retail', href: '/industries#retail' },
];

export const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownType>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on route change during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setMobileExpanded(null);
  }

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Prevent background scroll when mobile menu overlay is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (menu: DropdownType) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    }
  }, []);

  const toggleMobileAccordion = (category: DropdownType) => {
    setMobileExpanded((prev) => (prev === category ? null : category));
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* TOP FLOATING NAVBAR (Desktop + Mobile)                                    */}
      {/* ========================================================================= */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pointer-events-none"
        onKeyDown={handleKeyDown}
      >
        {/* Floating Capsule Bar */}
        <nav
          className={`w-full max-w-7xl h-[72px] rounded-2xl flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-auto border ${
            isScrolled
              ? 'bg-white/80 backdrop-blur-md border-[#E5E5E5] shadow-lg shadow-[#00003C]/5'
              : 'bg-white border-[#E5E5E5] shadow-sm'
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand Identity: Left-aligned on all screen sizes */}
          <Link
            href="/"
            className="flex items-center justify-start gap-3 group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/20 rounded-lg text-left"
            aria-label="Zapledge International Home"
          >
            {/* Logomark Icon */}
            <div className="relative h-9 w-9 flex items-center justify-center shrink-0">
              <Image
                src="/images/zapledge/icon.png"
                alt="Zapledge Logo Mark"
                width={36}
                height={36}
                priority
                className="h-9 w-9 object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>

            {/* Two-Line Brand Name Lockup */}
            <div className="flex flex-col justify-center text-left">
              <span className="text-[17px] sm:text-[18px] font-bold tracking-tight text-[#00003C] leading-none group-hover:text-[#0033FF] transition-colors">
                Zapledge
              </span>
              <span className="text-[9.5px] sm:text-[10.5px] font-medium tracking-tight text-[#555555] leading-none mt-1">
                International Private Limited
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {/* What We Do Dropdown Anchor */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('what-we-do')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'what-we-do' ? null : 'what-we-do')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/20 cursor-pointer ${
                  activeDropdown === 'what-we-do'
                    ? 'bg-[#0033FF]/10 text-[#0033FF]'
                    : 'text-[#333333] hover:text-[#0033FF] hover:bg-[#0033FF]/5'
                }`}
                aria-expanded={activeDropdown === 'what-we-do'}
                aria-haspopup="true"
              >
                <span>What We Do</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'what-we-do' ? 'rotate-180 text-[#0033FF]' : 'text-[#555555]'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* What We Do: Single-Column Menu */}
              {activeDropdown === 'what-we-do' && (
                <div
                  className="absolute top-full left-0 pt-2.5 z-50 pointer-events-auto"
                  onMouseEnter={() => handleMouseEnter('what-we-do')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-[340px] bg-white/95 backdrop-blur-md border border-[#E5E5E5] rounded-2xl shadow-xl shadow-[#00003C]/8 p-5 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="pb-2 mb-2 border-b border-[#E5E5E5]/80">
                      <span className="text-xs font-bold text-[#00003C] uppercase tracking-wider">
                        Our Services
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {whatWeDoServices.map((service) => (
                        <li key={service.label}>
                          <Link
                            href={service.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block py-2 px-2.5 rounded-lg text-sm font-medium text-[#333333] hover:text-[#0033FF] hover:bg-[#0033FF]/5 hover:translate-x-1 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/20"
                          >
                            {service.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Industries Dropdown Anchor */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('industries')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'industries' ? null : 'industries')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/20 cursor-pointer ${
                  activeDropdown === 'industries'
                    ? 'bg-[#0033FF]/10 text-[#0033FF] font-semibold'
                    : 'text-[#333333] hover:text-[#0033FF] hover:bg-[#0033FF]/5'
                }`}
                aria-expanded={activeDropdown === 'industries'}
                aria-haspopup="true"
              >
                <span>Industries</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === 'industries' ? 'rotate-180 text-[#0033FF]' : 'text-[#555555]'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Industries: Two-Column Menu */}
              {activeDropdown === 'industries' && (
                <div
                  className="absolute top-full left-0 pt-2.5 z-50 pointer-events-auto"
                  onMouseEnter={() => handleMouseEnter('industries')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-[580px] bg-white/95 backdrop-blur-md border border-[#E5E5E5] rounded-2xl shadow-xl shadow-[#00003C]/8 p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Left Column: Core Sectors */}
                      <div className="space-y-2">
                        <div className="pb-2 border-b border-[#E5E5E5]/80">
                          <span className="text-xs font-bold text-[#00003C] uppercase tracking-wider">
                            Core Sectors
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {priorityIndustries.map((ind) => (
                            <li key={ind.label}>
                              <Link
                                href={ind.href}
                                onClick={() => setActiveDropdown(null)}
                                className="block py-2 px-2.5 rounded-lg text-sm font-medium text-[#333333] hover:text-[#0033FF] hover:bg-[#0033FF]/5 hover:translate-x-1 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/20"
                              >
                                {ind.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Column: Extended Sectors */}
                      <div className="space-y-2">
                        <div className="pb-2 border-b border-[#E5E5E5]/80">
                          <span className="text-xs font-bold text-[#00003C] uppercase tracking-wider">
                            Extended Sectors
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {secondaryIndustries.map((ind) => (
                            <li key={ind.label}>
                              <Link
                                href={ind.href}
                                onClick={() => setActiveDropdown(null)}
                                className="block py-2 px-2.5 rounded-lg text-sm font-medium text-[#333333] hover:text-[#0033FF] hover:bg-[#0033FF]/5 hover:translate-x-1 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/20"
                              >
                                {ind.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Why Zapledge Plain Link */}
            <Link
              href="/#why-zapledge"
              className="px-3 py-2 rounded-xl text-sm font-medium text-[#333333] hover:text-[#0033FF] hover:bg-[#0033FF]/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/20"
            >
              Why Zapledge
            </Link>

            {/* About Zapledge Plain Link */}
            <Link
              href="/about"
              aria-current={pathname === '/about' ? 'page' : undefined}
              className={`px-3 py-2 rounded-xl text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/20 ${
                pathname === '/about'
                  ? 'bg-[#0033FF]/10 text-[#0033FF] font-semibold'
                  : 'font-medium text-[#333333] hover:text-[#0033FF] hover:bg-[#0033FF]/5'
              }`}
            >
              About Zapledge
            </Link>
          </div>

          {/* Right: Desktop CTA Button (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3">
            <AnimatedButton
              href="/contact"
              variant="primary"
              size="sm"
              className="shadow-sm font-semibold tracking-wide"
            >
              Get Free Consultation
            </AnimatedButton>
          </div>

          {/* Right: Mobile Hamburger Menu Button (Hidden on desktop) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden flex items-center justify-center p-2 rounded-xl text-[#00003C] hover:text-[#0033FF] hover:bg-[#0033FF]/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/20 cursor-pointer"
          >
            {mobileMenuOpen ? (
              /* Close (X) Icon */
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Hamburger (☰) Icon */
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE FULL-SCREEN / SLIDE-OVER ACCORDION MENU OVERLAY                    */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 md:hidden flex justify-end pointer-events-auto"
        >
          {/* Semi-transparent Dark Backdrop */}
          <div
            className="fixed inset-0 bg-[#00003C]/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <div className="relative w-full max-w-sm sm:max-w-md h-full bg-white shadow-2xl border-l border-[#E5E5E5] flex flex-col z-10 animate-in slide-in-from-right duration-300 overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5E5]/80 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/zapledge/icon.png"
                  alt="Zapledge"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-base font-bold text-[#00003C] tracking-tight leading-none">
                    Zapledge
                  </span>
                  <span className="text-[9.5px] font-medium text-[#555555] leading-none mt-1">
                    International Private Limited
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-[#555555] hover:text-[#00003C] hover:bg-gray-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0033FF]/20 cursor-pointer"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Accordion Categories & Links */}
            <div className="overflow-y-auto px-6 py-4 divide-y divide-[#E5E5E5]/70 flex-1">
              {/* Category 1: What We Do (Accordion) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('what-we-do')}
                  aria-expanded={mobileExpanded === 'what-we-do'}
                  aria-controls="mobile-panel-what-we-do"
                  className="w-full py-3 flex items-center justify-between text-left text-base font-bold text-[#00003C] hover:text-[#0033FF] transition-colors group cursor-pointer"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">What We Do</span>
                  <svg
                    className={`w-5 h-5 text-[#0033FF] transition-transform duration-200 ${
                      mobileExpanded === 'what-we-do' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  id="mobile-panel-what-we-do"
                  className={`grid transition-all duration-200 ease-in-out ${
                    mobileExpanded === 'what-we-do' ? 'grid-rows-[1fr] opacity-100 pb-3' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden pl-3 space-y-2 pt-1">
                    {whatWeDoServices.map((service) => (
                      <Link
                        key={service.label}
                        href={service.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm font-medium text-[#555555] hover:text-[#0033FF] transition-colors"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category 2: Industries (Accordion) */}
              <div className="py-2">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('industries')}
                  aria-expanded={mobileExpanded === 'industries'}
                  aria-controls="mobile-panel-industries"
                  className="w-full py-3 flex items-center justify-between text-left text-base font-bold text-[#00003C] hover:text-[#0033FF] transition-colors group cursor-pointer"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Industries</span>
                  <svg
                    className={`w-5 h-5 text-[#0033FF] transition-transform duration-200 ${
                      mobileExpanded === 'industries' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  id="mobile-panel-industries"
                  className={`grid transition-all duration-200 ease-in-out ${
                    mobileExpanded === 'industries' ? 'grid-rows-[1fr] opacity-100 pb-3' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden pl-3 space-y-2 pt-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#00003C]/70">
                      Core Sectors
                    </div>
                    {priorityIndustries.map((ind) => (
                      <Link
                        key={ind.label}
                        href={ind.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm font-medium text-[#555555] hover:text-[#0033FF]"
                      >
                        {ind.label}
                      </Link>
                    ))}
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#00003C]/70 pt-2">
                      Extended Sectors
                    </div>
                    {secondaryIndustries.map((ind) => (
                      <Link
                        key={ind.label}
                        href={ind.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm font-medium text-[#555555] hover:text-[#0033FF]"
                      >
                        {ind.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category 3: Why Zapledge (Direct Link) */}
              <div className="py-2">
                <Link
                  href="/#why-zapledge"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 flex items-center justify-between text-base font-bold text-[#00003C] hover:text-[#0033FF] transition-colors"
                >
                  <span>Why Zapledge</span>
                  <span className="text-gray-400 font-normal">→</span>
                </Link>
              </div>

              {/* Category 4: About Zapledge (Direct Link) */}
              <div className="py-2">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={pathname === '/about' ? 'page' : undefined}
                  className={`w-full py-3 flex items-center justify-between text-base font-bold hover:text-[#0033FF] transition-colors ${
                    pathname === '/about' ? 'text-[#0033FF]' : 'text-[#00003C]'
                  }`}
                >
                  <span>About Zapledge</span>
                  <span className="text-gray-400 font-normal">→</span>
                </Link>
              </div>

              {/* Category 5: Contact Page Link */}
              <div className="py-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 flex items-center justify-between text-base font-bold text-[#00003C] hover:text-[#0033FF] transition-colors"
                >
                  <span>Contact Us</span>
                  <span className="text-gray-400 font-normal">→</span>
                </Link>
              </div>
            </div>

            {/* Prominent CTA Consultation Action inside Mobile Menu */}
            <div className="p-6 border-t border-[#E5E5E5] bg-gray-50/80">
              <AnimatedButton
                href="/contact"
                variant="primary"
                size="md"
                className="w-full font-semibold justify-center text-center shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Free Consultation
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
