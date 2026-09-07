import profileData from '../data/profile.json'
import type { Profile } from '../types/content'
import DragonIdle from './DragonIdle'
import { trackEvent } from '../lib/analytics'

const profile = profileData as Profile

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction and Profile"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 relative z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left / Main Hero Content */}
        <div className="lg:col-span-7 space-y-6">
          {/* Retro Quest Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#172033] border border-[#38bdf8]/50 text-[#38bdf8]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" aria-hidden="true" />
            <span className="font-arcade text-[9px] sm:text-[10px] uppercase tracking-wider">
              STATUS: ACTIVE // OPEN TO QUESTS
            </span>
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
          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
            {profile.tagline}
          </p>

          {/* Current Quest / Looking For */}
          <div className="pixel-card p-5 rounded-xl border-l-4 border-l-[#f59e0b]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm" aria-hidden="true">📜</span>
              <span className="font-arcade text-[9px] sm:text-[10px] font-semibold text-[#f59e0b] tracking-wider">
                PRIMARY QUEST // LOOKING FOR:
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {profile.lookingFor}
            </p>
          </div>

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

        {/* Right / Companion Dragon Rig */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center pt-4 lg:pt-0">
          <DragonIdle />
          <div className="mt-3 px-3 py-1 rounded-full bg-[#172033]/80 border border-[#2a3650] text-slate-400 font-arcade text-[8px] tracking-wider text-center">
            COMPANION: DRAGON BOOMER [LVL 4]
          </div>
        </div>
      </div>
    </section>
  )
}
