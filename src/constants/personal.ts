import type { PersonalInfo } from '../types';

export const PERSONAL_INFO: PersonalInfo = {
  firstName: 'Prenom',
  lastName: 'Nom',
  title: 'Developpeur Full Stack',
  tagline: 'Je cree des applications web modernes et performantes',
  bio: `Developpeur passionne avec plusieurs annees d'experience dans la creation 
d'applications web. Specialise dans les technologies modernes comme React, 
TypeScript et Node.js. Toujours a la recherche de nouveaux defis et 
d'opportunites d'apprentissage.`,
  email: 'contact@example.com',
  phone: '+33 6 00 00 00 00',
  location: 'Paris, France',
  avatarUrl: '/avatar.jpg',
  resumeUrl: '/cv.pdf',
  availability: true,
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/', icon: 'linkedin' },
    { platform: 'Twitter', url: 'https://twitter.com/', icon: 'twitter' },
  ],
};
