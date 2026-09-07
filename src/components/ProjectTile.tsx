import { useState, useRef, useEffect } from 'react'
import type { Project } from '../types/content'
import ProjectDetailCard from './ProjectDetailCard'
import { useAssetFallback } from '../hooks/useAssetFallback'
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
  enableBurst = true,
}: ProjectTileProps) {
  const [isBursting, setIsBursting] = useState(false)
  const isTransitioningRef = useRef(false)
  const tileButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const fallback = useAssetFallback()

  // Focus management: when expanded, focus the close button inside the detail card
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isExpanded])

  // Handle closing and return focus to originating tile
  const handleClose = () => {
    onToggle()
    setTimeout(() => {
      tileButtonRef.current?.focus()
    }, 50)
  }

  // Handle opening with debounce and signature clip-path shatter (if enabled)
  const handleTileActivation = () => {
    if (isExpanded) {
      handleClose()
      return
    }

    // Debounce guard: prevent overlapping activations if already transitioning
    if (isTransitioningRef.current) {
      return
    }

    // Track analytics event on open
    trackEvent('project_tile_click', { projectId: project.id, title: project.title })

    // If reduced-motion is preferred OR on mobile (<768px), bypass shatter extras and expand directly via CSS scale-fade
    if (!enableBurst || !fallback.shouldAnimate || fallback.isMobile) {
      onToggle()
      return
    }

    // Execute signature CSS clip-path shatter sequence (<500ms duration)
    isTransitioningRef.current = true
    setIsBursting(true)

    setTimeout(() => {
      onToggle()
      setIsBursting(false)
      isTransitioningRef.current = false
    }, 400)
  }

  return (
    <div className="flex flex-col relative">
      {/* Semantic Tile Button */}
      <button
        ref={tileButtonRef}
        type="button"
        onClick={handleTileActivation}
        aria-expanded={isExpanded}
        aria-controls={`project-detail-${project.id}`}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details for project ${project.title}`}
        className={`w-full text-left p-5 sm:p-6 rounded-xl border transition-all duration-200 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#f59e0b] ${
          isExpanded
            ? 'pixel-card-gold bg-[#172033]'
            : 'pixel-card hover:border-[#38bdf8]/60 hover:bg-[#151c2e]'
        } ${isBursting ? 'opacity-0 scale-95 transition-none' : 'opacity-100 scale-100'}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="font-arcade text-[9px] text-[#f59e0b] uppercase tracking-wider block">
              FEATURED BOSS QUEST {enableBurst && '// BURST READY'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          <span
            aria-hidden="true"
            className={`font-arcade text-[9px] px-2.5 py-1 rounded transition-colors ${
              isExpanded
                ? 'bg-[#f59e0b] text-slate-950 font-bold'
                : 'bg-[#172033] text-slate-300 border border-[#2a3650]'
            }`}
          >
            {isExpanded ? 'OPEN ▲' : 'INSPECT ▼'}
          </span>
        </div>

        <p className="text-sm text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* High Score Metric Badge */}
        <div className="mt-3.5 px-3 py-2 rounded-lg bg-[#0a0c16] border border-[#f59e0b]/40 flex items-center gap-2.5">
          <span className="text-sm" aria-hidden="true">🏆</span>
          <div className="truncate">
            <span className="font-arcade text-[8px] text-[#f59e0b] uppercase tracking-wider block">
              SCORE METRIC
            </span>
            <span className="text-xs font-semibold text-emerald-300 truncate block">
              {project.metric}
            </span>
          </div>
        </div>

        {/* Tech tags */}
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

      {/* Signature CSS Clip-Path Shatter Overlay (Active during burst only) */}
      {isBursting && (
        <div
          className="absolute inset-0 pointer-events-none z-30 overflow-visible"
          aria-hidden="true"
        >
          {/* Shard 1: Top */}
          <div className="absolute inset-0 pixel-card-gold bg-[#172033] shard-top" />
          {/* Shard 2: Right */}
          <div className="absolute inset-0 pixel-card-gold bg-[#151c2e] shard-right" />
          {/* Shard 3: Bottom */}
          <div className="absolute inset-0 pixel-card-gold bg-[#172033] shard-bottom" />
          {/* Shard 4: Left */}
          <div className="absolute inset-0 pixel-card-gold bg-[#151c2e] shard-left" />
          {/* Fiery Mana Burst Flash */}
          <div className="absolute inset-0 bg-[#f59e0b]/30 rounded-xl burst-flash border-2 border-[#ff4726]" />
        </div>
      )}

      {/* Inline Expanded Detail Card */}
      {isExpanded && (
        <div id={`project-detail-${project.id}`}>
          <ProjectDetailCard
            project={project}
            onClose={handleClose}
            closeButtonRef={closeButtonRef}
          />
        </div>
      )}
    </div>
  )
}
