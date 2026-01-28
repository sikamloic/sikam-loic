import { useState } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Section, Card, CardBody, CardFooter, Badge, LinkButton } from '../components/ui';
import type { Project, ProjectCategory } from '../types';
import { cn } from '../utils';

const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Coliturage',
    description: 'Application de transport de colis par des particuliers en France. Gestion des trajets, authentification, notifications par mail.',
    technologies: ['Laravel', 'VueJS 3', 'SQL', 'Tailwind'],
    featured: true,
    category: 'web',
    startDate: '2024-01',
    endDate: '2024-06',
    demoUrl: 'https://coliturage.com',
  },
  {
    id: '2',
    title: 'Finance IQ',
    description: 'Application de gestion de salaire et budget personnel avec suivi des depenses journalieres.',
    technologies: ['React', 'TypeScript', 'IndexedDB', 'Tailwind'],
    featured: true,
    category: 'web',
    startDate: '2024-01',
    demoUrl: 'https://finance-iq-beige.vercel.app/',
  },
  {
    id: '3',
    title: 'Portail Client ENEO',
    description: 'Portail client pour faciliter l\'acces aux services d\'Eneo Cameroun. Module Demande de Branchement.',
    technologies: ['Laravel', 'Angular', 'SQL', 'Tailwind'],
    featured: true,
    category: 'web',
    startDate: '2024-01',
    demoUrl: 'https://my.eneo.cm',
  },
  {
    id: '4',
    title: 'MutzigStar',
    description: 'Concours de musique avec notation des jurys, traitement des videos de candidatures et gestion par QR code.',
    technologies: ['PHP', 'SQL', 'JavaScript', 'JQuery', 'Tailwind'],
    featured: false,
    category: 'web',
    startDate: '2024-01',
  },
  {
    id: '5',
    title: 'Miss Ayoba / Miss Ngondo',
    description: 'Plateforme de vote et notation pour concours de beaute avec module jury sur tablette.',
    technologies: ['NodeJS', 'SQL', 'JavaScript', 'Tailwind'],
    featured: false,
    category: 'web',
    startDate: '2024-01',
  },
  {
    id: '6',
    title: 'Live Quizz Heineken',
    description: 'Plateforme de fidelisation des consommateurs avec jeux de quizz interactifs.',
    technologies: ['PHP', 'SQL', 'JavaScript', 'JQuery', 'Tailwind'],
    featured: false,
    category: 'web',
    startDate: '2024-01',
  },
  {
    id: '7',
    title: 'Jeu de Quizz MTN',
    description: 'Fidelisation des abonnes MTN lors de differentes campagnes (smart.mtn.cm).',
    technologies: ['Laravel', 'Angular', 'SQL', 'Tailwind'],
    featured: false,
    category: 'web',
    startDate: '2024-01',
    demoUrl: 'https://smart.mtn.cm',
  },
  {
    id: '8',
    title: 'Bigoodee',
    description: 'Plateforme pour le soin et l\'entretien des cheveux avec application web et mobile.',
    technologies: ['NodeJS', 'MongoDB', 'Angular', 'React Native', 'Tailwind'],
    featured: false,
    category: 'mobile',
    startDate: '2021-09',
    demoUrl: 'https://bigoodee.fr',
  },
];

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  web: 'Web',
  mobile: 'Mobile',
  desktop: 'Desktop',
  api: 'API',
  library: 'Librairie',
  other: 'Autre',
};

const ALL_CATEGORIES: ProjectCategory[] = ['web', 'mobile', 'desktop', 'api', 'library', 'other'];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card variant="bordered" className="h-full flex flex-col">
      <CardBody className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
            {project.title}
          </h3>
          {project.featured && (
            <Badge variant="accent" size="sm">
              Featured
            </Badge>
          )}
        </div>
        
        <Badge variant="outline" size="sm" className="mb-3">
          {CATEGORY_LABELS[project.category]}
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
            Demo
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
            Code
          </LinkButton>
        )}
      </CardFooter>
    </Card>
  );
}

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const availableCategories = ALL_CATEGORIES.filter((cat) =>
    PROJECTS_DATA.some((p) => p.category === cat)
  );

  return (
    <Section
      title="Projets"
      subtitle="Decouvrez mes realisations et projets personnels"
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
          Tous
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
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-surface-500 dark:text-surface-400 py-12">
          Aucun projet dans cette categorie.
        </p>
      )}
    </Section>
  );
}
