import { useState, useMemo } from 'react'
import GoogleMap, { InfoWindow } from 'google-maps-react'
import Text from '../../elements/Text'
import { useAppSelector } from '../../../redux/store'
import CustomMarker from './CustomMarker'
import MapContainer from './MapContainer'
import { link } from '../../../utils'
import MapStyles from './mapStyles.json'

function Map({ google }) {
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState(null)
  const location = useAppSelector(state => state.location)
  const results = useAppSelector(state => state.results.data) as any[]
  const memoizedLocation = useMemo(
    () => ({
      lat: Number(location.centerLat),
      lng: Number(location.centerLng)
    }),
    [location.centerLat, location.centerLng]
  )

  return (
    // @ts-expect-error I need to check this later. Not sure how to fix ts errors here
    <GoogleMap
      yesIWantToUseGoogleMapApiInternals
      fullscreenControl={false}
      streetViewControl={false}
      mapTypeControl={false}
      google={google}
      initialCenter={{ lat: location.centerLat, lng: location.centerLng }}
      center={memoizedLocation}
      zoom={location.zoom}
      styles={MapStyles}
      onClick={() => setShowInfoWindow(false)}
    >
      {results?.map(m => {
        const title = m.locationName || 'Address Unavailable'
        const name = m.title

        return (
          <CustomMarker
            key={m.id}
            icon={link('/pin.svg')}
            // @ts-expect-error it's fine
            phone={m.phone}
            website={m.website}
            onClick={(_props, marker) => {
              setActiveMarker(marker)
              setShowInfoWindow(true)
              document.getElementById(m.id)?.scrollIntoView({
                behavior: 'smooth'
              })
            }}
            title={title}
            name={name}
            optimized={false}
            position={{
              lat: m.locationLat,
              lng: m.locationLon
            }}
          />
        )
      })}

      {/* @ts-expect-error it's fine */}
      <InfoWindow marker={activeMarker} visible={showInfoWindow} onClose={() => setShowInfoWindow(false)}>
        <div>
          <Text fontSize={15} style={{ color: '#667', userSelect: 'initial' }}>
            {activeMarker?.name}
          </Text>
          <Text fontSize={12} style={{ color: '#667', userSelect: 'initial' }}>
            {activeMarker?.title}
          </Text>

          {/* <div style={{ display: 'flex', alignItems: 'center' }}>
            {activeMarker?.phone && (
              <Text marginRight="16px">
                <Link href={`tel:${activeMarker.phone}`} color="primary">
                  {activeMarker.phone}
                </Link>
              </Text>
            )}

            {activeMarker?.website && (
              <Text marginRight="16px">
                <Link
                  href={activeMarker.website}
                  color="primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Website
                </Link>
              </Text>
            )}

            {location.lat && location.lng && (
              <Text>
                <Link
                  href={`https://www.google.com/maps/dir/?api=1&origin=${
                    location.lat
                  },${
                    location.lng
                  }&destination=${activeMarker?.position?.lat()},${activeMarker?.position?.lng()}`}
                  color="primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Directions
                </Link>
              </Text>
            )}
          </div> */}
        </div>
      </InfoWindow>
    </GoogleMap>
  )
}

export default function CustomWrappedMap() {
  const google = window.google

  return (
    <MapContainer>
      <Map google={google} />
    </MapContainer>
  )
}
