import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseover', handleMouseOver)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [])

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-reignGold pointer-events-none z-[9999] hidden md:block"
                animate={{
                    x: mousePos.x - 16,
                    y: mousePos.y - 16,
                    scale: isHovering ? 2.5 : 1,
                    backgroundColor: isHovering ? 'rgba(234, 179, 8, 0.1)' : 'transparent',
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-reignGold pointer-events-none z-[9999] hidden md:block"
                animate={{
                    x: mousePos.x - 3,
                    y: mousePos.y - 3,
                }}
                transition={{ type: 'spring', damping: 40, stiffness: 400, mass: 0.2 }}
            />
        </>
    )
}

export default CustomCursor
