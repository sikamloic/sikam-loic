import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Container } from '../ui';
import { PERSONAL_INFO, NAV_ITEMS } from '../../constants';

const socialIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-100 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-800">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link
                to="/"
                className="text-xl font-bold text-primary-600 dark:text-primary-400"
              >
                Portfolio
              </Link>
              <p className="mt-4 text-sm text-surface-600 dark:text-surface-400">
                {PERSONAL_INFO.tagline}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-2">
                {NAV_ITEMS.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-surface-600 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wider mb-4">
                Contact
              </h3>
              <div className="space-y-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-surface-600 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex gap-4 mt-4">
                {PERSONAL_INFO.socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon] || Github;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-surface-600 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors"
                      aria-label={link.platform}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-surface-200 dark:border-surface-800">
          <p className="text-center text-sm text-surface-500 dark:text-surface-500">
            {currentYear} {PERSONAL_INFO.firstName} {PERSONAL_INFO.lastName}. Tous droits reserves.
          </p>
        </div>
      </Container>
    </footer>
  );
}
