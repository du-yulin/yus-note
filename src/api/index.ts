import { request } from './axios'
import type { AxiosRequestConfig } from 'axios'
import { apiURLS } from './urls'

export const login = (config: AxiosRequestConfig) => {
  return request<api.userDetail>(apiURLS.login, 'post', config)
}
export const logout = () => {
  return request<api.userDetail>(apiURLS.logout, 'post')
}
export const authcode = (config: AxiosRequestConfig) => {
  return request<{ phone?: string; email?: string }>(apiURLS.authcode, 'post', config)
}
export const getUserProfile = () => {
  return request<api.userDetail>(apiURLS.userProfile, 'get',{withCredentials:true})
}
