import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getAppConfigValue } from '../../utils/getAppConfigValue'
import { usePageLoaded } from '../../hooks'
import { localStorage } from '../../services'
import { AUTH_TOKEN } from '../../constants/index'
import { useMeta, useTitle } from '../../hooks'
import { DefaultLayout } from '../layouts'
import Profile from '../modules/Profile/Profile'
import { link } from '../../utils'

export default function ProfilePage() {
  const history = useHistory()

  usePageLoaded()
  useTitle(`${getAppConfigValue('brandName')} | Profile`)
  useMeta({ name: 'description', content: getAppConfigValue('meta.description') })

  useEffect(() => {
    if (!localStorage.get(AUTH_TOKEN)) {
      history.push({
        pathname: link('/login'),
        search: `message=Please sign in to continue`
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DefaultLayout>
      <Profile />
    </DefaultLayout>
  )
}
