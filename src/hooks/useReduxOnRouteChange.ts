import debugInit from 'debug'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../redux/store'
import { setQuery, setLocation, setTaxonomies, setDistance, setFilters } from '../redux/slices/search'

const debug = debugInit('app:hooks:useReduxOnRouteChange')

export function useReduxOnRouteChange() {
  const dispatch = useAppDispatch()
  const l = useLocation()
  const params = new URLSearchParams(l.search)
  const location = params.get('location')
  const taxonomies = params.get('taxonomies')
  const radius = params.get('radius')
  const terms = params.get('terms')
  const filters = params.get('filters')

  useEffect(() => {
    if (location != null && location.length > 0) {
      dispatch(setLocation(location as string))
    }

    if (taxonomies != null && taxonomies.length > 0) {
      dispatch(setTaxonomies(taxonomies as string))
    }

    if (radius != null && radius.length > 0) {
      dispatch(setDistance(radius as string))
    }

    if (terms != null && terms.length > 0) {
      dispatch(setQuery(terms as string))
    }

    if (filters != null && filters.length > 0) {
      debug('calling setFilters')
      dispatch(setFilters(JSON.parse(filters as string)))
    }
  }, [location, terms, taxonomies, radius, filters, dispatch])
}
