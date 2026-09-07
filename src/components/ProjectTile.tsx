import { useRef } from 'react'
import type { Project } from '../types/content'
import { trackEvent } from '../lib/analytics'

interface ProjectTileProps {
  project: Project
  isExpanded: boolean
  onToggle: () => void
  enableBurst?: boolean
}

export default function ProjectTile({
  project,
  isExpanded,
  onToggle,
}: ProjectTileProps) {
  const tileButtonRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    if (!isExpanded) {
      trackEvent('project_tile_click', { projectId: project.id, title: project.title })
    }
    onToggle()
  }

  return (
    <article
      className={`pixel-card rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col ${
        isExpanded
          ? 'border-[#f59e0b] shadow-[0_0_25px_rgba(245,158,11,0.15)] bg-[#172033]'
          : 'hover:border-[#38bdf8]/60 hover:bg-[#151c2e]'
      }`}
    >
      {/* Semantic Tile Header Button / Trigger */}
      <button
        ref={tileButtonRef}
        type="button"
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls={`project-detail-${project.id}`}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for project ${project.title}`}
        className="w-full text-left p-5 sm:p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] block cursor-pointer transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="font-arcade text-[9px] text-[#f59e0b] uppercase tracking-wider block">
              FEATURED BOSS QUEST
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          <span
            aria-hidden="true"
            className={`font-arcade text-[9px] px-2.5 py-1 rounded transition-all duration-200 inline-flex items-center gap-1.5 shrink-0 ${
              isExpanded
                ? 'bg-[#f59e0b] text-slate-950 font-bold'
                : 'bg-[#172033] text-slate-300 border border-[#2a3650]'
            }`}
          >
            <span>{isExpanded ? 'CLOSE' : 'INSPECT'}</span>
            <span
              className={`inline-block transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </span>
        </div>

        <p className="text-sm text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* High Score Metric Badge */}
        <div className="mt-3.5 px-3 py-2 rounded-lg bg-[#0a0c16] border border-[#f59e0b]/40">
          <div className="truncate">
            <span className="font-arcade text-[8px] text-[#f59e0b] uppercase tracking-wider block">
              SCORE METRIC
            </span>
            <span className="text-xs font-semibold text-emerald-300 truncate block">
              {project.metric}
            </span>
          </div>
        </div>

        {/* Tech tags preview */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs font-medium bg-[#172033] text-[#38bdf8] border border-[#38bdf8]/20"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-1.5 py-0.5 text-xs text-slate-400">
              +{project.tech.length - 4} more
            </span>
          )}
        </div>
      </button>

      {/* Smooth Dropdown Extension (Revealed inside the SAME box downward) */}
      <div
        id={`project-detail-${project.id}`}
        className={`project-dropdown ${isExpanded ? 'is-open' : ''}`}
        aria-hidden={!isExpanded}
      >
        <div>
          <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-3 border-t border-[#2a3650]/80 space-y-4">
            {/* Full High Score Outcome */}
            <div className="p-3.5 rounded-lg bg-[#0a0c16] border border-[#f59e0b]/40">
              <span className="font-arcade text-[9px] text-[#f59e0b] uppercase tracking-wider block mb-1">
                HIGH SCORE • QUANTIFIED OUTCOME:
              </span>
              <p className="text-sm font-semibold text-white leading-relaxed">
                {project.metric}
              </p>
            </div>

            {/* Tactical Highlights */}
            <div className="space-y-1.5">
              <span className="font-arcade text-[9px] text-slate-400 uppercase tracking-wider block">
                &gt; TACTICAL HIGHLIGHTS:
              </span>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1.5 leading-relaxed">
                {project.bullets.map((bullet, idx) => (
                  <li key={idx} className="marker:text-[#f59e0b]">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Arsenal Utilized */}
            <div>
              <span className="font-arcade text-[9px] text-slate-400 uppercase tracking-wider block mb-2">
                &gt; ARSENAL UTILIZED:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded text-xs font-medium bg-[#0a0c16] text-[#38bdf8] border border-[#38bdf8]/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#2a3650]/60">
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
                className="inline-flex items-center px-4 py-2 rounded bg-[#0a0c16] hover:bg-[#172033] text-slate-200 font-arcade text-[10px] tracking-wider transition-colors border border-[#2a3650] focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
              >
                VIEW SOURCE
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
