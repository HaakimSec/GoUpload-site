import React, { useState } from 'react';
import { Terminal, ArrowRight, Check, Copy, Tag } from 'lucide-react';
import { HeroContent } from '../types';
import { TerminalDemo } from './TerminalDemo';

interface HeroProps {
  hero: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ hero }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(hero.quickInstallCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="overview" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
      {/* Background Subtle Glow Grid */}
      <div className="absolute inset-0 bg-terminal-grid bg-[size:32px_32px] pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-radial-gradient pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Badges & Meta */}
                <div className="flex flex-wrap items-center gap-4">
          {/* CLI Only Badge */}
          <div className="inline-flex items-center gap-1.5 text-term-cyan text-[11px] font-mono tracking-wide uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>STANDALONE CLI TOOL • GO-POWERED</span>
          </div>

          {/* Release Version Badge */}
          <a
            href={hero.releasesBadge.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-term-border bg-term-surface hover:border-term-cyan/40 text-term-muted hover:text-term-text text-[11px] font-mono transition-colors"
          >
            <Tag className="w-3 h-3 text-term-cyan" />
            <span>{hero.releasesBadge.label}:</span>
            <span className="text-term-green font-semibold">{hero.releasesBadge.version}</span>
          </a>
        </div>

        {/* Hero Title & Description */}
        <div className="max-w-4xl space-y-5">
          <h1 className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-term-cyan via-white to-term-green">
              {hero.toolName}
            </span>
            <span className="block mt-2 text-xl sm:text-2xl lg:text-3xl font-mono text-term-text/80 font-normal">
               {hero.tagline}
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg font-mono text-term-text/90 leading-relaxed max-w-3xl">
            {hero.oneLineDescription}
          </p>
        </div>

        {/* Quick Install Bar & Action Links */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-3xl">
          {/* Code Block for Quick Install */}
          <div className="flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-term-cyan/40 bg-term-surface/90 shadow-glow-cyan overflow-hidden">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-pre font-mono text-xs sm:text-sm text-term-text mr-2">
              <span className="text-term-cyan-bright select-none">$</span>
              <span className="text-slate-100">{hero.quickInstallCommand}</span>
            </div>
            <button
              onClick={handleCopyInstall}
              aria-label="Copy install command"
              className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded bg-term-panel hover:bg-term-border text-term-text hover:text-term-cyan border border-term-border text-xs font-mono transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-term-green" />
                  <span className="text-term-green font-semibold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-term-muted" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          {/* Jump to Installation Tab Anchor */}
          <a
            href="#install"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-term-border bg-term-panel hover:bg-term-surface hover:border-term-cyan/50 text-term-text text-xs sm:text-sm font-mono transition-all font-medium"
          >
            <span>All Install Options</span>
            <ArrowRight className="w-4 h-4 text-term-cyan" />
          </a>
        </div>

        {/* Terminal Window Recording / Mock Showcase Embed */}
        <div className="pt-2">
          <TerminalDemo embed={hero.terminalEmbed} />
        </div>
      </div>
    </section>
  );
};
