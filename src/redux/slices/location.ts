import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { sessionStorage } from '../../services'
import { getAppConfigValue, getLatLng } from '../../utils'
import { LOCATION_CONSTANTS } from '../../constants'

const initialState = {
  lat: null,
  lng: null,
  centerLat: LOCATION_CONSTANTS.CENTER_LAT,
  centerLng: LOCATION_CONSTANTS.CENTER_LON,
  zoom: 7,
  isLoading: true,
  error: ''
}

export const fetchLocation = createAsyncThunk(
  'fetchLocation',
  async (config: { location: string | null; forceFetch?: boolean }) => {
    let payload

    if (config.location != null) {
      const locationCache = sessionStorage.get('latLonCache')
      const newCache = Object.assign({}, locationCache)

      const latLon = newCache[config.location]

      if (latLon != null) {
        // If the location was found in cache, use the cached version
        payload = {
          lat: latLon.lat,
          lng: latLon.lng,
          centerLat: latLon.lat,
          centerLng: latLon.lng,
          zoom: 10
        }
      } else {
        // Fetch the location if it's not found in cache
        const { lat, lng } = await getLatLng(config.location)

        payload = {
          lat,
          lng,
          centerLat: lat,
          centerLng: lng,
          zoom: 10
        }

        newCache[config.location] = { lat, lng }

        sessionStorage.set('latLonCache', newCache)
      }
    } else {
      // When no location is provided, set some default values for the map
      payload = {
        lat: null,
        lng: null,
        centerLat: getAppConfigValue('services.map.center.lat'),
        centerLng: getAppConfigValue('services.map.center.lon'),
        zoom: 7
      }
    }

    return payload
  }
)

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload
    },
    setLatLngZoom: (state, action: PayloadAction<{ lat: string; lng: string; zoom: number }>) => {
      state.lat = action.payload.lat
      state.lng = action.payload.lng
      state.zoom = action.payload.zoom
    },
    setCenter: (state, action: PayloadAction<{ lat: string; lng: string }>) => {
      state.centerLat = action.payload.lat
      state.centerLng = action.payload.lng
    },
    setLat: (state, action: PayloadAction<string>) => {
      state.lat = action.payload
    },
    setLng: (state, action: PayloadAction<string>) => {
      state.lng = action.payload
    }
  },
  extraReducers: {
    [fetchLocation.pending.type]: state => {
      state.isLoading = true
    },
    [fetchLocation.fulfilled.type]: (
      state,
      action: PayloadAction<{
        lat: string
        lng: string
        zoom: number
        centerLat: string
        centerLng: string
      }>
    ) => {
      state.isLoading = false
      state.lat = action.payload.lat
      state.lng = action.payload.lng
      state.zoom = action.payload.zoom || 10
      state.centerLat = action.payload.centerLat
      state.centerLng = action.payload.centerLng
    },
    [fetchLocation.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const { setZoom, setLatLngZoom, setCenter, setLat, setLng } = locationSlice.actions

export default locationSlice.reducer
