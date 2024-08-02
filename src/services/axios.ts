import axios from 'axios'
import { localStorage } from './localStorage'
import { AUTH_TOKEN } from '../constants'
import { getAnalyticsUserId } from '../analytics'

export function initAxios() {
  axios.interceptors.request.use(config => {
    const token = localStorage.get(AUTH_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    const userId = getAnalyticsUserId()
    if (userId) {
      config.headers['X-UID'] = userId
    }

    return config
  })
}
