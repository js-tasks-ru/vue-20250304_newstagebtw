import { prettierConfig } from '@shgk/vue-course-taskbook/configs/pretteir.config.js'

export default {
  // Стандартный конфиг Prettier
  // + конфигурация из репозитория Vue
  // + небольшие изменения для материалов
  ...prettierConfig,

  // Полный список правил:
  // https://prettier.io/docs/en/options

  // Здесь вы можете переопределять правила Prettier по вашему усмотрению
  // 'semi': true, // Добавлять точку с запятой в конце выражений
}
