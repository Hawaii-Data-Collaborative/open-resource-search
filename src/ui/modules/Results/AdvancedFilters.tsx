import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { useAppContext } from '../../../hooks'
import { useAppSelector } from '../../../redux/store'
import { getAppConfigValue } from '../../../utils'

export function AdvancedFilters() {
  const { showAdvancedFilters } = useAppContext()
  const [filters, setFilters] = useState<any[]>([])
  const search = useAppSelector(state => state.search)
  const results = useAppSelector(state => state.results)
  const searchRef = useRef<any>()
  searchRef.current = search

  useEffect(() => {
    const fn = async () => {
      const params = searchRef.current
      console.log('[onSearch] params=%o', params)
      if (!(params.query || params.taxonomies)) {
        return
      }
      // prettier-ignore
      const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/search/filters`, { params })
      setFilters(res.data)
    }

    if (results.data.length) {
      fn()
    }
  }, [results.data])

  return <Box sx={{ width: showAdvancedFilters ? '180px' : '0px', transition: 'width 100ms' }}>AdvancedFilters</Box>
}
