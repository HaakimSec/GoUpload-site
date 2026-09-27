// Structured content for GoUpload's research/technical-writeup section.
// Each article is a sequence of typed blocks so Research.tsx can render
// any article generically, without new component code per article.

export type ResearchBlock =
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; emphasis?: boolean }
  | { type: 'list'; items: string[] }
  | { type: 'code'; text: string; label?: string }
  | { type: 'diagram'; text: string }
  | { type: 'divider' };

export interface ResearchArticle {
  slug: string;
  title: string;
  subtitle: string;
  publishedDate: string;
  readingTime: string;
  blocks: ResearchBlock[];
}

export const beyondExtensionChecks: ResearchArticle = {
  slug: 'beyond-extension-checks',
  title: 'Beyond Extension Checks: A Multi-Layer Approach to Testing File Upload Security',
  subtitle: 'Why building GoUpload meant treating file upload security as a chain of decisions, not a single validation check.',
  publishedDate: '2026-09-27',
  readingTime: '12 min read',
  blocks: [
    {
      type: 'paragraph',
      text: 'File upload vulnerabilities are often introduced as an extension-filter problem:',
    },
    { type: 'quote', text: 'Can the application upload .php?' },
    {
      type: 'paragraph',
      text: 'But while building GoUpload, I found that treating file-upload security as a single validation check misses a much larger attack surface.',
    },
    {
      type: 'paragraph',
      text: 'An application can reject a dangerous extension while still having weaknesses in filename handling, MIME validation, file signatures, storage paths, file processing, GraphQL upload handling, or server configuration.',
    },
    {
      type: 'paragraph',
      text: 'This led me to organize file-upload testing around several different validation and processing layers rather than treating it as one vulnerability class.',
    },
    { type: 'subheading', text: 'The layers' },
    {
      type: 'paragraph',
      text: 'The scanner currently separates testing into 13 modules:',
    },
    {
      type: 'list',
      items: [
        'Extension',
        'Content-Type',
        'Magic bytes',
        'Filename',
        'Path traversal',
        'GraphQL',
        'Unicode',
        'Size boundaries',
        'Race conditions',
        'Polyglot files',
        'XXE',
        'Server configuration',
        'Template-related processing',
      ],
    },
    { type: 'paragraph', text: "The point isn't simply to throw hundreds of payloads at an endpoint." },
    { type: 'paragraph', text: 'The goal is to ask:' },
    { type: 'quote', text: 'Which part of the upload pipeline is actually making the security decision?', emphasis: true },
    { type: 'divider' },

    { type: 'heading', text: '1. Extension validation is only one layer' },
    { type: 'paragraph', text: 'A typical upload flow might perform something conceptually like:' },
    { type: 'diagram', text: 'filename → extension check → MIME check → content check → storage → processing' },
    { type: 'paragraph', text: 'Testing only the filename gives us very little information about the rest of the pipeline.' },
    { type: 'paragraph', text: 'For example, an application might correctly reject an executable extension but make a different mistake later when:' },
    {
      type: 'list',
      items: [
        'determining the file type from its contents,',
        'generating the destination filename,',
        'constructing the storage path,',
        'processing the uploaded file,',
        'or handling the upload through a different API.',
      ],
    },
    { type: 'paragraph', text: 'This is why I separated extension testing from content-type and magic-byte testing rather than treating them as variations of the same test.' },
    { type: 'divider' },

    { type: 'heading', text: '2. Content-Type and magic bytes are different signals' },
    { type: 'paragraph', text: 'One thing that became clear while building the scanner is that an upload system can make decisions using different representations of the same file.' },
    { type: 'paragraph', text: "There is the HTTP Content-Type, the filename extension, and the actual bytes of the file." },
    { type: 'paragraph', text: "Those signals don't necessarily agree. So GoUpload treats them independently." },
    { type: 'diagram', text: '                 ┌─ Extension\nUpload ──────────┼─ Content-Type\n                 ├─ Magic bytes\n                 └─ Filename' },
    { type: 'paragraph', text: 'This allows the scanner to determine which validation layer appears to be responsible for accepting or rejecting the upload.' },
    { type: 'divider' },

    { type: 'heading', text: '3. Filename handling creates another attack surface' },
    { type: 'paragraph', text: "The filename isn't just metadata." },
    { type: 'paragraph', text: 'Applications may use it when constructing filesystem paths, generating public URLs, determining extensions, or passing information to downstream processors.' },
    { type: 'paragraph', text: 'That makes filename handling worth testing independently. The scanner therefore tests filename-related behavior separately from extension validation, including path-related behavior and unusual filename representations.' },
    { type: 'paragraph', text: 'This also led to a broader question:' },
    { type: 'quote', text: 'What happens between the filename received by the application and the final path used to store the file?', emphasis: true },
    { type: 'divider' },

    { type: 'heading', text: '4. Upload storage matters as much as upload acceptance' },
    { type: 'paragraph', text: "An accepted upload isn't automatically an exploitable vulnerability." },
    { type: 'paragraph', text: 'The interesting part is what happens after acceptance. A simplified model is:' },
    {
      type: 'diagram',
      text: '                Upload\n                  │\n                  ▼\n             Validation\n                  │\n                  ▼\n               Storage\n                  │\n          ┌───────┴────────┐\n          ▼                ▼\n      Download          Processing\n                             │\n                             ▼\n                         Application',
    },
    { type: 'paragraph', text: 'The security consequences can be very different depending on whether the uploaded object is:' },
    {
      type: 'list',
      items: [
        'stored but never processed,',
        'publicly retrievable,',
        'interpreted by a server,',
        'passed to another parser,',
        'extracted from an archive,',
        'or transformed by another component.',
      ],
    },
    { type: 'paragraph', text: "This is one reason I don't want a scanner to report:" },
    { type: 'quote', text: 'upload accepted = vulnerable' },
    { type: 'paragraph', text: "Acceptance alone isn't enough evidence." },
    { type: 'divider' },

    { type: 'heading', text: '5. GraphQL changes the upload surface' },
    { type: 'paragraph', text: 'Another interesting case is GraphQL.' },
    { type: 'paragraph', text: 'A conventional multipart upload and a GraphQL-based upload may expose different request structures and application logic.' },
    { type: 'paragraph', text: "If testing only a traditional HTML form, it's possible to completely miss an upload implementation exposed through an API." },
    { type: 'paragraph', text: "That's why GraphQL is a separate module rather than simply another payload category. The broader lesson is:" },
    { type: 'quote', text: 'The upload interface itself is part of the attack surface.', emphasis: true },
    { type: 'divider' },

    { type: 'heading', text: '6. Unicode and normalization are easy to overlook' },
    { type: 'paragraph', text: 'Another area I wanted to investigate was Unicode handling.' },
    { type: 'paragraph', text: 'Different layers of an application may normalize or interpret strings differently. That matters when security decisions depend on:' },
    {
      type: 'list',
      items: ['filenames,', 'extensions,', 'paths,', 'or comparisons between user input and normalized values.'],
    },
    { type: 'paragraph', text: 'Instead of assuming that the string received by the application is necessarily the string used by the filesystem or another component, the scanner treats Unicode-related behavior as its own test category.' },
    { type: 'divider' },

    { type: 'heading', text: '7. Upload processing can introduce vulnerabilities that aren\'t "upload validation" bugs' },
    { type: 'paragraph', text: "An upload doesn't necessarily end when the server stores the file." },
    { type: 'paragraph', text: 'Applications frequently process uploaded files using other components. That introduces another class of problems. For example:' },
    {
      type: 'diagram',
      text: 'User\n │\n ▼\nUpload endpoint\n │\n ▼\nFile validation\n │\n ▼\nImage/document/media processor\n │\n ▼\nParser\n │\n ▼\nApplication',
    },
    { type: 'paragraph', text: 'The upload endpoint may have strong validation while a downstream processor introduces another security boundary. This is why the scanner includes categories such as XXE and server-side processing/configuration tests.' },
    { type: 'paragraph', text: 'The important distinction is:' },
    { type: 'quote', text: 'the vulnerability may be triggered through the upload functionality without being caused by the upload validator itself.', emphasis: true },
    { type: 'divider' },

    { type: 'heading', text: '8. Detection is not enough — verification matters' },
    { type: 'paragraph', text: 'One of the biggest design decisions in GoUpload was separating detection from verification.' },
    { type: 'paragraph', text: 'The scanner does not simply produce VULNERABLE for every interesting response. Its internal result model distinguishes states such as:' },
    { type: 'diagram', text: 'VULNERABLE\nSUSPECT\nSAFE\nERROR\nUNKNOWN' },
    { type: 'paragraph', text: 'The reason is simple:' },
    { type: 'quote', text: 'security scanners can easily confuse an unusual response with a vulnerability.', emphasis: true },
    { type: 'paragraph', text: 'For example, an application returning a successful HTTP status after an upload does not necessarily mean that the uploaded file was stored in a dangerous location or subsequently executed. So I wanted the scanner\'s result to represent the strength of the evidence rather than treating every positive-looking response as a confirmed vulnerability.' },
    { type: 'divider' },

    { type: 'heading', text: '9. Baselines are useful for reducing noise' },
    { type: 'paragraph', text: 'Another part of the design is comparing suspicious requests against baseline behavior. Instead of looking at a payload response in isolation:' },
    { type: 'diagram', text: 'payload → response' },
    { type: 'paragraph', text: 'the scanner can reason more like:' },
    {
      type: 'diagram',
      text: 'baseline request\n       │\n       ▼\nbaseline response\n\ntest request\n       │\n       ▼\ntest response\n\n       ↓\n\ncompare behavior\n       ↓\n\nclassify result',
    },
    { type: 'paragraph', text: 'This is important because some applications intentionally return unusual responses for every upload. A response becomes more interesting when the behavior changes specifically because of the security test being performed.' },
    { type: 'divider' },

    { type: 'heading', text: '10. What I ended up building' },
    { type: 'paragraph', text: 'This research eventually became GoUpload, a Go-based concurrent scanner for file-upload attack surfaces.' },
    { type: 'paragraph', text: 'The current implementation contains 13 testing modules and 344+ payloads/test cases, organized around the different layers described above. The project also includes automated verification for cases where an upload may lead to code execution.' },
    { type: 'paragraph', text: "But the main idea isn't the number of payloads. A large payload collection is relatively easy to build. The harder problem is:" },
    { type: 'quote', text: 'How do you turn many different upload behaviors into evidence that a security researcher can actually reason about?', emphasis: true },
    { type: 'paragraph', text: "That's the problem I'm more interested in." },
    { type: 'divider' },

    { type: 'heading', text: "What I still don't think scanners solve well" },
    { type: 'paragraph', text: "There are several things I don't think should be fully automated:" },
    {
      type: 'list',
      items: [
        "understanding the application's intended file-processing workflow,",
        'determining whether a stored file has meaningful impact,',
        'understanding business logic around uploaded objects,',
        'distinguishing an intended feature from a security boundary failure,',
        'and determining the real impact of unusual parser behavior.',
      ],
    },
    { type: 'paragraph', text: "Automation can reduce repetitive testing, but it doesn't eliminate the need to understand the application." },
    { type: 'paragraph', text: 'My goal with GoUpload is therefore not:' },
    { type: 'quote', text: 'Replace manual file-upload testing.' },
    { type: 'paragraph', text: "It's closer to:" },
    { type: 'quote', text: 'Automate the repetitive parts of mapping the upload attack surface, while leaving the researcher with evidence to investigate.', emphasis: true },
    { type: 'divider' },

    { type: 'heading', text: 'Where this is going' },
    {
      type: 'paragraph',
      text: "The evidence-over-verdict model above is also what's shaping the next phase of the project: a classifier trained on ground-truth labels generated by the scanner's own RCE-verification pipeline, aimed at further reducing false positives — and, separately, an approach to prioritizing which of the 344+ payloads are actually worth trying first against a given target, rather than running the full matrix every time. Both are early and not something I'd call production-ready yet; I'd rather say that plainly than oversell it.",
    },
    { type: 'divider' },

    { type: 'heading', text: 'Lessons from building it' },
    { type: 'paragraph', text: 'The biggest lesson for me was that "file upload vulnerability" isn\'t really one test.' },
    { type: 'paragraph', text: 'It is a chain of security decisions:' },
    {
      type: 'diagram',
      text: 'Filename\n   ↓\nExtension\n   ↓\nContent-Type\n   ↓\nFile signature\n   ↓\nFilename/path handling\n   ↓\nStorage\n   ↓\nRetrieval\n   ↓\nProcessing\n   ↓\nParser\n   ↓\nExecution / impact',
    },
    { type: 'paragraph', text: 'A weakness anywhere in that chain can change the security properties of the upload functionality. That is the model I\'m using to continue developing GoUpload.' },
    { type: 'divider' },

    { type: 'heading', text: 'Try it / contribute' },
    { type: 'code', text: 'go install -v github.com/HaakimSec/GoUpload@latest', label: 'install' },
    {
      type: 'paragraph',
      text: 'Source, docs, and module reference: github.com/HaakimSec/GoUpload — MIT licensed. CONTRIBUTING.md has a walkthrough for adding a new payload module if you find a gap worth filling.',
    },
    {
      type: 'quote',
      text: "I'm particularly interested in feedback from people who have done large-scale application security testing: which upload behaviors do you think are still poorly automated, and where do current scanners generate the most false positives?",
      emphasis: true,
    },
    { type: 'paragraph', text: 'This tool is for authorized security testing only.' },
  ],
};

export const researchArticles: ResearchArticle[] = [beyondExtensionChecks];