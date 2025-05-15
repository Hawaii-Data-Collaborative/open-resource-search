import axios from 'axios'

const CLOUDFLARE_PUBLIC_KEY = '0x4AAAAAAA9NIp2zk_Ht0wtv'

export async function checkForBot() {
  await loadScriptTag()
  return await runCheck()
}

async function loadScriptTag() {
  const script = document.createElement('script')
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
  script.async = false
  document.body.appendChild(script)

  await new Promise<void>((resolve, reject) => {
    let count = 1
    const intervalId = setInterval(() => {
      // try for 10 seconds
      if (count > 20) {
        return reject(new Error('Timeout'))
      }
      count++
      // @ts-expect-error it's fine
      if (window.turnstile) {
        resolve()
        clearInterval(intervalId)
      }
    }, 500)
  })
}

async function runCheck() {
  let isBot = false
  await new Promise<void>(resolve => {
    // @ts-expect-error it's fine
    const turnstile = window.turnstile
    turnstile.ready(function () {
      const div = document.createElement('div')
      div.id = 'botcheck-container'
      div.style.position = 'absolute'
      div.style.top = '50%'
      div.style.left = '50%'
      div.style.transform = 'translate(-50%, -50%)'
      document.body.appendChild(div)
      turnstile.render('#botcheck-container', {
        sitekey: CLOUDFLARE_PUBLIC_KEY,
        callback: async token => {
          console.log(`Challenge Success ${token}`)
          const url = '/auth/verify-token'
          await axios.post(url, { token })
          localStorage.setItem('didPassBotCheck', '1')
          document.body.removeChild(div)
          resolve()
        },
        'error-callback': (errorCode: string) => {
          console.error(`Turnstile errorCode=${errorCode}`)
          const passthroughPrefixes = '105'.split(',')
          const passthroughCodes = '110100,110110,110200,110500,400020'.split(',')
          const passthrough =
            passthroughPrefixes.some(prefix => errorCode.startsWith(prefix)) ||
            passthroughCodes.some(c => errorCode === c)
          if (!passthrough) {
            isBot = true
          }
          resolve()
        }
      })
    })
  })
  return isBot
}
