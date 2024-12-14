import debugInit from 'debug'
import { useEffect } from 'react'

const debug = debugInit('app:hooks:useMeta')

export function useMeta({ name, content }) {
  useEffect(() => {
    debug('name=%s content=%s', name, content)
    let meta = document.querySelector(`meta[name="${name}"]`)
    if (meta) {
      meta.setAttribute('content', content)
      debug('updated meta tag')
    } else {
      meta = document.createElement('meta')
      meta.setAttribute('name', name)
      meta.setAttribute('content', content)
      document.head.appendChild(meta)
      debug('created meta tag')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, content])
}
