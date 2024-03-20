// import useAmplifyHub from '../hooks/useAmplifyHub';
import { usePathTracking, useReduxOnRouteChange, useSession } from '../../../hooks'

function GlobalConfig({ children }) {
  useReduxOnRouteChange()
  // useAmplifyHub();
  usePathTracking()
  useSession()

  return <>{children}</>
}

export default GlobalConfig
