/**
 * 全局类型声明
 */
declare module 'pinia-plugin-persist'

declare namespace api {
  interface userDetail {
    id: number | null
    username: string
    nickname: string
    email: string
    phone: string
    avator: string
    gender: string
    registration_date: string
    last_publish_datetime: string
    review_history: string
    publish_history: string
    following_number: number
    followers_number: number
  }
}
