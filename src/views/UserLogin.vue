<template>
    <div class="login-container">
        <img class="login-bg" src="@/assets/images/login-bg.png">
        <div class="login-wrapper">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="密码" name="password">
                    <el-form :model="passwordForm" :rules="passwordFormRule" ref="passwordFormRef">
                        <el-form-item label="用户名" prop="username">
                            <el-input placeholder="请输入用户名/手机号/邮箱" autocomplete="on" v-model="passwordForm.username" />
                        </el-form-item>
                        <el-form-item label="密&nbsp&nbsp&nbsp码" prop="password">
                            <el-input type="password" placeholder="请输入密码" show-password autocomplete="on"
                                v-model="passwordForm.password" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="passwordFormSubmit(passwordFormRef)">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机" name="phone">
                    <el-form :model="phoneForm" :rules="phoneFormRule" ref="phoneFormRef">
                        <el-form-item label="手机号" prop="phone">
                            <el-input type="tel" placeholder="请输入手机号" autocomplete="on" v-model="phoneForm.phone" />
                        </el-form-item>
                        <el-form-item label="验证码" prop="authcode">
                            <el-row :gutter="10">
                                <el-col :span="16">
                                    <el-input placeholder="请输入验证码" autocomplete="on" v-model="phoneForm.authcode" />
                                </el-col>
                                <el-col :span="8">
                                    <el-button class="authcode-button" type="primary" :loading="PAButtonOption.loading"
                                        :disabled="PAButtonOption.disabled" @click="phoneGetAuthcode(phoneFormRef)">{{
                                            PAButtonOption.text }}</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="phoneFormSubmit(phoneFormRef)">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="邮箱" name="email">
                    <el-form :model="emailForm" :rules="emailFormRule" ref="emailFormRef">
                        <el-form-item label="邮&nbsp;&nbsp;&nbsp;箱" prop="email">
                            <el-input placeholder="请输入邮箱" autocomplete="on" v-model="emailForm.email" />
                        </el-form-item>
                        <el-form-item label="验证码" prop="authcode">
                            <el-row :gutter="10">
                                <el-col :span="16">
                                    <el-input placeholder="请输入验证码" autocomplete="on" v-model="emailForm.authcode" />
                                </el-col>
                                <el-col :span="8">
                                    <el-button class="authcode-button" type="primary" :loading="EAButtonOption.loading"
                                        :disabled="EAButtonOption.disabled" @click="emailGetAuthcode(emailFormRef)">{{
                                            EAButtonOption.text }}</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="emailFormSubmit(emailFormRef)">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div class="third-login-container">
                <div class="third-login-header">
                    <el-text>第三方登录>>></el-text>
                </div>
                <div class="third-login-body">
                    <el-link :href="apiURLS.weChatLogin">
                        <div class="third-login-items">
                            <el-button type="success" :icon="ChatDotRound" circle />
                            <el-text size="small">微信</el-text>
                        </div>
                    </el-link>
                </div>
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElText, ElCol, ElRow } from "element-plus"
import { useRouter } from 'vue-router'
import { ChatDotRound } from '@element-plus/icons-vue'

import { apiURLS } from "@/api/urls"
import { useUserStore } from "@/stores/user"
import { usePasswordLogin, usePhoneLogin, useEmailLogin } from "@/hooks/userLogin"

const activeTab = ref('phone')
const props = defineProps<{ next?: string }>()
const userStore = useUserStore()
const router = useRouter()

const { passwordFormRef, passwordForm, passwordFormRule, passwordFormSubmit } = usePasswordLogin(props, router, userStore)
const { phoneFormRef, PAButtonOption, phoneForm, phoneFormRule, phoneFormSubmit, phoneGetAuthcode } = usePhoneLogin(props, router, userStore)
const { emailFormRef, EAButtonOption, emailForm, emailFormRule, emailGetAuthcode, emailFormSubmit } = useEmailLogin(props, router, userStore)
</script>


<style scoped>
.login-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-bg {
    width: 30%;
}

.login-wrapper {
    width: 300px;
    background-color: #ffffff11;
    padding: 10px;
    backdrop-filter: blur(20px);
    border-radius: 10px;
    border: 1px solid var(--el-border-color)
}

.third-login-body {
    display: flex;
    margin: 10px 0;
}

.third-login-items {
    display: flex;
    flex-direction: column;
}

.authcode-button {
    width: 100%;
}

@media only screen and (max-width:768px) {
    .login-bg {
        display: none;
    }

    .login-wrapper {
        width: 80%;
    }
}
</style>