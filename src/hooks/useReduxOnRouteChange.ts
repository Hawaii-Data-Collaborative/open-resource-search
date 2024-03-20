import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../redux/store'
import { setQuery, setLocation, setTaxonomies, setDistance } from '../redux/slices/search'

export function useReduxOnRouteChange() {
  const dispatch = useAppDispatch()
  const l = useLocation()
  const params = new URLSearchParams(l.search)
  const location = params.get('params')
  const taxonomies = params.get('taxonomies')
  const radius = params.get('radius')
  const terms = params.get('terms')

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

    if (taxonomies == null || taxonomies.length === 0) {
      dispatch(setTaxonomies(''))
    }

    if (terms != null && terms.length > 0) {
      dispatch(setQuery(terms as string))
    }
  }, [location, terms, taxonomies, radius, dispatch])
}
