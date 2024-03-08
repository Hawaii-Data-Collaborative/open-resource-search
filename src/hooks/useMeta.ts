import { useEffect } from 'react'

const map = {}

export function useMeta(properties) {
  useEffect(() => {
    if (exists(properties)) {
      return
    }
    const meta = document.createElement('meta')
    for (const [k, v] of Object.entries(properties)) {
      meta.setAttribute(k, v as string)
    }
    map[getKey(properties)] = meta
    document.head.appendChild(meta)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

function exists(properties) {
  const key = getKey(properties)
  return !!map[key]
}

function getKey(properties) {
  return btoa(JSON.stringify(sortedClone(properties)))
}

function sortedClone(properties) {
  const keys = Object.keys(properties).sort()
  const clone = {}
  for (const k of keys) {
    clone[k] = properties[k]
  }
  return clone
}
