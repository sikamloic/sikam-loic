import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Section, Card, CardBody, Badge } from '../components/ui';
import type { BlogPost } from '../types';

const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: '1',
    title: 'Les meilleures pratiques React en 2024',
    slug: 'meilleures-pratiques-react-2024',
    excerpt: 'Decouvrez les patterns et pratiques recommandes pour developper des applications React modernes et maintenables.',
    content: '',
    tags: ['React', 'JavaScript', 'Best Practices'],
    publishedAt: '2024-01-15',
    readingTime: 8,
  },
  {
    id: '2',
    title: 'Introduction a TypeScript pour les developpeurs JavaScript',
    slug: 'introduction-typescript',
    excerpt: 'Un guide complet pour commencer avec TypeScript et comprendre ses avantages pour vos projets.',
    content: '',
    tags: ['TypeScript', 'JavaScript', 'Tutorial'],
    publishedAt: '2023-12-20',
    readingTime: 12,
  },
  {
    id: '3',
    title: 'Optimiser les performances de votre application React',
    slug: 'optimiser-performances-react',
    excerpt: 'Techniques et outils pour ameliorer les performances de vos applications React.',
    content: '',
    tags: ['React', 'Performance', 'Optimization'],
    publishedAt: '2023-11-10',
    readingTime: 10,
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card variant="bordered" className="h-full flex flex-col">
      <CardBody className="flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="primary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
          <Link
            to={`/blog/${post.slug}`}
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {post.title}
          </Link>
        </h3>
        
        <p className="text-surface-600 dark:text-surface-400 mb-4 flex-1">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-surface-500 dark:text-surface-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} min
            </span>
          </div>
          
          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline"
          >
            Lire
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}

export function Blog() {
  return (
    <Section
      title="Blog"
      subtitle="Articles et reflexions sur le developpement web"
    >
      {BLOG_POSTS_DATA.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS_DATA.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-surface-500 dark:text-surface-400">
            Aucun article pour le moment. Revenez bientot !
          </p>
        </div>
      )}
    </Section>
  );
}
