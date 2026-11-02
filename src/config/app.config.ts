export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface AppConfig {
  name: string;
  title: string;
  description: string;
  version: string;
  defaultPaginationLimit: number;
  navigation: NavItem[];
  links: {
    docs?: string;
    github?: string;
  };
}

export const appConfig: AppConfig = {
  name: 'Enterprise Frontend Template',
  title: 'Vite + React Enterprise Architecture',
  description: 'Production-ready, highly resilient, and scalable frontend boilerplate.',
  version: '1.0.0',
  defaultPaginationLimit: 10,
  navigation: [
    { label: 'Beranda', href: '/' },
    { label: 'Contoh CRUD', href: '/examples' },
  ],
  links: {
    github: 'https://github.com/your-org/your-repo',
  },
};
