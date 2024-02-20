import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from '@context'
import { AUTH_TOKEN } from '@constant/index'
import localStorage from '@service/localStorage'
import { getAppConfigValue } from '@util/getAppConfigValue'

export function AuthContextProvider({ children }) {
  const [value, setValue] = useState<any>({})

  const setUser = useMemo(
    // @ts-expect-error it's fine
    user => {
      setValue(value => ({ ...value, user }))
    },
    [setValue]
  )

  useEffect(() => {
    const fn = async () => {
      const token = localStorage.get(AUTH_TOKEN)
      let user = null
      if (token) {
        try {
          // prettier-ignore
          const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/auth/session`);
          user = res.data.user
        } catch (err) {
          console.error(err)
          console.log('removing auth token from storage')
          localStorage.remove(AUTH_TOKEN)
        }
      }
      setValue({ user, setUser })
    }
    fn()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
