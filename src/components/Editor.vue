
<template>
  <Editor :value="content" :plugins="plugins" @change="handleChange" :locale="locale" />
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
import 'bytemd/dist/index.css'

// @ts-ignore
import themes from 'juejin-markdown-themes'
// @ts-ignore
import { Editor } from "@bytemd/vue-next";

defineProps({
  content: {
    type: String,
    default: ''
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
  {
    // @ts-ignore
    viewerEffect({ file }) {
      const $style = document.createElement('style');
      $style.innerHTML =
        themes[file.frontmatter?.theme]?.style ?? themes.juejin.style;
      document.head.appendChild($style);
      return () => {
        $style.remove();
      };
    },
  },
];

function handleChange(v: any) {
  emits('contentChange', v)
}


</script>

<style scoped>
:deep(.bytemd) {
  height: calc(100vh - 50px) !important;
}
</style>
