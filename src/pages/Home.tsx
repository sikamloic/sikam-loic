import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin, Code2, Layers, Rocket, Github, Linkedin, Twitter } from 'lucide-react';
import { LinkButton, Container, Badge } from '../components/ui';
import { 
  ScrollReveal, 
  TypeWriter, 
  GlitchText, 
  CodeSignature,
  MagneticButton 
} from '../components/effects';
import { PERSONAL_INFO } from '../constants';

const socialIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function Home() {
  const location = useLocation();
  const { t } = useTranslation();
  
  const roles = [
    t('home.roles.fullstack'),
    t('home.roles.creator'),
    t('home.roles.cleanCode'),
    t('home.roles.architect'),
  ];

  return (
    <div key={location.key}>
      <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-500/5 rounded-full blur-3xl" />
        </div>
        
        <Container>
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <ScrollReveal direction="left">
                {PERSONAL_INFO.availability && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Badge variant="primary" className="mb-6 inline-flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                      </span>
                      {t('common.available')}
                    </Badge>
                  </motion.div>
                )}
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-surface-900 dark:text-white mb-4">
                  <span className="block">{t('home.greeting')}</span>
                  <GlitchText 
                    text={`${PERSONAL_INFO.firstName} ${PERSONAL_INFO.lastName}`}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 dark:from-primary-400 dark:via-secondary-400 dark:to-accent-400"
                  />
                </h1>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.2}>
                <div className="text-xl md:text-2xl text-surface-600 dark:text-surface-300 font-medium mb-6 h-8">
                  <TypeWriter texts={roles} typingSpeed={80} deletingSpeed={40} pauseDuration={2500} />
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.3}>
                <p className="text-lg text-surface-600 dark:text-surface-400 mb-6 max-w-lg">
                  {PERSONAL_INFO.tagline}
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.4}>
                <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400 mb-8">
                  <MapPin className="w-4 h-4" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <MagneticButton strength={0.2}>
                    <LinkButton
                      to="/contact"
                      size="lg"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                    >
                      {t('common.contactMe')}
                    </LinkButton>
                  </MagneticButton>
                  
                  {PERSONAL_INFO.resumeUrl && (
                    <MagneticButton strength={0.2}>
                      <LinkButton
                        external
                        href={PERSONAL_INFO.resumeUrl}
                        download
                        variant="outline"
                        size="lg"
                        leftIcon={<Download className="w-5 h-5" />}
                      >
                        {t('common.downloadCV')}
                      </LinkButton>
                    </MagneticButton>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.6}>
                <div className="flex gap-4">
                  {PERSONAL_INFO.socialLinks.map((link, index) => {
                    const Icon = socialIcons[link.icon] || Github;
                    return (
                      <motion.a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-600 dark:text-surface-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900 dark:hover:text-primary-400 transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        aria-label={link.platform}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
            
            <ScrollReveal direction="right" delay={0.3}>
              <div className="relative flex justify-center lg:justify-end">
                <CodeSignature 
                  name={`${PERSONAL_INFO.firstName} ${PERSONAL_INFO.lastName}`}
                  title={PERSONAL_INFO.title}
                />
              </div>
            </ScrollReveal>
          </div>
        </Container>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-surface-400 dark:border-surface-600 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary-500"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-surface-100/50 dark:bg-surface-900/50">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">{t('home.whatIDo')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white">
                {t('home.transformIdeas')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                  {t('home.digitalExperiences')}
                </span>
              </h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: t('home.frontend.title'),
                description: t('home.frontend.description'),
                color: 'primary',
                link: '/skills',
              },
              {
                icon: Layers,
                title: t('home.backend.title'),
                description: t('home.backend.description'),
                color: 'secondary',
                link: '/skills',
              },
              {
                icon: Rocket,
                title: t('home.fullProjects.title'),
                description: t('home.fullProjects.description'),
                color: 'accent',
                link: '/projects',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <Link
                  to={item.link}
                  className="group block h-full"
                >
                  <motion.div
                    className={`h-full p-8 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-lg hover:shadow-xl transition-all duration-300`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring' as const, stiffness: 300 }}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-${item.color}-100 dark:bg-${item.color}-900/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <item.icon className={`w-7 h-7 text-${item.color}-600 dark:text-${item.color}-400`} />
                    </div>
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-surface-600 dark:text-surface-400">
                      {item.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {t('common.learnMore')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <Badge variant="primary" className="mb-4">{t('home.aboutSection.title')}</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-6">
                {t('home.aboutSection.passionate')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 to-accent-600 dark:from-secondary-400 dark:to-accent-400">
                  {t('home.aboutSection.motivated')}
                </span>
              </h2>
              <p className="text-lg text-surface-600 dark:text-surface-400 leading-relaxed mb-6">
                {PERSONAL_INFO.bio}
              </p>
              <MagneticButton strength={0.15}>
                <LinkButton
                  to="/about"
                  variant="outline"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t('home.aboutSection.discoverPath')}
                </LinkButton>
              </MagneticButton>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '3+', label: t('home.stats.experience') },
                  { value: '15+', label: t('home.stats.projects') },
                  { value: '6+', label: t('home.stats.clients') },
                  { value: '100%', label: t('home.stats.passion') },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="p-6 rounded-2xl bg-surface-100 dark:bg-surface-800 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
