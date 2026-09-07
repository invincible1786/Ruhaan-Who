import CastleBackground from './components/CastleBackground'
import Contact from './components/Contact'
import ExperienceLog from './components/ExperienceLog'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProjectsGrid from './components/ProjectsGrid'
import StatsHUD from './components/StatsHUD'
import TechInventory from './components/TechInventory'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0c16] text-slate-100 flex flex-col relative selection:bg-[#ff4726] selection:text-white">
      {/* Fixed Ambient Castle Background with Light Scroll Parallax */}
      <CastleBackground />

      {/* Main Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 space-y-4">
          <Hero />
          <StatsHUD />
          <TechInventory />
          <ProjectsGrid />
          <ExperienceLog />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Lightweight Vercel Analytics */}
      <Analytics />
    </div>
  )
}
