import { AuthContextProvider } from './AuthContextProvider'
import { FavsContextProvider } from './FavsContextProvider'

export function Providers({ children }) {
  return (
    <AuthContextProvider>
      <FavsContextProvider>{children}</FavsContextProvider>
    </AuthContextProvider>
  )
}
