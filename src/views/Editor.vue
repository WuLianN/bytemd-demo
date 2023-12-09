
<template>
  <header class="editor-header">
    <div class="left-box"></div>
    <input placeholder="输入文章标题..." spellcheck="false" maxlength="80" class="title-input" v-model="title">
    <div class="right-box">
      <div title="" class="status-text with-padding">{{ status }}</div>
      <button class="btn btn-outline with-padding" @click="goDraftBox">草稿箱</button>
      <button class="btn with-padding" @click="publish">发布</button>
    </div>
  </header>
  <Editor :content="content" @contentChange="contentChange" :upload="upload" />
</template>

<script setup lang="ts">
import Editor from '@/components/Editor.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
// @ts-ignore
import { examples } from '@/examples/index.js'
import { debounce } from 'lodash-es'

const title = ref('')
const content = ref('')
const uploadUrl = import.meta.env.VITE_APP_BASE_API + '/upload/file'
const status = ref('文章将自动保存至草稿箱')
const debounceWaitMs = 300
const debounceSave = debounce(save, debounceWaitMs)

const route = useRoute()

if (route.query?.id) {
  getExampleMd()
}

watch([title, content], () => {
  debounceSave(title.value, content.value)
})

function contentChange(value: string) {
  content.value = value
}

function getExampleMd() {
  content.value = examples
}

function save(title: string, content: string) {
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      content: content
    })
  }).then(() => {
    status.value = '保存成功'
  }).catch(() => {
    console.log('保存失败')
  })
}

function goDraftBox() {}

function publish() {}

async function upload(file: File) {
  const formData = new FormData();
  formData.append('type', '1')
  formData.append('file', file)

  return fetch(uploadUrl, {
    method: 'POST',
    body: formData
  }).then((res: { json: () => any; }) => res.json())
    .then((result: { file_access_url: any; }) => {
      const { file_access_url: url } = result
      return { url }
    })
    .catch(() => {
      console.log('上传失败')
      return ''
    })
}
</script>

<style scoped lang="scss">
$header-height: 64px;

:deep(.bytemd) {
  height: calc(100vh - $header-height) !important;
}

.editor-header {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  padding: 0 27px;
  height: $header-height;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.title-input {
  margin: 0;
  padding: 0;
  font-size: 24px;
  font-weight: 500;
  color: #1d2129;
  border: none;
  outline: none;

  flex: 1 1 auto;
  height: 100%;
}

.right-box {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
}

.btn {
  height: 32px;
  padding: 2px 16px;
  font-size: 14px;
  border: 1px solid #1d7dfa;
  border-radius: 2px;
  cursor: pointer;
  color: #fff;
  box-sizing: border-box;
  background-color: #1d7dfa;
}

.btn-outline {
  color: #1d7dfa;
  background-color: #fff;
}

.with-padding {
  margin-left: 8px;
  margin-right: 8px;
}

.status-text {
  font-size: 14px;
  white-space: nowrap;
  color: #c9cdd4;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
