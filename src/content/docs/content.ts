import { pagesData } from './pagesData';
import { DocPage } from './types';

export * from './types';
export { detailedModules } from './modulesData';
export { pagesData } from './pagesData';

export const moduleDocs: readonly (readonly [string, string, string])[] = [
  ['extension', 'Extension evasion', 'Alternative extensions, case variations, and double extensions such as .php5, .phtml, .phar, .PhP, .php.jpg, and .jpg.php.'],
  ['content-type', 'Content-Type spoofing', 'MIME manipulation checks, including executable content declared as image/jpeg, image/png, or application/pdf.'],
  ['magic-byte', 'Magic byte injection', 'File-signature spoofing: GIF89a, PNG, JPEG, and PDF headers combined with executable content.'],
  ['filename', 'Filename obfuscation', 'Filename sanitization edge cases: trailing spaces or dots, null-byte encoding, NTFS alternate data streams, and special characters.'],
  ['path-traversal', 'Path traversal', 'Traversal filenames, URL-encoded variants, WAF-bypass forms, and absolute-path attempts.'],
  ['graphql', 'GraphQL uploads', 'GraphQL multipart upload mutations, custom mutation strings, and batch-upload behavior.'],
  ['unicode', 'Unicode & encoding', 'RTLO, zero-width characters, homographs, and Unicode whitespace filename confusion.'],
  ['size-boundary', 'Size boundary', 'Empty files, 1KB/1MB/10MB boundaries, size-limit bypasses, and chunked-upload edge cases.'],
  ['race-condition', 'Race condition', 'TOCTOU-oriented concurrent same-filename uploads, extension-check-versus-save races, temp-file races, and symlink races.'],
  ['polyglot', 'Polyglots & archives', 'GIF/PHP/JS polyglots, SVG XSS, ZIP Slip, ZIP bombs, and related archive extraction cases.'],
  ['xxe', 'XXE injection', 'SVG, DOCX, XLSX, and JPEG XML entity payloads, including file-read, SSRF, and entity-expansion cases.'],
  ['server-config', 'Server configuration', 'Uploadable server configuration files such as .htaccess, web.config, .user.ini, nginx.conf, and web.xml.'],
  ['template', 'Template payloads', 'Custom YAML attack profiles with payloads, matchers, and extractors.'],
] as const;

export const pages: Record<string, DocPage> = pagesData;

export const navigation: readonly (readonly [string, readonly (readonly [string, string])[]])[] = [
  [
    'Getting Started',
    [
      ['Introduction', '/docs/introduction'],
      ['Installation', '/docs/installation'],
      ['Quick Start', '/docs/quick-start'],
    ],
  ],
  [
    'Scanning & Modules',
    [
      ['Scan Workflow', '/docs/workflow'],
      ['All Modules Overview', '/docs/modules'],
      ['Results & Oracle System', '/docs/results'],
    ],
  ],
  [
    'CLI & Templates',
    [
      ['CLI Reference', '/docs/cli'],
      ['YAML Templates', '/docs/templates'],
    ],
  ],
  [
    'Development',
    [
      ['Architecture', '/docs/architecture'],
      ['Contributing', '/docs/contributing'],
    ],
  ],
  [
    'Reference',
    [
      ['Known Issues & History', '/docs/known-issues'],
    ],
  ],
] as const;
