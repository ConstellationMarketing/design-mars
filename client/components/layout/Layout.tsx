import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  heroBackgroundImage?: string;
}

export default function Layout({ children, heroBackgroundImage }: LayoutProps) {
  return (
    <div 
      className="min-h-screen flex flex-col bg-brand-dark"
      style={{
        backgroundImage: heroBackgroundImage ? `url(${heroBackgroundImage})` : undefined,
        backgroundAttachment: heroBackgroundImage ? 'fixed' : undefined,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Header heroBackgroundImage={heroBackgroundImage} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
