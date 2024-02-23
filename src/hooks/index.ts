import { AuthContext, FavsContext } from '@context'
import { useContext } from 'react'

export const useAuthContext = () => useContext(AuthContext)
export const useFavsContext = () => useContext(FavsContext)
