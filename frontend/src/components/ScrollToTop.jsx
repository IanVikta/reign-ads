import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-4 md:right-8 z-50 group"
                    aria-label="Scroll to top"
                >
                    {/* Outer ring with rotation */}
                    <div className="absolute inset-0 rounded-full border-2 border-blue-600/30 animate-spin-slow" />
                    
                    {/* Main button */}
                    <div className="relative w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-600 rounded-full shadow-lg shadow-blue-900/50 flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-blue-600/50 transition-all duration-300">
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-yellow-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                        
                        {/* Arrow icon */}
                        <svg 
                            className="w-6 h-6 text-white relative z-10 group-hover:text-yellow-300 transition-colors" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2.5} 
                                d="M5 10l7-7m0 0l7 7m-7-7v18" 
                            />
                        </svg>
                        
                        {/* Inner pulse */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-white/30"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    {/* Tooltip */}
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-blue-900 text-white text-xs font-bold px-3 py-2 rounded shadow-lg pointer-events-none"
                    >
                        Back to Top
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent border-l-blue-900" />
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default ScrollToTop
