let goog
let geocoder: google.maps.Geocoder
const locationCache = {}

export function setGoogleInstance(g) {
  console.log('[setGoogleInstance] goog=', g)
  goog = g
  geocoder = new goog.maps.Geocoder()
}

export async function filterByRadius(results: any[], radius: number, location: string) {
  let center
  if (locationCache[location]) {
    center = locationCache[location]
  } else {
    const res = await geocoder.geocode({ address: location })
    center = res.results[0].geometry.location
    locationCache[location] = center
  }

  const rv = []
  for (const hit of results) {
    if (hit.locationLat && hit.locationLon) {
      const hitCenter = {
        lat: Number(hit.locationLat),
        lng: Number(hit.locationLon)
      }
      const distanceMeters = goog.maps.geometry.spherical.computeDistanceBetween(center, hitCenter)
      const distance = distanceMeters * 0.000621371
      if (distance <= radius) {
        rv.push(hit)
      }
    }
  }
  return rv
}
