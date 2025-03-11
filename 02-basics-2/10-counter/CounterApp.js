import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {},

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        disabled
      >➖</button>

      <span class="count" data-testid="count">0</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
      >➕</button>
    </div>
  `,
})
