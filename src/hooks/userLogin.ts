import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'

import { useUserStore } from '@/stores/user'
import { authcode } from '@/api'
import { useThrottleButton } from '@/hooks'

export function usePasswordLogin(
  props: { next?: string },
  router: ReturnType<typeof useRouter>,
  userStore: ReturnType<typeof useUserStore>
) {
  const passwordFormRef = ref<FormInstance>()
  const passwordForm = reactive({
    username: '',
    phone: '',
    email: '',
    password: ''
  })
  const passwordFormRule = reactive({
    username: [{ required: true, message: '请输入用户名/手机号/邮箱', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  })
  const passwordFormSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        passwordForm.phone = passwordForm.email = passwordForm.username
        await userStore.login({ data: passwordForm })
        router.replace({ name: props.next })
      }
    })
  }

  return { passwordFormRef, passwordForm, passwordFormRule, passwordFormSubmit }
}

export function usePhoneLogin(
  props: { next?: string },
  router: ReturnType<typeof useRouter>,
  userStore: ReturnType<typeof useUserStore>
) {
  const phoneFormRef = ref<FormInstance>()
  const { ButtonOption: AButtonOption, throttled: AButtonThrottled } = useThrottleButton('获取')
  const phoneForm = reactive({
    phone: '',
    authcode: ''
  })

  const validatePhone = (rule: any, value: string, callback: any) => {
    const phoneRegx =
      /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
    if (!value.match(phoneRegx)) {
      callback(new Error('请输入11位手机号'))
    } else {
      callback()
    }
  }

  const phoneFormRule = reactive({
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { validator: validatePhone, trigger: 'blur' }
    ],
    authcode: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
      { len: 6, message: '请输入6位验证码', trigger: 'blur' }
    ]
  })

  const phoneFormSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        await userStore.login({ data: phoneForm })
        router.replace({ name: props.next })
      }
    })
  }

  const phoneGetAuthcode = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validateField('phone', async (valid) => {
      if (valid) {
        try {
          await authcode({ data: { phone: phoneForm.phone } })
          AButtonThrottled(60)
        } catch (err) {
          return
        }
      }
    })
  }
  return {
    phoneFormRef,
    PAButtonOption: AButtonOption,
    phoneForm,
    phoneFormRule,
    phoneGetAuthcode,
    phoneFormSubmit
  }
}

export function useEmailLogin(
  props: { next?: string },
  router: ReturnType<typeof useRouter>,
  userStore: ReturnType<typeof useUserStore>
) {
  const emailFormRef = ref<FormInstance>()
  const { ButtonOption: AButtonOption, throttled: AButtonThrottled } = useThrottleButton('获取')
  const emailForm = reactive({
    email: '',
    authcode: ''
  })

  const validateEmail = (rule: any, value: string, callback: any) => {
    const emailRegx =
      /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/
    if (!value.match(emailRegx)) {
      callback(new Error('请输入正确的邮箱格式'))
    } else {
      callback()
    }
  }

  const emailFormRule = reactive({
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { validator: validateEmail, trigger: 'blur' }
    ],
    authcode: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
      { len: 6, message: '请输入6位验证码', trigger: 'blur' }
    ]
  })

  const emailFormSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
      if (valid) {
        await userStore.login({ data: emailForm })
        router.replace({ name: props.next })
      }
    })
  }

  const emailGetAuthcode = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validateField('email', async (valid) => {
      if (valid) {
        try {
          await authcode({ data: { email: emailForm.email } })
          AButtonThrottled(60)
        } catch (err) {
          return
        }
      }
    })
  }
  return {
    emailFormRef,
    EAButtonOption: AButtonOption,
    emailForm,
    emailFormRule,
    emailGetAuthcode,
    emailFormSubmit
  }
}
