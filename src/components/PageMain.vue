<template>
    <div class="main">
        <div class="aside">aside</div>
        <div class="content">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
</script>


<style scoped>
.main {
    height: calc(100% - 50px);
    box-sizing: border-box;
    display: flex;
}

.aside {
    /* background-color: orange; */
    width: 60px;
    height: 100%;
    border-right: 2px solid var(--el-border-color);
}

.content {
    /* background-color: lightblue; */
    flex: 1;
}
</style>