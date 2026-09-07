export interface Project {
  id: string
  title: string
  tagline: string
  tech: string[]
  metric: string
  thumbnail: string
  liveUrl: string
  repoUrl: string
  bullets: string[]
}

export interface ExperienceItem {
  year: string
  title: string
  company: string
  result: string
  tags: string[]
}

export interface StackCategoryItem {
  name: string
  level?: string
  icon?: string
}

export interface TechStack {
  weapon: string[] // Languages
  tool: string[] // Frameworks & Libraries
  armor: string[] // Design & Infrastructure
  potion: string[] // Databases & State
  rune: string[] // Misc & Special Tools
}

export interface ProfileStats {
  level: number
  class: string
  coins: number // Real count of projects
  lives: number // Real count of open slots
}

export interface Profile {
  name: string
  role: string
  tagline: string
  lookingFor: string
  resumeUrl: string
  github: string
  linkedin: string
  email: string
  stats: ProfileStats
}
