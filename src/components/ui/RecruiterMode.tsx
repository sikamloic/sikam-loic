import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, X, Download, Mail, Phone, MapPin, Github, Linkedin, CheckCircle, Star } from 'lucide-react';
import { PERSONAL_INFO } from '../../constants';

export function RecruiterMode() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'fr' ? 'fr' : 'en';

  const content = {
    fr: {
      title: 'Mode Recruteur',
      subtitle: 'Résumé optimisé pour les RH',
      profile: 'Profil',
      profileText: 'Développeur Full Stack Freelance avec 3+ ans d\'expérience. Spécialisé en React, Angular, Node.js et Laravel. Disponible immédiatement pour des missions freelance.',
      highlights: 'Points forts',
      highlightsList: [
        'Expérience avec des clients majeurs (ENEO, MTN, SABC)',
        'Livraison rapide et code de qualité',
        'Bilingue Français/Anglais',
        'Disponible en remote worldwide',
        'Autonome et excellent en équipe',
      ],
      techStack: 'Stack technique',
      experience: 'Expérience clé',
      experienceList: [
        { role: 'Full Stack Developer @ Adfreak Agency', period: '2024 - Présent', highlight: 'Portail ENEO (1000+ requêtes/mois)' },
        { role: 'Full Stack Developer @ Bigoodee', period: '2021 - 2024', highlight: 'Marketplace cross-platform' },
      ],
      cta: 'Intéressé ? Contactez-moi !',
      download: 'Télécharger CV',
      close: 'Fermer',
    },
    en: {
      title: 'Recruiter Mode',
      subtitle: 'HR-optimized summary',
      profile: 'Profile',
      profileText: 'Full Stack Freelance Developer with 3+ years of experience. Specialized in React, Angular, Node.js and Laravel. Immediately available for freelance missions.',
      highlights: 'Key Highlights',
      highlightsList: [
        'Experience with major clients (ENEO, MTN, SABC)',
        'Fast delivery and quality code',
        'Bilingual French/English',
        'Available for remote worldwide',
        'Autonomous and excellent team player',
      ],
      techStack: 'Tech Stack',
      experience: 'Key Experience',
      experienceList: [
        { role: 'Full Stack Developer @ Adfreak Agency', period: '2024 - Present', highlight: 'ENEO Portal (1000+ requests/month)' },
        { role: 'Full Stack Developer @ Bigoodee', period: '2021 - 2024', highlight: 'Cross-platform marketplace' },
      ],
      cta: 'Interested? Contact me!',
      download: 'Download CV',
      close: 'Close',
    },
  };

  const c = content[lang];

  const techStack = [
    { name: 'React', level: 'Expert' },
    { name: 'TypeScript', level: 'Expert' },
    { name: 'Node.js', level: 'Expert' },
    { name: 'Angular', level: 'Advanced' },
    { name: 'Laravel', level: 'Advanced' },
    { name: 'PostgreSQL', level: 'Advanced' },
    { name: 'Docker', level: 'Intermediate' },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        <Briefcase className="w-6 h-6" />
        <span className="sr-only">{c.title}</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-white dark:bg-surface-900 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Briefcase className="w-6 h-6" />
                      {c.title}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">{c.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Contact Quick Links */}
                <div className="flex flex-wrap gap-3 mt-4 text-sm">
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1 hover:underline">
                    <Mail className="w-4 h-4" /> {PERSONAL_INFO.email}
                  </a>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-1 hover:underline">
                    <Phone className="w-4 h-4" /> {PERSONAL_INFO.phone}
                  </a>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {t('home.location')}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Profile */}
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2 flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary-500" />
                    {c.profile}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400">{c.profileText}</p>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-3">{c.highlights}</h3>
                  <ul className="space-y-2">
                    {c.highlightsList.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-surface-600 dark:text-surface-400">
                        <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-3">{c.techStack}</h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech.name}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          tech.level === 'Expert'
                            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                            : tech.level === 'Advanced'
                            ? 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900 dark:text-secondary-300'
                            : 'bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300'
                        }`}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-3">{c.experience}</h3>
                  <div className="space-y-3">
                    {c.experienceList.map((exp, i) => (
                      <div key={i} className="border-l-2 border-primary-500 pl-4">
                        <p className="font-medium text-surface-900 dark:text-white">{exp.role}</p>
                        <p className="text-sm text-surface-500">{exp.period}</p>
                        <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">→ {exp.highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-surface-200 dark:border-surface-700 p-4 bg-surface-50 dark:bg-surface-800">
                <p className="text-center text-surface-600 dark:text-surface-400 mb-4">{c.cta}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={PERSONAL_INFO.resumeUrl}
                    download
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {c.download}
                  </a>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-2 px-4 py-2 bg-surface-200 dark:bg-surface-700 text-surface-900 dark:text-white rounded-lg hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  <a
                    href="https://github.com/sikamloic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-surface-200 dark:bg-surface-700 text-surface-900 dark:text-white rounded-lg hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/loicsikam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-surface-200 dark:bg-surface-700 text-surface-900 dark:text-white rounded-lg hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
