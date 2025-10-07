// Configuration des constantes pour l'application

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Configuration des statistiques
export const STATS = {
  experience: 3,
  projects: 15,
  clients: 8,
  commits: 1200,
};

// Configuration des technologies
export const TECHNOLOGIES = {
  react: { name: 'React', logo: '/logos/react.svg' },
  typescript: { name: 'TypeScript', logo: '/logos/typescript.svg' },
  tailwind: { name: 'Tailwind CSS', logo: '/logos/tailwindcss.svg' },
  nextjs: { name: 'Next.js', logo: '/logos/nextjs.svg' },
  symfony: { name: 'Symfony', logo: '/logos/symfony.svg' },
  php: { name: 'PHP', logo: '/logos/php.svg' },
  mysql: { name: 'MySQL', logo: '/logos/mysql.svg' },
  lua: { name: 'Lua', logo: '/logos/lua.svg' },
};

// Configuration des liens sociaux
export const SOCIAL_LINKS = {
  github: 'https://github.com/votre-username',
  linkedin: 'https://linkedin.com/in/votre-profil',
  email: 'contact@votre-email.com',
};
