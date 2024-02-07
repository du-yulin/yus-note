<template>
  <header class="header">
    <div class="logo-container">
      <img src="@/assets/images/logo.png" alt="logo" class="logo">
    </div>
    <div class="header-nav">
      <el-switch v-model="isDark" size="large" class="thema-switch">
        <template #active-action>
          <Moon class="icon-moon"></Moon>
        </template>
        <template #inactive-action>
          <Sunny class="icon-sunny"></Sunny>
        </template>
      </el-switch>
      <el-avatar v-if="user.id" :src="user.avator" />
      <el-button v-else type="info" round @click="toLoginView">登录</el-button>
    </div>
  </header>
</template>


<script setup lang="ts">
// import { toRefs } from 'vue'
import { storeToRefs } from "pinia"
import { useRouter, useRoute } from "vue-router"
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { ElButton, ElAvatar } from "element-plus"

import { useUserStore } from '@/stores/user'

const isDark = useDark()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const router = useRouter()
const route = useRoute()

async function toLoginView() {
  await router.push({
    name: 'login',
    query: {
      next: route.name as string
    }
  })

}

</script>


<style scoped>
.header {
  /* background-color: skyblue; */
  height: 50px;
  border-bottom: solid 2px var(--el-border-color);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.logo-container {
  height: 80%;
}

.logo {
  height: 100%;
}

.header-nav {
  display: flex;
  align-items: center;
}

.header-nav>* {
  margin-left: 10px;
}

.thema-switch {
  --el-switch-on-color: var(--el-fill-color)
}

.icon-moon {
  color: var(--el-color-white);
  background-color: var(--el-fill-color);
}

.icon-sunny {
  color: var(--el-text-color-regular);
  background-color: var(--el-switch-off-color);
}

.user-info-wrapper {
  display: flex;
  align-items: center;

}

.user-name {
  width: 100px;
}
</style>