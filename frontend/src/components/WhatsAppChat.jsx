import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WhatsAppChat = () => {
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

    const openWhatsApp = () => {
        const phoneNumber = '256706829331' // Remove + and spaces for WhatsApp URL
        const message = encodeURIComponent(
            "Hello Reign Ads! I'm reaching out because I'm interested in running an outdoor advertising campaign and believe your services could be a great fit and I'd love to get details. When would be a good time to connect?"
        )
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
        window.open(whatsappUrl, '_blank')
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        // Add a subtle bounce every 5 seconds
                        rotate: [0, -5, 5, -5, 0]
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                        rotate: {
                            duration: 0.6,
                            repeat: Infinity,
                            repeatDelay: 4,
                            ease: "easeInOut"
                        }
                    }}
                    onClick={openWhatsApp}
                    className="fixed bottom-28 right-4 md:right-8 z-50 group"
                    aria-label="Chat on WhatsApp"
                >
                    {/* Outer ring with rotation */}
                    <div className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-spin-slow" />
                    
                    {/* Main button */}
                    <div className="relative w-14 h-14 bg-gradient-to-br from-green-600 to-green-500 rounded-full shadow-lg shadow-green-600/50 flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-green-500/50 transition-all duration-300">
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-green-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                        
                        {/* WhatsApp icon */}
                        <svg 
                            className="w-7 h-7 text-white relative z-10 group-hover:scale-110 transition-transform" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
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
                        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-green-600 text-white text-xs font-bold px-3 py-2 rounded shadow-lg pointer-events-none"
                    >
                        Chat on WhatsApp
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent border-l-green-600" />
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export default WhatsAppChat