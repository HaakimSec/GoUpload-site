import React from 'react';
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

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-term-bg text-term-text flex flex-col font-mono selection:bg-term-cyan/20 selection:text-term-cyan-bright">
      {/* 1. Sticky Navigation Header */}
      <Header
  navLinks={siteContent.navigation}
  repoUrl={siteContent.hero.repoUrl}
/>

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
