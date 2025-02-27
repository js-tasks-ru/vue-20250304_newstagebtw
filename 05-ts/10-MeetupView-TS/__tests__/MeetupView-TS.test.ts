import type { Component } from 'vue'
import type { VueWrapper } from '@vue/test-utils'
import type { MeetupDTO } from '@shgk/vue-course-ui'
import { assert, beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { ESLint } from 'eslint'
import MeetupView from '@/MeetupView.vue'
import MeetupAgenda from '@/MeetupAgenda.vue'
import MeetupAgendaItem from '@/MeetupAgendaItem.vue'
import MeetupDescription from '@/MeetupDescription.vue'
import MeetupCover from '@/MeetupCover.vue'
import MeetupInfo from '@/MeetupInfo.vue'
import meetups from '@/meetups.fixture.ts'

async function lintComponentDefinePropsDeclaration(component: Component) {
  if (!('__file' in component) || !component.__file) {
    throw new Error(`Компонент должен быть описан на <script setup>`)
  }

  const eslint = new ESLint({
    overrideConfig: {
      rules: {
        'vue/define-props-declaration': ['error', 'type-based'],
        'vue/block-lang': [
          'error',
          {
            script: {
              lang: 'ts',
            },
          },
        ],
      },
    },
  })

  const result = await eslint.lintFiles([component.__file])
  return {
    success: result[0].errorCount === 0,
    message: result[0].messages[0]?.message,
  }
}

describe('ts/MeetupView-TS', () => {
  describe('MeetupView', () => {
    const meetup = meetups[0] as MeetupDTO
    let wrapper: VueWrapper

    beforeEach(() => {
      wrapper = shallowMount(MeetupView, {
        props: { meetup },
        global: {
          renderStubDefaultSlot: true,
        },
      })
    })

    it('отображает изображение и заголовок митапа с MeetupCover', () => {
      const cover = wrapper.findComponent({ name: 'MeetupCover' })
      expect(cover.exists()).toBeTruthy()
      expect(cover.props('title')).toBe(meetup.title)
      expect(cover.props('image')).toBe(meetup.image)
    })

    it('отображает описание митапа с MeetupDescription', () => {
      const description = wrapper.findComponent({ name: 'MeetupDescription' })
      expect(description.exists()).toBeTruthy()
      expect(description.props('description')).toBe(meetup.description)
    })

    it('отображает краткую информацию митапа с MeetupInfo', () => {
      const info = wrapper.findComponent({ name: 'MeetupInfo' })
      expect(info.exists()).toBeTruthy()
      expect(info.props('organizer')).toBe(meetup.organizer)
      expect(info.props('place')).toBe(meetup.place)
      expect(info.props('date')).toBe(meetup.date)
    })

    it('отображает программу митапа с MeetupAgenda', () => {
      const agenda = wrapper.findComponent({ name: 'MeetupAgenda' })
      expect(agenda.exists()).toBeTruthy()
      expect(agenda.props('agenda')).toEqual(meetup.agenda)
    })

    it('отображает сообщение через UiAlert, если в параметре meetup пустая программа agenda', async () => {
      await wrapper.setProps({ meetup: { ...meetup, agenda: [] } })
      const uiAlert = wrapper.findComponent({ name: 'UiAlert' })
      const agenda = wrapper.findComponent({ name: 'MeetupAgenda' })
      expect(uiAlert.exists()).toBeTruthy()
      expect(agenda.exists()).toBeFalsy()
    })

    it('не отображает сообщение с UiAlert, если в параметре meetup непустая программа agenda', () => {
      const uiAlert = wrapper.findComponent({ name: 'UiAlert' })
      expect(uiAlert.exists()).toBeFalsy()
    })
  })

  describe('defineProps через TS', () => {
    it('MeetupView должен описывать пропсы через TS с defineProps<...>()', async () => {
      const { success, message } = await lintComponentDefinePropsDeclaration(MeetupView)
      assert(success, message)
    })

    it('MeetupAgenda должен описывать пропсы через TS с defineProps<...>()', async () => {
      const { success, message } = await lintComponentDefinePropsDeclaration(MeetupAgenda)
      assert(success, message)
    })

    it('MeetupAgendaItem должен описывать пропсы через TS с defineProps<...>()', async () => {
      const { success, message } = await lintComponentDefinePropsDeclaration(MeetupAgendaItem)
      assert(success, message)
    })

    it('MeetupDescription должен описывать пропсы через TS с defineProps<...>()', async () => {
      const { success, message } = await lintComponentDefinePropsDeclaration(MeetupDescription)
      assert(success, message)
    })

    it('MeetupCover должен описывать пропсы через TS с defineProps<...>()', async () => {
      const { success, message } = await lintComponentDefinePropsDeclaration(MeetupCover)
      assert(success, message)
    })

    it('MeetupInfo должен описывать пропсы через TS с defineProps<...>()', async () => {
      const { success, message } = await lintComponentDefinePropsDeclaration(MeetupInfo)
      assert(success, message)
    })

    // TODO: add simple test for TS errors
  })
})
