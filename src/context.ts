import { createContext } from 'react'

interface User {
  email: string
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

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)
export const FavsContext = createContext<IFavsContext>({} as IFavsContext)
