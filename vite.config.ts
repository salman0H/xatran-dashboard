import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const targetApi = env.TARGET_API || 'http://localhost:3004'
    return {
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    proxy: {
      '/api/flow/nodes': {
        target: targetApi, // http://localhost:3004
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/flow\/nodes/, '/nodes'),
      },
      '/api/flow/edges': {
        target: targetApi,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/flow\/edges/, '/edges'),
      },
      '/api/substation/diagram': {
        target: targetApi,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/substation\/diagram/, '/diagram'),
      },
      '/api': {
        target: targetApi,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'antd',
        '@ant-design/icons',
        '@tanstack/react-query',
        'i18next',
        'react-i18next',
        'i18next-http-backend',
        'zod',
        'react-hook-form',
      ],
    },
  }
})