<template>
    <div></div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { ElLoading } from 'element-plus'
import { useRouter } from "vue-router"

import { useUserStore } from "@/stores/user"
const router = useRouter()
const showLoading = () => {
    const loading = ElLoading.service({
        lock: true,
        text: '登录成功...',
        background: 'rgba(255, 255, 255, 0.7)',
    })
    return loading
}

onMounted(async () => {
    const loading = showLoading()
    await useUserStore().fresh()
    loading.close()
    router.replace({ name: 'home' })
})
</script>


<style scoped></style>