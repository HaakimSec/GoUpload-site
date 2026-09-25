import React from 'react';
import { Mail, Github, MessageSquare, ShieldAlert } from 'lucide-react';
import { ContactContent } from '../types';

interface ContactProps {
  contact: ContactContent;
}

export const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <section id="contact" className="relative py-16 md:py-24 border-t border-term-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Badge & Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-term-cyan/30 bg-term-cyan/10 text-term-cyan text-[11px] font-mono tracking-wide uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Collaboration</span>
          </div>
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-white">
            {contact.headline}
          </h2>
          <p className="font-mono text-sm text-term-muted max-w-xl mx-auto leading-relaxed">
            {contact.blurb}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="group flex items-start gap-3.5 p-4 rounded-lg border border-term-border bg-term-surface/90 hover:border-term-cyan/40 hover:shadow-glow-cyan transition-all"
          >
            <Mail className="w-4 h-4 mt-0.5 text-term-cyan flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="font-mono text-xs sm:text-sm font-semibold text-white">Email</h3>
              <p className="font-mono text-xs sm:text-sm text-term-text/90 group-hover:text-term-cyan-bright break-all mt-0.5">
                {contact.email}
              </p>
              <p className="font-mono text-[11px] text-term-muted mt-1.5 leading-relaxed">
                {contact.emailNote}
              </p>
            </div>
          </a>

          <a
            href={contact.githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3.5 p-4 rounded-lg border border-term-border bg-term-surface/90 hover:border-term-cyan/40 hover:shadow-glow-cyan transition-all"
          >
            <Github className="w-4 h-4 mt-0.5 text-term-cyan flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="font-mono text-xs sm:text-sm font-semibold text-white">GitHub</h3>
              <p className="font-mono text-xs sm:text-sm text-term-text/90 group-hover:text-term-cyan-bright mt-0.5">
                {contact.githubHandle}
              </p>
              <p className="font-mono text-[11px] text-term-muted mt-1.5 leading-relaxed">
                Open an issue or discussion on the repo — best for public, reproducible bugs.
              </p>
            </div>
          </a>

          {contact.secondaryChannel && (
            <a
              href={contact.secondaryChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3.5 p-4 rounded-lg border border-term-border bg-term-surface/90 hover:border-term-cyan/40 hover:shadow-glow-cyan transition-all sm:col-span-2"
            >
              <MessageSquare className="w-4 h-4 mt-0.5 text-term-cyan flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="font-mono text-xs sm:text-sm font-semibold text-white">
                  {contact.secondaryChannel.label}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-term-text/90 group-hover:text-term-cyan-bright mt-0.5">
                  {contact.secondaryChannel.handle}
                </p>
              </div>
            </a>
          )}
        </div>

        {/* Responsible Disclosure Note */}
        <div className="flex items-start gap-3 p-4 rounded-lg border border-term-yellow/25 bg-term-yellow/5">
          <ShieldAlert className="w-4 h-4 mt-0.5 text-term-yellow flex-shrink-0" />
          <p className="font-mono text-[11px] sm:text-xs text-term-yellow/80 leading-relaxed">
            {contact.disclosureNote}
          </p>
        </div>
      </div>
    </section>
  );
};