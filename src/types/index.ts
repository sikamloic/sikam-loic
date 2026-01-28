export interface NavItem {
  key: string;
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  icon?: string;
}

export type SkillCategory = 
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'tools'
  | 'languages'
  | 'soft-skills';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  category: ProjectCategory;
  startDate: string;
  endDate?: string;
}

export type ProjectCategory = 
  | 'web'
  | 'mobile'
  | 'desktop'
  | 'api'
  | 'library'
  | 'other';

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  companyUrl?: string;
  companyLogo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  description?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  institutionUrl?: string;
  institutionLogo?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  issuerLogo?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
  linkedinUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  avatarUrl?: string;
  resumeUrl?: string;
  availability: boolean;
  socialLinks: SocialLink[];
}
