import axios from 'axios'
import debugInit from 'debug'
import { useEffect, useRef, useState } from 'react'
import { Box, Button, Checkbox, Chip, FormControlLabel, Stack, Typography } from '@mui/material'
import { useAppContext } from '../../../hooks'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { setFilters } from '../../../redux/slices/search'
import { getAppConfigValue, stringifyParams } from '../../../utils'
import { useHistory, useLocation } from 'react-router-dom'
import { THEME_CONSTANTS } from '../../../constants'
import { Flex } from '../../elements'

const debug = debugInit('app:ui:AdvancedFilters')

interface Facets {
  openNow: boolean
  groups: {
    name: string
    items: {
      name: string
    }[]
  }[]
}

export function AdvancedFilters() {
  const { showAdvancedFilters } = useAppContext()
  const [facets, setFacets] = useState<Facets>(null as Facets)
  const [loading, setLoading] = useState(false)
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

  debug('rendering, selectedFilters=%j', selectedFilters)

  useEffect(() => {
    const fn = async () => {
      const appState = appStateRef.current
      // debug('[useEffect][results] selectedFilters=%j', selectedFilters)
      // prettier-ignore
      if (!(appState.search.query || appState.search.taxonomies || (appState.search.location && appState.search.radius))) {
        debug('[useEffect][results] no form input, returning')
        return
      }

      const params: any = {}

      if (appState.search.taxonomies?.length > 0) {
        params.taxonomies = appState.search.taxonomies.trim()
      } else if (typeof appState.search.query === 'string' && appState.search.query.trim().length > 0) {
        params.q = appState.search.query.trim()
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
      const url = `${getAppConfigValue('apiUrl')}/api/v1/search/facets?${stringifyParams(params)}`
      if (lastUrlRef.current === url) {
        debug('skipping fetch')
        return
      }
      lastUrlRef.current = url
      debug('fetching %s', url)
      setLoading(true)
      try {
        const res = await axios.get(url)
        debug('got facets %j', res.data)
        setFacets(res.data)
        setLoading(false)
        // dispatch(setFilters({}))
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    if (results.data.length) {
      fn()
    }
  }, [results])

  const applyFilter = async (name: string) => {
    const selectedFilters2 = { ...selectedFilters }
    if (selectedFilters2[name]) {
      delete selectedFilters2[name]
    } else {
      selectedFilters2[name] = true
    }

    debug('[applyFilter] calling setFilters %j', selectedFilters2)
    dispatch(setFilters(selectedFilters2))

    setTimeout(() => {
      const params = new URLSearchParams(location.search)
      if (params.has('filters') && JSON.stringify(selectedFilters2) === '{}') {
        params.delete('filters')
      } else if (JSON.stringify(selectedFilters2) !== '{}') {
        params.set('filters', JSON.stringify(selectedFilters2))
      }

      debug('[applyFilter] calling history.push')
      history.push({ pathname: location.pathname, search: params.toString() })
    }, 250)
  }

  const toggleQuickFilter = async (k: string, v: any) => {
    const selectedFilters2 = { ...selectedFilters, [k]: v }
    if (v == null) {
      delete selectedFilters2[k]
    }

    debug('[toggleQuickFilter] calling setFilters %j', selectedFilters2)
    dispatch(setFilters(selectedFilters2))

    setTimeout(() => {
      const params = new URLSearchParams(location.search)
      if (params.has('filters') && JSON.stringify(selectedFilters2) === '{}') {
        params.delete('filters')
      } else if (JSON.stringify(selectedFilters2) !== '{}') {
        params.set('filters', JSON.stringify(selectedFilters2))
      }

      debug('[toggleQuickFilter] calling history.push')
      history.push({ pathname: location.pathname, search: params.toString() })
    }, 250)
  }

  const clearFilters = () => {
    dispatch(setFilters({}))
    const params = new URLSearchParams(location.search)
    params.delete('filters')
    history.push({ pathname: location.pathname, search: params.toString() })
  }

  return (
    <Box
      sx={{
        width: showAdvancedFilters ? '180px' : '0px',
        transition: 'width 100ms',
        backgroundColor: '#fafafa',
        position: 'relative'
      }}
    >
      <Box sx={{ padding: 1, paddingBottom: '50px', height: 'calc(100vh - 88px)', overflowY: 'auto' }}>
        <Flex alignItems="center" justifyContent="space-between">
          <Typography variant="body2" fontSize="0.8rem">
            Filters
          </Typography>
          <Button
            size="small"
            onClick={() => clearFilters()}
            disabled={selectedFilters == null || JSON.stringify(selectedFilters) === '{}'}
            sx={{ fontSize: '11px', padding: '2px 8px', minWidth: 'auto' }}
          >
            Clear
          </Button>
        </Flex>
        <Box display="flex" flexWrap="wrap" gap={0.7} pt={1} pb={1}>
          {facets?.openNow && (
            <QuickFilter
              label="Open now"
              selected={selectedFilters.openNow}
              onClick={() => toggleQuickFilter('openNow', selectedFilters.openNow ? undefined : true)}
            />
          )}
        </Box>

        {facets?.groups?.map((g, i) => (
          <Box key={i} pt={1}>
            <Typography variant="body2" fontSize="0.8rem" pb={1}>
              {g.name}
            </Typography>
            <Box>
              {g.items.map((item, j) => (
                <Stack key={j} direction="row" alignItems="center" pl={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={selectedFilters[`${g.name}.${item.name}`] ?? false}
                        onChange={() => applyFilter(`${g.name}.${item.name}`)}
                        sx={{
                          padding: '2px',
                          '& .MuiSvgIcon-root': { fill: 'rgb(0, 81, 145)' }
                        }}
                      />
                    }
                    label={item.name}
                    sx={{
                      '& .MuiFormControlLabel-label': { fontSize: '0.75rem', lineHeight: 1.1 }
                    }}
                  />
                </Stack>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#fffa',
            fontSize: '0.75rem',
            padding: 1,
            paddingTop: '10px',
            textAlign: 'center'
          }}
        >
          Loading...
        </Box>
      )}
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
