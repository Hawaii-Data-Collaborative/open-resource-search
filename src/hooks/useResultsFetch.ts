import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch } from 'src/redux/store'
import { fetchResults, fetchResultsByTaxonomies } from 'src/redux/slices/results'
import { fetchLocation } from 'src/redux/slices/location'
import { logEvent } from 'src/analytics'

function useResultsFetch() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    ;(async function () {
      if (router.query.location != null && router.query.location.length > 0) {
        await dispatch(
          fetchLocation({
            location: router.query.location as string
          }) as any
        )
      } else {
        await dispatch(fetchLocation({ location: null }) as any)
      }

      if (router.query.taxonomies != null && router.query.taxonomies.length > 0) {
        // fetch by taxonomies
        await dispatch(fetchResultsByTaxonomies(router.query.taxonomies as string) as any)
      } else {
        await dispatch(fetchResults(router.query.terms as string) as any)
      }

      if (JSON.stringify(router.query) !== '{}') {
        if (router.query.category_name) {
          logEvent('Search.Category', router.query)
        } else if (router.query.taxonomies?.length) {
          logEvent('Search.Taxonomy', router.query)
        } else {
          logEvent('Search.Keyword', router.query)
        }
      }
    })()
  }, [router.query.location, router.query.terms, router.query.taxonomies, router.query.radius])
}

export default useResultsFetch
