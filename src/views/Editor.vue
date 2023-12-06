
<template>
  <Editor :content="content" @contentChange="contentChange" :uploadUrl="uploadUrl" />
</template>

<script setup lang="ts">
import Editor from '@/components/Editor.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
// @ts-ignore
import themes from 'juejin-markdown-themes'

const content = ref('')
const uploadUrl = 'http://localhost:8000/upload/file'

const route = useRoute()
console.log(route)
if (route.query?.id) {
  getExampleMd()
} else {
  content.value = `---
# themes: ${Object.keys(themes).join(', ')}
theme: juejin
---`
}

function contentChange(value: any) {
  content.value = value
}

function getExampleMd() {
  fetch('/src/examples/examples.md').then(res => res.text()).then(md => {
    md = md.replace(
      '# themes:',
      '# themes: ' + Object.keys(themes).join(', '))

    content.value = md
  })
}
</script>

<style scoped>
:deep(.bytemd) {
  height: calc(100vh - 50px) !important;
}
</style>
