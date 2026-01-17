/**
 * Project data configuration
 * 
 * NOTE: Images are stored in the /public/images folder.
 * In Vite, public folder assets are served at the root path,
 * so we reference them directly without the "/public" prefix.
 */

export type ProjectItem = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
};

export const projects: ProjectItem[] = [
  {
    title: 'Auth Master Website ',
    description: 'Secure MERN Auth & Profiles with JWT, cookies, and dynamic themes using Tailwind + DaisyUI. 🔐✨',
    image: '/images/Cleveroad.jpg', // Direct URL reference to public folder asset
    tags: ['Next.js', 'Tailwind CSS', 'MongoDB'],
    // TODO: Replace with your actual GitHub repo URL
    github: 'https://github.com/ompatil1357/Auth-master',
    // TODO: Replace with your actual live demo URL
    demo: 'https://your-ecommerce-demo.vercel.app',
  },
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio to showcase my design and coding projects.',
    image: '/images/OmPortfolio.PNG', // Direct URL reference to public folder asset
    tags: ['React', 'Gsap', 'Three.js'],
    // TODO: Replace with your actual GitHub repo URL
    github: 'https://github.com/YOUR_USERNAME/portfolio-website',
    // TODO: Replace with your actual live demo URL
    demo: 'https://your-portfolio-demo.vercel.app',
  },
  {
    title: 'Fluent-Flow',
    description: 'Responsive website for a language learning platform with modern UI and animations',
    image: '/images/Weather Forecast Dashboard.jpg', // Direct URL reference to public folder asset
    tags: ['React', 'Trypescript', 'API'],
    // TODO: Replace with your actual GitHub repo URL
    github: 'https://github.com/ompatil1357/Fluent-flow-master',
    // TODO: Replace with your actual live demo URL
    demo: 'https://your-weather-app-demo.vercel.app',
  },
  {
    title: 'Blog Website',
    description: 'Clean and simple blogging platform with markdown support.',
    image: '/images/WordPress dashboard design concept.jpg', // Direct URL reference to public folder asset
    tags: ['HTML', 'Tailwind', 'JavaScript'],
    // TODO: Replace with your actual GitHub repo URL
    github: 'https://github.com/YOUR_USERNAME/blog-website',
    // TODO: Replace with your actual live demo URL
    demo: 'https://your-blog-demo.vercel.app',
  },
  {
    title: 'Game Landing Page',
    description: 'Landing page for a game with animations and parallax effects.',
    image: '/images/Game Dashboard Design.jpg', // Direct URL reference to public folder asset
    tags: ['HTML', 'CSS', 'GSAP'],
    // TODO: Replace with your actual GitHub repo URL
    github: 'https://github.com/YOUR_USERNAME/game-landing-page',
    // TODO: Replace with your actual live demo URL
    demo: 'https://your-game-landing-demo.vercel.app',
  },
  {
    title: 'Task Manager',
    description: 'Task tracking web app with CRUD features and clean UI.',
    image: '/images/Task manager app.jpg', // Direct URL reference to public folder asset
    tags: ['HTML', 'CSS', 'JavaScript'],
    // TODO: Replace with your actual GitHub repo URL
    github: 'https://github.com/YOUR_USERNAME/task-manager',
    // TODO: Replace with your actual live demo URL
    demo: 'https://your-task-manager-demo.vercel.app',
  },
];