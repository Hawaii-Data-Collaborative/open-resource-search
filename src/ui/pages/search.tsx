import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/store'
import { setResults } from '../../redux/slices/results'
import { getAppConfigValue } from '../../utils/getAppConfigValue'
import { SearchLayout } from '../layouts'
import { useMeta, useResultsFetch, useTitle } from '../../hooks'
import Results from '../modules/Results/Results'
import Map from '../modules/Map/Map'
import { FavsContextProvider } from '../../providers'

export default function SearchPage() {
  const dispatch = useAppDispatch()

  useTitle(`${getAppConfigValue('brandName')} | Search`)
  useMeta({ name: 'description', content: '' })

  useResultsFetch()

  useEffect(() => {
    dispatch(setResults([]))
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
