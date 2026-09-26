import React, { useEffect, useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  ExternalLink,
  Search,
  Terminal,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  ArrowLeft,
  Tag,
  Hash,
} from 'lucide-react';
import { DocsCodeBlock } from './DocsCodeBlock';
import {
  moduleDocs,
  detailedModules,
  navigation,
  pages,
  DocCallout,
  DocTable,
} from '../../content/docs/content';

const GITHUB_REPO = 'https://github.com/HaakimSec/GoUpload';

// Ordered flat list of all documentation routes for sequential prev/next pagination
const ALL_DOC_ROUTES = [
  { path: 'introduction', title: 'Introduction' },
  { path: 'installation', title: 'Installation' },
  { path: 'quick-start', title: 'Quick Start' },
  { path: 'workflow', title: 'Scan Workflow' },
  { path: 'modules', title: 'Modules Overview' },
  { path: 'modules/extension', title: 'Extension Evasion' },
  { path: 'modules/content-type', title: 'Content-Type Spoofing' },
  { path: 'modules/magic-byte', title: 'Magic Byte Injection' },
  { path: 'modules/filename', title: 'Filename Obfuscation' },
  { path: 'modules/path-traversal', title: 'Path Traversal' },
  { path: 'modules/graphql', title: 'GraphQL File Uploads' },
  { path: 'modules/unicode', title: 'Unicode & Encoding' },
  { path: 'modules/size-boundary', title: 'Size Boundary Testing' },
  { path: 'modules/race-condition', title: 'Race Condition & TOCTOU' },
  { path: 'modules/polyglot', title: 'Polyglots & Archives' },
  { path: 'modules/xxe', title: 'XXE Injection' },
  { path: 'modules/server-config', title: 'Server Configuration' },
  { path: 'modules/template', title: 'Template Payloads' },
  { path: 'results', title: 'Results & Oracle System' },
  { path: 'cli', title: 'CLI Reference' },
  { path: 'templates', title: 'YAML Templates' },
  { path: 'architecture', title: 'Architecture' },
  { path: 'contributing', title: 'Contributing' },
  { path: 'known-issues', title: 'Known Issues & History' },
];

