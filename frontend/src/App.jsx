import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import FooterSimple from './components/FooterSimple'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopOnMount from './components/ScrollToTopOnMount'
import WhatsAppChat from './components/WhatsAppChat'

import Home from './pages/HomeRedesign'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Clients from './pages/Clients'
import Contact from './pages/Contact'
import GetQuote from './pages/GetQuote'
import Blog from './pages/Blog'
import BlogArticle from './pages/BlogArticle'
import AdminComments from './pages/AdminComments'
import AdminDashboard from './pages/AdminDashboardNew'

function AppContent() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  
  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin/')

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <CustomCursor />
      <ScrollToTopOnMount />
      
      {/* Always render main content */}
      <motion.div 
        initial={{ opacity: loading ? 0 : 1 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white min-h-screen flex flex-col"
      >
        {/* Conditionally render Navbar - hide on admin routes */}
        {!isAdminRoute && <Navbar />}
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<GetQuote />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/admin/comments" element={<AdminComments />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        
        {/* Conditionally render Footer and other components - hide on admin routes */}
        {!isAdminRoute && (
          <>
            <FooterSimple />
            <ScrollToTop />
            <WhatsAppChat />
          </>
        )}
      </motion.div>

      {/* Loader overlay */}
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
