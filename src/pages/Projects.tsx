import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Github, Filter, Building2 } from 'lucide-react';
import { Section, Card, CardBody, CardFooter, Badge, LinkButton } from '../components/ui';
import type { Project, ProjectCategory } from '../types';
import { cn } from '../utils';

const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Coliturage',
    description: 'Built a full-stack platform connecting travelers with package senders. Implemented secure authentication, real-time trip matching, and email notification system. Deployed and serving users in France.',
    technologies: ['Laravel', 'VueJS 3', 'MySQL', 'Tailwind', 'REST API'],
    featured: true,
    category: 'web',
    startDate: '2024-01',
    endDate: '2024-06',
    demoUrl: 'https://coliturage.com',
  },
  {
    id: '2',
    title: 'Finance IQ',
    description: 'Personal finance app with offline-first architecture using IndexedDB. Features budget tracking, expense categorization, and visual analytics. 100% client-side for data privacy.',
    technologies: ['React', 'TypeScript', 'IndexedDB', 'Tailwind', 'Chart.js'],
    featured: true,
    category: 'web',
    startDate: '2024-01',
    demoUrl: 'https://finance-iq-beige.vercel.app/',
    repoUrl: 'https://github.com/sikamloic/FinanceIQ',
  },
  {
    id: '3',
    title: 'ENEO Customer Portal',
    description: 'Enterprise portal for Cameroon\'s national electricity company. Developed the connection request module handling 1000+ monthly requests. Integrated with legacy systems via REST APIs.',
    technologies: ['Laravel', 'Angular', 'PostgreSQL', 'Tailwind', 'Docker'],
    featured: true,
    category: 'web',
    startDate: '2024-01',
    demoUrl: 'https://my.eneo.cm',
    isEnterprise: true,
  },
  {
    id: '4',
    title: 'MutzigStar Music Contest',
    description: 'Real-time jury scoring system for national music competition (SABC). Built QR code-based candidate management and video processing pipeline for 500+ submissions.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'WebSocket', 'Tailwind'],
    featured: true,
    category: 'web',
    startDate: '2024-01',
    isEnterprise: true,
  },
  {
    id: '5',
    title: 'Miss Ayoba Voting Platform',
    description: 'Multi-platform voting system integrated with MTN Ayoba app. Handled 50,000+ votes with real-time monitoring dashboard for jury members on tablets.',
    technologies: ['Node.js', 'MySQL', 'Socket.io', 'Tailwind'],
    featured: false,
    category: 'web',
    startDate: '2024-01',
    isEnterprise: true,
  },
  {
    id: '6',
    title: 'Heineken Live Quizz',
    description: 'Consumer engagement platform for SABC/Heineken campaigns. Gamified quizz system with leaderboards and prize management. Trained end-users on the platform.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'Tailwind'],
    featured: false,
    category: 'web',
    startDate: '2024-01',
    isEnterprise: true,
  },
  {
    id: '7',
    title: 'MTN Quizz Campaign',
    description: 'Subscriber loyalty platform for MTN Cameroon campaigns. Built scalable REST API handling peak traffic during promotional periods.',
    technologies: ['Laravel', 'Angular', 'MySQL', 'Tailwind', 'Redis'],
    featured: false,
    category: 'web',
    startDate: '2024-01',
    demoUrl: 'https://smart.mtn.cm',
    isEnterprise: true,
  },
  {
    id: '8',
    title: 'Bigoodee',
    description: 'Cross-platform haircare marketplace with web and mobile apps. Implemented booking system, product catalog, and payment integration.',
    technologies: ['Node.js', 'MongoDB', 'Angular', 'React Native', 'Tailwind'],
    featured: false,
    category: 'mobile',
    startDate: '2021-09',
    demoUrl: 'https://bigoodee.fr',
    isEnterprise: true,
  },
];

const ALL_CATEGORIES: ProjectCategory[] = ['web', 'mobile', 'desktop', 'api', 'library', 'other'];

function ProjectCard({ project, t }: { project: Project; t: (key: string) => string }) {
  return (
    <Card variant="bordered" className="h-full flex flex-col">
      <CardBody className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
            {project.title}
          </h3>
          <div className="flex gap-1.5">
            {project.isEnterprise && (
              <Badge variant="secondary" size="sm" className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {t('projects.enterprise')}
              </Badge>
            )}
            {project.featured && (
              <Badge variant="accent" size="sm">
                {t('projects.featured')}
              </Badge>
            )}
          </div>
        </div>
        
        <Badge variant="outline" size="sm" className="mb-3">
          {t(`projects.categories.${project.category}`)}
        </Badge>
        
        <p className="text-surface-600 dark:text-surface-400 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="neutral" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </CardBody>
      
      <CardFooter className="flex gap-3">
        {project.demoUrl && (
          <LinkButton
            external
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            leftIcon={<ExternalLink className="w-4 h-4" />}
          >
            {t('projects.demo')}
          </LinkButton>
        )}
        {project.repoUrl && (
          <LinkButton
            external
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
            leftIcon={<Github className="w-4 h-4" />}
          >
            {t('projects.code')}
          </LinkButton>
        )}
      </CardFooter>
    </Card>
  );
}

export function Projects() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const availableCategories = ALL_CATEGORIES.filter((cat) =>
    PROJECTS_DATA.some((p) => p.category === cat)
  );

  return (
    <Section
      title={t('projects.title')}
      subtitle={t('projects.subtitle')}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <Filter className="w-4 h-4 text-surface-500" />
        <button
          onClick={() => setSelectedCategory('all')}
          className={cn(
            'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
            selectedCategory === 'all'
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
              : 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800'
          )}
        >
          {t('projects.all')}
        </button>
        {availableCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              selectedCategory === category
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'text-surface-600 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800'
            )}
          >
            {t(`projects.categories.${category}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} t={t} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-surface-500 dark:text-surface-400 py-12">
          {t('projects.noProjects')}
        </p>
      )}
    </Section>
  );
}
