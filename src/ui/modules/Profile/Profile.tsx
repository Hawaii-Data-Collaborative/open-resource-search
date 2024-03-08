import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { AUTH_TOKEN } from '../../../constants'
import Box from '../../elements/Box'
import Button from '../../elements/Button'
import { useAuthContext } from '../../../hooks'
import { localStorage } from '../../../services'
import { getAppConfigValue, link } from '../../../utils'

function Profile() {
  const history = useHistory()
  const { user } = useAuthContext()
  const [message, setMessage] = useState<string>(null)

  useEffect(() => {
    if (!localStorage.get(AUTH_TOKEN)) {
      history.push({
        pathname: '/login'
        // query: {
        //   message: 'Please sign in to continue',
        // },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = () => {
    localStorage.remove(AUTH_TOKEN)
    // @ts-expect-error it's fine
    window.location = link('/')
  }

  const deleteAccount = async () => {
    if (confirm('Are you sure?')) {
      const url = `${getAppConfigValue('apiUrl')}/api/v1/auth/delete-account`
      const res = await axios.post(url)
      if (res.data?.message) {
        setMessage(res.data.message)
      }
    }
  }

  return (
    <Box paddingTop={4} paddingRight={3} paddingBottom={6} paddingLeft={3} backgroundColor="#fff">
      <Box maxWidth={500} margin="auto" textAlign="center">
        <AccountCircle color="disabled" style={{ fontSize: 110 }} />
        {message ? (
          <Box>{message}</Box>
        ) : user ? (
          <>
            <Box>{user.email}</Box>
            <Box paddingTop={3}>
              <Button color="primary" style={{ display: 'inline-flex' }} onClick={logout}>
                Log out
              </Button>
            </Box>
            <Box paddingTop={4}>
              <Button color="secondary" style={{ display: 'inline-flex' }} onClick={deleteAccount}>
                Delete account
              </Button>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  )
}

export default Profile
