import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'src/components/elements/Link/Link'
import Text from 'src/components/elements/Text/Text'
import Button from 'src/components/elements/Button/Button'
import Input from 'src/components/elements/Input/Input'
import Box from 'src/components/elements/Box/Box'
import Label from 'src/components/elements/Label/Label'
import theme from 'src/constants/theme'
import getTextColorContrast from 'src/utils/getTextColorContrast'
import { getAppConfigValue } from 'src/utils/getAppConfigValue'
import AuthLayout from 'src/components/layouts/Auth/Auth'
import redirect from 'src/utils/redirect'
import If from '@element/If/If'
import usePageLoaded from '@hook/usePageLoaded'
import { AUTH_TOKEN } from '@constant/index'
import localStorage from '@service/localStorage'
import { useAuthContext } from 'src/hooks'
import { toastErr } from '@service/toast'

export const getServerSideProps = context => {
  if (context.user != null) return redirect('/')

  return {
    props: {}
  }
}

function SignIn() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showResendButton, setShowResendButton] = useState(false)
  const { setUser } = useAuthContext()

  usePageLoaded()

  useEffect(() => {
    if (localStorage.get(AUTH_TOKEN)) {
      router.push(getAppConfigValue('homeUrl') || '/')
    }
  }, [])

  const signIn = async e => {
    e.preventDefault()

    try {
      const url = `${getAppConfigValue('apiUrl')}/api/v1/auth/login`
      const res = await axios.post(url, {
        email: email.trim(),
        password: password.trim()
      })
      setSaving(false)
      setUser(res.data.user)
      localStorage.set(AUTH_TOKEN, res.data.token)
      router.push('/profile')
    } catch (err) {
      toastErr(err)
      // console.log('Error signing in', err)

      // if (err.code === 'UserNotConfirmedException') {
      //   setSuccessMessage('')
      //   setErrorMessage(
      //     'Your account needs to be verified before you can login. Please check your inbox for a verification email.'
      //   )
      //   setShowResendButton(true)
      // }
    }
  }

  const resendVerificationEmail = async () => {
    try {
      // await Auth.resendSignUp(email.trim())
      setErrorMessage('')
      setShowResendButton(false)
      setSuccessMessage('Verification code sent!')
    } catch (err) {
      console.log(err)
    }
  }

  const valid = email.trim().length > 0 && password.trim().length > 4

  return (
    <AuthLayout>
      <Head>
        <title>{getAppConfigValue('brandName')} | Sign In</title>
        <meta name="description" content={getAppConfigValue('meta.description')} />
      </Head>

      <form
        onSubmit={signIn}
        style={{
          backgroundColor: '#fff',
          padding: '16px',
          width: '100%',
          maxWidth: 360,
          borderRadius: theme.BORDER_RADIUS,
          marginBottom: '16px'
        }}
      >
        <If value={successMessage.length > 0}>
          <Box
            marginBottom="8px"
            backgroundColor={theme.SUCCESS_COLOR}
            borderRadius={theme.BORDER_RADIUS}
            padding="8px"
            color={getTextColorContrast(theme.SUCCESS_COLOR)}
          >
            {successMessage}
          </Box>
        </If>

        <If value={errorMessage.length > 0}>
          <Box
            marginBottom="8px"
            backgroundColor={theme.ERROR_COLOR}
            borderRadius={theme.BORDER_RADIUS}
            padding="8px"
            color={getTextColorContrast(theme.ERROR_COLOR)}
          >
            {errorMessage}

            <If value={showResendButton}>
              <Button
                type="button"
                onClick={resendVerificationEmail}
                color="secondary"
                style={{
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  boxShadow: 'none'
                }}
              >
                Resend Verification?
              </Button>
            </If>
          </Box>
        </If>

        <If value={router.query.message != null}>
          <Box
            marginBottom="8px"
            backgroundColor={theme.SUCCESS_COLOR}
            borderRadius={theme.BORDER_RADIUS}
            padding="8px"
            color={getTextColorContrast(theme.SUCCESS_COLOR)}
          >
            {router.query.message}
          </Box>
        </If>

        <Text variant="h2" color="textSecondary" marginBottom="16px">
          Sign In
        </Text>

        <Label id="email-label" htmlFor="email" marginBottom="8px" color="textSecondary">
          Email
        </Label>
        <Input
          fullWidth
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            border: '1px solid #ebebeb',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          defaultValue={router.query.email}
          type="email"
          marginBottom="16px"
        />

        <Label id="password-label" htmlFor="password" color="textSecondary" marginBottom="8px">
          Password
        </Label>
        <Input
          fullWidth
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          marginBottom="16px"
          style={{
            border: '1px solid #ebebeb',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          type="password"
        />

        <Button type="submit" color="primary" disabled={saving || !valid} fullWidth>
          Sign In
        </Button>

        <Text textAlign="center" variant="h3" marginTop="8px">
          <Link color="primary" href="/password-reset">
            Forgot your password?
          </Link>
        </Text>
      </form>
      <Text paragraph>
        Don&apos;t have an account?{' '}
        <Link color="textPrimary" href="/signup">
          Sign Up
        </Link>
      </Text>
      <Text>
        <Link color="textPrimary" href="/">
          Back to home page
        </Link>
      </Text>
    </AuthLayout>
  )
}

export default SignIn
