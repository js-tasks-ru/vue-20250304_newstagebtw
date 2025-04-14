import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import CounterApp from '../CounterApp.js'

describe('CounterApp', () => {
  let wrapper: VueWrapper
  let count: DOMWrapper<HTMLElement>
  let decrement: DOMWrapper<HTMLButtonElement>
  let increment: DOMWrapper<HTMLButtonElement>

  beforeEach(() => {
    wrapper = mount(CounterApp)
    count = wrapper.find('[data-testid="count"]')
    decrement = wrapper.find('[aria-label="Decrement"]')
    increment = wrapper.find('[aria-label="Increment"]')
  })

  it('должно рендерить счетчик с начальным значением 0', () => {
    expect(count.text()).toBe('0')
  })

  it('должно рендерить отключенной только кнопку уменьшения при значении счетчика 0', () => {
    expect(decrement.attributes('disabled')).toBeDefined()
    expect(increment.attributes('disabled')).not.toBeDefined()
  })

  it('должно увеличивать значение до 5 после 5 кликов на кнопку увеличения и отключить кнопку увеличения после этого', async () => {
    for (let i = 0; i < 5; i++) {
      await increment.trigger('click')
    }
    expect(count.text()).toBe('5')
    expect(increment.attributes('disabled')).toBeDefined()
  })

  it('должно после увеличения до 5 уменьшать счетчик на 1 при нажатии на кнопку уменьшения и затем отключить кнопку уменьшения', async () => {
    for (let i = 0; i < 5; i++) {
      await increment.trigger('click')
    }
    expect(count.text()).toBe('5')

    for (let i = 0; i < 5; i++) {
      await decrement.trigger('click')
    }
    expect(count.text()).toBe('0')
    expect(decrement.attributes('disabled')).toBeDefined()
    expect(increment.attributes('disabled')).not.toBeDefined()
  })
})
