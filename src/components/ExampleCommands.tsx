import React from 'react';
import { Command } from 'lucide-react';
import { ExampleCommand } from '../types';
import { CodeBlock } from './CodeBlock';

interface ExampleCommandsProps {
  examples: ExampleCommand[];
}

export const ExampleCommands: React.FC<ExampleCommandsProps> = ({ examples }) => {
  return (
    <section id="examples" className="py-16 md:py-20 border-t border-term-border/60 bg-term-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-term-cyan uppercase tracking-wider">
            <Command className="w-3.5 h-3.5" />
            CLI Syntax & Usage
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white">
            Practical Execution Examples
          </h2>
          <p className="text-sm font-mono text-term-muted max-w-2xl leading-relaxed">
            Real-world command-line invocations for standard engagements, evasion passes, and pipeline scanning.
          </p>
        </div>

        {/* 3-4 Code Block Slots */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {examples.map((ex, idx) => (
            <div
              key={ex.id || idx}
              className="rounded-xl border border-term-border bg-term-surface p-5 space-y-3 shadow-terminal flex flex-col justify-between"
            >
              <div className="space-y-2">
                {/* Caption / Title */}
                <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
                  <span className="text-term-cyan font-bold">0{idx + 1}.</span>
                  <span>{ex.caption}</span>
                </div>

                {ex.description && (
                  <p className="text-xs font-mono text-term-muted leading-relaxed">
                    {ex.description}
                  </p>
                )}
              </div>

              {/* Monospace Code Block */}
              <CodeBlock
                code={ex.command}
                language="bash"
                title={`Terminal Example 0${idx + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
