import axios from 'axios'
import debugInit from 'debug'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getAppConfigValue } from '../../utils/getAppConfigValue'
import { RootState } from '../../redux/store'
import { favoritesFromApi } from '../../adapters/favorite'

const debug = debugInit('app:redux:results')

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
  debug('[fetchResults] term=%s', term)
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

  debug('[fetchResults] making api call...')
  const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/search`, {
    params
  })
  debug('[fetchResults] ...done')

  const rv = res.data
  return rv
})

export const fetchResultsByTaxonomies = createAsyncThunk('fetchResultsByTaxonomies', async (terms: string, thunk) => {
  debug('[fetchResultsByTaxonomies] terms=%s', terms)

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

  const filtersStr = state.search.filters != null ? JSON.stringify(state.search.filters) : ''
  if (filtersStr.length > 0 && filtersStr !== '{}') {
    params.filters = encodeURIComponent(filtersStr)
  }

  debug('[fetchResultsByTaxonomies] making api call...')
  const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/search`, {
    params
  })
  debug('[fetchResultsByTaxonomies] ...done')

  const rv = res.data
  return rv
})

export const fetchFavorites = createAsyncThunk('fetchFavorites', async () => {
  const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/favorite`)
  const rv = res.data
  return rv
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
