interface User {
  email: string
}

interface IAppState {
  modal: 'LOGIN_PROMPT'
  showAdvancedFilters: boolean
}

interface IAppContext extends IAppState {
  setAppState: (state: Partial<IAppState>) => void
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
