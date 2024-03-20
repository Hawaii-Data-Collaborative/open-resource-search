import axios from 'axios'
import { localStorage } from './localStorage'
import { AUTH_TOKEN } from '../constants'

export function initAxios() {
  axios.interceptors.request.use(config => {
    const token = localStorage.get(AUTH_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}
