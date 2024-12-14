import { useMemo, useState } from 'react'
import { AppContext } from '../context'

export function AppContextProvider({ children }) {
  const [state, setState] = useState<IAppState>({ modal: null, showAdvancedFilters: false })

  const value = useMemo(() => {
    return {
      ...state,
      setAppState: (partialState: Partial<IAppState>) => setState({ ...state, ...partialState })
    }
  }, [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
