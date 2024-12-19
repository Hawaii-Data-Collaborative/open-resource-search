import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sessionStorage } from '../../services'

const initialState = {
  query: '',
  location: '',
  taxonomies: '',
  radius: '0',
  filters: {} as any
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setDistance: (state, action: PayloadAction<string>) => {
      const radius = parseInt(action.payload)
      if (action.payload.length > 0 && isNaN(radius)) return

      state.radius = action.payload
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload
      sessionStorage.set('lastLocation', action.payload)
    },
    setTaxonomies: (state, action: PayloadAction<string>) => {
      state.taxonomies = action.payload
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload
    }
  }
})

export const { setQuery, setLocation, setTaxonomies, setDistance, setFilters } = searchSlice.actions

export default searchSlice.reducer
