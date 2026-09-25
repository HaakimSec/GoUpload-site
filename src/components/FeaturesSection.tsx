import React from 'react';
import {
  Terminal,
  Shield,
  Zap,
  FileCode,
  Cpu,
  Layers,
  GitBranch,
  Search,
  Lock,
  Activity,
  Flame,
  Server,
  LucideIcon,
} from 'lucide-react';
import { FeatureItem } from '../types';

interface FeaturesSectionProps {
  features: FeatureItem[];
}

const iconMap: Record<string, LucideIcon> = {
  Terminal,
  Shield,
  Zap,
  FileCode,
  Cpu,
  Layers,
  GitBranch,
  Search,
  Lock,
  Activity,
  Flame,
  Server,
};

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  return (
    <section id="features" className="py-16 md:py-20 border-t border-term-border/60 bg-term-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-term-cyan uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-term-cyan" />
            Capabilities & Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white">
            Core Engine Features
          </h2>
          <p className="text-sm font-mono text-term-muted max-w-2xl leading-relaxed">
            Engineered for high-concurrency vulnerability assessments against hostile file handling endpoints.
          </p>
        </div>

        {/* Feature Grid: gracefully handles 6 to 20 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.iconName] || Terminal;
            return (
              <div
                key={feature.id || index}
                className="group relative rounded-lg border border-term-border bg-term-surface/70 p-5 hover:border-term-cyan/40 hover:bg-term-surface transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Bar with Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded border border-term-border bg-term-panel flex items-center justify-center text-term-cyan group-hover:border-term-cyan/50 group-hover:text-term-cyan-bright transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    {feature.tag && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-term-panel border border-term-border text-term-dim group-hover:text-term-muted transition-colors">
                        {feature.tag}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-mono text-sm sm:text-base font-semibold text-white group-hover:text-term-cyan-bright transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="font-mono text-xs text-term-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="pt-4 mt-3 border-t border-term-border/40 flex items-center justify-between text-[10px] font-mono text-term-dim">
                  <span>ITEM #{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-term-cyan/40 group-hover:text-term-cyan transition-colors">READY</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
