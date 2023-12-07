
<template>
  <Editor :content="content" @contentChange="contentChange" :uploadUrl="uploadUrl" />
</template>

<script setup lang="ts">
import Editor from '@/components/Editor.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
// @ts-ignore
import { examples } from '@/examples/index.js'

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
  // fetch(import.meta.env.VITE_APP_BASE_API + '/src/examples/examples.md').then(res => res.text()).then(md => {
  //   content.value = md
  // })
  content.value = examples
}
</script>

<style scoped>
:deep(.bytemd) {
  height: calc(100vh - 10px) !important;
}
</style>
