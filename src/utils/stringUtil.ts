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
  const IS_BETA = process.env.NEXT_PUBLIC_DEPLOYMENT_TARGET === 'beta'
  return IS_BETA ? '/auw211' + url : url
}
