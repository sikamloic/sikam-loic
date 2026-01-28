import { Briefcase, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Section, Badge, LinkButton } from '../components/ui';
import { ScrollReveal, AnimatedTimeline } from '../components/effects';
import type { Experience as ExperienceType } from '../types';

const EXPERIENCES_DATA: ExperienceType[] = [
  {
    id: '1',
    company: 'ZEN-AFRICA',
    position: 'Developpeur IT',
    description: 'Developpement de solutions logicielles pour des clients majeurs (SABC, ENEO, MTN Cameroun, BVMAC, Port Autonome de Douala).',
    responsibilities: [
      'Participation aux reunions de cadrage et presentation des solutions',
      'Analyse fonctionnelle et technique, etude de faisabilite',
      'Implementation complete des solutions logicielles',
      'Mise en place d\'APIs REST (NodeJS, Laravel)',
      'Tests, validations et formation des utilisateurs',
    ],
    technologies: ['Laravel', 'Angular', 'NodeJS', 'PHP', 'SQL', 'Tailwind'],
    location: 'Cameroun',
    startDate: '2023-12',
    current: true,
  },
  {
    id: '2',
    company: 'TSA (Technologies des Systemes Avances)',
    position: 'Developpeur IT',
    description: 'Developpement et maintenance de solutions informatiques pour divers clients.',
    responsibilities: [
      'Participation aux reunions de cadrage de projets',
      'Depannage des outils informatiques (Laborex, SCDP, SUNU Assurance)',
      'Maintenance materiel et logiciel',
      'Configuration et installation des systemes reseaux',
      'Mise en place d\'un audit sur Odoo',
    ],
    technologies: ['NodeJS', 'MongoDB', 'Angular', 'Tailwind', 'Odoo'],
    location: 'Cameroun',
    startDate: '2022-09',
    endDate: '2023-12',
    current: false,
  },
  {
    id: '3',
    company: 'Agyl Tech',
    position: 'Developpeur Fullstack',
    description: 'Developpement d\'applications web et mobiles pour startups.',
    responsibilities: [
      'Analyse fonctionnelle et technique',
      'Implementation complete des solutions logicielles',
      'Modelisation avec UML',
      'Integration web et mobile (Angular, React Native)',
      'Tests et validations',
    ],
    technologies: ['Angular', 'React Native', 'NodeJS', 'MongoDB', 'Tailwind'],
    location: 'Cameroun',
    startDate: '2021-09',
    endDate: '2022-01',
    current: false,
  },
  {
    id: '4',
    company: 'Freelance',
    position: 'Developpeur Full Stack',
    description: 'Developpement d\'une application de transport de colis (coliturage.com).',
    responsibilities: [
      'Analyse fonctionnelle et technique',
      'Modelisation UML (cas d\'utilisation, sequences, classes)',
      'Implementation de l\'authentification et gestion des trajets',
      'Module de notification par mail',
      'Ecriture des tests unitaires et deploiement',
    ],
    technologies: ['Laravel', 'VueJS 3', 'SQL', 'Tailwind'],
    location: 'France (Remote)',
    startDate: '2024-01',
    endDate: '2024-06',
    current: false,
    companyUrl: 'https://coliturage.com',
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
