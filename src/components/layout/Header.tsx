import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Container, LanguageSwitcher } from '../ui';
import { NAV_ITEMS } from '../../constants';
import { useTheme } from '../../hooks';
import { cn } from '../../utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const getNavLabel = (key: string): string => {
    const labels: Record<string, string> = {
      home: t('nav.home'),
      about: t('nav.about'),
      skills: t('nav.skills'),
      projects: t('nav.projects'),
      experience: t('nav.experience'),
      education: t('nav.education'),
      blog: t('nav.blog'),
      contact: t('nav.contact'),
    };
    return labels[key] || key;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-950/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 pt-[env(safe-area-inset-top)]">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-primary-600 dark:text-primary-400"
          >
            Portfolio
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800'
                )}
              >
                {getNavLabel(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800 transition-colors"
              aria-label={resolvedTheme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800 transition-colors"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-surface-200 dark:border-surface-800">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-400 dark:hover:text-white dark:hover:bg-surface-800'
                  )}
                >
                  {getNavLabel(item.key)}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
