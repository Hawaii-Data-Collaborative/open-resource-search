import { useEffect } from 'react'
import { useAppDispatch } from '../../redux/store'
import { setResults } from '../../redux/slices/results'
import { getAppConfigValue } from '../../utils/getAppConfigValue'
import { Providers } from '../../providers'
import { SearchLayout } from '../layouts'
import { useMeta, useResultsFetch, useTitle } from '../../hooks'
import Results from '../modules/Results/Results'
import Map from '../modules/Map/Map'

export default function Search() {
  return (
    <Providers>
      <SearchInner />
    </Providers>
  )
}

function SearchInner() {
  const dispatch = useAppDispatch()

  useTitle(`${getAppConfigValue('brandName')} | Search`)
  useMeta({ name: 'description', content: '' })

  useResultsFetch()

  useEffect(() => {
    dispatch(setResults([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SearchLayout>
      <Results hideSearch={false} />
      <Map />
    </SearchLayout>
  )
}
