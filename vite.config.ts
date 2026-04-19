import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: {
        '/api': {
          target: `${env.VITE_SUPABASE_URL}/functions/v1/generate-secret`,
          changeOrigin: true,
          rewrite: () => '',
        },
      },
    },
  };
});
