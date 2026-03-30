import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import FooterSimple from './components/FooterSimple'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopOnMount from './components/ScrollToTopOnMount'

import Home from './pages/HomeRedesign'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Clients from './pages/Clients'
import Contact from './pages/Contact'
import GetQuote from './pages/GetQuote'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <CustomCursor />
      <ScrollToTopOnMount />
      
      {/* Always render main content */}
      <motion.div 
        initial={{ opacity: loading ? 0 : 1 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white min-h-screen flex flex-col"
      >
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<GetQuote />} />
          </Routes>
        </main>
        <FooterSimple />
        <ScrollToTop />
      </motion.div>

      {/* Loader overlay */}
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>
    </Router>
  )
}

export default App
