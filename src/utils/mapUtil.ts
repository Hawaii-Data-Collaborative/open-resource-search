import axios from 'axios';
import { getAppConfigValue } from './getAppConfigValue';

let google;
const locationCache = {};
const apiKey = getAppConfigValue('services.map.google.apiKey');
const urlTemplate = `https://maps.googleapis.com/maps/api/geocode/json?address={{address}}&key=${apiKey}`;

export function setGoogleInstance(g) {
  google = g;
}

export async function filterByRadius(
  results: any[],
  radius: number,
  location: string
) {
  let center;
  if (locationCache[location]) {
    center = locationCache[location];
  } else {
    const url = urlTemplate.replace('{{address}}', location.trim());
    const res = await axios.get(url);
    center = res.data.results[0].geometry.location;
    locationCache[location] = center;
  }

  const rv = [];
  for (const hit of results) {
    if (hit.locationLat && hit.locationLon) {
      const hitCenter = {
        lat: Number(hit.locationLat),
        lng: Number(hit.locationLon),
      };
      const distanceMeters = google.maps.geometry.spherical.computeDistanceBetween(
        center,
        hitCenter
      );
      const distance = distanceMeters * 0.000621371;
      if (distance <= radius) {
        rv.push(hit);
      }
    }
  }
  return rv;
}
