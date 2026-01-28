import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

const directionVariants = {
  up: { y: 40, opacity: 0 },
  down: { y: -40, opacity: 0 },
  left: { x: 40, opacity: 0 },
  right: { x: -40, opacity: 0 },
  none: { opacity: 0, scale: 0.95 },
};

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
}: ScrollRevealProps) {
  const location = useLocation();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [location.pathname]);

  return (
    <motion.div
      key={key}
      initial={directionVariants[direction]}
      animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
