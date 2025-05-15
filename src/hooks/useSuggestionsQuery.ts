import axios from 'axios'
import { useEffect, useState } from 'react'
import { getAnalyticsUserId } from '../analytics'
import { useAppSelector } from '../redux/store'

export function useSuggestionsQuery() {
  const [data, setData] = useState([])
  const searchText = useAppSelector(state => state.search.query)

  useEffect(() => {
    const fn = async () => {
      // prettier-ignore
      const res = await axios.get(`/suggestions?userId=${getAnalyticsUserId()}&searchText=${searchText}`);
      setData(res.data)
    }

    fn()
  }, [searchText])

  return data
}
