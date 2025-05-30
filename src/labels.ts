import debugInit from 'debug'
import axios from 'axios'
import { getAppConfigValue } from './utils'

const debug = debugInit('app:labels')

interface Labels {
  [key: string]: string
}

let labels: Labels = {}

export function t(key: string): string {
  const value = labels[key]
  return value != null ? value : key
}

export async function initLabels() {
  const lang = localStorage.getItem('lang')
  if (lang) {
    debug('fetching labels for %s', lang)
    const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/labels?lang=${lang}`)
    labels = res.data
    debug('got %s labels', Object.keys(labels).length)
  } else {
    debug('no language selected, using default')
  }
}
