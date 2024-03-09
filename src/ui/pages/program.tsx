import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAppDispatch } from '../../redux/store'
import { fetchLocation, setCenter, setZoom } from '../../redux/slices/location'
import { sessionStorage } from '../../services'
import { setResults } from '../../redux/slices/results'
import SingleResult from '../modules/DetailedResult/SingleResult'
import Map from '../modules/Map/Map'
import { getAppConfigValue } from '../../utils'
import { useMeta, usePageLoaded, useTitle } from '../../hooks'
import { SearchLayout } from '../layouts'
import { If } from '../elements'
import { FavsContextProvider } from '../../providers'

export default function SingleResultPage() {
  const params = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fn() {
      try {
        const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/service-at-location/${params.id}`)
        const data = res.data
        setData(data)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }
    fn()
  }, [params.id])

  if (loading) {
    return null
  }
  if (error) {
    return error.message
  }

  return (
    <FavsContextProvider>
      <SingleResultPageInner data={data} />
    </FavsContextProvider>
  )
}

function SingleResultPageInner({ data }) {
  const dispatch = useAppDispatch()

  usePageLoaded()
  useTitle(`${getAppConfigValue('brandName')} | ${data ? data.title : 'No data available for this result'}`)
  useMeta({ name: 'description', content: data ? data.description : 'No data found for this result' })

  useEffect(() => {
    ;(async function () {
      dispatch(setResults([data]))

      if (sessionStorage.has('lastLocation')) {
        await dispatch(fetchLocation({ location: sessionStorage.get('lastLocation') }) as any)
      }

      dispatch(
        setCenter({
          lat: data?.locationLat ?? getAppConfigValue('services.map.center.lat'),
          lng: data?.locationLon ?? getAppConfigValue('services.map.center.lon')
        })
      )
      dispatch(setZoom(12))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SearchLayout>
      <If value={!data}>
        <SingleResult />
      </If>

      <If value={data}>
        <SingleResult data={data} />
      </If>

      <Map />
    </SearchLayout>
  )
}
