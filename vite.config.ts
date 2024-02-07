import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {
	// 	port: 5000, // 访问端口号
	// 	host: '0.0.0.0', // 配置项目可以局域网访问
	// 	cors: true, // 默认启用并允许任何源
  // },
})
