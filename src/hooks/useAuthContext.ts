import { AuthContext } from '@context'
import { useContext } from 'react'

export function useAuthContext() {
  return useContext(AuthContext)
}
