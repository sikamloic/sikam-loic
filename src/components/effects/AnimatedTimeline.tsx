import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  content: ReactNode;
  icon?: ReactNode;
  color?: 'primary' | 'secondary' | 'accent';
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
}

const colorClasses = {
  primary: {
    dot: 'bg-primary-500',
    line: 'from-primary-500',
    glow: 'shadow-primary-500/50',
  },
  secondary: {
    dot: 'bg-secondary-500',
    line: 'from-secondary-500',
    glow: 'shadow-secondary-500/50',
  },
  accent: {
    dot: 'bg-accent-500',
    line: 'from-accent-500',
    glow: 'shadow-accent-500/50',
  },
};

export function AnimatedTimeline({ items }: AnimatedTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 md:-translate-x-px" />

      {items.map((item, index) => {
        const color = item.color || 'primary';
        const colors = colorClasses[color];
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex items-center mb-12 last:mb-0 ${
              isEven ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className={`hidden md:block w-1/2 ${isEven ? 'pr-12 text-right' : 'pl-12'}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-block"
              >
                <span className="text-sm font-medium text-surface-500 dark:text-surface-400">
                  {item.date}
                </span>
              </motion.div>
            </div>

            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
              <motion.div
                whileHover={{ scale: 1.3 }}
                className={`w-4 h-4 rounded-full ${colors.dot} shadow-lg ${colors.glow}`}
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute inset-0 rounded-full ${colors.dot}`}
                />
              </motion.div>
            </div>

            <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring' as const, stiffness: 300 }}
                className="p-6 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="md:hidden text-sm font-medium text-surface-500 dark:text-surface-400 mb-2 block">
                  {item.date}
                </span>
                
                <div className="flex items-start gap-3">
                  {item.icon && (
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${colors.dot}/10 flex items-center justify-center`}>
                      {item.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 text-surface-600 dark:text-surface-400">
                  {item.content}
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
