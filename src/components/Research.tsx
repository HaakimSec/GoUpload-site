import React from 'react';
import { Calendar, Clock, ArrowLeft, Terminal } from 'lucide-react';
import { researchArticles, ResearchBlock } from '../content/research/beyondExtensionChecks';

// Renders a ResearchBlock[] into styled JSX. Generic on purpose — adding a
// new article means adding a new data file under content/research/, not a
// new component.
function renderBlock(block: ResearchBlock, i: number) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 key={i} className="mt-12 mb-4 font-mono text-2xl font-bold text-white">
          {block.text}
        </h2>
      );
    case 'subheading':
      return (
        <h3 key={i} className="mt-8 mb-3 font-mono text-lg font-semibold text-term-cyan-bright">
          {block.text}
        </h3>
      );
    case 'paragraph':
      return (
        <p key={i} className="mb-4 font-mono text-sm sm:text-base leading-relaxed text-term-text/90">
          {block.text}
        </p>
      );
    case 'quote':
      return (
        <blockquote
          key={i}
          className={`my-5 border-l-2 pl-4 py-1 font-mono text-sm sm:text-base leading-relaxed ${
            block.emphasis
              ? 'border-term-cyan text-term-cyan-bright font-semibold'
              : 'border-term-border text-term-muted italic'
          }`}
        >
          {block.text}
        </blockquote>
      );
    case 'list':
      return (
        <ul key={i} className="mb-4 space-y-1.5 pl-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-2 font-mono text-sm sm:text-base text-term-text/90">
              <span className="text-term-cyan flex-shrink-0">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'code':
      return (
        <div key={i} className="my-5 rounded-lg border border-term-border bg-term-surface overflow-hidden">
          {block.label && (
            <div className="px-4 py-1.5 border-b border-term-border bg-term-panel text-[11px] font-mono uppercase tracking-wide text-term-muted">
              {block.label}
            </div>
          )}
          <pre className="px-4 py-3 overflow-x-auto">
            <code className="font-mono text-xs sm:text-sm text-term-green">{block.text}</code>
          </pre>
        </div>
      );
    case 'diagram':
      return (
        <div key={i} className="my-5 rounded-lg border border-term-border bg-term-panel/60 overflow-x-auto">
          <pre className="px-5 py-4">
            <code className="font-mono text-xs sm:text-sm text-term-muted whitespace-pre">{block.text}</code>
          </pre>
        </div>
      );
    case 'divider':
      return <hr key={i} className="my-10 border-term-border/60" />;
    default:
      return null;
  }
}

export const Research: React.FC = () => {
  // Currently renders the single published article. If more are added to
  // researchArticles, this can be extended to match against a slug parsed
  // from the URL (e.g. /research/<slug>) the same way DocsLayout does.
  const article = researchArticles[0];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-term-bg text-term-text font-mono">
        <p>No research articles published yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-term-bg text-term-text font-mono">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-1.5 mb-8 text-xs text-term-muted hover:text-term-cyan transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to GoUpload</span>
        </a>

        {/* Header */}
        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-term-cyan/30 bg-term-cyan/10 text-term-cyan text-[11px] font-mono tracking-wide uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>Research</span>
          </div>

          <h1 className="font-mono text-2xl sm:text-4xl font-bold text-white leading-tight">
            {article.title}
          </h1>

          <p className="font-mono text-sm sm:text-base text-term-muted leading-relaxed">
            {article.subtitle}
          </p>

          <div className="flex items-center gap-4 pt-1 text-[11px] text-term-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
          </div>
        </div>

        <hr className="border-term-border/60 mb-10" />

        {/* Article body */}
        <article>{article.blocks.map(renderBlock)}</article>
      </div>
    </div>
  );
};