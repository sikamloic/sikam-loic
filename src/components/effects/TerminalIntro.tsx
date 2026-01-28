import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TerminalIntroProps {
  commands: { command: string; output: string }[];
  onComplete?: () => void;
}

export function TerminalIntro({ commands, onComplete }: TerminalIntroProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  useEffect(() => {
    if (currentLine >= commands.length) {
      onComplete?.();
      return;
    }

    const currentCommand = commands[currentLine].command;

    if (currentChar < currentCommand.length) {
      const timer = setTimeout(() => {
        setCurrentChar((prev) => prev + 1);
      }, 50 + Math.random() * 50);
      return () => clearTimeout(timer);
    }

    if (!showOutput) {
      const timer = setTimeout(() => setShowOutput(true), 300);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCompletedLines((prev) => [...prev, currentLine]);
      setCurrentLine((prev) => prev + 1);
      setCurrentChar(0);
      setShowOutput(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, showOutput, commands, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="font-mono text-sm"
    >
      <div className="bg-surface-900 dark:bg-surface-950 rounded-xl overflow-hidden border border-surface-700 shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-800 dark:bg-surface-900 border-b border-surface-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-primary-500" />
          </div>
          <span className="text-surface-400 text-xs ml-2">terminal</span>
        </div>

        <div className="p-4 md:p-6 space-y-2">
          {commands.map((cmd, index) => {
            const isCompleted = completedLines.includes(index);
            const isCurrent = index === currentLine;
            const shouldShow = isCompleted || isCurrent;

            if (!shouldShow) return null;

            return (
              <div key={index}>
                <div className="flex items-center gap-2">
                  <span className="text-primary-500">$</span>
                  <span className="text-surface-300">
                    {isCompleted
                      ? cmd.command
                      : cmd.command.slice(0, currentChar)}
                    {isCurrent && !showOutput && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-primary-500 ml-0.5"
                      />
                    )}
                  </span>
                </div>
                {(isCompleted || (isCurrent && showOutput)) && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-surface-400 ml-4 mt-1"
                  >
                    {cmd.output}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
