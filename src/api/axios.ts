import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { show } from './showError'

const axiosInstance = axios.create({
  timeout: 5000
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error as AxiosError
    if (response) {
      show(response)
      return Promise.reject(response)
    } else {
      ElMessage.warning('网络连接异常, 请稍后再试!')
    }
  }
)

export function request<T>(url: string, method: string = 'post', config: AxiosRequestConfig = {}) {
  const pathParams = config.pathParams
  for (const k in pathParams) {
    url.replace(':' + k, pathParams[k])
  }
  return new Promise<AxiosResponse<T, any>>((resolve, reject) => {
    const promise = axiosInstance<T>({
      url,
      method,
      ...config
    })
    promise.then((res) => resolve(res)).catch((err) => reject(err as AxiosResponse))
  })
}
