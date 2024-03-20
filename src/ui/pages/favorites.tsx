import { useEffect } from 'react'
import Results from '../modules/Results/Results'
import Map from '../modules/Map/Map'
import { useAppDispatch } from '../../redux/store'
import { setZoom } from '../../redux/slices/location'
import { setResults } from '../../redux/slices/results'
import { getAppConfigValue } from '../../utils/getAppConfigValue'
import { useAuthContext, useMeta, usePageLoaded, useTitle } from '../../hooks'
import { useHistory } from 'react-router-dom'
import { SearchLayout } from '../layouts'
import { FavsContextProvider } from '../../providers'
import { link } from '../../utils'

export default function FavoritesPage() {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { user, loading } = useAuthContext()

  usePageLoaded()
  useTitle(`${getAppConfigValue('brandName')} | Profile - Favorites`)
  useMeta({ name: 'description', content: getAppConfigValue('meta.description') })

  useEffect(() => {
    if (!loading && !user) {
      dispatch(setResults([]))
      history.push({
        pathname: link('/login'),
        search: new URLSearchParams({ message: 'Please sign in to continue' }).toString()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <FavsContextProvider force>
      <SearchLayout>
        <Results hideSearch />
        <Map />
      </SearchLayout>
    </FavsContextProvider>
  )
}
