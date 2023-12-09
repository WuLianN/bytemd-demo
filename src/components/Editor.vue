
<template>
  <Editor :value="content" :plugins="plugins" @change="handleChange" :locale="locale" :uploadImages="uploadImages" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import breaks from '@bytemd/plugin-breaks'
import highlightTheme from '@ziuchen/bytemd-plugin-highlight-theme'
import hls from '@ziuchen/bytemd-plugin-highlight-theme/dist/highlights.json'
import 'bytemd/dist/index.css'
import zh_Hans from '@ziuchen/bytemd-plugin-highlight-theme/locales/zh_Hans.json'

// @ts-ignore
import { Editor } from "@bytemd/vue-next";
// @ts-ignore
import { request } from '@/utils/index.ts'
// @ts-ignore
import theme from '@/plugins/theme.ts'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  upload: {
    type: Function,
    default: () => {}
  }
})

const emits = defineEmits(['contentChange'])

function stripPrefixes(obj: Record<string, any>) {
  return Object.entries(obj).reduce((p, [key, value]) => {
    p[key.split('/').slice(-1)[0].replace('.json', '')] = value
    // console.log(p)
    return p
  }, {} as Record<string, any>)
}

const locales = stripPrefixes(
  import.meta.glob('/node_modules/bytemd/locales/*.json', { eager: true })
)
const gfmLocales = stripPrefixes(
  import.meta.glob('/node_modules/@bytemd/plugin-gfm/locales/*.json', {
    eager: true,
  })
)
const mathLocales = stripPrefixes(
  import.meta.glob('/node_modules/@bytemd/plugin-math/locales/*.json', {
    eager: true,
  })
)
const mermaidLocales = stripPrefixes(
  import.meta.glob('/node_modules/@bytemd/plugin-mermaid/locales/*.json', {
    eager: true,
  })
)

const localeKey = 'zh_Hans'
const locale = locales[localeKey]

const plugins = [
  gfm({
    locale: gfmLocales[localeKey],
  }),
  frontmatter(),
  gemoji(),
  highlight(),
  math({
    locale: mathLocales[localeKey],
  }),
  mediumZoom(),
  mermaid({
    locale: mermaidLocales[localeKey],
  }),
  breaks(),
  theme(),
  highlightTheme({
    highlights: hls,
    locale: zh_Hans
  })
];

function handleChange(v: any) {
  emits('contentChange', v)
}

function uploadImages(fileList: Array<File>) {
  return Promise.all(fileList.map(file => {
    return props.upload(file)
  }))
}
</script>

<style scoped>
:deep(.bytemd) {
  height: calc(100vh - 50px) !important;
}
</style>
