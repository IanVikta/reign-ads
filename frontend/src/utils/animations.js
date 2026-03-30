// Reusable Framer Motion animation configurations

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: 'easeOut' }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: 'easeOut' }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Parallax scroll effect configuration
export const parallaxScroll = (scrollY, speed = 0.5) => ({
  y: scrollY * speed
});

// Hover lift effect
export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: -8, 
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// Card hover with glow
export const cardHoverGlow = {
  rest: { 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
  },
  hover: { 
    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
    transition: { duration: 0.3 }
  }
};
