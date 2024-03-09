import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { THEME_CONSTANTS as theme } from '../../constants'
import { getAppConfigValue, getTextColorContrast, link } from '../../utils'
import { AuthLayout } from '../layouts'
import { usePageLoaded, useAuthContext, useTitle, useMeta } from '../../hooks'
import { AUTH_TOKEN } from '../../constants'
import { localStorage, toastErr } from '../../services'
import { Box, Button, If, Input, Label, Link, Text } from '../elements'

export default function LoginPage() {
  const history = useHistory()
  const params = new URLSearchParams(useLocation().search)
  const [saving, setSaving] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showResendButton, setShowResendButton] = useState(false)
  const { setUser } = useAuthContext()

  usePageLoaded()
  useTitle(`${getAppConfigValue('brandName')} | Sign In`)
  useMeta({ name: 'description', content: getAppConfigValue('meta.description') })

  useEffect(() => {
    if (localStorage.get(AUTH_TOKEN)) {
      history.push(getAppConfigValue('homeUrl') || link('/'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      history.push(link('/profile'))
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

        <If value={params.get('message') != null}>
          <Box
            marginBottom="8px"
            backgroundColor={theme.SUCCESS_COLOR}
            borderRadius={theme.BORDER_RADIUS}
            padding="8px"
            color={getTextColorContrast(theme.SUCCESS_COLOR)}
          >
            {params.get('message')}
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
          defaultValue={params.get('email')}
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
          <Link color="primary" to="/password-reset">
            Forgot your password?
          </Link>
        </Text>
      </form>
      <Text paragraph>
        Don&apos;t have an account?{' '}
        <Link color="textPrimary" to="/signup">
          Sign Up
        </Link>
      </Text>
      <Text>
        <Link color="textPrimary" to={link('/')}>
          Back to home page
        </Link>
      </Text>
    </AuthLayout>
  )
}
