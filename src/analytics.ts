import axios from 'axios'
import { getAppConfigValue } from './utils'

let user

function init() {
  const rawUser = window.localStorage.getItem('analyticsUser')
  if (rawUser) {
    user = JSON.parse(rawUser)
  } else {
    user = { id: `user_${Date.now()}` }
    localStorage.setItem('analyticsUser', JSON.stringify(user))
  }
}

export function logEvent(eventName, data) {
  if (!user) {
    init()
  }

  // @ts-expect-error it's fine
  if (typeof window.gtag === 'function') {
    // @ts-expect-error it's fine
    window.gtag('event', eventName, data)
  }

  const url = `${getAppConfigValue('apiUrl')}/api/v1/user-activity`
  axios.post(url, { userId: user.id, event: eventName, data })
}

export function getAnalyticsUserId() {
  if (!user) {
    init()
  }
  return user.id
}
