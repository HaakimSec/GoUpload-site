import React, { useState, useMemo } from 'react';
import { Layers, Search, Filter, Hash } from 'lucide-react';
import { AttackModule } from '../types';

interface ModulesTableProps {
  modules: AttackModule[];
}

export const ModulesTable: React.FC<ModulesTableProps> = ({ modules }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    modules.forEach((m) => {
      if (m.category && m.category.trim()) {
        set.add(m.category);
      }
    });
    return ['All', ...Array.from(set)];
  }, [modules]);

  // Filter modules
  const filteredModules = useMemo(() => {
    return modules.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || m.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [modules, searchTerm, selectedCategory]);

  return (
    <section id="modules" className="py-16 md:py-20 border-t border-term-border/60 bg-term-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-term-cyan uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              Attack Surface Modules
            </div>
            <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white">
              Vulnerability Assessment Modules
            </h2>
            <p className="text-sm font-mono text-term-muted max-w-2xl leading-relaxed">
              Modular payload engines targeting parser differentials, file validation bypasses, and remote execution vectors.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-term-dim">
            <span className="px-2.5 py-1 rounded bg-term-panel border border-term-border">
              Total Modules: <span className="text-term-cyan font-bold">{modules.length}</span>
            </span>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-lg border border-term-border bg-term-surface">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-term-dim" />
            <input
              type="text"
              placeholder="Filter modules by name or technique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded bg-term-bg border border-term-border text-xs font-mono text-term-text placeholder:text-term-dim focus:outline-none focus:border-term-cyan"
            />
          </div>

          {/* Category Filter Pills (if > 1 category exists) */}
          {categories.length > 2 && (
            <div className="flex items-center gap-1.5 overflow-x-auto whitespace-pre text-xs font-mono py-1">
              <Filter className="w-3.5 h-3.5 text-term-dim mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                    selectedCategory === cat
                      ? 'bg-term-cyan/20 border border-term-cyan text-term-cyan-bright'
                      : 'bg-term-panel border border-term-border text-term-muted hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Responsive Table Component */}
        <div className="rounded-lg border border-term-border bg-term-surface shadow-terminal overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-term-border bg-term-bg/90 text-term-muted uppercase text-[11px] tracking-wider select-none">
                  <th className="py-3 px-4 w-12 text-center text-term-dim">#</th>
                  <th className="py-3 px-4 min-w-[200px]">Module Name</th>
                  <th className="py-3 px-4 min-w-[320px]">Description & Technique</th>
                  <th className="py-3 px-4 min-w-[130px] text-right">Payloads</th>
                  <th className="py-3 px-4 min-w-[130px] text-center">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-term-border/40">
                {filteredModules.length > 0 ? (
                  filteredModules.map((mod, idx) => (
                    <tr
                      key={mod.id || idx}
                      className="hover:bg-term-panel/50 transition-colors group"
                    >
                      {/* Index */}
                      <td className="py-3.5 px-4 text-center text-term-dim font-mono select-none">
                        {String(idx + 1).padStart(2, '0')}
                      </td>

                      {/* Name */}
                      <td className="py-3.5 px-4 font-semibold text-white group-hover:text-term-cyan transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="text-term-cyan font-bold">›</span>
                          <span>{mod.name}</span>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="py-3.5 px-4 text-term-muted leading-relaxed">
                        {mod.description}
                      </td>

                      {/* Payload Count */}
                      <td className="py-3.5 px-4 text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-term-panel border border-term-border text-term-text font-medium text-[11px]">
                          <Hash className="w-3 h-3 text-term-cyan" />
                          {mod.payloadCount}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wide bg-term-cyan/10 border border-term-cyan/20 text-term-cyan font-semibold">
                          {mod.category}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-term-dim font-mono">
                      No modules matched search query "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-4 py-2.5 bg-term-bg/80 border-t border-term-border flex flex-wrap items-center justify-between text-[11px] text-term-dim font-mono">
            <span>
              Showing {filteredModules.length} of {modules.length} attack modules
            </span>
            <span className="text-term-cyan">
              All modules run via CLI flag: <code className="bg-term-panel px-1.5 py-0.5 rounded text-white">-m &lt;module&gt;</code>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
