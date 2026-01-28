import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useMousePosition } from '../../hooks/useMousePosition';

export function CursorGlow() {
  const { x, y } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    setIsVisible(true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    cursorX.set(x);
    cursorY.set(y);
  }, [x, y, cursorX, cursorY]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.06), transparent 40%)`,
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-50 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="relative">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-75 blur-sm animate-pulse" />
          <div className="relative h-3 w-3 rounded-full bg-white dark:bg-surface-900 border-2 border-primary-500" />
        </div>
      </motion.div>
    </>
  );
}
