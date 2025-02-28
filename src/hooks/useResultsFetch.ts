import debugInit from 'debug'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../redux/store'
import { fetchResults, fetchResultsByTaxonomies } from '../redux/slices/results'
import { fetchLocation } from '../redux/slices/location'
import { logEvent } from '../analytics'

const debug = debugInit('app:hooks:useResultsFetch')

export function useResultsFetch() {
  const dispatch = useAppDispatch()
  const l = useLocation()
  const params = new URLSearchParams(l.search)
  const location = params.get('location')
  const taxonomies = params.get('taxonomies')
  const terms = params.get('terms')
  const category_name = params.get('category_name')
  const radius = params.get('radius')
  const filters = params.get('filters')

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async function () {
      debug('calling fetchLocation')
      if (location != null && location.length > 0) {
        await dispatch(fetchLocation({ location }) as any)
      } else {
        await dispatch(fetchLocation({ location: null }) as any)
      }

      if (taxonomies != null && taxonomies.length > 0) {
        debug('calling fetchResultsByTaxonomies')
        // fetch by taxonomies
        await dispatch(fetchResultsByTaxonomies(taxonomies) as any)
      } else {
        debug('calling fetchResults')
        await dispatch(fetchResults(terms) as any)
      }

      const paramsObj: any = {}
      for (const [k, v] of params.entries()) {
        paramsObj[k] = v
      }

      if (category_name) {
        logEvent('Search.Category', paramsObj)
      } else if (taxonomies?.length) {
        logEvent('Search.Taxonomy', paramsObj)
      } else if (terms?.length) {
        logEvent('Search.Keyword', paramsObj)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, terms, taxonomies, radius, category_name, filters, dispatch])
}
