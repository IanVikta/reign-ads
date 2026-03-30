import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * ScrollReveal Component - Animates children when they come into view
 * 
 * @param {string} variant - Animation type: 'fadeUp', 'fadeDown', 'fadeLeft', 'fadeRight', 'scale', 'flip'
 * @param {number} delay - Delay before animation starts (in seconds)
 * @param {number} duration - Animation duration (in seconds)
 * @param {ReactNode} children - Content to animate
 */
const ScrollReveal = ({ 
    children, 
    variant = 'fadeUp', 
    delay = 0, 
    duration = 0.6,
    className = ''
}) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { 
        once: true, 
        margin: "-50px",
        amount: 0.3
    })

    const variants = {
        fadeUp: {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 }
        },
        fadeDown: {
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 }
        },
        fadeLeft: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
        },
        fadeRight: {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        },
        flip: {
            hidden: { opacity: 0, rotateY: -90 },
            visible: { opacity: 1, rotateY: 0 }
        },
        slideUp: {
            hidden: { opacity: 0, y: 100, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 }
        },
        zoom: {
            hidden: { opacity: 0, scale: 0.5 },
            visible: { opacity: 1, scale: 1 }
        }
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[variant]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default ScrollReveal
