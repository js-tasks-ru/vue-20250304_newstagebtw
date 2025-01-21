import vueCourseConfig from '@shgk/vue-course-taskbook/configs/eslint.config.js'

export default [
  // По умолчанию установлены:
  // - Рекомендуемые правила ESLint: https://eslint.org/docs/latest/rules/
  // - Рекомендуемые правила TypeScript: https://typescript-eslint.io/rules/
  // - Рекомендуемые правила Vue (с некоторыми отключенными правилами): https://eslint.vuejs.org/rules/
  ...vueCourseConfig,

  {
    rules: {
      // Здесь вы можете переопределять правила по своему усмотрению
    }
  }
]
