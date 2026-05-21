import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  heroBackgroundImage?: string;
}

export default function Layout({ children, heroBackgroundImage }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-dark">
      {/* Background that extends behind header and into hero */}
      {heroBackgroundImage && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${heroBackgroundImage})`,
            zIndex: -1,
          }}
        />
      )}
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
