
<template>
  <header class="editor-header">
    <div class="left-box"></div>
    <input placeholder="输入文章标题..." spellcheck="false" maxlength="80" class="title-input">
    <div class="right-box">
      <div title="" class="status-text with-padding">文章将自动保存至草稿箱</div>
      <button class="btn btn-outline with-padding">草稿箱</button>
      <button class="btn with-padding">发布</button>
    </div>
  </header>
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
