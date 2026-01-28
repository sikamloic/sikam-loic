import type { DataService } from './api';
import type {
  Project,
  Skill,
  Experience,
  Education,
  Certification,
  Testimonial,
  BlogPost,
  PersonalInfo,
} from '../types';

interface LocalData {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
}

export function createLocalService(data: LocalData): DataService {
  return {
    getPersonalInfo: async () => data.personalInfo,
    getProjects: async () => data.projects,
    getSkills: async () => data.skills,
    getExperiences: async () => data.experiences,
    getEducation: async () => data.education,
    getCertifications: async () => data.certifications,
    getTestimonials: async () => data.testimonials,
    getBlogPosts: async () => data.blogPosts,
    getBlogPost: async (slug: string) =>
      data.blogPosts.find((post) => post.slug === slug) || null,
  };
}
