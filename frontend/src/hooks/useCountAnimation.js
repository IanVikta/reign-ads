import { useState, useEffect } from 'react';

/**
 * Custom hook for animating number counters
 * @param {number} end - The target number to count to
 * @param {number} duration - Animation duration in milliseconds (default: 2000)
 * @returns {number} - The current animated count value
 */
export const useCountAnimation = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};
