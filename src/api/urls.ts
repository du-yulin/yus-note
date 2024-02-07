const baseURL = 'http://localhost:8000'

const _URLS = {
  login: '/login/',
  logout: '/logout/',
  authcode: '/authcode/',
  weChatLogin: '/social-auth/login/weixin/',
  userProfile: '/user/profile/'
}

export const apiURLS = new Proxy(_URLS, {
  get(target: typeof _URLS, prop: keyof typeof _URLS) {
    if (Object.hasOwn(target, prop)) {
      let url = target[prop] as string
      if (!url.startsWith('/')) {
        url = '/' + url
      }
      if (!url.endsWith('/')) {
        url = url + '/'
      }
      return baseURL + url
    }
    return target[prop]
  }
})
