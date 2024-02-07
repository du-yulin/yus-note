import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { login as apiLogin, logout as apiLogout, getUserProfile } from '@/api'
import type { AxiosRequestConfig } from 'axios'

export const useUserStore = defineStore(
  'user',
  () => {
    type User = {
      id?: null | number
      avator?: string
      username?: string
      nickname?: string
    }
    const user = reactive<User>({
      id: null,
      avator: '',
      username: '',
      nickname: ''
    })

    const reset = () => {
      Object.assign(user, { id: null, avator: '', username: '', nickname: '' })
    }
    const assign = (target: { [prop: string | symbol]: any }) => {
      let k: keyof User
      for (k in user) {
        user[k] = target[k]
      }
    }
    const login = async (config: AxiosRequestConfig) => {
      try {
        const resp = await apiLogin(config)
        assign(resp.data)
      } catch (err) {
        console.log('login error:', err)
      }
    }

    const logout = async () => {
      await apiLogout()
      reset()
    }

    const fresh = async () => {
      try {
        const { data: userProfile } = await getUserProfile()
        assign(userProfile)
      } catch (err) {
        return
      }
    }
    return { user, login, logout, fresh }
  },
  {
    persist: {
      enabled: true
    }
  }
)
