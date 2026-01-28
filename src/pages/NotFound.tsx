import { Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Container, LinkButton } from '../components/ui';

export function NotFound() {
  const { t } = useTranslation();
  
  return (
    <Container>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-16">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-surface-900 dark:text-white mt-4">
          {t('notFound.title')}
        </h2>
        
        <p className="text-surface-600 dark:text-surface-400 mt-2 max-w-md">
          {t('notFound.description')}
        </p>
        
        <div className="mt-8">
          <LinkButton
            to="/"
            leftIcon={<Home className="w-5 h-5" />}
          >
            {t('common.backHome')}
          </LinkButton>
        </div>
      </div>
    </Container>
  );
}
