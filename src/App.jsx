import Sidebar from './components/Sidebar.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Chess from './components/Chess.jsx'
import Skills from './components/Skills.jsx'
import Certificates from './components/Certificates.jsx'
import Contact from './components/Contact.jsx'
import { profile } from './data.js'

export default function App() {
  return (
    <>
      <Sidebar />
      <main className="px-5 pt-20 sm:px-10 lg:ml-64 lg:px-16 lg:pt-6">
        <div className="mx-auto max-w-4xl">
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Certificates />
          <Chess />
          <Contact />
          <footer className="border-t border-ink/10 py-8 text-sm text-ink/65">
            © {new Date().getFullYear()} {profile.name}
          </footer>
        </div>
      </main>
    </>
  )
}
