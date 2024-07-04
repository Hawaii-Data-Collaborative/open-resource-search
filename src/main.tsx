import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './ui/app'
import { isInternetExplorer, initMapLibraries } from './utils'
import { initAxios } from './services'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { GlobalStyleSheet } from './styles/GlobalStyleSheet/GlobalStyleSheet'
import GlobalConfig from './ui/modules/GlobalConfig/GlobalConfig'
import { ThemeProvider } from '@mui/material'
import { materialUiTheme } from './styles/theme'
import { Toast } from './ui/modules/Toast/Toast'
import { AuthContextProvider } from './providers'

// Import polyfills for IE11 support
if (import.meta.env.MODE === 'production' && isInternetExplorer()) {
  import('core-js')
  require('es6-promise/auto')
  require('isomorphic-fetch')
  require('proxy-polyfill/proxy.min')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const elementClosest = require('element-closest').default
  elementClosest(window)
}

async function main() {
  initAxios()
  await initMapLibraries()

  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <AuthContextProvider>
        <Router>
          <ThemeProvider theme={materialUiTheme}>
            <GlobalStyleSheet />
            <GlobalConfig>
              <App />
              <Toast />
            </GlobalConfig>
          </ThemeProvider>
        </Router>
      </AuthContextProvider>
    </Provider>
  )
}

main()
