import React, { useState } from 'react';
import { Terminal, Github, Menu, X, ExternalLink } from 'lucide-react';
import { NavLink } from '../types';

interface HeaderProps {
  navLinks: NavLink[];
  repoUrl: string;
}

export const Header: React.FC<HeaderProps> = ({ navLinks, repoUrl }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-term-border bg-term-bg/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded border border-term-cyan/40 bg-term-surface flex items-center justify-center text-term-cyan shadow-glow-cyan group-hover:border-term-cyan transition-colors">
                <Terminal className="w-4 h-4 text-term-cyan" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span className="text-term-cyan">$</span> GoUpload
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-term-panel border border-term-border text-term-muted">
                    CLI
                  </span>
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                className="text-xs font-mono text-term-muted hover:text-term-cyan transition-colors flex items-center gap-1 py-1"
              >
                {link.label}
                {link.badge && (
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-term-purple/20 border border-term-purple/40 text-term-purple-bright">
                    {link.badge}
                  </span>
                )}
                {link.isExternal && <ExternalLink className="w-3 h-3 text-term-dim" />}
              </a>
            ))}
          </nav>

          {/* Right Action: GitHub repo badge link */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-term-border bg-term-surface hover:border-term-cyan/50 hover:bg-term-panel transition-all text-xs font-mono text-term-text group"
            >
                            <Github className="w-4 h-4 text-term-muted group-hover:text-term-text transition-colors" />
              <span className="font-medium">GitHub</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded border border-term-border bg-term-surface text-term-muted hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-term-border bg-term-surface px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded text-xs font-mono text-term-text hover:bg-term-panel hover:text-term-cyan"
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-term-purple/20 border border-term-purple/40 text-term-purple-bright">
                    {link.badge}
                  </span>
                )}
              </div>
            </a>
          ))}
          <div className="pt-3 border-t border-term-border">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded border border-term-border bg-term-panel text-xs font-mono text-term-text"
            >
                            <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
