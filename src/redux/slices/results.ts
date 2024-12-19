import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getAppConfigValue } from '../../utils/getAppConfigValue'
import { RootState } from '../../redux/store'
import { resultsFromApi } from '../../adapters/results'
import { favoritesFromApi } from '../../adapters/favorite'

type SearchParams = {
  q?: string
  lat?: number
  lon?: number
  radius?: string
  taxonomies?: string
  filters?: any
}

const initialState = {
  data: [],
  isLoading: true,
  error: '',
  page: 0
}

export const fetchResults = createAsyncThunk('fetchResults', async (term: string, thunk) => {
  // if (term == null) return []

  const state: RootState = thunk.getState() as RootState

  const params: SearchParams = {
    q: term
  }

  if (state.location.lat != null && state.location.lng != null) {
    params.lat = state.location.lat
    params.lon = state.location.lng
  }

  if (state.search.radius.length > 0) {
    params.radius = state.search.radius
  }

  const filtersStr = state.search.filters != null ? JSON.stringify(state.search.filters) : ''
  if (filtersStr.length > 0 && filtersStr !== '{}') {
    params.filters = encodeURIComponent(filtersStr)
  }

  const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/search`, {
    params
  })

  const rv = resultsFromApi(res.data)

  return rv
})

export const fetchResultsByTaxonomies = createAsyncThunk('fetchResultsByTaxonomies', async (terms: string, thunk) => {
  if (terms == null) return []

  const state: RootState = thunk.getState() as RootState

  const params: SearchParams = {
    taxonomies: terms
  }

  if (state.location.lat != null && state.location.lng != null) {
    params.lat = state.location.lat
    params.lon = state.location.lng
  }

  if (state.search.radius.length > 0) {
    params.radius = state.search.radius
  }

  const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/search`, {
    params
  })

  const rv = resultsFromApi(res.data)

  return rv
})

export const fetchFavorites = createAsyncThunk('fetchFavorites', async () => {
  const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/favorite`)
  return resultsFromApi(res.data)
})

export const deleteFavoriteById = createAsyncThunk('deleteFavoriteById', async (id: string) => {
  const res = await axios.delete(`${getAppConfigValue('apiUrl')}/api/v1/favorite/${id}`)

  return favoritesFromApi(res.data)
})

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload
      state.page = 0
      state.isLoading = false
    }
  },
  extraReducers: {
    [fetchResults.pending.type]: state => {
      state.isLoading = true
    },
    [fetchResults.fulfilled.type]: (state, action: PayloadAction<any[]>) => {
      state.isLoading = false
      state.data = action.payload
      state.page = 0
    },
    [fetchResults.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [fetchResultsByTaxonomies.pending.type]: state => {
      state.isLoading = true
    },
    [fetchResultsByTaxonomies.fulfilled.type]: (state, action: PayloadAction<any[]>) => {
      state.isLoading = false
      state.data = action.payload
      state.page = 0
    },
    [fetchResultsByTaxonomies.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [fetchFavorites.pending.type]: state => {
      state.isLoading = true
    },
    [fetchFavorites.fulfilled.type]: (state, action: PayloadAction<any[]>) => {
      state.isLoading = false
      state.data = action.payload
      state.page = 0
    },
    [fetchFavorites.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export const { setResults } = resultsSlice.actions

export default resultsSlice.reducer
