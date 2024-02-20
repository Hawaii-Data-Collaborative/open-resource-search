import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getAppConfigValue } from 'src/utils/getAppConfigValue'
import usePageLoaded from '@hook/usePageLoaded'
import Default from '@layout/Default/Default'
import localStorage from '@service/localStorage'
import { AUTH_TOKEN } from '@constant/index'
import Profile from 'src/components/modules/Profile/Profile'

function ProfilePage() {
  const router = useRouter()

  usePageLoaded()

  useEffect(() => {
    if (!localStorage.get(AUTH_TOKEN)) {
      router.push({
        pathname: '/login',
        query: {
          message: 'Please sign in to continue'
        }
      })
    }
  }, [])

  return (
    <Default>
      <Head>
        <title>{getAppConfigValue('brandName')} | Profile</title>
        <meta name="description" content={getAppConfigValue('meta.description')} />
      </Head>

      <Profile />
    </Default>
  )
}

export default ProfilePage
