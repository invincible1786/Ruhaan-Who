import CastleBackground from './components/CastleBackground'
import Contact from './components/Contact'
import ExperienceLog from './components/ExperienceLog'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProjectsGrid from './components/ProjectsGrid'
import TechInventory from './components/TechInventory'
import { Analytics } from '@vercel/analytics/react'
import HammerImpact from './components/cursor/HammerImpact'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0c16] text-slate-100 flex flex-col relative selection:bg-[#ff4726] selection:text-white">
      {/* Thor's Hammer Electric Impact Click Effect */}
      <HammerImpact />

      {/* Fixed Ambient Castle Background */}
      <CastleBackground />



      {/* Main Content Layer */}
      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 space-y-4">
          <Hero />
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
