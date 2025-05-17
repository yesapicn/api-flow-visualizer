import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ApiFlowVisualizer',
      formats: ['es', 'umd'],
      fileName: (format) => `api-flow-visualizer.${format}.js`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'antd',
        '@ant-design/icons',
        'reactflow',
        'dayjs'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          '@ant-design/icons': 'icons',
          reactflow: 'ReactFlowRenderer',
          dayjs: 'dayjs'
        },
        exports: 'named'
      }
    }
  }
})
