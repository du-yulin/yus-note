import { reactive } from 'vue'

export function useThrottleButton(text: string) {
  const ButtonOption = reactive({
    text: text || '提交',
    loading: false,
    disabled: false
  })
  const throttled = (timeout: number) => {
    ButtonOption.disabled = true
    let remainTime = timeout || 60
    const intervalId = setInterval(() => {
      remainTime -= 1
      ButtonOption.text = `${remainTime}秒`
      ButtonOption.loading = true
      if (remainTime === 0) {
        ButtonOption.disabled = false
        ButtonOption.loading = false
        ButtonOption.text = '获取'
        clearInterval(intervalId)
      }
    }, 1000)
  }
  return { ButtonOption, throttled }
}
