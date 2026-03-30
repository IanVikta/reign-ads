import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const BB = '#0220aa'
const BG = '#ffd22a'

/**
 * Loader is mounted/unmounted by App.jsx's AnimatePresence.
 * It does NOT manage its own visibility — just renders content.
 * The exit prop on the root motion.div is played when App.jsx
 * sets loading=false and AnimatePresence unmounts this component.
 */
const Loader = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) { clearInterval(interval); return 100 }
                return Math.min(prev + Math.random() * 18, 100)
            })
        }, 120)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(2,32,170,1)_1px,transparent_1px),linear-gradient(90deg,rgba(2,32,170,1)_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>

            {/* Gold progress bar — top of screen */}
            <motion.div
                className="absolute top-0 left-0 h-[3px]"
                style={{ background: BG }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: 'linear' }}
            />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mb-8"
                >
                    {/* Spinning gold ring */}
                    <motion.div
                        className="absolute inset-0 -m-5 rounded-full"
                        style={{ border: `2px solid ${BG}50` }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    >
                        <motion.div
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                            style={{ background: BG }}
                        />
                    </motion.div>

                    {/* Slow blue counter-ring */}
                    <motion.div
                        className="absolute inset-0 -m-10 rounded-full"
                        style={{ border: `1.5px solid ${BB}18` }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Logo — breathes */}
                    <motion.img
                        src="/images/logo/png logo blue.png"
                        alt="Reign Ads"
                        className="relative w-44 md:w-56 h-auto"
                        animate={{
                            scale: [1, 1.03, 1],
                            filter: [
                                'drop-shadow(0 4px 24px rgba(2,32,170,0.10))',
                                'drop-shadow(0 8px 32px rgba(2,32,170,0.22))',
                                'drop-shadow(0 4px 24px rgba(2,32,170,0.10))',
                            ]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Light sweep shimmer */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute inset-y-0 w-1/3 h-full"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                                skewX: '-15deg',
                            }}
                            animate={{ x: ['-150%', '400%'] }}
                            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
                        />
                    </div>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.6 }}
                    className="text-xs font-bold uppercase tracking-[0.4em] mb-10"
                    style={{ color: BB }}
                >
                    Taking Your Brand Places
                </motion.p>

                {/* Progress bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="w-56 md:w-72 space-y-2"
                >
                    <div className="h-[2px] w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ background: BB }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.15, ease: 'linear' }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-black tabular-nums" style={{ color: BB }}>
                            {Math.floor(progress)}%
                        </span>
                        <motion.span
                            className="text-xs uppercase tracking-widest text-gray-300 font-bold"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {progress < 100 ? 'Loading' : 'Ready'}
                        </motion.span>
                    </div>
                </motion.div>

                {/* Pulse dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-1.5 mt-8"
                >
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: i === 1 ? BG : BB }}
                            animate={{ scale: [1, 1.8, 1], opacity: [0.35, 1, 0.35] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Corner accents */}
            <motion.div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2" style={{ borderColor: `${BB}15` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
            <motion.div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2" style={{ borderColor: `${BB}15` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
            <motion.div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2" style={{ borderColor: `${BG}50` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
            <motion.div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2" style={{ borderColor: `${BG}50` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />

            {/* Blue bottom rule */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BB, opacity: 0.12 }} />
        </motion.div>
    )
}

export default Loader