export const DocsLayout: React.FC = () => {
  // Normalize current subpath (e.g. 'modules/path-traversal' or 'introduction')
  const normalizePath = () => {
    const raw = window.location.pathname.replace(/^\/docs\/?/, '').split('#')[0];
    return raw || 'introduction';
  };

  const [currentPath, setCurrentPath] = useState<string>(normalizePath);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize on browser history popstate
  useEffect(() => {
    const onPop = () => {
      setCurrentPath(normalizePath());
      setMobileMenuOpen(false);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Programmatic client-side navigation
  const navigateTo = (href: string) => {
    window.history.pushState({}, '', href);
    const targetPath = href.replace(/^\/docs\/?/, '').split('#')[0] || 'introduction';
    setCurrentPath(targetPath);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resolve module or page
  const isModuleRoute = currentPath.startsWith('modules/');
  const moduleSlug = isModuleRoute ? currentPath.replace('modules/', '') : (currentPath === 'modules' ? null : null);
  const activeModule = moduleSlug ? detailedModules[moduleSlug] : null;
  const activePage = !activeModule ? pages[currentPath] : null;

  // Title calculation
  const pageTitle = useMemo(() => {
    if (activeModule) return activeModule.name;
    if (currentPath === 'modules') return 'Scan Modules Overview';
    if (activePage) return activePage.title;
    return 'Documentation';
  }, [activeModule, currentPath, activePage]);

  // Compute Previous and Next links
  const currentIndex = ALL_DOC_ROUTES.findIndex((r) => r.path === currentPath);
  const previousRoute = currentIndex > 0 ? ALL_DOC_ROUTES[currentIndex - 1] : null;
  const nextRoute = currentIndex >= 0 && currentIndex < ALL_DOC_ROUTES.length - 1 ? ALL_DOC_ROUTES[currentIndex + 1] : null;

  // Filter modules/pages for sidebar search
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return moduleDocs;
    const q = searchQuery.toLowerCase();
    return moduleDocs.filter(
      ([slug, name, desc]) =>
        slug.toLowerCase().includes(q) || name.toLowerCase().includes(q) || desc.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Render Callout Helper
  const renderCallout = (callout: DocCallout) => {
    const styles = {
      note: {
        border: 'border-term-cyan/40',
        bg: 'bg-term-cyan/5',
        icon: <Info className="w-4 h-4 text-term-cyan shrink-0 mt-0.5" />,
        text: 'text-term-cyan',
        title: 'NOTE',
      },
      tip: {
        border: 'border-term-green/40',
        bg: 'bg-term-green/5',
        icon: <CheckCircle2 className="w-4 h-4 text-term-green shrink-0 mt-0.5" />,
        text: 'text-term-green',
        title: 'TIP',
      },
      warning: {
        border: 'border-term-yellow/40',
        bg: 'bg-term-yellow/5',
        icon: <AlertTriangle className="w-4 h-4 text-term-yellow shrink-0 mt-0.5" />,
        text: 'text-term-yellow',
        title: 'WARNING',
      },
      important: {
        border: 'border-term-purple/40',
        bg: 'bg-term-purple/5',
        icon: <ShieldAlert className="w-4 h-4 text-term-purple-bright shrink-0 mt-0.5" />,
        text: 'text-term-purple-bright',
        title: 'IMPORTANT',
      },
    }[callout.type];

    return (
      <div className={`mt-4 rounded-lg border ${styles.border} ${styles.bg} p-4 text-xs md:text-sm font-mono leading-relaxed`}>
        <div className="flex items-start gap-2.5">
          {styles.icon}
          <div>
            <span className={`font-bold mr-2 tracking-wider ${styles.text}`}>[{styles.title}]</span>
            <span className="text-term-text/90">{callout.text}</span>
          </div>
        </div>
      </div>
    );
  };

  // Render Table Helper
  const renderTable = (table: DocTable) => (
    <div className="mt-5 overflow-x-auto rounded-lg border border-term-border bg-term-surface">
      <table className="w-full text-left text-xs md:text-sm font-mono">
        <thead className="border-b border-term-border bg-term-panel/80 text-term-cyan">
          <tr>
            {table.headers.map((h, i) => (
              <th key={i} className="px-4 py-3 font-semibold uppercase tracking-wider text-[11px]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-term-border/60">
          {table.rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-term-panel/30 transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-4 py-3 text-term-text/90 whitespace-normal">
                  {cell.startsWith('`') && cell.endsWith('`') ? (
                    <code className="text-term-cyan-bright bg-term-bg/60 px-1 py-0.5 rounded border border-term-border">
                      {cell.replace(/`/g, '')}
                    </code>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render Individual Module Detailed Page
  const renderModuleDetail = (mod: typeof detailedModules[string]) => (
    <div className="space-y-8">
      {/* Module Header Card */}
      <div className="rounded-xl border border-term-border bg-term-surface p-6 shadow-terminal">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-term-cyan/40 bg-term-cyan/10 text-term-cyan text-[11px] font-mono">
            <Tag className="w-3 h-3" />
            {mod.testType}
          </span>
          <span className="px-2 py-0.5 rounded border border-term-border bg-term-panel text-term-muted text-[11px] font-mono">
            {mod.payloadCount}
          </span>
          <span className="px-2 py-0.5 rounded border border-term-purple/40 bg-term-purple/10 text-term-purple-bright text-[11px] font-mono">
            {mod.flag}
          </span>
        </div>
        <h2 className="text-lg md:text-xl font-bold text-white mb-2">{mod.subtitle}</h2>
        <p className="text-sm md:text-base text-term-text/90 leading-relaxed">{mod.description}</p>
      </div>

      {/* CLI Command */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-wider text-term-cyan flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4" />
          Execution Command
        </h3>
        <DocsCodeBlock title="terminal" code={mod.command} />
      </section>

      {/* What it tests */}
      <section>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-term-cyan" />
          What It Tests
        </h3>
        <ul className="space-y-2 rounded-lg border border-term-border bg-term-surface/60 p-5 text-xs md:text-sm text-term-text/90">
          {mod.whatItTests.map((t, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-term-cyan font-bold select-none">›</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Sample Output */}
      {mod.sampleOutput && (
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
            Expected Terminal Output Preview
          </h3>
          <DocsCodeBlock title="terminal preview" code={mod.sampleOutput} />
        </section>
      )}

      {/* Oracle Verdict Logic */}
      <section className="rounded-lg border border-term-border bg-term-surface p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-term-green" />
          Oracle Verdict Evaluation
        </h3>
        <p className="text-xs md:text-sm text-term-text/90 leading-relaxed">{mod.oracleVerdict}</p>
      </section>

      {/* Caveats & Limitations */}
      <section className="rounded-lg border border-term-yellow/30 bg-term-yellow/5 p-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-term-yellow mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Limitations & Caveats
        </h3>
        <ul className="space-y-2 text-xs md:text-sm text-term-text/90">
          {mod.limitations.map((lim, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-term-yellow select-none">•</span>
              <span>{lim}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Implementation details */}
      {mod.implementationNotes && (
        <div className="text-xs font-mono text-term-muted border-t border-term-border pt-4">
          <span className="text-term-cyan font-semibold">Source Implementation: </span>
          {mod.implementationNotes}
        </div>
      )}
    </div>
  );

  // Render All Modules Hub Page (/docs/modules)
  const renderModulesHub = () => (
    <div className="space-y-8">
      <div className="rounded-xl border border-term-border bg-term-surface p-6">
        <p className="text-sm md:text-base text-term-text/90 leading-relaxed">
          GoUpload features <strong className="text-term-cyan">13 attack modules</strong> comprising 344+ security tests.
          Run all modules simultaneously by default, or isolate specific vectors using the{' '}
          <code className="text-term-cyan px-1.5 py-0.5 rounded bg-term-panel border border-term-border">--module</code>{' '}
          flag.
        </p>
        <div className="mt-5">
          <DocsCodeBlock
            title="terminal"
            code="GoUpload -u http://target.example/upload -p file --module extension,content-type,path-traversal"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-4">Module Directory</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {moduleDocs.map(([slug, name, description]) => {
            const detail = detailedModules[slug];
            return (
              <button
                key={slug}
                onClick={() => navigateTo(`/docs/modules/${slug}`)}
                className="group flex flex-col justify-between text-left rounded-lg border border-term-border bg-term-surface p-5 hover:border-term-cyan/50 hover:bg-term-panel/40 transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-bold text-term-cyan group-hover:text-term-cyan-bright transition-colors">
                      {name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-term-panel border border-term-border text-term-muted">
                      {detail?.payloadCount || 'Module'}
                    </span>
                  </div>
                  <p className="text-xs text-term-muted leading-relaxed line-clamp-3">{description}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-term-cyan group-hover:translate-x-1 transition-transform">
                  <span>Explore module</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Render Generic Documentation Page
  const renderStandardPage = () => {
    if (!activePage) {
      return (
        <div className="rounded-xl border border-term-border bg-term-surface p-8 text-center">
          <AlertTriangle className="w-8 h-8 text-term-yellow mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white mb-2">Document Not Found</h2>
          <p className="text-xs md:text-sm text-term-muted max-w-md mx-auto mb-6">
            The documentation topic you requested does not exist or may have been reorganized.
          </p>
          <button
            onClick={() => navigateTo('/docs/introduction')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-term-cyan/40 bg-term-cyan/10 text-xs font-mono text-term-cyan hover:bg-term-cyan/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Introduction</span>
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-10">
        <p className="text-sm md:text-base text-term-text/90 leading-relaxed font-mono">
          {activePage.description}
        </p>

        {activePage.sections.map((section, sIdx) => {
          const sectionId = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <section key={sIdx} id={sectionId} className="scroll-mt-24 space-y-4">
              <div className="flex items-center gap-2 border-b border-term-border/60 pb-2">
                <Hash className="w-4 h-4 text-term-cyan/60" />
                <h2 className="text-base md:text-lg font-bold text-white">{section.heading}</h2>
              </div>

              {section.body && (
                <p className="text-xs md:text-sm text-term-muted leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              )}

              {section.bullets && (
                <ul className="space-y-2 rounded-lg border border-term-border bg-term-surface/40 p-4 text-xs md:text-sm text-term-text/90">
                  {section.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-term-cyan font-bold select-none">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.table && renderTable(section.table)}

              {section.callout && renderCallout(section.callout)}

              {section.code && (
                <div className="mt-3">
                  <DocsCodeBlock title={section.codeTitle || section.language || 'terminal'} code={section.code} />
                </div>
              )}
            </section>
          );
        })}
      </div>
    );
  };

  // Nav Item helper for sidebar
  const renderSidebarItem = (label: string, href: string, isIndented = false) => {
    const itemPath = href.replace(/^\/docs\/?/, '').split('#')[0];
    const isActive = currentPath === itemPath;

    return (
      <button
        key={href}
        onClick={() => navigateTo(href)}
        className={`w-full text-left rounded px-3 py-2 text-xs transition-all flex items-center justify-between ${
          isActive
            ? 'bg-term-cyan/15 text-term-cyan font-bold border border-term-cyan/30 shadow-glow-cyan/20'
            : 'text-term-muted hover:bg-term-panel hover:text-term-text border border-transparent'
        } ${isIndented ? 'ml-3 w-[calc(100%-0.75rem)] text-[11px]' : ''}`}
      >
        <span className="truncate">{label}</span>
        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-term-cyan" />}
      </button>
    );
  };

  // Sidebar contents
  const sidebarContent = (
    <aside className="h-full flex flex-col p-4 bg-term-bg/95">
      {/* Search Filter */}
      <div className="relative mb-5">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-term-dim" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter documentation..."
          className="w-full pl-8 pr-3 py-1.5 rounded border border-term-border bg-term-surface text-xs font-mono text-term-text placeholder-term-dim focus:outline-none focus:border-term-cyan/60"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-term-dim hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
        {navigation.map(([groupTitle, items]) => (
          <div key={groupTitle}>
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-term-dim">
              {groupTitle}
            </p>
            <div className="space-y-0.5">
              {items.map(([label, href]) => renderSidebarItem(label, href))}

              {/* Nested module items under Scanning & Modules */}
              {groupTitle.includes('Scanning') && (
                <div className="mt-2 pt-2 border-t border-term-border/40 space-y-0.5">
                  <p className="px-3 pb-1 text-[9px] uppercase tracking-wider text-term-dim font-semibold">
                    13 Attack Modules
                  </p>
                  {filteredModules.map(([slug, name]) =>
                    renderSidebarItem(name, `/docs/modules/${slug}`, true)
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer Info */}
      <div className="pt-4 border-t border-term-border text-[11px] text-term-dim flex items-center justify-between">
        <span>GoUpload v1.8.3</span>
        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noreferrer"
          className="hover:text-term-cyan transition-colors"
        >
          GitHub
        </a>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-term-bg text-term-text font-mono selection:bg-term-cyan/20 selection:text-term-cyan-bright flex flex-col">
      {/* Sticky Docs Top Header */}
      <header className="sticky top-0 z-50 h-16 border-b border-term-border bg-term-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Brand */}
          <div className="flex items-center gap-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="flex items-center gap-2.5 text-sm font-bold text-white group"
            >
              <div className="w-7 h-7 rounded border border-term-cyan/40 bg-term-surface flex items-center justify-center text-term-cyan group-hover:border-term-cyan transition-colors shadow-glow-cyan">
                <BookOpen className="h-3.5 w-3.5" />
              </div>
              <span className="font-mono tracking-tight">
                <span className="text-term-cyan">$</span> GoUpload{' '}
                <span className="text-xs text-term-muted font-normal">Docs</span>
              </span>
            </a>
          </div>

          {/* Right Header Navigation Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-5 text-xs font-mono">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '/');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="text-term-muted hover:text-term-cyan transition-colors"
              >
                ← Back to Showcase
              </a>
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-term-border bg-term-surface text-term-text hover:border-term-cyan/40 hover:text-term-cyan transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3 text-term-muted" />
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation drawer"
              className="rounded border border-term-border bg-term-surface p-2 text-term-muted hover:text-white lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="mx-auto flex w-full max-w-7xl flex-1">
        {/* Desktop Fixed Left Sidebar */}
        <div className="hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-term-border lg:sticky lg:top-16 lg:block">
          {sidebarContent}
        </div>

        {/* Mobile Slide-down / Full Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-16 bottom-0 z-40 border-b border-term-border bg-term-bg/98 backdrop-blur-lg lg:hidden">
            {sidebarContent}
          </div>
        )}

        {/* Center Main Content Area */}
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb Navigation */}
            <div className="mb-4 flex items-center gap-2 text-xs font-mono text-term-dim">
              <button
                onClick={() => navigateTo('/docs/introduction')}
                className="hover:text-term-cyan transition-colors"
              >
                Docs
              </button>
              <span>›</span>
              {isModuleRoute ? (
                <>
                  <button
                    onClick={() => navigateTo('/docs/modules')}
                    className="hover:text-term-cyan transition-colors"
                  >
                    Modules
                  </button>
                  <span>›</span>
                  <span className="text-term-cyan font-medium">{activeModule?.name || moduleSlug}</span>
                </>
              ) : (
                <span className="text-term-cyan font-medium">{pageTitle}</span>
              )}
            </div>

            {/* Page Header */}
            <div className="mb-8 border-b border-term-border pb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-mono">
                {pageTitle}
              </h1>
            </div>

            {/* Dynamic Content Body */}
            <div>
              {activeModule
                ? renderModuleDetail(activeModule)
                : currentPath === 'modules'
                ? renderModulesHub()
                : renderStandardPage()}
            </div>

            {/* Sequential Previous / Next Pagination Footer */}
            <nav className="mt-14 grid gap-3 border-t border-term-border pt-6 sm:grid-cols-2">
              {previousRoute ? (
                <button
                  onClick={() => navigateTo(`/docs/${previousRoute.path}`)}
                  className="flex items-center gap-3 rounded-lg border border-term-border bg-term-surface p-4 text-left text-xs font-mono text-term-muted hover:border-term-cyan/50 hover:bg-term-panel hover:text-term-cyan transition-all group"
                >
                  <ChevronLeft className="h-4 w-4 text-term-cyan group-hover:-translate-x-1 transition-transform" />
                  <div className="overflow-hidden">
                    <div className="text-[10px] uppercase tracking-wider text-term-dim">Previous</div>
                    <div className="font-semibold text-white group-hover:text-term-cyan truncate">
                      {previousRoute.title}
                    </div>
                  </div>
                </button>
              ) : (
                <span />
              )}

              {nextRoute && (
                <button
                  onClick={() => navigateTo(`/docs/${nextRoute.path}`)}
                  className="flex items-center justify-between rounded-lg border border-term-border bg-term-surface p-4 text-right text-xs font-mono text-term-muted hover:border-term-cyan/50 hover:bg-term-panel hover:text-term-cyan transition-all group sm:col-start-2"
                >
                  <div className="overflow-hidden text-right">
                    <div className="text-[10px] uppercase tracking-wider text-term-dim">Next</div>
                    <div className="font-semibold text-white group-hover:text-term-cyan truncate">
                      {nextRoute.title}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-term-cyan group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              )}
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
