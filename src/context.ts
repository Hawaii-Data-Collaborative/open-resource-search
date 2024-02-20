import { createContext } from 'react'

interface IAuthContext {
  user: {
    email: string
  }
  setUser: (user: any) => void
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (user: any) => {}
})
