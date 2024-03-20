import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { logEvent } from '../analytics'

export function usePageLoaded() {
  const location = useLocation()
  const url = location.pathname

  useEffect(() => {
    setTimeout(() => {
      logEvent('PageLoad', {
        url,
        pageTitle: window.document.title
      })
    }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
