import axios from 'axios'
import debugInit from 'debug'
import { useEffect, useRef, useState } from 'react'
import { Box, Chip, Typography } from '@mui/material'
import { useAppContext } from '../../../hooks'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { setFilters } from '../../../redux/slices/search'
import { getAppConfigValue, stringifyParams } from '../../../utils'
import { useHistory, useLocation } from 'react-router-dom'
import { THEME_CONSTANTS } from '../../../constants'

const debug = debugInit('app:ui:AdvancedFilters')

interface FilterOptions {
  openNow: boolean
}

export function AdvancedFilters() {
  const { showAdvancedFilters } = useAppContext()
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(null as FilterOptions)
  const appState = useAppSelector(state => state)
  const search = useAppSelector(state => state.search)
  const results = useAppSelector(state => state.results)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const location = useLocation()
  const lastUrlRef = useRef<string>('')
  const appStateRef = useRef<typeof appState>()
  appStateRef.current = appState
  const selectedFilters = search.filters

  useEffect(() => {
    const fn = async () => {
      const appState = appStateRef.current
      console.log('[onSearch]')
      if (!(appState.search.query || appState.search.taxonomies)) {
        return
      }

      const params: any = {
        q: appState.search.query
      }

      if (appState.location.lat != null && appState.location.lng != null) {
        params.lat = appState.location.lat
        params.lon = appState.location.lng
      }

      if (appState.search.radius.length > 0) {
        params.radius = appState.search.radius
      }

      const filtersStr = appState.search.filters != null ? JSON.stringify(appState.search.filters) : ''
      if (filtersStr.length > 0 && filtersStr !== '{}') {
        params.filters = encodeURIComponent(filtersStr)
      }

      // prettier-ignore
      const url = `${getAppConfigValue('apiUrl')}/api/v1/search/filters?${stringifyParams(params)}`
      if (lastUrlRef.current === url) {
        debug('skipping fetch')
        return
      }
      lastUrlRef.current = url
      debug('fetching %s', url)
      const res = await axios.get(url)
      setFilterOptions(res.data)
    }

    if (results.data.length) {
      fn()
    }
  }, [results])

  const applyFilter = async (k: string, v: any) => {
    const selectedFilters2 = { ...selectedFilters, [k]: v }
    if (v == null) {
      delete selectedFilters2[k]
    }
    dispatch(setFilters(selectedFilters2))
    const params = new URLSearchParams(location.search)
    if (params.has('filters') && JSON.stringify(selectedFilters2) === '{}') {
      params.delete('filters')
    } else if (!params.has('filters') && JSON.stringify(selectedFilters2) !== '{}') {
      params.set('filters', JSON.stringify(selectedFilters2))
    }
    history.push({ pathname: location.pathname, search: params.toString() })
  }

  return (
    <Box
      sx={{
        width: showAdvancedFilters ? '180px' : '0px',
        transition: 'width 100ms',
        backgroundColor: '#fafafa',
        padding: 1
      }}
    >
      <Box>
        <Typography variant="body2" fontSize="0.8rem" gutterBottom>
          Quick Filters
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={0.7}>
          {filterOptions?.openNow && (
            <QuickFilter
              label="Open now"
              selected={selectedFilters.openNow}
              onClick={() => applyFilter('openNow', selectedFilters.openNow ? undefined : true)}
            />
          )}
          {/* {filterOptions?.openNow && <QuickFilter label="Open now" onClick={() => applyFilter('openNow')} />}
          {filterOptions?.openNow && <QuickFilter label="Open now" onClick={() => applyFilter('openNow')} />}
          {filterOptions?.openNow && <QuickFilter label="Open now" onClick={() => applyFilter('openNow')} />} */}
        </Box>
      </Box>
    </Box>
  )
}

function QuickFilter({ label, selected, onClick }) {
  return (
    <span onClick={onClick}>
      <Chip
        label={label}
        sx={{
          outline: selected ? `1px solid ${THEME_CONSTANTS.PRIMARY_COLOR}` : undefined,
          color: selected ? THEME_CONSTANTS.PRIMARY_COLOR : undefined,
          cursor: 'pointer',
          height: 24,
          fontSize: 12,
          '&:hover': {
            backgroundColor: '#ddd'
          },
          '& .MuiChip-label': {
            paddingLeft: '10px',
            paddingRight: '10px'
          }
        }}
      />
    </span>
  )
}
