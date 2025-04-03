import debug from 'debug'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './ui/app'
import { initMapLibraries } from './utils'
import { initAxios } from './services'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { GlobalStyleSheet } from './styles/GlobalStyleSheet/GlobalStyleSheet'
import GlobalConfig from './ui/modules/GlobalConfig/GlobalConfig'
import { ThemeProvider } from '@mui/material'
import { materialUiTheme } from './styles/theme'
import { Toast } from './ui/modules/Toast/Toast'
import { AppContextProvider, AuthContextProvider } from './providers'
import { checkForBot } from './cloudflare'
import { initLabels } from './labels'

// @ts-expect-error it's fine
window._debug = debug

async function main() {
  initAxios()

  const { hostname, pathname } = window.location
  const isRoot = pathname === (hostname === 'dev.hawaiidata.org' ? '/auw211' : '/')
  if (isRoot && !localStorage.getItem('didPassBotCheck')) {
    const isBot = await checkForBot()
    if (isBot) {
      return
    }
  }

  await initMapLibraries()
  await initLabels()

  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <AppContextProvider>
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
      </AppContextProvider>
    </Provider>
  )
}

main()
