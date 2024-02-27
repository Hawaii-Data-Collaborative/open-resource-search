export function getWebsiteUrl(url: string) {
  if (!url) {
    return ''
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url
  }
  return url
}

const IS_BETA = location.origin === 'https://dev.hawaiidata.org'

export function link(url) {
  return IS_BETA ? '/auw211' + url : url
}
