import stackData from '../data/stack.json'
import type { TechStack } from '../types/content'

const stack = stackData as TechStack

interface CategoryConfig {
  key: keyof TechStack
  title: string
  subtitle: string
  accentColor: string
  badgeBg: string
}

const categories: CategoryConfig[] = [
  {
    key: 'weapon',
    title: 'LANGUAGES',
    subtitle: 'Core Syntaxes & Systems',
    accentColor: 'text-[#f59e0b]',
    badgeBg: 'bg-[#f59e0b]/10 text-[#fbbf24] border-[#f59e0b]/30',
  },
  {
    key: 'tool',
    title: 'FRAMEWORKS & LIBRARIES',
    subtitle: 'AI, ML & Full-Stack Web',
    accentColor: 'text-[#38bdf8]',
    badgeBg: 'bg-[#38bdf8]/10 text-[#7dd3fc] border-[#38bdf8]/30',
  },
  {
    key: 'armor',
    title: 'INFRASTRUCTURE & SYSTEMS',
    subtitle: 'Runtimes, Containers & Hardware',
    accentColor: 'text-[#10b981]',
    badgeBg: 'bg-[#10b981]/10 text-[#6ee7b7] border-[#10b981]/30',
  },
  {
    key: 'potion',
    title: 'DATABASES & STATE',
    subtitle: 'Vector, Relational & Caching',
    accentColor: 'text-[#ff4726]',
    badgeBg: 'bg-[#ff4726]/10 text-[#fca5a5] border-[#ff4726]/30',
  },
  {
    key: 'rune',
    title: 'RESEARCH & DISCIPLINES',
    subtitle: 'Vision, RAG, Dynamics & Algorithms',
    accentColor: 'text-[#a855f7]',
    badgeBg: 'bg-[#a855f7]/10 text-[#d8b4fe] border-[#a855f7]/30',
  },
]

export default function TechInventory() {
  return (
    <section
      id="stack"
      aria-label="Technical Skills and Equipment Arsenal"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
    >
      <div className="space-y-4">
        <div>
          <span className="font-arcade text-[9px] sm:text-xs text-[#38bdf8] uppercase tracking-wider block mb-1">
            TECHNICAL ARSENAL
          </span>
          <h2 className="font-arcade text-base sm:text-2xl font-bold tracking-tight text-white break-words">
            EQUIPMENT & ARSENAL
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-1 font-normal">
            Battle-tested skills, frameworks, and infrastructure mastered across production and research campaigns.
          </p>
        </div>

        {/* Inventory Slot Chassis */}
        <div className="inventory-slot-panel">
          <div className="inventory-slot-border">
            <div className="inventory-slot-content p-4 sm:p-8 divide-y divide-[#2a3650]/60 space-y-5 sm:space-y-6">
              {categories.map((cat, idx) => (
                <div key={cat.key} className={idx > 0 ? 'pt-5 sm:pt-6' : ''}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2.5 sm:mb-3">
                    <h3 className={`font-arcade text-xs sm:text-sm font-bold tracking-wide ${cat.accentColor}`}>
                      {cat.title}
                    </h3>
                    <span className="text-[11px] sm:text-xs text-slate-400">
                      {cat.subtitle}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {stack[cat.key].map((item) => (
                      <span
                        key={item}
                        className={`inline-block px-2.5 py-1 sm:px-3 rounded-md text-[11px] sm:text-xs font-medium border ${cat.badgeBg} transition-colors`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
