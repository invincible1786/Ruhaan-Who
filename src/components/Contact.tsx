import profileData from '../data/profile.json'
import type { Profile } from '../types/content'

const profile = profileData as Profile

export default function Contact() {
  const phone = profile.phone || '(+91) 7330022221'
  const formattedPhoneDigits = phone.replace(/[^0-9+]/g, '')

  return (
    <section
      id="contact"
      aria-label="Contact and Summoning Portal"
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center"
    >
      <div className="space-y-6 flex flex-col items-center">
        {/* Transmission Badge */}
        <div className="inline-flex items-center justify-center gap-2">
          <span className="font-arcade text-[10px] text-[#ff4726] uppercase tracking-wider">
            CONTINUE SCREEN • TRANSMISSION
          </span>
        </div>

        {/* Title */}
        <h2 className="font-arcade text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
          SUMMON THE ARCHITECT
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl mx-auto">
          Whether initiating a new full-time venture, consulting on high-scale architecture, or tackling an ambitious technical challenge — let&apos;s assemble the party.
        </p>

        {/* Direct Dispatch Frequency Card */}
        <div className="w-full max-w-md pixel-card p-5 sm:p-6 rounded-xl border border-[#2a3650] shadow-lg text-center space-y-3">
          <div className="font-arcade text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400">
            DIRECT DISPATCH FREQUENCY:
          </div>
          <div className="space-y-2">
            <div>
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Send direct email to ${profile.email}`}
                className="text-sm sm:text-base font-bold text-[#38bdf8] hover:text-[#7dd3fc] transition-colors inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] rounded px-2 py-1 break-all"
              >
                <span>{profile.email}</span>
              </a>
            </div>
            {phone && (
              <div>
                <a
                  href={`tel:${formattedPhoneDigits}`}
                  aria-label={`Call Ruhaan at ${phone}`}
                  className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] rounded px-2 py-1"
                >
                  <span className="font-arcade text-xs text-[#f59e0b]">{phone}</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Social / Direct Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ruhaan on GitHub"
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-lg bg-[#172033] hover:bg-[#202c44] text-slate-200 font-arcade text-[10px] tracking-wider border border-[#2a3650] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          >
            GITHUB &rarr;
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ruhaan on LinkedIn"
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-lg bg-[#172033] hover:bg-[#202c44] text-slate-200 font-arcade text-[10px] tracking-wider border border-[#2a3650] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
          >
            LINKEDIN &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
