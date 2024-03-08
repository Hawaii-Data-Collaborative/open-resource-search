import { useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { setCookie } from 'nookies'
import { sessionStorage } from '../services'

export function useSession() {
  useEffect(() => {
    let sessionId = sessionStorage.get('sessionId')

    if (!sessionId) {
      sessionId = uuid()
      setCookie(null, 'sessionId', sessionId)
      sessionStorage.set('sessionId', sessionId)
    }
  }, [])
}
