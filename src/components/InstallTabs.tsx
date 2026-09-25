import React, { useState } from 'react';
import { Terminal, Download, Box, GitBranch, Info } from 'lucide-react';
import { InstallMethod } from '../types';
import { CodeBlock } from './CodeBlock';

interface InstallTabsProps {
  installMethods: InstallMethod[];
}

export const InstallTabs: React.FC<InstallTabsProps> = ({ installMethods }) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    installMethods[0]?.id || 'go-install'
  );

  const activeMethod =
    installMethods.find((m) => m.id === activeTabId) || installMethods[0];

  const getMethodIcon = (id: string) => {
    switch (id) {
      case 'go-install':
        return <Terminal className="w-4 h-4" />;
      case 'source':
        return <GitBranch className="w-4 h-4" />;
      case 'docker':
        return <Box className="w-4 h-4" />;
      default:
        return <Download className="w-4 h-4" />;
    }
  };

  return (
    <section id="install" className="py-16 md:py-20 border-t border-term-border/60 bg-term-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-term-cyan uppercase tracking-wider">
            <Download className="w-3.5 h-3.5" />
            Deployment & Setup
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white">
            Quick Start & Installation
          </h2>
          <p className="text-sm font-mono text-term-muted max-w-2xl leading-relaxed">
            Install GoUpload onto your testing workstation or container environment.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 border-b border-term-border pb-3">
          {installMethods.map((method) => {
            const isActive = method.id === activeTabId;
            return (
              <button
                key={method.id}
                onClick={() => setActiveTabId(method.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all border ${
                  isActive
                    ? 'bg-term-surface border-term-cyan text-white shadow-glow-cyan'
                    : 'bg-term-panel/50 border-term-border text-term-muted hover:text-white hover:bg-term-panel'
                }`}
              >
                <span className={isActive ? 'text-term-cyan' : 'text-term-dim'}>
                  {getMethodIcon(method.id)}
                </span>
                <span>{method.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Code Block Slot */}
        <div className="space-y-4 max-w-4xl">
          <CodeBlock
            code={activeMethod.command}
            language="bash"
            title={`${activeMethod.name} — Terminal`}
          />

          {/* Notes Callout */}
          {activeMethod.notes && (
            <div className="flex items-start gap-2.5 p-3 rounded-md border border-term-border bg-term-surface/60 text-xs font-mono text-term-muted">
              <Info className="w-4 h-4 text-term-cyan flex-shrink-0 mt-0.5" />
              <span>{activeMethod.notes}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
