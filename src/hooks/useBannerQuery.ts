import { useEffect, useState } from 'react'
import axios from 'axios'
import { getAppConfigValue } from '../utils'

let _didFetch = false

export function useBannerQuery() {
  const [data, setData] = useState({ text: '', link: '' })

  useEffect(() => {
    const fn = async () => {
      // prettier-ignore
      const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/banner`);
      setData(res.data)
    }

    if (!_didFetch) {
      _didFetch = true
      fn()
    }
  }, [])

  return data
}
