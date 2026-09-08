import profileData from '../data/profile.json'
import type { Profile } from '../types/content'

const profile = profileData as Profile

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#2a3650] bg-[#0a0c16] py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="font-arcade text-[8px] sm:text-[9px] text-slate-400">
            &copy; {currentYear} {profile.name} • DRAG&apos;N&apos;BOOM
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="min-h-[44px] inline-flex items-center text-slate-400 hover:text-white transition-colors focus:outline-none focus:underline"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="min-h-[44px] inline-flex items-center text-slate-400 hover:text-white transition-colors focus:outline-none focus:underline"
          >
            LinkedIn
          </a>
          <a
            href="#hero"
            aria-label="Back to top of page"
            className="min-h-[44px] inline-flex items-center font-arcade text-[9px] text-[#f59e0b] hover:text-[#fbbf24] transition-colors focus:outline-none focus:underline"
          >
            TOP &uarr;
          </a>
        </div>
      </div>
    </footer>
  )
}
