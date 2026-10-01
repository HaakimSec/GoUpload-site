import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { blogPosts } from '../content/blog';

interface BlogProps {
  slug?: string; 
}

export const Blog: React.FC<BlogProps> = ({ slug }) => {
  if (!slug) {
    return (
      <div className="min-h-screen bg-term-bg text-term-text font-mono px-6 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Blog</h1>
        {blogPosts.map((post) => (
          <a key={post.slug} href={`/blog/${post.slug}`} className="block mb-6 group">
            <h2 className="text-xl text-term-cyan group-hover:text-term-cyan-bright">{post.title}</h2>
            <p className="text-term-muted text-sm">{post.date}</p>
            <p className="text-term-text/80 mt-1">{post.description}</p>
          </a>
        ))}
      </div>
    );
  }

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return <div className="min-h-screen flex items-center justify-center text-term-text">Post not found.</div>;
  }

  return (
  <div className="min-h-screen bg-term-bg text-term-text font-mono">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

      {/* Back link */}
      <a
        href="/"
        className="inline-flex items-center gap-1.5 mb-8 text-xs text-term-muted hover:text-term-cyan transition-colors"
      >
        ←
        <span>Back to GoUpload</span>
      </a>

      {/* Header */}
      <header className="mb-10 space-y-4">
        <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-term-cyan/30 bg-term-cyan/10 text-term-cyan text-[11px] tracking-wide uppercase">
          Blog
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-[11px] text-term-muted">
          {post.date}
        </p>

        <p className="text-sm sm:text-base text-term-muted leading-relaxed">
          {post.description}
        </p>
      </header>

      <hr className="border-term-border/60 mb-10" />

      {/* Markdown article */}
      <article className="text-sm sm:text-base leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <h1 className="mt-12 mb-5 text-2xl sm:text-3xl font-bold text-white leading-tight">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="mt-12 mb-4 text-2xl font-bold text-white">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="mt-8 mb-3 text-lg font-semibold text-term-cyan-bright">
                {children}
              </h3>
            ),

            p: ({ children }) => (
              <p className="mb-4 text-term-text/90 leading-relaxed">
                {children}
              </p>
            ),

            img: ({ src, alt }) => {
  const imageSrc =
    src?.startsWith('http')
      ? src
      : `${import.meta.env.BASE_URL}${src?.replace(/^\/+/, '')}`;

  return (
    <figure className="my-8">
      <img
        src={imageSrc}
        alt={alt || ''}
        className="w-full rounded-lg border border-term-border"
      />

      {alt && (
        <figcaption className="mt-2 text-center text-xs text-term-muted">
          {alt}
        </figcaption>
      )}
    </figure>
  );
},

            ul: ({ children }) => (
              <ul className="mb-5 space-y-1.5 pl-5 list-disc text-term-text/90">
                {children}
              </ul>
            ),

            ol: ({ children }) => (
              <ol className="mb-5 space-y-1.5 pl-5 list-decimal text-term-text/90">
                {children}
              </ol>
            ),

            li: ({ children }) => (
              <li className="pl-1">
                {children}
              </li>
            ),

            blockquote: ({ children }) => (
              <blockquote className="my-5 border-l-2 border-term-border pl-4 py-1 text-term-muted italic">
                {children}
              </blockquote>
            ),

            hr: () => (
              <hr className="my-10 border-term-border/60" />
            ),

            a: ({ href, children }) => (
              <a
                href={href}
                className="text-term-cyan hover:text-term-cyan-bright underline underline-offset-2"
              >
                {children}
              </a>
            ),

            code: ({ children, className }) => {
              const isBlock = className?.includes('language-');

              if (isBlock) {
                return (
                  <code className={`font-mono text-xs sm:text-sm text-term-green ${className ?? ''}`}>
                    {children}
                  </code>
                );
              }

              return (
                <code className="font-mono text-term-cyan bg-term-surface px-1.5 py-0.5 rounded text-[0.9em]">
                  {children}
                </code>
              );
            },

            pre: ({ children }) => (
              <div className="my-5 rounded-lg border border-term-border bg-term-surface overflow-hidden">
                <pre className="px-4 py-3 overflow-x-auto">
                  {children}
                </pre>
              </div>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  </div>
);

};