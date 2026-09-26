import { DetailedModule } from './types';

export const detailedModules: Record<string, DetailedModule> = {
  extension: {
    slug: 'extension',
    name: 'Extension Evasion',
    subtitle: 'Blacklist and whitelist bypass through extension tampering',
    testType: 'TestTypeExtensionEvasion',
    payloadCount: '20+ payloads',
    flag: '--module extension',
    description:
      'Tests whether the target file upload endpoint can be tricked into accepting executable files by modifying or disguising file extensions. It generates tech-specific extension variations for PHP, ASP.NET, Java/JSP, Node.js, and Python targets.',
    whatItTests: [
      'Alternative executable extensions: .php5, .phtml, .phar, .php3, .pht, .pgif (for PHP); .aspx, .ashx, .asmx, .asp (for ASP.NET); .jsp, .jspx (for Java)',
      'Case sensitivity bypasses: .PhP, .pHP, .AsPx, .Jsp, .JsP (exploits case-sensitive filter on case-insensitive filesystems)',
      'Double extensions: .php.jpg, .jpg.php, .php.png, .png.php (exploits Apache mod_mime multiextension execution)',
      'Null-byte variations: .php%00.jpg, .php\\x00.png (for legacy runtimes and C-string truncations)',
      'Reverse extensions: .jpg.phtml and trailing dot-extensions',
    ],
    command: 'GoUpload -u http://target.example/upload -p file --module extension --allow-list .jpg,.png',
    sampleOutput: `  ┌─ MODULE A: Extension Evasion Matrix
  │
  ████████████████████ [100%] 20/20 (85ms)

  ⚠  FLAGGED RESULTS (2 items)
  #01  Extension: Alternative extension (.php5)   VULNERABLE (confidence: 95%)
  #02  Extension: Double extension (.php.jpg)     SUSPECT    (confidence: 65%)`,
    oracleVerdict:
      'VULNERABLE if an executable extension is accepted with 200/201 and matches safe baseline metrics. SUSPECT if status code differs but response indicates potential processing.',
    limitations: [
      'Success depends on the web server handler configuration (e.g. Apache AddHandler / SetHandler vs Nginx fastcgi_pass).',
      'If the server renames all uploaded files to randomized names with static extensions (e.g. uuid.jpg), extension evasion alone cannot achieve execution without additional flaws like path traversal.',
    ],
    implementationNotes:
      'Implemented in internal/payload/module_a.go. Adapts generated extension variations when --tech is specified (e.g., moduleA_ASP, moduleA_JSP, moduleNodeJS, modulePython).',
  },

  'content-type': {
    slug: 'content-type',
    name: 'Content-Type Spoofing',
    subtitle: 'MIME manipulation to bypass client-side and MIME-header validation',
    testType: 'TestTypeContentTypeSpoof',
    payloadCount: '30+ payloads',
    flag: '--module content-type',
    description:
      'Tests whether upload filters validate files solely based on the user-supplied Content-Type header in multipart boundaries, allowing executable script bodies to pass through disguised as images, documents, or plain text.',
    whatItTests: [
      'PHP webshell uploaded with image/jpeg MIME type',
      'PHP webshell uploaded with image/png MIME type',
      'ASP/ASPX script uploaded with application/pdf MIME type',
      'JSP webshell uploaded with image/gif MIME type',
      'Executable scripts declared as text/plain, application/octet-stream, or audio/mpeg',
      'Empty or omitted Content-Type header values',
    ],
    command: 'GoUpload -u http://target.example/upload -p file --module content-type',
    sampleOutput: `  ┌─ MODULE B: Content-Type Spoofing
  │
  ████████████████████ [100%] 30/30 (110ms)

  ⚠  FLAGGED RESULTS (1 item)
  #01  MIME Spoof: PHP body declared as image/jpeg    VULNERABLE (confidence: 90%)`,
    oracleVerdict:
      'VULNERABLE when the spoofed MIME type is accepted by the upload endpoint and the filename retains its executable extension or is reflected in an accessible path.',
    limitations: [
      'Ineffective against servers that perform deep file inspection (e.g. checking file magic headers or decoding image dimensions).',
      'Pair with the magic-byte module if the server inspects initial file bytes in addition to MIME headers.',
    ],
    implementationNotes:
      'Implemented in internal/payload/module_b.go. Works in combination with tech stack selection to test matching shell bodies.',
  },

  'magic-byte': {
    slug: 'magic-byte',
    name: 'Magic Byte Injection',
    subtitle: 'File signature spoofing to fool content sniffers and file inspection',
    testType: 'TestTypeMagicByteSpoof',
    payloadCount: '15+ payloads',
    flag: '--module magic-byte',
    description:
      'Tests whether content inspection engines and MIME detectors (like file, libmagic, or PHP finfo_file) can be tricked into classifying an executable webshell as a benign media file by prepending valid binary file signatures.',
    whatItTests: [
      'GIF89a signature (47 49 46 38 39 61) prepended to PHP webshell code',
      'PNG file header (\\x89PNG\\r\\n\\x1a\\n) followed by executable payload',
      'JPEG SOI marker (\\xFF\\xD8\\xFF\\xE0) prepended to script body',
      'PDF signature (%PDF-1.4) combined with embedded server-side scripts',
      'BMP (BM) and TIFF headers combined with webshell execution directives',
    ],
    command: 'GoUpload -u http://target.example/upload -p file --module magic-byte',
    sampleOutput: `  ┌─ MODULE C: Magic Byte Injection
  │
  ████████████████████ [100%] 15/15 (72ms)

  ⚠  FLAGGED RESULTS (1 item)
  #01  Magic Bytes: GIF89a header prepended to PHP webshell   VULNERABLE (confidence: 92%)`,
    oracleVerdict:
      'VULNERABLE when magic-byte prepended files are accepted where pure text/executable bodies were blocked.',
    limitations: [
      'If the server processes images using an imaging library (such as GD or ImageMagick) to resize, re-encode, or strip metadata, the injected payload body may be destroyed.',
    ],
    implementationNotes:
      'Defined in internal/payload/module_b.go and generator.go. Combines hex magic headers with compact webshell payloads.',
  },

  filename: {
    slug: 'filename',
    name: 'Filename Obfuscation',
    subtitle: 'Sanitization edge cases, OS-specific filesystem tricks, and truncation',
    testType: 'TestTypeFilenameObfuscation',
    payloadCount: '25+ payloads',
    flag: '--module filename',
    description:
      'Tests weaknesses in filename parsing and sanitization routines, including operating system quirks, trailing punctuation, NTFS streams, and character truncation that cause filters to approve the filename while the OS saves it as executable.',
    whatItTests: [
      'Trailing spaces (shell.php ) — stripped by Windows NTFS, saving as shell.php',
      'Trailing dots (shell.php.) and dot-space combinations (shell.php. )',
      'Windows NTFS Alternate Data Streams (shell.php::$DATA)',
      'Null-byte variations in filenames (shell.php%00.jpg)',
      'URL-encoded characters (%20, %0a, %0d) in filenames',
      'Filenames with reserved Windows characters (<, >, :, ", /, \\, |, ?, *)',
      'Long filename boundary truncation (255+ characters pushing benign extension off filename)',
    ],
    command: 'GoUpload -u http://target.example/upload -p file --module filename',
    sampleOutput: `  ┌─ MODULE D: Filename Obfuscation & Sanitization Faults
  │
  ████████████████████ [100%] 25/25 (90ms)

  ⚠  FLAGGED RESULTS (1 item)
  #01  NTFS ADS: shell.php::$DATA accepted on Windows backend   VULNERABLE (confidence: 88%)`,
    oracleVerdict:
      'VULNERABLE if the server accepts the obfuscated filename and either reports successful creation or reflects the sanitized executable filename.',
    limitations: [
      'NTFS Alternate Data Streams (::$DATA) and trailing space/dot tricks only succeed against Windows/IIS or Windows SMB shares.',
      'Linux ext4 treats filenames literally, so shell.php. remains shell.php.',
    ],
    implementationNotes:
      'Implemented in internal/payload/module_c.go. Tech-agnostic module executed for all scans unless filtered.',
  },

  'path-traversal': {
    slug: 'path-traversal',
    name: 'Path Traversal Sequences',
    subtitle: 'Escaping the upload directory to overwrite files or achieve execution',
    testType: 'TestTypePathTraversal',
    payloadCount: '20+ payloads',
    flag: '--module path-traversal',
    description:
      'Tests whether the target filename parameter is vulnerable to directory traversal sequences, allowing attackers to write files outside the designated upload directory into web roots, cron directories, or system configuration paths.',
    whatItTests: [
      'Relative directory traversal: ../../../var/www/html/shell.php',
      'URL-encoded traversal: ..%2f..%2f..%2fshell.php',
      'Double URL-encoded traversal: ..%252f..%252f..%252fshell.php',
      'Filter-stripping bypasses: ....//....//....//shell.php',
      'Backslash traversal for Windows: ..\\..\\..\\inetpub\\wwwroot\\shell.aspx',
      'Absolute paths: /var/www/html/shell.php or C:\\inetpub\\wwwroot\\shell.aspx',
      'Dot-dot-semicolon traversal: ..;\\..;\\',
    ],
    command: 'GoUpload -u http://target.example/upload -p file --module path-traversal',
    sampleOutput: `  ┌─ MODULE E: Path Traversal Sequences
  │
  ████████████████████ [100%] 20/20 (80ms)

  ⚠  FLAGGED RESULTS (1 item)
  #01  Path Traversal: ....//....//shell.php accepted   VULNERABLE (confidence: 94%)`,
    oracleVerdict:
      'VULNERABLE if the traversal-bearing filename is accepted and the Oracle detects traversal-filename-accepted or filepath-disclosed flags in the response.',
    limitations: [
      'Writing outside the upload directory requires the web server user process to possess write permissions on the target directory.',
      'Many modern frameworks automatically apply filepath.Base() or equivalent sanitizers.',
    ],
    implementationNotes:
      'Implemented in internal/payload/module_d.go. Adapts traversal payloads for Unix and Windows path conventions.',
  },

  graphql: {
    slug: 'graphql',
    name: 'GraphQL File Uploads',
    subtitle: 'Testing GraphQL multipart request specification and mutations',
    testType: 'TestTypeGraphQL',
    payloadCount: '138+ payloads',
    flag: '--module graphql',
    description:
      'Tests GraphQL APIs that support file uploads via the GraphQL Multipart Request Specification. Evaluates mutation-level file handling, batch upload operations, schema bypasses, and custom upload mutations.',
    whatItTests: [
      'GraphQL multipart request spec: operations, map, and file streams',
      'Standard mutations: uploadFile, singleUpload, multipleUpload',
      'Custom mutation strings via --graphql-mutation and --graphql-variable',
      'Batch upload mutation exploitation',
      'Node.js module overwrite payloads via GraphQL multipart variables',
      'File parameter mapping injection',
    ],
    command:
      'GoUpload -u http://target.example/graphql --module graphql \\\n  --graphql-mutation "mutation($file:Upload!){uploadFile(file:$file){id,url}}" \\\n  --graphql-variable file',
    sampleOutput: `  ┌─ MODULE: GraphQL File Uploads
  │
  ████████████████████ [100%] 138/138 (420ms)

  ⚠  FLAGGED RESULTS (1 item)
  #01  GraphQL: uploadFile mutation accepted executable payload   VULNERABLE (confidence: 91%)`,
    oracleVerdict:
      'VULNERABLE if GraphQL response contains data payload indicating success without errors, or returns uploaded resource path.',
    limitations: [
      'Requires the GraphQL endpoint to implement the multipart upload spec (e.g. apollo-upload-server or graphql-upload).',
      'The mutation name and variable structure must match the target GraphQL schema.',
    ],
    implementationNotes:
      'Implemented in internal/payload/module.graphql.go. Supports custom mutation formatting, variable mapping, and Node.js module overwrite testing via --module-overwrite.',
  },

  unicode: {
    slug: 'unicode',
    name: 'Unicode & Encoding',
    subtitle: 'Bypassing filename validation through Unicode normalization & control chars',
    testType: 'TestTypeUnicodeEncoding',
    payloadCount: '40+ payloads',
    flag: '--module unicode',
    description:
      'Tests how filename filters and underlying filesystems handle Unicode characters, Right-to-Left Override (RTLO) sequences, zero-width characters, and Unicode normalization (NFC vs NFD) that can trick filters into seeing a safe extension while the OS creates an executable file.',
    whatItTests: [
      'Right-to-Left Override (RTLO \\u202E): reverses filename display (e.g. shell\\u202Egpj.php displays as shellphp.jpg)',
      'Zero-width characters (\\u200B zero-width space, \\u200C zero-width non-joiner) inserted between extension characters',
      'Homoglyph and homograph characters: Cyrillic а (U+0430) vs Latin a (U+0061)',
      'Unicode normalization collisions: characters that decompose or recompose into dots or slashes',
      'Fullwidth characters (e.g. ． U+FF0E fullwidth dot or ／ U+FF0F fullwidth solidus)',
      'Non-breaking spaces (\\u00A0) and invisible separator characters',
    ],
    command: 'GoUpload -u http://target.example/upload -p file --module unicode',
    sampleOutput: `  ┌─ MODULE G: Unicode & Encoding Vulnerabilities
  │
  ████████████████████ [100%] 40/40 (125ms)

  ⚠  FLAGGED RESULTS (1 item)
  #01  Unicode: RTLO character bypass (shell\\u202Egpj.php)   VULNERABLE (confidence: 86%)`,
    oracleVerdict:
      'VULNERABLE when the Unicode-crafted filename successfully uploads and the response confirms storage under an executable format.',
    limitations: [
      'Requires the application or OS filesystem to perform Unicode normalization after security validation, or user interaction for RTLO social engineering.',
    ],
    implementationNotes:
      'Implemented in internal/payload/module_g.go. Tech-agnostic module.',
  },

  'size-boundary': {
    slug: 'size-boundary',
    name: 'Size Boundary Testing',
    subtitle: 'File size limits, empty files, boundary overflow, and chunking flaws',
    testType: 'TestTypeSizeBoundary',
    payloadCount: '15+ payloads',
    flag: '--module size-boundary',
    description:
      'Evaluates how the upload handler processes edge cases in file size, including 0-byte empty files, exact boundary sizes (1KB, 1MB, 10MB), size limit overflows, and negative or malformed Content-Length declarations.',
    whatItTests: [
      '0-byte empty files (tests whether server crashes, throws unhandled exceptions, or creates empty placeholder files)',
      'Exact boundary thresholds (1024 bytes, 1,048,576 bytes, 10,485,760 bytes)',
      'Boundary plus one byte (tests off-by-one errors in size validation logic)',
      'Oversized payloads designed to trigger memory exhaustion or bypass downstream antivirus scanning',
      'Chunked transfer encoding upload quirks',
    ],
    command: 'GoUpload -u http://target.example/upload -p file --module size-boundary',
    sampleOutput: `  ┌─ MODULE: Size Boundary Testing
  │
  ████████████████████ [100%] 15/15 (65ms)

  ✔  ALL CHECKS COMPLETED
  #01  Size Boundary: 0-byte file accepted without validation   SUSPECT (confidence: 60%)`,
    oracleVerdict:
      'SUSPECT or INFO if unexpected 0-byte or oversize files are accepted; SAFE if size limits are strictly enforced with proper 413 Payload Too Large responses.',
    limitations: [
      'Size boundary tests identify logic bugs, denial of service conditions, and filter inconsistencies, but rarely grant direct RCE on their own.',
    ],
    implementationNotes:
      'Implemented in internal/payload/module_e.go. Tests varying buffer allocations dynamically.',
  },

  'race-condition': {
    slug: 'race-condition',
    name: 'Race Condition & TOCTOU',
    subtitle: 'Time-of-Check to Time-of-Use testing with synchronized burst execution',
    testType: 'TestTypeRaceCondition',
    payloadCount: '30+ payloads',
    flag: '--module race-condition -c 20',
    description:
      'Tests for Time-of-Check to Time-of-Use (TOCTOU) race conditions in asynchronous upload pipelines. Typical targets save uploaded files temporarily before validating, scanning with antivirus, or deleting unauthorized extensions, leaving a millisecond window where the file is executable.',
    whatItTests: [
      'Synchronized burst uploads with identical filenames (RaceSync: true)',
      'Extension check versus save race window',
      'Temporary file execution before post-processing or deletion',
      'Symlink race conditions during archive extraction',
      'Antivirus scanning lag exploitation',
    ],
    command: 'GoUpload -u http://target.example/upload -p file --module race-condition -c 20',
    sampleOutput: `  ┌─ MODULE: Race Condition & TOCTOU Testing
  │
  ████████████████████ [100%] 30/30 (310ms)

  ⚠  FLAGGED RESULTS (1 item)
  #01  Race Condition: Temporary file accessible during processing   VULNERABLE (confidence: 90%)`,
    oracleVerdict:
      'VULNERABLE when concurrent requests successfully access or execute a file within the processing window before cleanup.',
    limitations: [
      'Requires higher concurrency (-c 20 or higher) to increase collision probability.',
      'Network latency and jitter between the scanner and target can impact race synchronization.',
    ],
    implementationNotes:
      'Implemented in internal/payload/module.race.go. Sets RaceSync flag to coordinate simultaneous socket dispatch in worker pool.',
  },

  polyglot: {
    slug: 'polyglot',
    name: 'Polyglots & Archives',
    subtitle: 'Multi-format valid files, archive extraction attacks, and ZIP Slip',
    testType: 'TestTypePolyglotArchive',
    payloadCount: '10+ payloads (tech-agnostic)',
    flag: '--module polyglot',
    description:
      'Tests complex multi-format polyglot files that are simultaneously valid in multiple file formats (e.g. valid GIF image and valid PHP script), as well as archive-based attacks like ZIP Slip path traversal and ZIP bomb denial of service.',
    whatItTests: [
      'GIF + PHP polyglot: valid GIF header, valid dimensions, embedded executable PHP webshell',
      'PNG + PHP polyglot: valid PNG chunks with executable payload in IDAT chunk',
      'JPEG + PHP polyglot: valid JPEG stream with payload in EXIF or comment segment',
      'SVG with embedded JavaScript XSS payload',
      'SVG with embedded XML payload',
      'PDF with embedded JavaScript execution',
      'ZIP Slip: ZIP archive containing files with traversal names (../../shell.php)',
      'ZIP bomb: small archive expanding to gigabytes upon decompression',
    ],
    command: 'GoUpload -u http://target.example/upload -p file --module polyglot',
    sampleOutput: `  ┌─ MODULE F: Polyglot & Archive Attacks
  │
  ████████████████████ [100%] 11/11 (95ms)

  ⚠  FLAGGED RESULTS (2 items)
  #01  Polyglot: GIF+PHP valid polyglot accepted   VULNERABLE (confidence: 94%)
  #02  Archive: ZIP Slip traversal payload        VULNERABLE (confidence: 89%)`,
    oracleVerdict:
      'VULNERABLE if the polyglot file passes media validation and retains executable code, or if archive extraction accepts traversal entries.',
    limitations: [
      'Target must unpack archive files or execute media files through server-side include / misconfigured handlers.',
    ],
    implementationNotes:
      'Implemented in internal/payload/module.polyglot.go and module_f.go. Runs across all tech stacks in v1.8.2+.',
  },

  xxe: {
    slug: 'xxe',
    name: 'XXE Injection via Upload',
    subtitle: 'XML External Entity attacks in SVG, DOCX, XLSX, and JPEG metadata',
    testType: 'TestTypeXXE',
    payloadCount: '15+ payloads',
    flag: '--module xxe',
    description:
      'Tests for XML External Entity (XXE) vulnerabilities in file upload endpoints that parse XML-based document and image formats. Explores local file disclosure, Server-Side Request Forgery (SSRF), and denial of service.',
    whatItTests: [
      'SVG image with XXE to read /etc/passwd: <!ENTITY xxe SYSTEM "file:///etc/passwd">',
      'SVG image with XXE to read Windows win.ini: <!ENTITY xxe SYSTEM "file:///c:/windows/win.ini">',
      'SVG image with SSRF to AWS/cloud metadata (http://169.254.169.254/latest/meta-data/)',
      'DOCX document with injected XML entity in [Content_Types].xml or word/document.xml',
      'XLSX spreadsheet with injected XML entity in xl/workbook.xml',
      'JPEG with embedded XML metadata (XMP) containing external entity declarations',
      'Billion Laughs XML entity expansion (DoS attack)',
    ],
    command: 'GoUpload -u http://target.example/upload -p file --module xxe --allow-list .svg,.png',
    sampleOutput: `  ┌─ MODULE J: XXE Injection via File Upload
  │
  ████████████████████ [100%] 15/15 (140ms)

  ⚠  FLAGGED RESULTS (2 items)
  #01  XXE via SVG: Read /etc/passwd            VULNERABLE (confidence: 98%)
  #02  XXE via SVG: SSRF to AWS metadata        VULNERABLE (confidence: 92%)`,
    oracleVerdict:
      'VULNERABLE when the server response reflects entity content (e.g. root:x:0:0:), connects to external SSRF listener, or leaks file paths.',
    limitations: [
      'The server-side XML parser must have external entity resolution (DTD processing) enabled.',
      'Blind XXE requires out-of-band (OOB) DNS/HTTP interaction monitoring.',
    ],
    implementationNotes:
      'Implemented in internal/payload/module.xxe.go. Tech-agnostic module that runs for all scan targets.',
  },

  'server-config': {
    slug: 'server-config',
    name: 'Server Configuration Overrides',
    subtitle: 'Uploading server config files (.htaccess, web.config, .user.ini) to alter execution',
    testType: 'TestTypeServerConfig',
    payloadCount: '42 payloads',
    flag: '--module server-config',
    description:
      'Tests whether the target upload endpoint permits uploading server configuration files that instruct the web server to treat benign file extensions as executable scripts, disable security directives, or execute code upon accessing the upload directory.',
    whatItTests: [
      'Apache .htaccess: AddType application/x-httpd-php .jpg, SetHandler, and php_flag engine on',
      'IIS web.config: custom script processor mappings and handlers mapping .txt to asp/aspx',
      'PHP .user.ini: auto_prepend_file and auto_append_file directives pointing to uploaded files',
      'Nginx configuration snippets (nginx.conf overrides in proxy environments)',
      'Lighttpd configuration overrides',
      'Tomcat / Java web.xml servlet mappings',
      'Node.js .npmrc and package.json configuration injection',
    ],
    command: 'GoUpload -u http://target.example/upload -p file --module server-config',
    sampleOutput: `  ┌─ MODULE: Server Configuration Overrides
  │
  ████████████████████ [100%] 42/42 (180ms)

  ⚠  FLAGGED RESULTS (1 item)
  #01  Server Config: Apache .htaccess AddType override   VULNERABLE (confidence: 95%)`,
    oracleVerdict:
      'VULNERABLE if the server configuration file is accepted with 200 OK and subsequent uploads verify custom extension execution.',
    limitations: [
      'Apache requires AllowOverride All or AllowOverride FileInfo enabled in httpd.conf.',
      'IIS requires write permissions to web.config and Feature Delegation enabled.',
    ],
    implementationNotes:
      'Implemented in internal/payload/module.server_config.go. In v1.8.2+, module is fully tech-agnostic and includes 42 diverse server configs.',
  },

  template: {
    slug: 'template',
    name: 'Template Payloads',
    subtitle: 'Custom and community YAML attack profiles with Nuclei-style detection',
    testType: 'TestTypeTemplate',
    payloadCount: 'Custom (Varies)',
    flag: '--module template --template path/to/template.yaml',
    description:
      'Executes custom attack scenarios and CVE exploits defined in YAML templates without modifying or recompiling GoUpload source code. Supports Nuclei-style regex, word, status, and size matchers, as well as extractors.',
    whatItTests: [
      'CMS-specific exploits: WordPress media upload, Drupal double extensions, Joomla filters',
      'CVE-specific exploits (e.g. CVE-2020-13671 Drupal, CVE-specific file upload flaws)',
      'Framework-specific test suites (Laravel, Django, Express, Apollo GraphQL)',
      'Lab test suites (DVWA, OWASP Juice Shop, Battle Lab)',
      'Enhanced templates with complex multi-condition regex matchers and data extractors',
    ],
    command:
      'GoUpload -u http://target.example/upload -p file \\\n  --module template \\\n  --template templates/labs/battle-lab.yaml',
    sampleOutput: `  🎯 Running template: Battle Lab Upload Suite
  ┌─ TEMPLATE: templates/labs/battle-lab.yaml
  │
  ████████████████████ [100%] 8/8 (115ms)

  ⚠  FLAGGED RESULTS (2 items)
  #01  Battle Lab: PHP5 extension bypass        VULNERABLE (matcher: status+word)
  #02  Battle Lab: GIF89a magic byte injection  VULNERABLE (matcher: word)`,
    oracleVerdict:
      'Evaluated directly by the template matcher engine based on matchers (word, regex, status, size) and matchers-condition (and/or).',
    limitations: [
      'Relies on the accuracy of the user-provided YAML template file and its defined matchers.',
    ],
    implementationNotes:
      'Implemented in internal/template/. Supports template validation, loading from directories (--templates-dir), and listing with --list-templates.',
  },
};
