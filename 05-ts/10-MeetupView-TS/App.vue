<script setup lang="ts">
import type { MeetupDTO } from '@shgk/vue-course-ui'
import { computed, ref } from 'vue'
import { UiRadioGroup } from '@shgk/vue-course-ui'
import MeetupView from './MeetupView.vue'
import meetups from './meetups.fixture.ts'

const meetupIndex = ref('0')
const meetup = computed(() => meetups[+meetupIndex.value] as MeetupDTO)
const options = meetups.map((_, index) => ({ label: (index + 1).toString(), value: index.toString() }))
</script>

<template>
  <div style="display: flex; justify-content: center; gap: 1em; padding: 1em 0">
    <UiRadioGroup v-model="meetupIndex" :options="options" />
  </div>
  <div class="page-meetup">
    <MeetupView :meetup="meetup" />
  </div>
</template>
