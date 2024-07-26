<template>
    <div>Home</div>
    <button @click="refreshUser()">刷新用户信息</button>
</template>


<script setup lang="ts">
import {useUserStore} from '@/stores/user'
async function refreshUser(){
    const userStore = useUserStore()
    const res = await userStore.fresh()
    console.log(res)
}
</script>


<style scoped></style>