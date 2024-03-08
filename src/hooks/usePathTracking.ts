import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { sessionStorage } from '../services'

export function usePathTracking() {
  const location = useLocation()

  useEffect(() => {
    // Set the previous path as the value of the current path.
    const prevPath = sessionStorage.get('currentPath')
    sessionStorage.set('prevPath', prevPath)
    // Set the current path value by looking at the browser's location object.
    sessionStorage.set('currentPath', window.location.pathname)
  }, [location.pathname])
}
