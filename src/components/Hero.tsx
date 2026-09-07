import profileData from '../data/profile.json'
import type { Profile } from '../types/content'
import { trackEvent } from '../lib/analytics'

const profile = profileData as Profile

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction and Profile"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 relative z-10 overflow-hidden"
    >
      <div className="max-w-3xl space-y-6">
        {/* Retro Quest Status Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#172033] border border-[#38bdf8]/50 text-[#38bdf8]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" aria-hidden="true" />
            <span className="font-arcade text-[9px] sm:text-[10px] uppercase tracking-wider">
              STATUS: ACTIVE • OPEN TO QUESTS
            </span>
          </div>
        </div>

        {/* Name & Role */}
        <div className="space-y-2.5">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            {profile.name}
          </h1>
          <p className="font-arcade text-xs sm:text-sm text-[#f59e0b] tracking-wide leading-relaxed">
            &gt; {profile.role}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          {profile.tagline}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('resume_download_click', { url: profile.resumeUrl })}
            aria-label="Download or view Ruhaan's Resume"
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-[#ff4726] hover:bg-[#ff300a] text-white font-arcade text-xs tracking-wider transition-all shadow-[0_4px_0_0_#991b1b] active:translate-y-1 active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#ff4726]"
          >
            VIEW RESUME
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Ruhaan's GitHub profile"
            className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-[#172033] hover:bg-[#1f2c47] text-slate-200 font-arcade text-[10px] tracking-wider transition-all border border-[#2a3650] shadow-[0_4px_0_0_#0a0c16] active:translate-y-1 active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          >
            GITHUB
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with Ruhaan on LinkedIn"
            className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-[#172033] hover:bg-[#1f2c47] text-slate-200 font-arcade text-[10px] tracking-wider transition-all border border-[#2a3650] shadow-[0_4px_0_0_#0a0c16] active:translate-y-1 active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          >
            LINKEDIN
          </a>

          <a
            href="#contact"
            aria-label="Jump to contact section to send a message"
            className="inline-flex items-center justify-center px-4 py-3 rounded-lg text-slate-400 hover:text-white font-arcade text-[10px] tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          >
            SUMMON &darr;
          </a>
        </div>
      </div>
    </section>
  )
}

