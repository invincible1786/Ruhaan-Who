import stackData from '../data/stack.json'
import type { TechStack } from '../types/content'

const stack = stackData as TechStack

interface CategoryConfig {
  key: keyof TechStack
  title: string
  subtitle: string
  icon: string
  accentColor: string
  badgeBg: string
}

const categories: CategoryConfig[] = [
  {
    key: 'weapon',
    title: 'WEAPONS',
    subtitle: 'Core Languages & Syntaxes',
    icon: '⚔️',
    accentColor: 'text-[#f59e0b] border-[#f59e0b]/40',
    badgeBg: 'bg-[#f59e0b]/10 text-[#fbbf24] border-[#f59e0b]/30',
  },
  {
    key: 'tool',
    title: 'TOOLS & SPELLS',
    subtitle: 'Frameworks & Runtimes',
    icon: '🔮',
    accentColor: 'text-[#38bdf8] border-[#38bdf8]/40',
    badgeBg: 'bg-[#38bdf8]/10 text-[#7dd3fc] border-[#38bdf8]/30',
  },
  {
    key: 'armor',
    title: 'ARMOR & SHIELDS',
    subtitle: 'Infra, Systems & CI/CD',
    icon: '🛡️',
    accentColor: 'text-[#10b981] border-[#10b981]/40',
    badgeBg: 'bg-[#10b981]/10 text-[#6ee7b7] border-[#10b981]/30',
  },
  {
    key: 'potion',
    title: 'POTIONS & ALCHEMY',
    subtitle: 'Databases & State Management',
    icon: '🧪',
    accentColor: 'text-[#ff4726] border-[#ff4726]/40',
    badgeBg: 'bg-[#ff4726]/10 text-[#fca5a5] border-[#ff4726]/30',
  },
  {
    key: 'rune',
    title: 'ANCIENT RUNES',
    subtitle: 'Architecture & Core Vitals',
    icon: '📜',
    accentColor: 'text-[#a855f7] border-[#a855f7]/40',
    badgeBg: 'bg-[#a855f7]/10 text-[#d8b4fe] border-[#a855f7]/30',
  },
]

export default function TechInventory() {
  return (
    <section
      id="stack"
      aria-label="Technical Skills and Equipment Inventory"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm" aria-hidden="true">🎒</span>
            <span className="font-arcade text-[10px] sm:text-xs text-[#38bdf8] uppercase tracking-wider">
              INVENTORY BAG // ARSENAL
            </span>
          </div>
          <h2 className="font-arcade text-lg sm:text-2xl font-bold tracking-tight text-white">
            EQUIPMENT & ARSENAL
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-1">
            Battle-tested skills, frameworks, and infrastructure mastered across enterprise campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className={`pixel-card p-5 rounded-xl border transition-all duration-200 hover:border-slate-600 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-[#2a3650]">
                  <span className="text-xl" aria-hidden="true">
                    {cat.icon}
                  </span>
                  <div>
                    <h3 className={`font-arcade text-xs font-bold ${cat.accentColor.split(' ')[0]}`}>
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stack[cat.key].map((item) => (
                    <span
                      key={item}
                      className={`inline-block px-2.5 py-1 rounded text-xs font-medium border ${cat.badgeBg}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
