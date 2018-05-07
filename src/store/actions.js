import { removeStore } from '@/utils/storage'
export default {
  FedLogOut() {
    return new Promise(resolve => {
      sessionStorage.removeItem('token')
      removeStore('buyCart')
    })
  }
}
