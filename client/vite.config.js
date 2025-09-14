import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    vitePrerenderPlugin({
      routes: ["/", "/contactus", "/support", "/resources", "/privacy", "/terms", "/solutions", "/allproducts", "/valueAddedServices", "/support", "/aboutus", "/privacy", "/projects", "/cookiespolicy", "/esgpolicy"], // add all SEO-important pages
    }),
  ],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});
