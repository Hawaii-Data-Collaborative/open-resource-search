import { useEffect } from 'react'
import Results from '../modules/Results/Results'
import Map from '../modules/Map/Map'
import { useAppDispatch } from '../../redux/store'
import { setZoom } from '../../redux/slices/location'
import { setResults } from '../../redux/slices/results'
import { getAppConfigValue } from '../../utils/getAppConfigValue'
import { Providers } from '../../providers'
import { useAuthContext, useFavoritesFetch, useMeta, usePageLoaded, useTitle } from '../../hooks'
import { useHistory } from 'react-router-dom'
import { SearchLayout } from '../layouts'

export default function Favorites() {
  return (
    <Providers>
      <FavoritesInner />
    </Providers>
  )
}

function FavoritesInner() {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { user, loading } = useAuthContext()

  useFavoritesFetch()
  usePageLoaded()
  useTitle(`${getAppConfigValue('brandName')} | Profile - Favorites`)
  useMeta({ name: 'description', content: getAppConfigValue('meta.description') })

  useEffect(() => {
    if (!loading && !user) {
      dispatch(setResults([]))
      history.push({
        pathname: '/login',
        search: new URLSearchParams({ message: 'Please sign in to continue' }).toString()
      })
    }
  }, [user, loading])

  useEffect(() => {
    ;(async function () {
      // await dispatch(
      //   fetchLocation({
      //     location: SessionStorage.get('lastLocation'),
      //     forceFetch: true
      //   })
      // )
      dispatch(setZoom(7))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SearchLayout>
      <Results hideSearch />
      <Map />
    </SearchLayout>
  )
}
