import React from 'react';
import { GitPullRequest, ExternalLink } from 'lucide-react';
import { ContributingContent } from '../types';

interface ContributingSectionProps {
  contributing: ContributingContent;
}

export const ContributingSection: React.FC<ContributingSectionProps> = ({ contributing }) => {
  return (
    <section id="contributing" className="py-16 md:py-20 border-t border-term-border/60 bg-term-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-term-border bg-term-surface p-6 sm:p-8 lg:p-10 shadow-terminal relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial-gradient pointer-events-none opacity-50" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-term-cyan uppercase tracking-wider">
                <GitPullRequest className="w-3.5 h-3.5" />
                Community & Ecosystem
              </div>

              <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white">
                {contributing.headline}
              </h2>

              <p className="text-xs sm:text-sm font-mono text-term-text/90 leading-relaxed">
                {contributing.blurb}
              </p>

              {contributing.guidelinesBlurb && (
                <p className="text-xs font-mono text-term-dim">
                  {contributing.guidelinesBlurb}
                </p>
              )}
            </div>

            {/* Link-out Component */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <a
                href={contributing.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-term-cyan/60 bg-term-cyan/15 hover:bg-term-cyan/25 text-term-cyan-bright font-mono text-xs sm:text-sm font-semibold shadow-glow-cyan transition-all"
              >
                <GitPullRequest className="w-4 h-4 text-term-cyan" />
                <span>{contributing.linkText}</span>
                <ExternalLink className="w-3.5 h-3.5 text-term-cyan" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
