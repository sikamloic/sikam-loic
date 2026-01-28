import { MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { Section, Card, CardBody } from '../components/ui';
import { PERSONAL_INFO } from '../constants';

export function About() {
  return (
    <>
      <Section
        title="A propos"
        subtitle="Decouvrez mon parcours et ma passion pour le developpement"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card variant="bordered">
              <CardBody>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">
                  Qui suis-je ?
                </h3>
                <div className="prose prose-surface dark:prose-invert max-w-none">
                  <p className="text-surface-600 dark:text-surface-400 leading-relaxed whitespace-pre-line">
                    {PERSONAL_INFO.bio}
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card variant="bordered" className="mt-6">
              <CardBody>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">
                  Ma philosophie
                </h3>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                  Je crois en un code propre, maintenable et bien documente. 
                  Chaque projet est une opportunite d'apprendre et de s'ameliorer. 
                  Je privilegie les solutions simples et elegantes aux architectures complexes.
                </p>
              </CardBody>
            </Card>

            <Card variant="bordered" className="mt-6">
              <CardBody>
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">
                  Centres d'interet
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Open Source',
                    'Nouvelles technologies',
                    'Architecture logicielle',
                    'Performance web',
                    'UX/UI Design',
                    'Veille technologique',
                  ].map((interest) => (
                    <li
                      key={interest}
                      className="flex items-center gap-2 text-surface-600 dark:text-surface-400"
                    >
                      <span className="w-2 h-2 bg-primary-500 rounded-full" />
                      {interest}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </div>

          <div>
            <Card variant="bordered" className="sticky top-24">
              <CardBody>
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary-100 dark:border-primary-900">
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                        {PERSONAL_INFO.firstName[0]}{PERSONAL_INFO.lastName[0]}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-surface-900 dark:text-white">
                    {PERSONAL_INFO.firstName} {PERSONAL_INFO.lastName}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400">
                    {PERSONAL_INFO.title}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-surface-600 dark:text-surface-400">
                    <MapPin className="w-5 h-5 text-surface-400" />
                    <span>{PERSONAL_INFO.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-surface-600 dark:text-surface-400">
                    <Mail className="w-5 h-5 text-surface-400" />
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                  
                  {PERSONAL_INFO.phone && (
                    <div className="flex items-center gap-3 text-surface-600 dark:text-surface-400">
                      <Phone className="w-5 h-5 text-surface-400" />
                      <a
                        href={`tel:${PERSONAL_INFO.phone}`}
                        className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 text-surface-600 dark:text-surface-400">
                    <Calendar className="w-5 h-5 text-surface-400" />
                    <span>
                      {PERSONAL_INFO.availability
                        ? 'Disponible'
                        : 'Non disponible'}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
