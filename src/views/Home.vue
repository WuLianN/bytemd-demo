<template>
  <div>
    <div @click="go('edit')">编辑 examples.md</div>
    <div @click="go('add')">新增</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function go(name: string) {
  if (name === 'add') {
    router.push({
      path: '/editor'
    })
  } else if (name === 'edit') {
    router.push({
      path: `/editor`,
      query: {
        id: 1
      }
    })
  }
}
</script>

<style scoped lang="scss"></style>