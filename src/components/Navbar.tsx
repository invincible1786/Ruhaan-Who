import { useState, useEffect } from 'react'
import profileData from '../data/profile.json'
import type { Profile } from '../types/content'

const profile = profileData as Profile

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navLinks = [
    { label: 'ARSENAL', href: '#stack', ariaLabel: 'Navigate to Skills Arsenal' },
    { label: 'QUESTS', href: '#projects', ariaLabel: 'Navigate to Projects Section' },
    { label: 'LOGS', href: '#experience', ariaLabel: 'Navigate to Experience Timeline' },
    { label: 'SUMMON', href: '#contact', ariaLabel: 'Navigate to Contact Section', isCta: true },
  ]

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0c16]/95 backdrop-blur-md border-b-2 border-[#2a3650] shadow-[0_4px_0_0_#0a0c16]">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-50 px-4 py-2 bg-[#ff4726] text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Name - single line on all devices */}
        <a
          href="#hero"
          aria-label={`${profile.name} - Home`}
          onClick={handleLinkClick}
          className="flex items-center gap-2 text-white hover:text-[#f59e0b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#f59e0b] rounded px-1 py-1 shrink-0"
        >
          <span className="font-arcade text-xs sm:text-sm tracking-tight text-white whitespace-nowrap">
            {profile.name}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden sm:flex items-center gap-2">
          {navLinks.map((link) =>
            link.isCta ? (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.ariaLabel}
                className="ml-1 font-arcade text-xs px-3.5 py-2 rounded bg-[#ff4726] hover:bg-[#ff300a] text-white transition-all shadow-[0_2px_0_0_#991b1b] active:translate-y-0.5 active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#ff4726]"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.ariaLabel}
                className="font-arcade text-xs px-3 py-2 rounded text-slate-300 hover:text-white hover:bg-[#172033] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-menu"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="sm:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 py-2 rounded-lg bg-[#172033] border border-[#2a3650] text-slate-200 hover:text-white hover:border-[#38bdf8] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] font-arcade text-[10px] tracking-wider transition-colors"
        >
          <span className="mr-1.5">{mobileMenuOpen ? '✕' : '☰'}</span>
          <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
        </button>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          aria-label="Mobile Navigation Menu"
          className="sm:hidden border-t border-[#2a3650] bg-[#0d111d] px-4 py-4 space-y-2 shadow-2xl animate-in fade-in duration-150"
        >
          <div className="grid grid-cols-2 gap-2">
            <a
              href="#stack"
              onClick={handleLinkClick}
              aria-label="Navigate to Skills Arsenal"
              className="min-h-[48px] inline-flex items-center justify-center rounded-lg bg-[#172033] border border-[#2a3650] text-slate-200 hover:text-white hover:border-[#38bdf8] font-arcade text-xs tracking-wider transition-colors active:scale-98"
            >
              ARSENAL
            </a>
            <a
              href="#projects"
              onClick={handleLinkClick}
              aria-label="Navigate to Projects Section"
              className="min-h-[48px] inline-flex items-center justify-center rounded-lg bg-[#172033] border border-[#2a3650] text-slate-200 hover:text-white hover:border-[#38bdf8] font-arcade text-xs tracking-wider transition-colors active:scale-98"
            >
              QUESTS
            </a>
            <a
              href="#experience"
              onClick={handleLinkClick}
              aria-label="Navigate to Experience Timeline"
              className="min-h-[48px] inline-flex items-center justify-center rounded-lg bg-[#172033] border border-[#2a3650] text-slate-200 hover:text-white hover:border-[#38bdf8] font-arcade text-xs tracking-wider transition-colors active:scale-98"
            >
              LOGS
            </a>
            <a
              href="#contact"
              onClick={handleLinkClick}
              aria-label="Navigate to Contact Section"
              className="min-h-[48px] inline-flex items-center justify-center rounded-lg bg-[#ff4726] hover:bg-[#ff300a] text-white font-arcade text-xs tracking-wider shadow-[0_2px_0_0_#991b1b] transition-all active:scale-98"
            >
              SUMMON
            </a>
          </div>

          <div className="pt-2 border-t border-[#2a3650]/60 flex items-center justify-between text-[10px] text-slate-400 px-1">
            <a
              href={`mailto:${profile.email}`}
              className="text-[#38bdf8] hover:underline"
              onClick={handleLinkClick}
            >
              {profile.email}
            </a>
            {profile.phone && <span className="text-[#f59e0b] font-arcade">{profile.phone}</span>}
          </div>
        </nav>
      )}
    </header>
  )
}
