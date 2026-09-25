import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  title,
  showLineNumbers = false,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className={`relative rounded-lg border border-term-border bg-term-surface overflow-hidden shadow-terminal ${className}`}>
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-term-border bg-term-bg/80 text-xs text-term-muted">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-term-cyan" />
          <span className="font-mono">{title || language}</span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-term-panel hover:bg-term-border text-term-text hover:text-term-cyan transition-colors text-xs font-mono border border-term-border"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-term-green" />
              <span className="text-term-green">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-term-muted" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body - Horizontal scroll without wrapping */}
      <div className="p-4 overflow-x-auto text-xs md:text-sm font-mono text-term-text leading-relaxed">
        {showLineNumbers ? (
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-term-panel/40">
                  <td className="pr-4 select-none text-right text-term-dim text-xs w-8">
                    {idx + 1}
                  </td>
                  <td className="whitespace-pre">
                    <span className="text-term-cyan-bright">$ </span>
                    <span>{line}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <pre className="whitespace-pre overflow-x-auto selection:bg-term-cyan/30">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
