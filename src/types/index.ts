export interface NavLink {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface HeroContent {
  toolName: string;
  tagline: string;
  oneLineDescription: string;
  quickInstallCommand: string;
  repoUrl: string;
  releasesBadge: {
    label: string;
    version: string;
    url: string;
  };
  terminalEmbed: {
    type: 'video' | 'gif' | 'mock-terminal';
    src?: string;
    alt?: string;
    mockLines?: {
      type: 'command' | 'banner' | 'info' | 'success' | 'warning' | 'error' | 'output';
      text: string;
    }[];
  };
}

export interface DisclaimerContent {
  title: string;
  text: string;
  severityLabel: string;
}

export interface FeatureItem {
  id: string;
  iconName: 'Terminal' | 'Shield' | 'Zap' | 'FileCode' | 'Cpu' | 'Layers' | 'GitBranch' | 'Search' | 'Lock' | 'Activity' | 'Flame' | 'Server';
  title: string;
  description: string;
  tag?: string;
}

export interface AttackModule {
  id: string;
  name: string;
  description: string;
  payloadCount: string;
  category: string;
  tag?: string;
}

export interface MlMilestone {
  stage: string;
  title: string;
  status: 'In Development' | 'Planned' | 'Research' | 'Future';
  description: string;
  deliverables?: string[];
}

export interface MlSectionContent {
  statusBadge: string;
  headline: string;
  subheadline: string;
  description: string;
  calloutTitle: string;
  contributeTrainingDataCallout: string;
  contributionGuidelinesUrl: string;
  milestones: MlMilestone[];
}

export interface InstallMethod {
  id: string;
  name: string;
  tabLabel: string;
  command: string;
  notes?: string;
}

export interface ExampleCommand {
  id: string;
  caption: string;
  command: string;
  description?: string;
}

export interface ContributingContent {
  headline: string;
  blurb: string;
  linkText: string;
  linkUrl: string;
  guidelinesBlurb: string;
}

export interface FooterContent {
  toolName: string;
  license: string;
  author: string;
  authorUrl: string;
  repoUrl: string;
  releasesUrl: string;
  issuesUrl: string;
  docsUrl: string;
  copyrightYear: string;
  builtFor: string;
}

export interface SiteContent {
  navigation: NavLink[];
  hero: HeroContent;
  disclaimer: DisclaimerContent;
  features: FeatureItem[];
  attackModules: AttackModule[];
  mlRoadmap: MlSectionContent;
  installMethods: InstallMethod[];
  exampleCommands: ExampleCommand[];
  contributing: ContributingContent;
  contact: ContactContent;
  footer: FooterContent;
}

export interface ContactContent {
  headline: string;
  blurb: string;
  email: string;
  emailNote: string;
  githubProfileUrl: string;
  githubHandle: string;
  secondaryChannel: { label: string; handle: string; url: string } | null;
  disclosureNote: string;
}