import { Briefcase, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Section, Badge, LinkButton } from '../components/ui';
import { ScrollReveal, AnimatedTimeline } from '../components/effects';
import type { Experience as ExperienceType } from '../types';

const EXPERIENCES_DATA: ExperienceType[] = [
  {
    id: '1',
    company: 'Entreprise Tech',
    position: 'Developpeur Full Stack Senior',
    description: 'Developpement et maintenance d\'applications web complexes.',
    responsibilities: [
      'Conception et developpement de nouvelles fonctionnalites',
      'Code review et mentorat des developpeurs juniors',
      'Optimisation des performances et de la scalabilite',
      'Mise en place de tests automatises',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    location: 'Paris, France',
    startDate: '2022-01',
    current: true,
    companyUrl: 'https://example.com',
  },
  {
    id: '2',
    company: 'Startup Innovation',
    position: 'Developpeur Frontend',
    description: 'Creation d\'interfaces utilisateur modernes et reactives.',
    responsibilities: [
      'Developpement d\'interfaces utilisateur avec React',
      'Integration d\'APIs REST',
      'Collaboration avec l\'equipe design',
    ],
    technologies: ['React', 'JavaScript', 'SCSS', 'Redux'],
    location: 'Lyon, France',
    startDate: '2020-03',
    endDate: '2021-12',
    current: false,
  },
  {
    id: '3',
    company: 'Agence Web',
    position: 'Developpeur Web Junior',
    description: 'Developpement de sites web et applications pour divers clients.',
    responsibilities: [
      'Developpement de sites web responsives',
      'Maintenance et evolution de projets existants',
      'Support technique client',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    location: 'Marseille, France',
    startDate: '2018-09',
    endDate: '2020-02',
    current: false,
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

export function Experience() {
  const { t } = useTranslation();
  
  const timelineItems = EXPERIENCES_DATA.map((exp, index) => ({
    id: exp.id,
    date: `${formatDate(exp.startDate)} - ${exp.current ? t('common.present') : formatDate(exp.endDate!)}`,
    title: exp.position,
    subtitle: exp.company,
    color: (['primary', 'secondary', 'accent'] as const)[index % 3],
    icon: <Briefcase className={`w-5 h-5 text-${(['primary', 'secondary', 'accent'] as const)[index % 3]}-600 dark:text-${(['primary', 'secondary', 'accent'] as const)[index % 3]}-400`} />,
    content: (
      <div>
        <p className="mb-4">{exp.description}</p>
        <ul className="space-y-2 mb-4">
          {exp.responsibilities.map((resp, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="w-1.5 h-1.5 mt-2 bg-primary-500 rounded-full flex-shrink-0" />
              {resp}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech) => (
            <Badge key={tech} variant="neutral" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
        {exp.current && (
          <div className="mt-4">
            <Badge variant="primary">{t('experience.currentPosition')}</Badge>
          </div>
        )}
      </div>
    ),
  }));

  return (
    <Section
      title={t('experience.title')}
      subtitle={t('experience.subtitle')}
    >
      <ScrollReveal>
        <div className="mb-12 text-center">
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {EXPERIENCES_DATA.length}+
            </span>
            <span className="text-surface-600 dark:text-surface-400">
              {t('experience.yearsExperience')}
            </span>
          </motion.div>
        </div>
      </ScrollReveal>

      <AnimatedTimeline items={timelineItems} />
      
      <ScrollReveal delay={0.5}>
        <div className="mt-16 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LinkButton
              external
              href="/cv.pdf"
              download
              variant="outline"
              size="lg"
              leftIcon={<Download className="w-5 h-5" />}
            >
              {t('experience.downloadFullCV')}
            </LinkButton>
          </motion.div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
