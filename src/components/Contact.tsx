import { useState, type FormEvent } from 'react'
import profileData from '../data/profile.json'
import type { Profile } from '../types/content'

const profile = profileData as Profile

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formspreeEndpoint =
    (import.meta.env.VITE_FORMSPREE_URL as string | undefined) ||
    'https://formspree.io/f/placeholder'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setSubmitted(true)
        form.reset()
      } else {
        setError('Submission failed or placeholder endpoint active. Please transmit via direct email below!')
      }
    } catch {
      setError('Network error transmitting message. Please summon via direct email below.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact and Summoning Portal"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side: Continue Screen Briefing */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="font-arcade text-[10px] text-[#ff4726] uppercase tracking-wider block">
              CONTINUE SCREEN • TRANSMISSION
            </span>
          </div>

          <h2 className="font-arcade text-lg sm:text-2xl font-bold tracking-tight text-white leading-snug">
            SUMMON THE ARCHITECT
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Whether initiating a new full-time venture, consulting on high-scale architecture, or tackling an ambitious technical challenge — let&apos;s assemble the party.
          </p>

          <div className="pixel-card p-5 rounded-xl border-l-4 border-l-[#38bdf8] space-y-3">
            <div className="font-arcade text-[9px] uppercase tracking-wider text-slate-400">
              DIRECT DISPATCH FREQUENCY:
            </div>
            <div className="space-y-2">
              <div>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label={`Send direct email to ${profile.email}`}
                  className="text-sm sm:text-base font-bold text-[#38bdf8] hover:text-[#7dd3fc] transition-colors inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] rounded"
                >
                  <span>{profile.email}</span>
                </a>
              </div>
              {profile.phone && (
                <div>
                  <a
                    href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                    aria-label={`Call Ruhaan at ${profile.phone}`}
                    className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] rounded"
                  >
                    <span className="font-arcade text-xs text-[#f59e0b]">{profile.phone}</span>
                  </a>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Guaranteed transmission response within 24–48 hours.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ruhaan on GitHub"
              className="px-4 py-2.5 rounded-lg bg-[#172033] hover:bg-[#202c44] text-slate-200 font-arcade text-[10px] tracking-wider border border-[#2a3650] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
            >
              GITHUB &rarr;
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ruhaan on LinkedIn"
              className="px-4 py-2.5 rounded-lg bg-[#172033] hover:bg-[#202c44] text-slate-200 font-arcade text-[10px] tracking-wider border border-[#2a3650] transition-colors focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
            >
              LINKEDIN &rarr;
            </a>
          </div>
        </div>

        {/* Right Side: Quest Scroll Arcade Form */}
        <div className="quest-scroll-panel">
          <div className="quest-scroll-border">
            <div className="quest-scroll-content p-6 sm:p-7 pb-10">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#2a3650]">
            <span className="font-arcade text-xs text-white">
              DISPATCH TRANSMISSION
            </span>
          </div>

          {submitted ? (
            <div className="p-5 rounded-xl bg-[#0a0c16] border border-[#10b981] text-emerald-200 text-sm space-y-3">
              <p className="font-arcade text-xs text-[#10b981]">
                TRANSMISSION DELIVERED!
              </p>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Thank you for reaching out. I will respond to your transmission promptly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                aria-label="Send another transmission"
                className="mt-2 font-arcade text-[9px] text-[#f59e0b] hover:underline block"
              >
                &lt; SEND ANOTHER TRANSMISSION &gt;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-arcade text-[9px] text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  PLAYER NAME / ALIAS
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0c16] border border-[#2a3650] text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-arcade text-[9px] text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  RETURN FREQUENCY / EMAIL
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0c16] border border-[#2a3650] text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-arcade text-[9px] text-slate-300 uppercase tracking-wider mb-1.5"
                >
                  QUEST OBJECTIVE / MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Describe your quest, team, or challenge..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0c16] border border-[#2a3650] text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent resize-y"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-[#0a0c16] border border-[#ff4726] text-[#ff4726] text-xs leading-relaxed font-normal">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Submit transmission form to Ruhaan"
                className="w-full py-3 px-4 rounded-lg bg-[#ff4726] hover:bg-[#ff300a] disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-arcade text-xs tracking-wider transition-all shadow-[0_4px_0_0_#991b1b] active:translate-y-1 active:shadow-none focus:outline-none focus:ring-2 focus:ring-[#ff4726]"
              >
                {isSubmitting ? 'DISPATCHING...' : 'DISPATCH TRANSMISSION'}
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-500">
                  Or bypass form and email directly via{' '}
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label="Direct mailto link fallback"
                    className="text-[#38bdf8] hover:underline"
                  >
                    mailto link
                  </a>
                </span>
              </div>
            </form>
          )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
