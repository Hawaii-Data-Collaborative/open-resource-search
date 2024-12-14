import { Loader } from '@googlemaps/js-api-loader'
import debugInit from 'debug'

const debug = debugInit('app:utils:mapUtil')

let initialized = false
let geocoder: google.maps.Geocoder

const locationCache = {}

export async function initMapLibraries() {
  if (initialized) return

  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: 'weekly',
    libraries: ['maps', 'geometry', 'geocoding']
  })

  await loader.importLibrary('maps')
  await loader.importLibrary('geometry')
  const { Geocoder } = await loader.importLibrary('geocoding')
  geocoder = new Geocoder()
  initialized = true
}

export async function filterByRadius(results: any[], radius: number, location: string) {
  await initMapLibraries()

  let center
  if (locationCache[location]) {
    center = locationCache[location]
  } else {
    center = await getLatLng(location)
    locationCache[location] = center
  }

  const rv = []
  for (const hit of results) {
    if (hit.locationLat && hit.locationLon) {
      const hitCenter = {
        lat: Number(hit.locationLat),
        lng: Number(hit.locationLon)
      }
      const distanceMeters = google.maps.geometry.spherical.computeDistanceBetween(center, hitCenter)
      const distance = distanceMeters * 0.000621371
      if (distance <= radius) {
        rv.push(hit)
      }
    }
  }
  return rv
}

export async function getLatLng(location: string) {
  debug('[getLatLng] location=%s', location)
  await initMapLibraries()
  const res = await geocoder.geocode({ address: location })
  return res.results[0].geometry.location.toJSON()
}
