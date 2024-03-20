import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../redux/store'
import { fetchResults, fetchResultsByTaxonomies } from '../redux/slices/results'
import { fetchLocation } from '../redux/slices/location'
import { logEvent } from '../analytics'

export function useResultsFetch() {
  const dispatch = useAppDispatch()
  const l = useLocation()
  const params = new URLSearchParams(l.search)
  const location = params.get('location')
  const taxonomies = params.get('taxonomies')
  const terms = params.get('terms')
  const category_name = params.get('category_name')
  const radius = params.get('radius')
  let query
  try {
    query = JSON.parse(params.get('query'))
  } catch {
    // no op
  }

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async function () {
      if (location != null && location.length > 0) {
        await dispatch(
          fetchLocation({
            location: location as string
          }) as any
        )
      } else {
        await dispatch(fetchLocation({ location: null }) as any)
      }

      if (taxonomies != null && taxonomies.length > 0) {
        // fetch by taxonomies
        await dispatch(fetchResultsByTaxonomies(taxonomies) as any)
      } else {
        await dispatch(fetchResults(terms) as any)
      }

      if (query && JSON.stringify(query) !== '{}') {
        if (category_name) {
          logEvent('Search.Category', query)
        } else if (taxonomies?.length) {
          logEvent('Search.Taxonomy', query)
        } else {
          logEvent('Search.Keyword', query)
        }
      }
    })()
  }, [location, terms, taxonomies, radius, query, category_name, dispatch])
}
