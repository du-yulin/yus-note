import { ElMessage } from 'element-plus'

export const show = ({ status, data }: { status: number; data: any }) => {
  switch (status) {
    case 400:
      for (const k in data) {
        for (const item of data[k]) {
          ElMessage.error(item)
        }
      }
      break
    default:
      ElMessage.error(data.detail)
  }
}
