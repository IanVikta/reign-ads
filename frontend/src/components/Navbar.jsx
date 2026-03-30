import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <nav className={`fixed top-0 w-full transition-all duration-300 ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-md py-4 border-b border-gray-200 shadow-lg' 
                : 'bg-white/80 backdrop-blur-sm py-6'
        }`} style={{ zIndex: 50 }}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileMenuOpen(false)}>
                    {/* Logo Image - Blue version for light theme */}
                    <div className="relative">
                        <img 
                            src="/images/logo/png logo blue.png" 
                            alt="Reign Ads Logo" 
                            className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105"
                        />
                    </div>
                    <div className="hidden md:block h-8 w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
                    <span className="hidden md:block text-xs text-gray-600 uppercase tracking-widest">
                        Taking Your Brand Places
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium tracking-widest uppercase transition-all relative group ${
                                location.pathname === link.path 
                                    ? 'text-blue-700' 
                                    : 'text-gray-700 hover:text-blue-600'
                            }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 via-reignGold to-blue-600 transition-all ${
                                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}></span>
                        </Link>
                    ))}
                    
                    {/* CTA Button */}
                    <Link
                        to="/quote"
                        className="px-6 py-2.5 text-white text-xs font-extrabold uppercase tracking-widest transition-all"
                        style={{ background: '#0220aa' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#ffd22a'; e.currentTarget.style.color = '#0220aa' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#0220aa'; e.currentTarget.style.color = '#fff' }}
                    >
                        Get Quote
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden relative w-8 h-8 flex items-center justify-center focus:outline-none"
                    style={{ zIndex: 60 }}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-5 relative flex flex-col justify-between">
                        <span 
                            className={`block w-full h-0.5 bg-gradient-to-r from-blue-600 via-reignGold to-blue-600 transition-all duration-300 ease-in-out ${
                                mobileMenuOpen ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0'
                            }`}
                        />
                        <span 
                            className={`block w-full h-0.5 bg-gradient-to-r from-reignGold via-blue-600 to-reignGold transition-all duration-300 ease-in-out ${
                                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                            }`}
                        />
                        <span 
                            className={`block w-full h-0.5 bg-gradient-to-r from-blue-600 via-reignGold to-blue-600 transition-all duration-300 ease-in-out ${
                                mobileMenuOpen ? '-rotate-45 -translate-y-2' : 'rotate-0 translate-y-0'
                            }`}
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
                            style={{ zIndex: 45 }}
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        
                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white border-l-2 border-blue-200 shadow-2xl md:hidden overflow-y-auto"
                            style={{ 
                                zIndex: 48, 
                                height: '100vh'
                            }}
                        >
                            {/* Logo in Mobile Menu */}
                            <div className="px-6 pt-8 mb-8">
                                <img 
                                    src="/images/logo/png logo blue.png" 
                                    alt="Reign Ads" 
                                    className="h-12 w-auto"
                                />
                                <p className="text-xs text-gray-600 uppercase tracking-widest mt-2">
                                    Taking Your Brand Places
                                </p>
                            </div>

                            {/* Navigation Links */}
                            <div className="flex flex-col px-6 gap-1">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, type: 'spring' }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`block py-3 px-6 text-sm font-medium tracking-wider uppercase transition-all ${
                                                location.pathname === link.path 
                                                    ? 'text-blue-700 bg-gradient-to-r from-blue-50 to-transparent border-l-2 border-blue-600' 
                                                    : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent border-l-2 border-transparent hover:border-blue-400'
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                            
                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                                className="px-6 mt-8"
                            >
                                <Link
                                    to="/quote"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full px-6 py-4 text-white text-center text-xs font-extrabold uppercase tracking-widest transition-all"
                                    style={{ background: '#0220aa' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#ffd22a'; e.currentTarget.style.color = '#0220aa' }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#0220aa'; e.currentTarget.style.color = '#fff' }}
                                >
                                    Get Quote
                                </Link>
                            </motion.div>

                            {/* Decorative Elements */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
                                <p className="text-xs text-gray-500 text-center">
                                    © {new Date().getFullYear()} Reign Ads Limited
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
