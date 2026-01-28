import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { Section, Card, CardBody } from '../components/ui';
import type { Education, Certification } from '../types';

const EDUCATION_DATA: Education[] = [
  {
    id: '1',
    institution: 'Universite de Paris',
    degree: 'Master',
    field: 'Informatique - Specialite Genie Logiciel',
    description: 'Formation approfondie en conception et developpement de logiciels.',
    location: 'Paris, France',
    startDate: '2016-09',
    endDate: '2018-06',
    current: false,
  },
  {
    id: '2',
    institution: 'Universite de Lyon',
    degree: 'Licence',
    field: 'Informatique',
    description: 'Fondamentaux de l\'informatique et de la programmation.',
    location: 'Lyon, France',
    startDate: '2013-09',
    endDate: '2016-06',
    current: false,
  },
];

const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: '1',
    name: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services',
    issueDate: '2023-06',
    expiryDate: '2026-06',
    credentialUrl: 'https://aws.amazon.com/certification/',
  },
  {
    id: '2',
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    issueDate: '2022-03',
    credentialUrl: 'https://scrum.org/',
  },
  {
    id: '3',
    name: 'Meta Front-End Developer',
    issuer: 'Meta (Coursera)',
    issueDate: '2021-11',
    credentialUrl: 'https://coursera.org/',
  },
];

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
                {formatDate(education.startDate)} - {formatDate(education.endDate!)}
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
