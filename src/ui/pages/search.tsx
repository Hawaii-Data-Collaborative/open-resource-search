import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/store'
import { setResults } from '../../redux/slices/results'
import { getAppConfigValue } from '../../utils/getAppConfigValue'
import { SearchLayout } from '../layouts'
import { useMeta, useResultsFetch, useTitle } from '../../hooks'
import Results from '../modules/Results/Results'
import Map from '../modules/Map/Map'
import { FavsContextProvider } from '../../providers'
import { setLocation } from '../../redux/slices/search'
import { sessionStorage } from '../../services'

export default function SearchPage() {
  const dispatch = useAppDispatch()

  useTitle(`${getAppConfigValue('brandName')} | Search`)
  useMeta({ name: 'description', content: '' })

  useResultsFetch()

  useEffect(() => {
    dispatch(setResults([]))

    if (sessionStorage.has('lastLocation')) {
      dispatch(setLocation(sessionStorage.get('lastLocation')))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FavsContextProvider>
      <SearchLayout>
        <Results hideSearch={false} />
        <Map />
      </SearchLayout>
    </FavsContextProvider>
  )
}
