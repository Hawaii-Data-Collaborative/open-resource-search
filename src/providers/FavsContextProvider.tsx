import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { FavsContext } from '../context'
import { getAppConfigValue } from '../utils/getAppConfigValue'
import { useAuthContext } from '../hooks/index'
import { useAppDispatch } from '../redux/store'
import { setResults } from '../redux/slices/results'
import { resultsFromApi } from '../adapters/results'

interface Props {
  force?: boolean
  children: any
}

let _favorites = []
let _spids = []

export function FavsContextProvider({ force, children }: Props) {
  const dispatch = useAppDispatch()
  const { user } = useAuthContext()
  const [favorites, setFavorites] = useState(_favorites)
  const [spids, setSpids] = useState(_spids)

  useEffect(() => {
    const fn = async () => {
      const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/favorite`)
      _favorites = resultsFromApi(res.data)
      setFavorites(_favorites)
      if (force) {
        dispatch(setResults(_favorites))
      }

      const res2 = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/favorite/spids`)
      setSpids(res2.data)
      _spids = res2.data
    }

    if (user && (!favorites?.length || force)) {
      fn()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const value = useMemo(() => {
    const spidMap = {}
    for (const id of spids) {
      spidMap[id] = true
    }

    const addFavorite = async (id: string) => {
      await axios.post(`${getAppConfigValue('apiUrl')}/api/v1/favorite`, { id })
      setSpids([...spids, id])
    }

    const deleteFavorite = async (id: string) => {
      await axios.delete(`${getAppConfigValue('apiUrl')}/api/v1/favorite/${id}`)
      setSpids(spids.filter(id2 => id2 !== id))
    }

    return {
      favorites,
      setFavorites,
      spidMap,
      addFavorite,
      deleteFavorite
    }
  }, [favorites, setFavorites, spids, setSpids])

  return <FavsContext.Provider value={value}>{children}</FavsContext.Provider>
}
