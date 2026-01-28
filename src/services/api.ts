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

export interface DataService {
  getPersonalInfo(): Promise<PersonalInfo>;
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperiences(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  getCertifications(): Promise<Certification[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | null>;
}

export function createApiService(baseUrl: string): DataService {
  async function fetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  }

  return {
    getPersonalInfo: () => fetchData<PersonalInfo>('/personal'),
    getProjects: () => fetchData<Project[]>('/projects'),
    getSkills: () => fetchData<Skill[]>('/skills'),
    getExperiences: () => fetchData<Experience[]>('/experiences'),
    getEducation: () => fetchData<Education[]>('/education'),
    getCertifications: () => fetchData<Certification[]>('/certifications'),
    getTestimonials: () => fetchData<Testimonial[]>('/testimonials'),
    getBlogPosts: () => fetchData<BlogPost[]>('/blog'),
    getBlogPost: (slug: string) => fetchData<BlogPost | null>(`/blog/${slug}`),
  };
}
