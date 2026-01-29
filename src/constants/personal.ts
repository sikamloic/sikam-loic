import type { PersonalInfo } from '../types';

export const PERSONAL_INFO: PersonalInfo = {
  firstName: 'Loic',
  lastName: 'Sikam',
  title: 'Developpeur Full Stack',
  tagline: 'Je cree des applications web et mobiles modernes et performantes',
  bio: `Plus de 3 annees d'experience dans le developpement de solutions logicielles 
(applications web, mobiles et APIs REST). Creatif, organise et autonome, je maitrise 
les concepts orientes objet et l'architecture MVC. Passionne par les nouvelles 
technologies et l'IA, je m'adapte rapidement et travaille efficacement en equipe.`,
  email: 'loicsikam272@gmail.com',
  phone: '+237 683 264 591',
  location: 'Cameroun',
  avatarUrl: '/avatar.jpg',
  resumeUrl: '/cv.html',
  availability: true,
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/sikamloic', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/loicsikam', icon: 'linkedin' },
  ],
};
