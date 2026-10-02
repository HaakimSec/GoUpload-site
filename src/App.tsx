import React, { useState, useEffect } from 'react';
import { siteContent } from './content/siteContent';
import { Header } from './components/Header';
import { AuthorizationDisclaimer } from './components/AuthorizationDisclaimer';
import { Hero } from './components/Hero';
import { FeaturesSection } from './components/FeaturesSection';
import { ModulesTable } from './components/ModulesTable';
import { MlRoadmapSection } from './components/MlRoadmapSection';
import { InstallTabs } from './components/InstallTabs';
import { ExampleCommands } from './components/ExampleCommands';
import { ContributingSection } from './components/ContributingSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { DocsLayout } from './components/docs/DocsLayout';
import { Research } from './components/Research';
import { Blog } from './components/Blog';

const BASE = import.meta.env.BASE_URL;

function stripBase(pathname: string): string {
  if (BASE !== '/' && pathname.startsWith(BASE)) {
    return '/' + pathname.slice(BASE.length);
  }
  return pathname;
}

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => stripBase(window.location.pathname));

useEffect(() => {
  const handlePopState = () => {
    setCurrentPath(stripBase(window.location.pathname));
  };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Skip external links, hash anchors on the same page, or links with target="_blank"
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        target.getAttribute('target') === '_blank'
      ) {
        return;
      }

      if (href.startsWith('/docs') || href.startsWith('/research') || href.startsWith('/blog') || href === '/') {
        e.preventDefault();
        const fullPath = BASE === '/' ? href : BASE.replace(/\/$/, '') + href;
        if (stripBase(window.location.pathname) !== href) {
          window.history.pushState({}, '', fullPath);
          setCurrentPath(href);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  if (currentPath.startsWith('/docs')) {
    return <DocsLayout />;
  }

  if (currentPath.startsWith('/research')) {
  return <Research />;
}


if (currentPath.startsWith('/blog')) {
  const slug = currentPath.replace(/^\/blog\/?/, '') || undefined;
  return <Blog slug={slug} />;
}

  return (
    <div className="min-h-screen bg-term-bg text-term-text flex flex-col font-mono selection:bg-term-cyan/20 selection:text-term-cyan-bright">
      {/* 1. Sticky Navigation Header */}
      <Header navLinks={siteContent.navigation} repoUrl={siteContent.hero.repoUrl} />

      {/* 2. Prominent Authorization Disclaimer (Visible near top) */}
      <AuthorizationDisclaimer disclaimer={siteContent.disclaimer} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 3. Hero Section (with Terminal recording embed slot) */}
        <Hero hero={siteContent.hero} />

        {/* 4. Core Features Grid (gracefully scales 6 - 20 items) */}
        <FeaturesSection features={siteContent.features} />

        {/* 5. Attack Modules Showcase Table (designed for ~13 rows, flexible) */}
        <ModulesTable modules={siteContent.attackModules} />

        {/* 6. ML Integration Preview & Roadmap (Visually distinct, experimental) */}
        <MlRoadmapSection mlData={siteContent.mlRoadmap} />

        {/* 7. Quick Start / Installation Tabs */}
        <InstallTabs installMethods={siteContent.installMethods} />

        {/* 8. Practical Example Commands */}
        <ExampleCommands examples={siteContent.exampleCommands} />

        {/* 9. Contributing & Community Callout */}
        <ContributingSection contributing={siteContent.contributing} />

        {/* 10. Contact / Collaboration */}
        <Contact contact={siteContent.contact} />
      </main>

      {/* 11. Footer */}
      <Footer footer={siteContent.footer} />
    </div>
  );
};

export default App;
