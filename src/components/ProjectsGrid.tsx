import { useState } from 'react'
import projectsData from '../data/projects.json'
import type { Project } from '../types/content'
import ProjectTile from './ProjectTile'

const projects = projectsData as Project[]

export default function ProjectsGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="projects"
      aria-label="Completed Projects and Quests"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="mb-1">
              <span className="font-arcade text-[10px] sm:text-xs text-[#f59e0b] uppercase tracking-wider">
                QUEST LOG • ACTIVE MISSIONS
              </span>
            </div>
            <h2 className="font-arcade text-lg sm:text-2xl font-bold tracking-tight text-white">
              PROJECTS & BOSS BATTLES
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1">
              Select any quest to inspect technical architecture, live applications, and high-score outcomes.
            </p>
          </div>
          <span className="font-arcade text-[10px] text-[#f59e0b] bg-[#172033] px-3 py-1.5 rounded-lg border border-[#f59e0b]/30 self-start sm:self-auto">
            {projects.length} ARTIFACTS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
          {projects.map((project) => (
            <ProjectTile
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() => handleToggle(project.id)}
              enableBurst={true}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
