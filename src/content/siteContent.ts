import { SiteContent } from '../types';

/**
 * GoUpload Showcase Website Content Configuration
 *
 * ALL content is centralized in this file. To update the website with verified
 * project data, simply edit the values below. Layout and presentation components
 * read directly from this configuration.
 */
export const siteContent: SiteContent = {
  navigation: [
    { label: 'Overview', href: '#overview' },
    { label: 'Features', href: '#features' },
    { label: 'Attack Modules', href: '#modules' },
    { label: 'ML Roadmap', href: '#ml-roadmap', badge: 'Experimental' },
    { label: 'Installation', href: '#install' },
    { label: 'Examples', href: '#examples' },
    { label: 'Contributing', href: '#contributing' },
  ],

  hero: {
    toolName: 'GoUpload',
    tagline: 'Web Application File Upload Security Tester',
    oneLineDescription:
      'A high-performance, concurrent file upload vulnerability scanner written in Go — 344+ payloads across 13 attack modules, with baseline comparison, RCE auto-verification, and optional ML-assisted confidence scoring.',
    quickInstallCommand: 'go install -v github.com/HaakimSec/GoUpload@latest',
    repoUrl: 'https://github.com/HaakimSec/GoUpload',
    releasesBadge: {
      label: 'Latest Release',
      version: 'v1.8.3',
      url: 'https://github.com/HaakimSec/GoUpload/releases',
    },
    terminalEmbed: {
      type: 'mock-terminal',
      src: '[PLACEHOLDER: path to real terminal demo gif — use assets/gifs/demo.gif from the repo once re-recorded with the current banner]',
      alt: 'GoUpload CLI scan in progress, showing module execution and vulnerability findings',
      mockLines: [
        { type: 'command', text: '$ GoUpload -u http://target.com/upload -p file --module xxe --allow-list .txt,.jpg --no-validate' },
        { type: 'info', text: '  Target URL      : http://target.com/upload' },
        { type: 'info', text: '  Upload Param    : file' },
        { type: 'info', text: '  Workers         : 10' },
        { type: 'info', text: '  Payloads        : 12' },
        { type: 'output', text: '  [BASELINE] Establishing upload baseline...' },
        { type: 'output', text: '    Status Code:       200 OK' },
        { type: 'warning', text: '  ┌─ MODULE J: XXE Injection via File Upload' },
        { type: 'output', text: '  ████████████████████ [100%] 12/12 (293ms)' },
        { type: 'success', text: '  #01  XXE via SVG: Read /etc/passwd            VULNERABLE' },
        { type: 'success', text: '  #02  XXE via SVG: SSRF to AWS metadata        VULNERABLE' },
        { type: 'success', text: '  #03  XXE via XML: Direct file read            VULNERABLE' },
        { type: 'info', text: '  SUMMARY' },
        { type: 'info', text: '    Total Tests:           12' },
        { type: 'success', text: '    Vulnerable:            12' },
        { type: 'output', text: '    Total Elapsed:         294ms' },
        { type: 'warning', text: '  ⚠  Potential vulnerabilities detected — manual verification recommended!' },
      ],
    },
  },

  disclaimer: {
    title: 'AUTHORIZATION & COMPLIANCE NOTICE',
    severityLabel: 'STRICT AUTHORIZATION REQUIRED',
    text:
      'This tool is for security professionals and penetration testers only. Always obtain proper authorization before testing any system. The author is not responsible for misuse or damage caused by this tool.',
  },

  features: [
    {
      id: 'feat-1',
      iconName: 'Terminal',
      title: 'Concurrent Scanning Engine',
      description: 'Runs hundreds of upload attack payloads concurrently in under a second.',
      tag: 'CLI Core',
    },
    {
      id: 'feat-2',
      iconName: 'Zap',
      title: 'Scalable Worker Pool',
      description: '10 concurrent workers by default, scalable to 50+, under 50MB memory.',
      tag: 'Performance',
    },
    {
      id: 'feat-3',
      iconName: 'Shield',
      title: '344+ Attack Payloads',
      description: 'Comprehensive test matrix spanning 13 distinct attack modules.',
      tag: 'Bypass Engine',
    },
    {
      id: 'feat-4',
      iconName: 'FileCode',
      title: 'Polyglot & Archive Attacks',
      description: 'GIF+PHP, SVG XSS/XXE, ZIP slip, ZIP bomb, and PDF JS payloads.',
      tag: 'Polyglot',
    },
    {
      id: 'feat-5',
      iconName: 'Layers',
      title: 'Selective Module Testing',
      description: 'Target specific attack surfaces with the --module flag instead of a full sweep.',
      tag: 'Modular',
    },
    {
      id: 'feat-6',
      iconName: 'Cpu',
      title: 'Smart Fingerprinting',
      description: 'Auto-detects the target tech stack — PHP, ASP.NET, Java, Node.js, Python.',
      tag: 'Engine',
    },
    {
      id: 'feat-7',
      iconName: 'Search',
      title: 'RCE Auto-Verification',
      description: 'Confirms real remote code execution on vulnerable uploads, with proof.',
      tag: 'Verification',
    },
    {
      id: 'feat-8',
      iconName: 'Activity',
      title: 'Upload Form Discovery',
      description: 'Auto-discovers hidden upload endpoints and forms from HTML pages.',
      tag: 'Automation',
    },
  ],

  attackModules: [
    {
      id: 'mod-1',
      name: 'extension',
      description: 'Extension evasion — .php5, .phtml, case variations, double extensions',
      payloadCount: '24',
      category: 'Extension Evasion',
      tag: 'Core',
    },
    {
      id: 'mod-2',
      name: 'content-type',
      description: 'Content-Type spoofing — MIME type manipulation',
      payloadCount: '26',
      category: 'Content-Type Spoof',
      tag: 'Core',
    },
    {
      id: 'mod-3',
      name: 'magic-byte',
      description: 'Fakes file signatures/magic bytes to bypass content sniffing',
      payloadCount: '26',
      category: 'Magic Byte Injection',
      tag: 'Core',
    },
    {
      id: 'mod-4',
      name: 'filename',
      description: 'Filename obfuscation — trailing spaces, null bytes, NTFS streams',
      payloadCount: '29',
      category: 'Filename Obfuscation',
      tag: 'Bypass',
    },
    {
      id: 'mod-5',
      name: 'path-traversal',
      description: 'Directory traversal sequences and URL encoding tricks',
      payloadCount: '28',
      category: 'Path Traversal',
      tag: 'Bypass',
    },
    {
      id: 'mod-6',
      name: 'race-condition',
      description: 'TOCTOU detection with synchronized concurrent upload bursts',
      payloadCount: '31',
      category: 'Race Condition',
      tag: 'Bypass',
    },
    {
      id: 'mod-7',
      name: 'polyglot',
      description: 'Polyglot & archive attacks — GIF+PHP, SVG XSS, ZIP slip, PDF JS',
      payloadCount: '11',
      category: 'Polyglot & Archives',
      tag: 'Polyglot',
    },
    {
      id: 'mod-8',
      name: 'xxe',
      description: 'XXE injection via SVG, XML, DOCX, XLSX, and JPEG uploads',
      payloadCount: '12',
      category: 'XXE Injection',
      tag: 'Polyglot',
    },
    {
      id: 'mod-9',
      name: 'server-config',
      description: 'Server configuration overrides — .htaccess, web.config, .user.ini, nginx, tomcat',
      payloadCount: '42',
      category: 'Server Config',
      tag: 'Headers',
    },
    {
      id: 'mod-10',
      name: 'graphql',
      description: 'GraphQL file upload mutations, batch uploads, module overwrite',
      payloadCount: '24',
      category: 'GraphQL Uploads',
      tag: 'Parser',
    },
    {
      id: 'mod-11',
      name: 'unicode',
      description: 'Unicode & encoding vulnerabilities — RTLO, zero-width, homograph',
      payloadCount: '87',
      category: 'Unicode Attacks',
      tag: 'Encoding',
    },
    {
      id: 'mod-12',
      name: 'size-boundary',
      description: 'Size boundary edge cases, ZIP bombs, tiny shells',
      payloadCount: '4',
      category: 'Size Boundaries',
      tag: 'Advanced',
    },
    {
      id: 'mod-13',
      name: 'template',
      description: 'Custom YAML-based attack profiles with regex matchers',
      payloadCount: 'Varies',
      category: 'Template Payloads',
      tag: 'Advanced',
    },
  ],

  mlRoadmap: {
    statusBadge: 'EXPERIMENTAL / IN DEVELOPMENT — NOT IN PRODUCTION RELEASE',
    headline: 'Machine Learning Integration Preview',
    subheadline: 'False-positive reduction and adaptive payload prioritization',
    description:
      'GoUpload is developing a two-part ML system: a classifier that reduces false positives using ground-truth labels from RCE auto-verification, and a reinforcement-learning-based payload prioritizer that adaptively selects which attack techniques to try next based on the target\'s fingerprinted stack — aiming to find the same vulnerabilities in far fewer requests. Model training is incomplete; predictions should not be relied on for production scans yet.',
    calloutTitle: 'Contribute Training Data',
    contributeTrainingDataCallout:
      'Run scans with --verify-rce --output json and share the labeled findings to help improve the model. Every RCE-verified scan becomes a real, ground-truth training example.',
    contributionGuidelinesUrl: 'https://github.com/HaakimSec/GoUpload/blob/main/CONTRIBUTING.md',
    milestones: [
      {
        stage: 'Phase 01',
        title: 'False-Positive Classifier',
        status: 'In Development',
        description:
          'Supervised classifier trained on Result features (baseline deltas, status/content-type matches, timing) with ground-truth labels from --verify-rce scans.',
        deliverables: [
          'ML server (FastAPI) with confidence scoring endpoint',
          'Hybrid verdicts combining oracle heuristics with ML predictions',
        ],
      },
      {
        stage: 'Phase 02',
        title: 'Oracle Heuristic Refinement',
        status: 'In Development',
        description:
          'Ongoing false-positive fixes to the detection heuristics that generate training labels in the first place, since accurate labels depend on an accurate oracle.',
        deliverables: [
          'Reduced false-positive rate on HTTP 200-with-rejection-body responses',
        ],
      },
      {
        stage: 'Phase 03',
        title: 'Adaptive Payload Prioritization',
        status: 'Planned',
        description:
          'Reinforcement-learning-based selection of which module/payload to try next, given the target\'s fingerprinted stack and prior responses this scan — aimed at cutting scan time and noise.',
        deliverables: [
          'Contextual bandit model over the existing 13-module action space',
        ],
      },
      {
        stage: 'Phase 04',
        title: 'Community Template & CVE Library',
        status: 'Planned',
        description:
          'Auto-selection of framework/CVE-specific attack templates based on fingerprinted stack and version, growing via community-contributed templates.',
        deliverables: [
          'Fingerprint-to-template lookup bridge in the scan orchestrator',
        ],
      },
    ],
  },

  installMethods: [
    {
      id: 'go-install',
      name: 'Go Install',
      tabLabel: 'go install',
      command: 'go install -v github.com/HaakimSec/GoUpload@latest',
      notes: 'Requires Go 1.25+. Add $HOME/go/bin to your PATH if the command isn\'t found after install.',
    },
    {
      id: 'source',
      name: 'Build From Source',
      tabLabel: 'source',
      command:
        'git clone https://github.com/HaakimSec/GoUpload.git\ncd GoUpload\ngo build -o GoUpload main.go\nsudo mv GoUpload /usr/local/bin/',
      notes: 'Linux/macOS shown — see the README for the Windows PATH setup equivalent.',
    },
    {
      id: 'docker',
      name: 'Docker',
      tabLabel: 'docker',
      command: 'docker build -t goupload:latest .\ndocker run --rm goupload:latest --help',
      notes: 'Multi-stage Dockerfile, run from the repository root.',
    },
  ],

  exampleCommands: [
    {
      id: 'ex-1',
      caption: 'Basic scan',
      command: 'GoUpload -u http://target.com/upload -p file',
      description: 'Runs the full 13-module payload matrix against the target upload endpoint.',
    },
    {
      id: 'ex-2',
      caption: 'RCE auto-verification',
      command: 'GoUpload -u http://target.com/upload -p file --verify-rce',
      description: 'Automatically verifies RCE on vulnerable uploads and returns proof (uid=, command output).',
    },
    {
      id: 'ex-3',
      caption: 'Auto-detect target stack, run only relevant modules',
      command: 'GoUpload -u http://target.com/upload --auto-detect --module extension,path-traversal',
      description: 'Fingerprints the target before selecting which attack modules to run.',
    },
    {
      id: 'ex-4',
      caption: 'GraphQL upload testing with structured output',
      command:
        'GoUpload -u https://api.target.com/graphql --graphql-mutation "mutation($file:Upload!){uploadFile(file:$file){id}}" --output json --output-file results.json',
      description: 'Tests GraphQL file upload mutations and exports findings for CI pipelines.',
    },
  ],

  contributing: {
    headline: 'Open-Source & Security Community Contributions',
    blurb:
      'GoUpload is built by and for the security community. New payload modules, tech-stack support, template contributions, false-positive fixes, and documentation improvements are all welcome.',
    linkText: 'Read CONTRIBUTING.md on GitHub',
    linkUrl: 'https://github.com/HaakimSec/GoUpload/blob/main/CONTRIBUTING.md',
    guidelinesBlurb: 'See docs/adding-new-payloads.md for a walkthrough of adding a new attack module.',
  },

    contact: {
    headline: 'Report a Finding or Collaborate',
    blurb:
      'Found a bug in GoUpload, want to contribute a payload module, or interested in collaborating on the ML integration? Reach out directly.',
    email: 'haakimsec@gmail.com & hakimabdi206@gmail.com',
    emailNote: 'For responsible disclosure, collaboration proposals, or anything you\'d rather not post publicly.',
    githubProfileUrl: 'https://github.com/HaakimSec',
    githubHandle: '@HaakimSec',
    secondaryChannel: null,
    disclosureNote:
      'If you\'ve found a security issue in GoUpload itself (not a finding from a scan you ran), please report it privately via email rather than a public GitHub issue, so it can be addressed before disclosure.',
  },
  footer: {
    toolName: 'GoUpload',
    license: 'MIT License',
    author: '@HaakimSec',
    authorUrl: 'https://github.com/HaakimSec',
    repoUrl: 'https://github.com/HaakimSec/GoUpload',
    releasesUrl: 'https://github.com/HaakimSec/GoUpload/releases',
    issuesUrl: 'https://github.com/HaakimSec/GoUpload/issues',
    docsUrl: 'https://github.com/HaakimSec/GoUpload/tree/main/docs',
    copyrightYear: '2026',
    builtFor: 'Engineered for security researchers, penetration testers & offensive security teams.',
  },
};