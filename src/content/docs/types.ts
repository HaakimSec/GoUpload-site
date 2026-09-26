export type DocCallout = {
  type: 'note' | 'tip' | 'warning' | 'important';
  text: string;
};

export type DocTable = {
  headers: string[];
  rows: string[][];
};

export type DocSection = {
  heading: string;
  body?: string;
  bullets?: string[];
  code?: string;
  codeTitle?: string;
  language?: string;
  callout?: DocCallout;
  table?: DocTable;
};

export type DocPage = {
  title: string;
  description: string;
  badge?: string;
  sections: DocSection[];
};

export type DetailedModule = {
  slug: string;
  name: string;
  subtitle: string;
  testType: string;
  payloadCount: string;
  flag: string;
  description: string;
  whatItTests: string[];
  command: string;
  sampleOutput?: string;
  oracleVerdict: string;
  limitations: string[];
  implementationNotes?: string;
};
