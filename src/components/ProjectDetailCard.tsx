import { useEffect, type Ref } from 'react'
import type { Project } from '../types/content'

interface ProjectDetailCardProps {
  project: Project
  onClose: () => void
  closeButtonRef?: Ref<HTMLButtonElement>
}

export default function ProjectDetailCard({
  project,
  onClose,
  closeButtonRef,
}: ProjectDetailCardProps) {
  // Close card when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      role="region"
      aria-label={`Expanded details for ${project.title}`}
      tabIndex={-1}
      className="mt-4 p-5 sm:p-6 rounded-xl bg-[#121726] border-2 border-[#f59e0b] shadow-[0_0_25px_rgba(245,158,11,0.2)] space-y-4 text-left transition-all duration-300 animate-[fadeIn_250ms_ease-out]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs" aria-hidden="true">⚔️</span>
            <span className="font-arcade text-[9px] text-[#f59e0b] uppercase tracking-wider">
              QUEST DOSSIER // REVEALED
            </span>
          </div>
          <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {project.title}
          </h4>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={`Close details for ${project.title}`}
          className="p-2.5 rounded bg-[#172033] hover:bg-[#2a3650] text-slate-300 hover:text-white transition-colors border border-[#2a3650] focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
        >
          <span aria-hidden="true" className="font-arcade text-xs">✕</span>
        </button>
      </div>

      {/* High Score / Quantified Outcome Metric */}
      <div className="p-3.5 rounded-lg bg-[#0a0c16] border border-[#f59e0b]/50 flex items-start gap-3">
        <span className="text-xl" aria-hidden="true">🏆</span>
        <div>
          <span className="font-arcade text-[9px] text-[#f59e0b] uppercase tracking-wider block">
            HIGH SCORE // QUANTIFIED OUTCOME:
          </span>
          <p className="text-sm font-semibold text-white mt-1">
            {project.metric}
          </p>
        </div>
      </div>

      {/* Engineering Highlights */}
      <div className="space-y-1.5">
        <span className="font-arcade text-[9px] text-slate-400 uppercase tracking-wider block">
          &gt; TACTICAL HIGHLIGHTS:
        </span>
        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 leading-relaxed">
          {project.bullets.map((bullet, idx) => (
            <li key={idx}>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div>
        <span className="font-arcade text-[9px] text-slate-400 uppercase tracking-wider block mb-2">
          &gt; ARSENAL UTILIZED:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded text-xs font-medium bg-[#172033] text-[#38bdf8] border border-[#38bdf8]/30"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#2a3650]">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open live application for ${project.title}`}
          className="inline-flex items-center px-4 py-2 rounded bg-[#ff4726] hover:bg-[#ff300a] text-white font-arcade text-[10px] tracking-wider transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff4726]"
        >
          LAUNCH APP &rarr;
        </a>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View GitHub source code for ${project.title}`}
          className="inline-flex items-center px-4 py-2 rounded bg-[#172033] hover:bg-[#2a3650] text-slate-200 font-arcade text-[10px] tracking-wider transition-colors border border-[#2a3650] focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
        >
          VIEW SOURCE
        </a>
      </div>
    </div>
  )
}
