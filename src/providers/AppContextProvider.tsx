import { useEffect, useMemo, useState } from 'react'
import { AppContext } from '../context'

export function AppContextProvider({ children }) {
  const [state, setState] = useState<IAppState>({
    modal: null,
    showAdvancedFilters: localStorage.getItem('showAdvancedFilters') === '1'
  })

  useEffect(() => {
    localStorage.setItem('showAdvancedFilters', state.showAdvancedFilters ? '1' : '0')
  }, [state])

  const value = useMemo(() => {
    return {
      ...state,
      setAppState: (partialState: Partial<IAppState>) => setState({ ...state, ...partialState })
    }
  }, [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
