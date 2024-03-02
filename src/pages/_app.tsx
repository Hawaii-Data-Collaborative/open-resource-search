import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import Script from 'next/script'

import { GlobalStyleSheet } from 'src/styles/GlobalStyleSheet/GlobalStyleSheet'
import FeedbackButton from 'src/components/modules/FeedbackButton/FeedbackButton'
import theme from 'src/constants/theme'
import PageTransition from 'src/components/modules/PageTransition/PageTransition'
import { materialUiTheme } from 'src/styles/theme'
import { store } from 'src/redux/store'
import If from '@element/If/If'
import GlobalConfig from '@module/GlobalConfig/GlobalConfig'
import isInternetExplorer from '@util/isInternetExplorer'
import { Toast } from '@module/Toast/Toast'
import { initAxios } from '@service/axios'

import '../components/modules/Result/FavoriteButton/FavoriteButton.scss'
import '../components/modules/DetailedResult/Hit/Categories/Categories.scss'
import '../components/modules/Search/Search.scss'

// Import polyfills for IE11 support
if (process.env.NODE_ENV === 'production' && process.browser && isInternetExplorer()) {
  import('core-js')
  require('es6-promise/auto')
  require('isomorphic-fetch')
  require('proxy-polyfill/proxy.min')
  const elementClosest = require('element-closest').default
  elementClosest(window)
}

initAxios()

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-GRCJFTC3LT" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-GRCJFTC3LT');
        `}
      </Script>

      <GlobalStyleSheet />

      <GlobalConfig>
        <ThemeProvider theme={materialUiTheme}>
          <Component {...pageProps} />
          <Toast />
        </ThemeProvider>
      </GlobalConfig>

      <If value={theme.FEEDBACK_URL}>
        <FeedbackButton external color="textPrimary" href={theme.FEEDBACK_URL} rel="noreferrer">
          Feedback
        </FeedbackButton>
      </If>

      <PageTransition style={{ position: 'fixed', bottom: '8px', left: '8px' }} />
    </Provider>
  )
}

export default MyApp
