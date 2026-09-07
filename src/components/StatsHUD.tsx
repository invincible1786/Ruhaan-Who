import profileData from '../data/profile.json'
import type { Profile } from '../types/content'

const profile = profileData as Profile

export default function StatsHUD() {
  const { stats } = profile

  const statItems = [
    {
      id: 'level',
      label: 'PLAYER LEVEL',
      value: `LVL ${stats.level}`,
      detail: 'Years in Production',
      icon: '⭐',
      color: 'text-[#38bdf8]',
      borderColor: 'hover:border-[#38bdf8]/60',
    },
    {
      id: 'class',
      label: 'PLAYER CLASS',
      value: 'ARCHITECT',
      detail: stats.class,
      icon: '🛡️',
      color: 'text-[#a855f7]',
      borderColor: 'hover:border-[#a855f7]/60',
    },
    {
      id: 'coins',
      label: 'GOLD ARTIFACTS',
      value: `${stats.coins} QUESTS`,
      detail: 'Shipped Products',
      icon: '🪙',
      color: 'text-[#f59e0b]',
      borderColor: 'hover:border-[#f59e0b]/60',
    },
    {
      id: 'lives',
      label: 'LIVES REMAINING',
      value: `${stats.lives} SLOT`,
      detail: 'Open Availability',
      icon: '❤️',
      color: 'text-[#ff4726]',
      borderColor: 'hover:border-[#ff4726]/60',
    },
  ]

  return (
    <section
      id="stats"
      aria-label="Character Stats and Attributes"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {statItems.map((item) => (
          <div
            key={item.id}
            className={`pixel-card p-4 rounded-xl transition-all duration-200 ${item.borderColor}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-arcade text-[9px] text-slate-400">
                {item.label}
              </span>
              <span className="text-base" aria-hidden="true">
                {item.icon}
              </span>
            </div>
            <div className={`font-arcade text-sm sm:text-base font-bold ${item.color} tracking-tight truncate`}>
              {item.value}
            </div>
            <div className="text-xs text-slate-400 mt-1.5 truncate">
              {item.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
