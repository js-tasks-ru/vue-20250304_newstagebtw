<script setup>
defineProps({
  description: {
    type: String,
  },
})
</script>

<template>
  <div class="meetup-description">{{ description }}</div>
</template>

<style scoped>
/* _meetup-description.css */
.meetup-description {
  margin: var(--spacing-large) 0;
  white-space: pre-wrap;
}
</style>
