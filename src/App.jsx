import './i18n'
import { useRtl } from './hooks/useRtl'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useRtl()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
