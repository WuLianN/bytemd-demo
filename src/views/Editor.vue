
<template>
  <Editor :content="content" @contentChange="contentChange" :uploadUrl="uploadUrl" />
</template>

<script setup lang="ts">
import Editor from '@/components/Editor.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const content = ref('')
const uploadUrl = 'http://localhost:8000/upload/file'

const route = useRoute()

if (route.query?.id) {
  getExampleMd()
}

function contentChange(value: any) {
  content.value = value
}

function getExampleMd() {
  fetch('/src/examples/examples.md').then(res => res.text()).then(md => {
    content.value = md
  })
}
</script>

<style scoped>
:deep(.bytemd) {
  height: calc(100vh - 50px) !important;
}
</style>
