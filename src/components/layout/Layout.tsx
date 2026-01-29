import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CursorGlow, FloatingShapes, PageTransition } from '../effects';
import { RecruiterMode } from '../ui';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <CursorGlow />
      <FloatingShapes />
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <RecruiterMode />
    </div>
  );
}
