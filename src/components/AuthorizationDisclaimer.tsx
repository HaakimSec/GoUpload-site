import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { DisclaimerContent } from '../types';

interface AuthorizationDisclaimerProps {
  disclaimer: DisclaimerContent;
}

export const AuthorizationDisclaimer: React.FC<AuthorizationDisclaimerProps> = ({ disclaimer }) => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2" aria-label="Legal and Authorization Notice">
      <div className="relative rounded-lg border border-term-amber/30 bg-term-amber/5 p-4 sm:p-5 backdrop-blur-sm shadow-sm transition-all hover:border-term-amber/50">
        <div className="flex flex-col sm:flex-row items-start gap-3.5">
          {/* Icon Badge */}
          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded border border-term-amber/40 bg-term-amber/10 text-term-amber-bright">
            <ShieldAlert className="w-4 h-4" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-term-amber-bright flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-term-amber" />
                {disclaimer.title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-term-amber/30 bg-term-amber/15 text-term-amber-bright uppercase font-semibold">
                {disclaimer.severityLabel}
              </span>
            </div>
            <p className="text-xs sm:text-[13px] font-mono text-term-text/90 leading-relaxed">
              {disclaimer.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
