import 'axios'
import 'pinia'

declare module 'axios' {
  export interface AxiosRequestConfig {
    pathParams?: { [prop: string]: any }
  }
}

declare module 'pinia' {
  export interface DefineSetupStoreOptions {
    persist?: any
  }
}
