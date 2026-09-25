import React from 'react';
import { Terminal, Github, Scale, ExternalLink, Tag } from 'lucide-react';
import { FooterContent } from '../types';

interface FooterProps {
  footer: FooterContent;
}

export const Footer: React.FC<FooterProps> = ({ footer }) => {
  return (
    <footer className="border-t border-term-border bg-term-bg py-12 text-xs font-mono text-term-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-term-border/40">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded border border-term-cyan/30 bg-term-surface flex items-center justify-center text-term-cyan">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-white text-sm">
                $ {footer.toolName}
              </span>
            </div>
            <p className="text-xs text-term-dim max-w-md">
              {footer.builtFor}
            </p>
          </div>

          {/* Links & Slots Grid */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
            {/* License Badge Slot */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-term-panel border border-term-border text-term-text">
              <Scale className="w-3.5 h-3.5 text-term-cyan" />
              <span>License:</span>
              <span className="text-term-cyan font-semibold">{footer.license}</span>
            </div>

            {/* Author Link Slot */}
            <a
              href={footer.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-term-cyan transition-colors"
            >
              <span>Author:</span>
              <span className="text-white font-medium underline underline-offset-4 decoration-term-cyan/50 hover:decoration-term-cyan">
                {footer.author}
              </span>
              <ExternalLink className="w-3 h-3 text-term-dim" />
            </a>

            {/* GitHub Repo Link Slot */}
            <a
              href={footer.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-term-cyan transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Repository</span>
              <ExternalLink className="w-3 h-3 text-term-dim" />
            </a>

            {/* Releases Link Slot */}
            <a
              href={footer.releasesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-term-cyan transition-colors"
            >
              <Tag className="w-3.5 h-3.5 text-term-green" />
              <span>Releases</span>
              <ExternalLink className="w-3 h-3 text-term-dim" />
            </a>
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-term-dim text-[11px]">
          <div>
            &copy; {footer.copyrightYear} {footer.toolName}. Open-source offensive security research tool.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-term-green" />
            <span>CLI Only Architecture • No telemetry collected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
