import { createContext } from 'react'

interface User {
  email: string
}

export interface IAppContext {
  showAdvancedFilters: boolean
  update: (arg: { showAdvancedFilters?: boolean }) => void
}

interface IAuthContext {
  user: User
  setUser: (user: User) => void
  loading: boolean
}

interface IFavsContext {
  favorites: any[]
  setFavorites: (favorites: any[]) => void
  spidMap: any
  addFavorite: (id: string) => void
  deleteFavorite: (id: string) => void
}

export const AppContext = createContext<IAppContext>(null)
export const AuthContext = createContext<IAuthContext>(null)
export const FavsContext = createContext<IFavsContext>(null)
