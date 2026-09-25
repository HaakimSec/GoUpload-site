import React from 'react';
import {
  FlaskConical,
  GitPullRequest,
  Clock,
  HelpCircle,
  ExternalLink,
  BrainCircuit,
  Database,
} from 'lucide-react';
import { MlSectionContent } from '../types';

interface MlRoadmapSectionProps {
  mlData: MlSectionContent;
}

export const MlRoadmapSection: React.FC<MlRoadmapSectionProps> = ({ mlData }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Development':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 border border-amber-500/40 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            In Development
          </span>
        );
      case 'Planned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-500/10 border border-sky-500/40 text-sky-300">
            <Clock className="w-3 h-3 text-sky-400" />
            Planned
          </span>
        );
      case 'Research':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-purple-500/10 border border-purple-500/40 text-purple-300">
            <FlaskConical className="w-3 h-3 text-purple-400" />
            Research
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-800 border border-slate-700 text-slate-400">
            <HelpCircle className="w-3 h-3" />
            Future Concept
          </span>
        );
    }
  };

  return (
    <section
      id="ml-roadmap"
      className="relative py-20 border-t-2 border-b-2 border-term-purple/40 bg-gradient-to-b from-[#0e0c1f] via-[#090b14] to-[#0d0d1e] overflow-hidden"
    >
      {/* Visual Distinct Aura */}
      <div className="absolute inset-0 bg-ml-radial pointer-events-none opacity-60" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Warning & Distinction Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-term-purple/40 bg-term-purple/10 backdrop-blur-md shadow-glow-purple">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-term-purple/50 bg-term-purple/20 flex items-center justify-center text-term-purple-bright shadow-sm flex-shrink-0">
              <FlaskConical className="w-5 h-5 text-term-purple-bright" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-term-purple-bright">
                {mlData.statusBadge}
              </div>
              <div className="text-xs font-mono text-slate-300">
                This research track is strictly isolated from current stable CLI releases.
              </div>
            </div>
          </div>
          <span className="self-start sm:self-auto text-[10px] font-mono px-3 py-1 rounded bg-black/40 border border-term-purple/30 text-term-purple-bright">
            LABS // PREVIEW
          </span>
        </div>

        {/* Section Heading */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-term-purple-bright uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4" />
            Adaptive Intelligence Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white">
            {mlData.headline}
          </h2>
          <p className="text-base font-mono text-slate-300 font-medium">
            {mlData.subheadline}
          </p>
          <p className="text-xs sm:text-sm font-mono text-term-muted leading-relaxed">
            {mlData.description}
          </p>
        </div>

        {/* Visual Progress / Roadmap Milestones Element (Stepper & Cards) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-term-muted">
            <span className="uppercase tracking-wider text-slate-400">Planned Research Milestones</span>
            <span className="text-term-purple-bright">Status: Experimental</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mlData.milestones.map((milestone, idx) => (
              <div
                key={milestone.stage || idx}
                className="relative rounded-xl border border-term-purple/25 bg-term-surface/90 p-5 backdrop-blur-sm flex flex-col justify-between hover:border-term-purple/50 transition-all group"
              >
                {/* Stage Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-term-purple-bright uppercase tracking-wider">
                      {milestone.stage}
                    </span>
                    {getStatusBadge(milestone.status)}
                  </div>

                  <h3 className="font-mono text-sm font-semibold text-white group-hover:text-term-purple-bright transition-colors">
                    {milestone.title}
                  </h3>

                  <p className="text-xs font-mono text-term-muted leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Deliverables / Objectives */}
                  {milestone.deliverables && milestone.deliverables.length > 0 && (
                    <div className="pt-2 space-y-1.5 border-t border-white/5">
                      <span className="text-[10px] uppercase font-mono text-slate-400">Objectives:</span>
                      {milestone.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-[11px] font-mono text-slate-300">
                          <span className="text-term-purple-bright">›</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Progress bar simulation */}
                <div className="pt-4 mt-4 border-t border-term-border/40">
                  <div className="w-full h-1 bg-term-panel rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        milestone.status === 'In Development'
                          ? 'w-1/3 bg-amber-400'
                          : milestone.status === 'Planned'
                          ? 'w-1/6 bg-sky-400'
                          : 'w-0 bg-term-purple'
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Training Data Callout Card */}
        <div className="relative rounded-xl border border-dashed border-term-purple/50 bg-term-purple/5 p-6 sm:p-7 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-term-purple-bright" />
                <h4 className="font-mono text-base font-bold text-white">
                  {mlData.calloutTitle}
                </h4>
              </div>
              <p className="font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
                {mlData.contributeTrainingDataCallout}
              </p>
            </div>

            <a
              href={mlData.contributionGuidelinesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-term-purple/60 bg-term-purple/20 hover:bg-term-purple/30 text-white font-mono text-xs font-semibold shadow-glow-purple transition-all"
            >
              <GitPullRequest className="w-4 h-4 text-term-purple-bright" />
              <span>Contribute Data / RFC</span>
              <ExternalLink className="w-3.5 h-3.5 text-term-purple-bright" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
