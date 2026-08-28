import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.orgeskokoshari.com',
  image: {
    responsiveStyles: true
  },
  build: {
    inlineStylesheets: 'auto'
  }
});
