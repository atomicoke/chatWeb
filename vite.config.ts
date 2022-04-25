import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
      "@": path.resolve(__dirname, "src"),
    }
  },
  build: {
    // 代码压缩配置
    minify:'terser', // 设置之后 terserOptions才会生效
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // 打包文件夹设置
    chunkSizeWarningLimit:1500,
    rollupOptions: {
        output:{
          chunkFileNames:'js/[name]-[hash].js',
          entryFileNames:'js/[name]-[hash].js',
          assetFileNames:'[ext]/[name]-[hash].[ext]',
        }
    },
  },
  // 跨域问题的解决
  server: {  //代理地址
    open:true,
    host:'0.0.0.0',
    
    proxy: {
      '/api': {
        target:'http://114.132.249.192:8080',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 'ws://': {
      //   target:'ws://114.132.249.192:8081',
      //   ws: true,
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace("", '')
      // },
    }
  },
})

