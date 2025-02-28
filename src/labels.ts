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

async function fetchLabels() {
  const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/labels`)
  labels = res.data
  debug('got %s labels', Object.keys(labels).length)
}

fetchLabels()
