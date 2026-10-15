import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { docsPlugin } from './build/docs-plugin.ts';

// Base path is set per deploy target with `--base` (see .github/workflows/deploy.yml).
export default defineConfig({
  plugins: [react(), docsPlugin()],
});
