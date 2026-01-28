import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Section, Card, CardBody, Badge } from '../components/ui';
import { ScrollReveal } from '../components/effects';
import type { Skill, SkillCategory } from '../types';

const SKILLS_DATA: Skill[] = [
  // Frontend - Technologies les plus demandées en premier
  { id: '1', name: 'React / React Native', category: 'frontend', level: 85 },
  { id: '2', name: 'TypeScript', category: 'frontend', level: 85 },
  { id: '3', name: 'Angular', category: 'frontend', level: 90 },
  { id: '4', name: 'Vue.js', category: 'frontend', level: 80 },
  { id: '5', name: 'TailwindCSS', category: 'frontend', level: 90 },
  { id: '6', name: 'HTML5 / CSS3', category: 'frontend', level: 95 },
  
  // Backend - Node.js en premier (plus demandé internationalement)
  { id: '7', name: 'Node.js / Express', category: 'backend', level: 85 },
  { id: '8', name: 'NestJS', category: 'backend', level: 75 },
  { id: '9', name: 'Laravel (PHP)', category: 'backend', level: 90 },
  { id: '10', name: 'REST API Design', category: 'backend', level: 90 },
  { id: '11', name: 'Spring Boot (Java)', category: 'backend', level: 65 },
  
  // Database
  { id: '12', name: 'PostgreSQL', category: 'database', level: 80 },
  { id: '13', name: 'MySQL', category: 'database', level: 85 },
  { id: '14', name: 'MongoDB', category: 'database', level: 80 },
  
  // DevOps & Tools - Très recherché à l'international
  { id: '15', name: 'Git / GitHub / GitLab', category: 'devops', level: 90 },
  { id: '16', name: 'Docker', category: 'devops', level: 80 },
  { id: '17', name: 'CI/CD Pipelines', category: 'devops', level: 80 },
  
  // Tools
  { id: '18', name: 'Jira / Agile / Scrum', category: 'tools', level: 85 },
  { id: '19', name: 'Figma / UI Design', category: 'tools', level: 80 },
  { id: '20', name: 'VS Code / Dev Tools', category: 'tools', level: 90 },
  
  // Soft Skills - Très valorisés à l'international
  { id: '21', name: 'Problem Solving', category: 'soft-skills', level: 90 },
  { id: '22', name: 'Team Collaboration', category: 'soft-skills', level: 85 },
  { id: '23', name: 'Communication', category: 'soft-skills', level: 85 },
  { id: '24', name: 'Autonomy', category: 'soft-skills', level: 90 },
  { id: '25', name: 'Adaptability', category: 'soft-skills', level: 90 },
];


const CATEGORY_COLORS: Record<SkillCategory, 'primary' | 'secondary' | 'accent'> = {
  frontend: 'primary',
  backend: 'secondary',
  database: 'accent',
  devops: 'primary',
  tools: 'secondary',
  languages: 'accent',
  'soft-skills': 'primary',
};

function groupSkillsByCategory(skills: Skill[]): Record<SkillCategory, Skill[]> {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);
}

function SkillBar({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
  const colorClass = CATEGORY_COLORS[skill.category];
  const bgClass = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-400',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-400',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-400',
  }[colorClass];

  return (
    <motion.div 
      className="mb-4 last:mb-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
          {skill.name}
        </span>
        <motion.span 
          className="text-xs font-semibold text-surface-500 dark:text-surface-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${bgClass} rounded-full relative`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const { t } = useTranslation();
  const groupedSkills = groupSkillsByCategory(SKILLS_DATA);
  const categories = Object.keys(groupedSkills) as SkillCategory[];

  const getCategoryLabel = (category: SkillCategory): string => {
    const labels: Record<SkillCategory, string> = {
      frontend: t('skills.categories.frontend'),
      backend: t('skills.categories.backend'),
      database: t('skills.categories.database'),
      devops: t('skills.categories.devops'),
      tools: t('skills.categories.tools'),
      languages: t('skills.categories.languages'),
      'soft-skills': t('skills.categories.softSkills'),
    };
    return labels[category];
  };

  return (
    <Section
      title={t('skills.title')}
      subtitle={t('skills.subtitle')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, catIndex) => (
          <ScrollReveal key={category} delay={catIndex * 0.1}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: 'spring' as const, stiffness: 300 }}
            >
              <Card variant="bordered" className="h-full">
                <CardBody>
                  <div className="flex items-center gap-2 mb-6">
                    <Badge variant={CATEGORY_COLORS[category]}>
                      {getCategoryLabel(category)}
                    </Badge>
                    <span className="text-xs text-surface-400">
                      {groupedSkills[category].length} skills
                    </span>
                  </div>
                  {groupedSkills[category].map((skill, skillIndex) => (
                    <SkillBar 
                      key={skill.id} 
                      skill={skill} 
                      delay={catIndex * 0.1 + skillIndex * 0.05}
                    />
                  ))}
                </CardBody>
              </Card>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.4}>
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-surface-900 dark:text-white text-center mb-8">
            {t('skills.otherSkills')}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'WebSocket',
              'GraphQL',
              'Unit Testing',
              'UML',
              'Ionic',
              'Linux',
              'AI Tools',
              'Responsive Design',
              'Clean Code',
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Badge variant="outline" size="md" className="cursor-default">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
