import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { FavsContext } from '../context'
import { getAppConfigValue } from '../utils/getAppConfigValue'
import { useAuthContext } from '../hooks/index'

export function FavsContextProvider({ children }) {
  const { user } = useAuthContext()
  const [favorites, setFavorites] = useState([])
  const [spids, setSpids] = useState([])

  useEffect(() => {
    if (!user) {
      return
    }
    const fn = async () => {
      const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/favorite`)
      setFavorites(res.data)

      const res2 = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/favorite/spids`)
      setSpids(res2.data)
    }
    fn()
  }, [])

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
