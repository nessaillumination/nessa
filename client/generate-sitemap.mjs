import { SitemapStream, streamToPromise } from 'sitemap';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const hostname = 'https://www.nessa.in'; // Update with your domain

const staticRoutes = [
  '/',
  '/welcome',
  '/solutions',
  '/terms',
  '/privacy',
  '/esgpolicy',
  '/cookiespolicy',
  '/contactus',
  '/aboutus',
  '/support',
  '/allproducts',
  '/projects',
  '/valueAddedServices',
  '/resources',
  '/calculator/battery_AH_calculator',
];

const links = staticRoutes.map((route) => ({
  url: route,
  changefreq: 'monthly',
  priority: 0.8,
}));

// Generate sitemap
const sitemap = new SitemapStream({ hostname });

links.forEach((link) => sitemap.write(link));
sitemap.end();

const data = await streamToPromise(sitemap);
await writeFile(resolve('public/sitemap.xml'), data);

console.log('✅ Sitemap generated successfully!');
