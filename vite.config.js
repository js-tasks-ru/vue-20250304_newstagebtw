import { defineConfig } from 'vite'
import { createTaskbookViteConfig } from '@shgk/vue-course-taskbook/configs/vite.config.js'

const customConfig = defineConfig({
  // Здесь вы можете переопределять конфигурацию Vite
})

export default createTaskbookViteConfig({
  taskbookDir: __dirname,
  customConfig,
})
