export default function StatsHUD() {
  const statItems = [
    {
      id: 'education',
      label: 'IIT KHARAGPUR',
      value: '8.48 CGPA',
      detail: 'Ocean Engg. (Hons) + AI Minor',
      color: 'text-[#38bdf8]',
      borderColor: 'hover:border-[#38bdf8]/60',
    },
    {
      id: 'class',
      label: 'PLAYER CLASS',
      value: 'AI & FULL-STACK',
      detail: 'Vision, RAG & Edge Systems',
      color: 'text-[#a855f7]',
      borderColor: 'hover:border-[#a855f7]/60',
    },
    {
      id: 'gold',
      label: 'OPEN IIT 2026',
      value: 'GOLD MEDAL',
      detail: 'Netflix Data Challenge (1st/22 Halls)',
      color: 'text-[#f59e0b]',
      borderColor: 'hover:border-[#f59e0b]/60',
    },
    {
      id: 'dsa',
      label: 'ALGORITHMS',
      value: '500+ DSA',
      detail: 'LeetCode, CodeChef & AtCoder',
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
            <div className="mb-2">
              <span className="font-arcade text-[9px] text-slate-400 block tracking-wider">
                {item.label}
              </span>
            </div>
            <div className={`font-arcade text-xs sm:text-sm font-bold ${item.color} tracking-tight truncate`}>
              {item.value}
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 truncate">
              {item.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
