import { useEffect } from 'react'
import { useAppDispatch } from '../redux/store'
import { fetchFavorites } from '../redux/slices/results'

export function useFavoritesFetch() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    ;(async function () {
      await dispatch(fetchFavorites() as any)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
