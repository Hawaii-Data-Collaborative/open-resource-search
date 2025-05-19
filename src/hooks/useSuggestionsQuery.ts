import axios from 'axios'
import { useEffect, useState, useCallback, useMemo } from 'react'
import debounce from 'lodash.debounce'
import { getAnalyticsUserId } from '../analytics'
import { useAppSelector } from '../redux/store'

export function useSuggestionsQuery() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const searchText = useAppSelector(state => state.search.query)

  const fetchSuggestions = useCallback(
    debounce(async (text: string) => {
      try {
        setLoading(true)
        const res = await axios.get(`/suggestions?userId=${getAnalyticsUserId()}&searchText=${text}`)
        setData(res.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setData([])
        setLoading(false)
      }
    }, 500),
    []
  )

  useEffect(() => {
    if (searchText) {
      fetchSuggestions(searchText)
    } else {
      setData([])
    }

    return () => {
      fetchSuggestions.cancel()
    }
  }, [searchText, fetchSuggestions])

  return useMemo(() => ({ data, loading }), [data, loading])
}
