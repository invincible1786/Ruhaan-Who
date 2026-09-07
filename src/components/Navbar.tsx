import profileData from '../data/profile.json'
import type { Profile } from '../types/content'

const profile = profileData as Profile

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0c16] border-b-2 border-[#2a3650] shadow-[0_4px_0_0_#0a0c16]">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-50 px-4 py-2 bg-[#ff4726] text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#hero"
          aria-label={`${profile.name} - Home`}
          className="flex items-center gap-2.5 text-white hover:text-[#f59e0b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#f59e0b] rounded px-1"
        >
          <span className="font-arcade text-xs sm:text-sm tracking-tight text-white">
            {profile.name}
          </span>
        </a>

        <nav aria-label="Main Navigation" className="flex items-center gap-1 sm:gap-2">
          <a
            href="#stack"
            aria-label="Navigate to Skills Arsenal"
            className="font-arcade text-[10px] sm:text-xs px-2.5 py-1.5 rounded text-slate-300 hover:text-white hover:bg-[#172033] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          >
            ARSENAL
          </a>
          <a
            href="#projects"
            aria-label="Navigate to Projects Section"
            className="font-arcade text-[10px] sm:text-xs px-2.5 py-1.5 rounded text-slate-300 hover:text-white hover:bg-[#172033] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          >
            QUESTS
          </a>
          <a
            href="#experience"
            aria-label="Navigate to Experience Timeline"
            className="font-arcade text-[10px] sm:text-xs px-2.5 py-1.5 rounded text-slate-300 hover:text-white hover:bg-[#172033] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          >
            LOGS
          </a>
          <a
            href="#contact"
            aria-label="Navigate to Contact Form"
            className="ml-1 font-arcade text-[10px] sm:text-xs px-3 py-1.5 rounded bg-[#ff4726] hover:bg-[#ff300a] text-white transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4726]"
          >
            SUMMON
          </a>
        </nav>
      </div>
    </header>
  )
}
