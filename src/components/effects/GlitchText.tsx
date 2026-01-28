import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchOnHover?: boolean;
}

export function GlitchText({ text, className, glitchOnHover = true }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index];
            if (char === ' ') return ' ';
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsGlitching(false);
      }

      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [isGlitching, text]);

  return (
    <motion.span
      className={className}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      style={{ fontFamily: 'inherit' }}
    >
      <span className="relative">
        {displayText}
        {isGlitching && (
          <>
            <span
              className="absolute inset-0 text-primary-500 opacity-70"
              style={{ clipPath: 'inset(10% 0 60% 0)', transform: 'translate(-2px, 0)' }}
            >
              {displayText}
            </span>
            <span
              className="absolute inset-0 text-accent-500 opacity-70"
              style={{ clipPath: 'inset(50% 0 20% 0)', transform: 'translate(2px, 0)' }}
            >
              {displayText}
            </span>
          </>
        )}
      </span>
    </motion.span>
  );
}
