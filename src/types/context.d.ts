interface User {
  email: string
}

interface IAppState {
  modal?: 'LOGIN_PROMPT'
}

interface IAppContext extends IAppState {
  setState: (state: IAppState) => void
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
