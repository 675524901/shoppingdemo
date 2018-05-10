import { removeStore } from '@/utils/storage'
import { removeToken } from '@/utils/session'
export default {
  FedLogOut() {
    return new Promise(resolve => {
      removeToken()
      removeStore('buyCart')
    })
  }
}
