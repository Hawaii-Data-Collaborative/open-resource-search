import axios from 'axios'
import { useEffect, useState } from 'react'
import { AuthContext } from '../context'
import { AUTH_TOKEN } from '../constants/index'
import { localStorage } from '../services'
import { getAppConfigValue } from '../utils/getAppConfigValue'

let _user
const emptyFn = () => {}

export function AuthContextProvider({ children }) {
  const [value, setValue] = useState<any>({ user: _user, setUser: emptyFn, loading: true })

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

      setValue({
        loading: false,
        user,
        setUser: user => {
          _user = user
          setValue(value => ({ ...value, user }))
        }
      })
    }
    fn()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
