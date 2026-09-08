import experienceData from '../data/experience.json'
import type { ExperienceItem } from '../types/content'

const experience = experienceData as ExperienceItem[]

export default function ExperienceLog() {
  return (
    <section
      id="experience"
      aria-label="Professional Experience and Career Timeline"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="space-y-5 sm:space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-arcade text-[9px] sm:text-xs text-[#a855f7] uppercase tracking-wider">
              CAMPAIGN CHRONICLES • CAREER TIMELINE
            </span>
          </div>
          <h2 className="font-arcade text-base sm:text-2xl font-bold tracking-tight text-white break-words">
            CAMPAIGN CHRONICLES
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-1 font-normal">
            Proven track record of engineering leadership, production scalability, and system architecture.
          </p>
        </div>

        <div className="relative border-l-2 border-[#2a3650] ml-2.5 sm:ml-4 space-y-6 sm:space-y-8 pl-5 sm:pl-8">
          {experience.map((item, idx) => (
            <article
              key={`${item.company}-${idx}`}
              className="relative group"
              aria-labelledby={`exp-title-${idx}`}
            >
              {/* Glowing Timeline Checkpoint Node precisely centered over the line */}
              <div
                className="absolute -left-[26px] sm:-left-[38px] top-2 w-3.5 h-3.5 rounded-full bg-[#38bdf8] border-2 border-[#0a0c16] ring-4 ring-[#172033]"
                aria-hidden="true"
              />

              <div className="pixel-card p-4 sm:p-6 rounded-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 id={`exp-title-${idx}`} className="text-base sm:text-lg font-bold text-white tracking-tight break-words">
                    {item.title}{' '}
                    <span className="text-[#38bdf8] font-medium block sm:inline">@ {item.company}</span>
                  </h3>
                  <time className="font-arcade text-[9px] sm:text-[10px] text-[#f59e0b] tracking-wider shrink-0 mt-0.5 sm:mt-0">
                    [{item.year}]
                  </time>
                </div>

                {/* Quantified Result Banner */}
                <div className="p-3 sm:p-3.5 rounded-lg bg-[#0a0c16] border border-[#10b981]/40">
                  <span className="font-arcade text-[8px] uppercase tracking-wider text-[#10b981] block mb-1">
                    TACTICAL OUTCOME & IMPACT:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal break-words">
                    {item.result}
                  </p>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 sm:px-2.5 rounded text-[11px] sm:text-xs font-medium bg-[#172033] text-slate-300 border border-[#2a3650]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Guild Leadership & Extracurricular Honors */}
        <div className="pt-2 sm:pt-4">
          <div className="pixel-card p-4 sm:p-6 rounded-2xl border-l-4 border-l-[#a855f7] space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-arcade text-[9px] sm:text-xs text-[#a855f7] uppercase tracking-wider">
                GUILD LEADERSHIP, CULTURAL & ATHLETIC HONORS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0a0c16] border border-[#2a3650] space-y-1.5">
                <div className="font-arcade text-[8px] sm:text-[9px] text-[#38bdf8] uppercase tracking-wider">
                  CAMPUS LEADERSHIP
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Development Head @ Developers Society</li>
                  <li>• Researcher @ TeamKART</li>
                  <li>• Secretary @ Communique & NAROES</li>
                </ul>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0a0c16] border border-[#2a3650] space-y-1.5">
                <div className="font-arcade text-[8px] sm:text-[9px] text-[#f59e0b] uppercase tracking-wider">
                  CULTURAL & THEATRE
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• Gold: Stage Play @ Thomso (IIT Roorkee)</li>
                  <li>• Silver: Street Play @ Spring Fest</li>
                  <li>• Stage Actor @ Encore Theatre Guild</li>
                </ul>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0a0c16] border border-[#2a3650] space-y-1.5">
                <div className="font-arcade text-[8px] sm:text-[9px] text-[#10b981] uppercase tracking-wider">
                  SPORTS & SERVICE
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  <li>• State-Level (Punjab) Badminton Singles</li>
                  <li>• Tritiya Sopan (Bharat Scouts & Guides)</li>
                  <li>• Organised 3rd GMUN (250+ delegates)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
