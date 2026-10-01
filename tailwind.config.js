/** @type {import('tailwindcss').Config} */
require('@tailwindcss/typography')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      colors: {
        term: {
          bg: '#080c14',
          surface: '#0d131f',
          panel: '#111827',
          card: '#0e1626',
          border: '#1b253b',
          'border-focus': '#22d3ee',
          text: '#e2e8f0',
          muted: '#8193b0',
          dim: '#475569',
          cyan: '#06b6d4',
          'cyan-bright': '#22d3ee',
          green: '#10b981',
          'green-bright': '#34d399',
          amber: '#f59e0b',
          'amber-bright': '#fbbf24',
          red: '#ef4444',
          purple: '#8b5cf6',
          'purple-bright': '#a78bfa',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-purple': '0 0 30px -5px rgba(139, 92, 246, 0.25)',
        'terminal': '0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.07)',
      },
      backgroundImage: {
        'terminal-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'radial-gradient': 'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
        'ml-radial': 'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 65%)',
      },
    },
  },
  plugins: [],
}
