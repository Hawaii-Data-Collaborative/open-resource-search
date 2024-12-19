export function getWebsiteUrl(url: string) {
  if (!url) {
    return ''
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url
  }
  return url
}

export function link(url) {
  const IS_BETA = import.meta.env.VITE_DEPLOYMENT_TARGET === 'beta'
  return IS_BETA ? '/auw211' + url : url
}

export function getUserErrorMessage(err) {
  try {
    return err.response.data.message
  } catch {
    return err.message
  }
}

export function stringifyParams(params) {
  const search = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v != null) {
      if (typeof v === 'object') {
        search.set(k, JSON.stringify(v))
      } else {
        search.set(k, v as any)
      }
    }
  }
  return search.toString()
}
