import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const Counter = ({ end, suffix = '', duration = 2 }) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        let start = 0
        const increment = end / (duration * 60)
        const timer = setInterval(() => {
            start += increment
            if (start >= end) { setCount(end); clearInterval(timer) }
            else setCount(Math.floor(start))
        }, 1000 / 60)
        return () => clearInterval(timer)
    }, [end, duration])
    return <span>{count}{suffix}</span>
}

const Hero3D = () => {
    const heroRef = useRef(null)
    const videoRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(console.log)
        }
    }, [])

    return (
        <div ref={heroRef} className="relative w-full bg-white overflow-hidden" style={{ minHeight: '88vh' }}>

            {/* Clean background with subtle grid */}
            <div className="absolute inset-0 opacity-[0.025]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(2,32,170,1)_1px,transparent_1px),linear-gradient(90deg,rgba(2,32,170,1)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Gold top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: BRAND_GOLD }} />

            <motion.div
                style={{ y, opacity, paddingTop: 'clamp(100px, 12vh, 140px)', paddingBottom: '5vh' }}
                className="relative z-20 h-full flex flex-col items-center justify-center px-4 md:px-6"
            >
                <div className="container mx-auto max-w-7xl">
                    
                    {/* Desktop: Two-column layout | Mobile: Stacked layout */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Left Column - Text Content */}
                        <div className="text-center lg:text-left">
                            {/* Eyebrow - Desktop only */}
                            <motion.div
                                initial={{ opacity: 0, y: -16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="hidden lg:flex items-center justify-center lg:justify-start gap-3 mb-6"
                            >
                                <span className="h-px w-8" style={{ background: BRAND_GOLD, display: 'inline-block' }} />
                                <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BRAND_BLUE }}>
                                    East Africa's Premier Agency · Since 2015
                                </p>
                                <span className="h-px w-8" style={{ background: BRAND_GOLD, display: 'inline-block' }} />
                            </motion.div>

                            {/* Mobile: Square Video with Overlaid Eyebrow */}
                            <div className="lg:hidden mb-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 1.0, delay: 0.8, type: "spring", bounce: 0.2 }}
                                    className="relative w-full max-w-sm mx-auto"
                                >
                                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                                        {/* Square Video Container */}
                                        <div className="aspect-[4/3] relative">
                                            <video
                                                ref={videoRef}
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                            >
                                                <source src="/videos/hero-background.mp4" type="video/mp4" />
                                                <source src="/videos/hero-background.webm" type="video/webm" />
                                            </video>
                                            
                                            {/* Video overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
                                            
                                            {/* Overlaid Eyebrow Text */}
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 1.2 }}
                                                className="absolute top-3 left-3 right-3"
                                            >
                                                <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1.5 shadow-lg">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-center leading-tight" style={{ color: BRAND_BLUE }}>
                                                        East Africa's Premier Agency · Since 2015
                                                    </p>
                                                </div>
                                            </motion.div>
                                            
                                            {/* Video label */}
                                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                                                Our Work in Action
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Headline - Word by word animation (3 lines) */}
                            <div
                                className="font-black leading-[1.05] mb-5"
                                style={{ 
                                    fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                                    color: '#1f2937'
                                }}
                            >
                                <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-2">
                                    {/* First line: "Outdoor Advertising" */}
                                    <motion.span
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 1.3 }}
                                    >
                                        Outdoor
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 1.6 }}
                                    >
                                        Advertising
                                    </motion.span>
                                </div>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-2 mt-2">
                                    {/* Second line: "that Takes Your" */}
                                    <motion.span
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 1.9 }}
                                    >
                                        that
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 2.2 }}
                                        style={{ color: BRAND_BLUE }}
                                    >
                                        Takes
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 2.5 }}
                                        style={{ color: BRAND_BLUE }}
                                    >
                                        Your
                                    </motion.span>
                                </div>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-2 mt-2">
                                    {/* Third line: "Brand Places" */}
                                    <motion.span
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 2.8 }}
                                        style={{ color: BRAND_BLUE }}
                                    >
                                        Brand
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 1.0, delay: 3.1, type: "spring", bounce: 0.4 }}
                                        style={{ color: BRAND_BLUE }}
                                    >
                                        Places
                                    </motion.span>
                                </div>
                            </div>

                            {/* Sub - Appears all at once after headline */}
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 3.7 }}
                                className="text-gray-600 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed text-base"
                            >
                                Strategic billboard placements, LED screens, and large-format printing
                                that elevate your brand across Uganda — every single day.
                            </motion.p>

                            {/* CTAs - Slide up together */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 4.3 }}
                                className="flex flex-row gap-3 justify-center lg:justify-start items-center mb-8"
                            >
                                <Link to="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 sm:px-7 py-3.5 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
                                        style={{ background: BRAND_BLUE }}
                                        onMouseEnter={e => { e.currentTarget.style.background = BRAND_GOLD; e.currentTarget.style.color = BRAND_BLUE }}
                                        onMouseLeave={e => { e.currentTarget.style.background = BRAND_BLUE; e.currentTarget.style.color = '#fff' }}
                                    >
                                        <span className="hidden sm:inline">Request Advertising Space</span>
                                        <span className="sm:hidden">Request Space</span>
                                    </motion.button>
                                </Link>
                                <Link to="/portfolio">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 sm:px-7 py-3.5 text-xs font-extrabold uppercase tracking-widest border-2 transition-all"
                                        style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
                                        onMouseEnter={e => { e.currentTarget.style.background = BRAND_BLUE; e.currentTarget.style.color = '#fff' }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BRAND_BLUE }}
                                    >
                                        <span className="hidden sm:inline">View Our Locations</span>
                                        <span className="sm:hidden">View Locations</span>
                                    </motion.button>
                                </Link>
                            </motion.div>

                            {/* Stats strip */}
                            <motion.div
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.8, delay: 4.9, type: "spring", bounce: 0.3 }}
                                className="w-full max-w-sm mx-auto lg:mx-0 grid grid-cols-3 border border-gray-200 bg-white shadow-sm"
                            >
                                {[
                                    { number: 70, suffix: '+', label: 'Locations' },
                                    { number: 20, suffix: '+', label: 'Clients' },
                                    { number: 10, suffix: 'M+', label: 'Impressions' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ 
                                            delay: 5.5 + i * 0.2, 
                                            duration: 0.6,
                                            type: "spring",
                                            bounce: 0.4
                                        }}
                                        className={`py-4 text-center ${i < 2 ? 'border-r border-gray-200' : ''}`}
                                    >
                                        <div className="text-xl font-black" style={{ color: BRAND_BLUE }}>
                                            <Counter end={stat.number} suffix={stat.suffix} />
                                        </div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right Column - Video Rectangle (Desktop only) */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 1.0, delay: 1.5, type: "spring", bounce: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                                {/* Video Container */}
                                <div className="aspect-[4/3] relative">
                                    <video
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                    >
                                        <source src="/videos/hero-background.mp4" type="video/mp4" />
                                        <source src="/videos/hero-background.webm" type="video/webm" />
                                    </video>
                                    
                                    {/* Video overlay with play button effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                    
                                    {/* Optional: Video label */}
                                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                                        Our Work in Action
                                    </div>
                                </div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full" style={{ background: BRAND_GOLD }} />
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full" style={{ background: BRAND_BLUE }} />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom blue rule */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BRAND_BLUE }} />
        </div>
    )
}

export default Hero3D