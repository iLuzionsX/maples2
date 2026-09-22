import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.MAPLES_BASE || '/',
});
