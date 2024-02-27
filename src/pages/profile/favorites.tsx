import Head from 'next/head'
import Results from '@module/Results/Results'
import Map from 'src/components/modules/Map/Map'
import { useEffect } from 'react'
import { useAppDispatch } from 'src/redux/store'
import { setZoom } from 'src/redux/slices/location'
import { setResults } from 'src/redux/slices/results'
import { useRouter } from 'next/router'
import { getAppConfigValue } from 'src/utils/getAppConfigValue'
import Search from 'src/components/layouts/Search/Search'
import useFavoritesFetch from '@hook/useFavoritesFetch'
import usePageLoaded from '@hook/usePageLoaded'
import { useAuthContext } from '@hook/index'

function Favorites() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAuthContext()

  useFavoritesFetch()
  usePageLoaded()

  useEffect(() => {
    if (!user) {
      dispatch(setResults([]))
      router.push({
        pathname: '/login',
        query: {
          message: 'Please sign in to continue'
        }
      })
    }
  }, [user])

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
  }, [])

  return (
    <Search>
      <Head>
        <title>{getAppConfigValue('brandName')} | Profile - Favorites</title>
        <meta name="description" content={getAppConfigValue('meta.description')} />
      </Head>

      <Results hideSearch />

      <Map />
    </Search>
  )
}

export default Favorites
