import { useMemo, useState } from 'react'
import { AppContext } from '../context'

export function AppContextProvider({ children }) {
  const [state, setState] = useState<any>({ showAdvancedFilters: false })

  const value = useMemo(() => {
    return {
      ...state,
      update: nextState => setState(state => ({ ...state, ...nextState }))
    }
  }, [state, setState])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
