import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { HeroContent } from '../types';

interface TerminalDemoProps {
  embed: HeroContent['terminalEmbed'];
}

export const TerminalDemo: React.FC<TerminalDemoProps> = ({ embed }) => {
  const [copied, setCopied] = useState(false);

  // If user provided a real video or gif path that doesn't start with [PLACEHOLDER, display media
  const hasCustomMedia = embed.src && !embed.src.startsWith('[PLACEHOLDER');

  const fullTerminalText = embed.mockLines
    ? embed.mockLines.map((l) => l.text).join('\n')
    : '';

  const handleCopyLogs = async () => {
    try {
      await navigator.clipboard.writeText(fullTerminalText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full rounded-xl border border-term-border bg-term-surface/95 shadow-terminal overflow-hidden transition-all duration-300 hover:border-term-cyan/40">
      {/* Terminal Window Header / Chrome */}
      <div className="flex items-center justify-between px-4 py-3 bg-term-bg/95 border-b border-term-border select-none">
        {/* Window controls (traffic lights) */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ef4444] border border-[#dc2626]/60 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#f59e0b] border border-[#d97706]/60 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#10b981] border border-[#059669]/60 shadow-sm" />
          <span className="ml-2 hidden sm:inline-block text-[11px] font-mono text-term-dim">
            tty1 — zsh — 80x24
          </span>
        </div>

        {/* Title bar center */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-term-muted">
          <Terminal className="w-3.5 h-3.5 text-term-cyan" />
          <span className="font-semibold text-slate-300">goupload-session.log</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={handleCopyLogs}
            aria-label="Copy terminal log"
            className="flex items-center gap-1 text-[11px] text-term-dim hover:text-term-cyan transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-term-green" />
                <span className="text-term-green">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="hidden sm:inline">RAW</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div className="relative bg-[#070b12] p-4 sm:p-5 font-mono text-xs sm:text-sm text-term-text overflow-x-auto min-h-[360px] max-h-[480px] overflow-y-auto leading-relaxed">
        {hasCustomMedia ? (
          embed.type === 'video' ? (
            <video
              src={embed.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded"
            />
          ) : (
            <img
              src={embed.src}
              alt={embed.alt || 'Terminal session recording'}
              className="w-full h-auto rounded"
            />
          )
        ) : (
          /* High-Fidelity Mock Terminal Output */
          <div className="space-y-1">
            {embed.mockLines?.map((line, idx) => {
              let colorClass = 'text-slate-300';
              if (line.type === 'command') colorClass = 'text-term-cyan-bright font-bold';
              else if (line.type === 'banner') colorClass = 'text-term-cyan/80';
              else if (line.type === 'info') colorClass = 'text-sky-400';
              else if (line.type === 'warning') colorClass = 'text-amber-400 font-semibold';
              else if (line.type === 'success') colorClass = 'text-term-green-bright font-semibold';
              else if (line.type === 'error') colorClass = 'text-red-400 font-semibold';

              return (
                <div key={idx} className="whitespace-pre font-mono hover:bg-white/[0.02] px-1 rounded transition-colors">
                  <span className={colorClass}>{line.text}</span>
                </div>
              );
            })}
            <div className="flex items-center gap-1.5 pt-2 text-term-cyan">
              <span className="text-term-cyan-bright font-bold">$</span>
              <span className="inline-block w-2.5 h-4 bg-term-cyan cursor-blink" />
            </div>
          </div>
        )}

        {/* Media Placeholder Indicator Badge */}
        {!hasCustomMedia && (
          <div className="mt-6 pt-4 border-t border-term-border/40 flex flex-wrap items-center justify-between gap-2 text-[11px] text-term-dim">
            <span className="flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-term-cyan animate-pulse" />
              Embed Slot: Set <code className="text-term-cyan font-bold">hero.terminalEmbed.src</code> in <code className="text-slate-300 font-bold">src/content/siteContent.ts</code>
            </span>
            <span className="text-[10px] text-term-dim uppercase tracking-wider font-mono">
              Accepts .gif or .mp4
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
