import { AuthContext, FavsContext } from '../context'
import { useContext } from 'react'

export * from './useBannerQuery'
export * from './useCachedLocations'
export * from './useCachedTaxonomies'
export * from './useCategoriesQuery'
export * from './useFavoritesFetch'
export * from './useMeta'
export * from './usePageLoaded'
export * from './usePathTracking'
export * from './useReduxOnRouteChange'
export * from './useResultsFetch'
export * from './useSession'
export * from './useSuggestionsQuery'
export * from './useTitle'

export const useAuthContext = () => useContext(AuthContext)
export const useFavsContext = () => useContext(FavsContext)
