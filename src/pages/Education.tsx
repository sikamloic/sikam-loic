import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { Section, Card, CardBody } from '../components/ui';
import type { Education, Certification } from '../types';

const EDUCATION_DATA: Education[] = [
  {
    id: '1',
    institution: 'Institut Universitaire de la Cote',
    degree: 'Licence (en cours)',
    field: 'Systeme d\'Information - Option Genie Logiciel',
    description: 'Formation en conception et developpement de solutions logicielles.',
    location: 'Cameroun',
    startDate: '2021-09',
    current: true,
  },
  {
    id: '2',
    institution: 'Institut Universitaire de la Cote',
    degree: 'Brevet de Technicien Superieur (BTS)',
    field: 'Informatique de Gestion',
    description: 'Formation technique en informatique et gestion de projets.',
    location: 'Cameroun',
    startDate: '2019-09',
    endDate: '2021-06',
    current: false,
  },
  {
    id: '3',
    institution: 'Lycee',
    degree: 'Baccalaureat Serie C',
    field: 'Sciences',
    description: 'Baccalaureat scientifique.',
    location: 'Cameroun',
    startDate: '2018-09',
    endDate: '2019-06',
    current: false,
  },
];

const CERTIFICATIONS_DATA: Certification[] = [];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

function EducationCard({ education }: { education: Education }) {
  return (
    <Card variant="bordered">
      <CardBody>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
              {education.degree} - {education.field}
            </h3>
            
            <p className="text-secondary-600 dark:text-secondary-400 font-medium mt-1">
              {education.institution}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-surface-500 dark:text-surface-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {education.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(education.startDate)} - {education.current ? 'Present' : formatDate(education.endDate!)}
              </span>
            </div>
            
            {education.description && (
              <p className="mt-4 text-surface-600 dark:text-surface-400">
                {education.description}
              </p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function CertificationCard({ certification }: { certification: Certification }) {
  return (
    <Card variant="bordered">
      <CardBody>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900 flex items-center justify-center">
            <Award className="w-5 h-5 text-accent-600 dark:text-accent-400" />
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-surface-900 dark:text-white">
              {certification.name}
            </h4>
            
            <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
              {certification.issuer}
            </p>
            
            <div className="flex items-center gap-2 mt-2 text-xs text-surface-500 dark:text-surface-400">
              <span>Obtenu: {formatDate(certification.issueDate)}</span>
              {certification.expiryDate && (
                <span>| Expire: {formatDate(certification.expiryDate)}</span>
              )}
            </div>
            
            {certification.credentialUrl && (
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                Voir le certificat
              </a>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export function Education() {
  return (
    <>
      <Section
        title="Formation"
        subtitle="Mon parcours academique"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {EDUCATION_DATA.map((education) => (
            <EducationCard key={education.id} education={education} />
          ))}
        </div>
      </Section>

      <Section
        title="Certifications"
        subtitle="Mes certifications professionnelles"
        background="muted"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS_DATA.map((certification) => (
            <CertificationCard key={certification.id} certification={certification} />
          ))}
        </div>
      </Section>
    </>
  );
}
