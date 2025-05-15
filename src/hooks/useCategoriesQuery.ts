import { useEffect, useState } from 'react'
import axios from 'axios'

export function useCategoriesQuery() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fn = async () => {
      // prettier-ignore
      const res = await axios.get(`/categories`);
      setData(res.data)
    }

    fn()
  }, [])

  return data
}
