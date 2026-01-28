import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CodeSignatureProps {
  name: string;
  title: string;
}

export function CodeSignature({ name, title }: CodeSignatureProps) {
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const codeLines = [
    { prefix: 'const', variable: 'developer', operator: '=', value: '{' },
    { indent: true, key: 'name', value: `"${name}"`, comma: true },
    { indent: true, key: 'role', value: `"${title}"`, comma: true },
    { indent: true, key: 'available', value: 'true', comma: true },
    { indent: true, key: 'skills', value: '[...growing]', comma: true },
    { indent: true, key: 'passion', value: 'Infinity' },
    { prefix: '', variable: '', operator: '', value: '};' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative font-mono text-sm md:text-base"
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 rounded-2xl blur-xl" />
      
      <div className="relative bg-surface-900 dark:bg-surface-950 rounded-xl overflow-hidden border border-surface-700">
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-800 dark:bg-surface-900 border-b border-surface-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-primary-500" />
          </div>
          <span className="text-surface-400 text-xs ml-2">developer.ts</span>
        </div>
        
        <div className="p-4 md:p-6">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.15 }}
              className="flex items-center"
            >
              <span className="w-6 text-surface-600 text-right mr-4 select-none">
                {index + 1}
              </span>
              <div className={line.indent ? 'ml-4' : ''}>
                {line.prefix && (
                  <span className="text-secondary-400">{line.prefix} </span>
                )}
                {line.variable && (
                  <span className="text-primary-400">{line.variable} </span>
                )}
                {line.operator && (
                  <span className="text-surface-400">{line.operator} </span>
                )}
                {line.key && (
                  <>
                    <span className="text-accent-400">{line.key}</span>
                    <span className="text-surface-400">: </span>
                  </>
                )}
                <span className={
                  line.value.startsWith('"') 
                    ? 'text-primary-300' 
                    : line.value === 'true' || line.value === 'Infinity'
                    ? 'text-secondary-400'
                    : 'text-surface-300'
                }>
                  {line.value}
                </span>
                {line.comma && <span className="text-surface-400">,</span>}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-2 h-5 bg-primary-500 ml-[calc(1.5rem+1rem)]"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
