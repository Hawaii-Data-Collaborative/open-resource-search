import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthContext, useMeta, usePageLoaded, useTitle } from '../../hooks'
import { getAppConfigValue, link } from '../../utils'
import { AUTH_TOKEN } from '../../constants'
import { localStorage, toastErr } from '../../services'
import { AuthLayout } from '../layouts'
import { Button, Input, Label, Link, Text } from '../elements'
import { t } from '../../labels'

export default function SignUpPage() {
  const history = useHistory()
  const [saving, setSaving] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const { setUser } = useAuthContext()

  usePageLoaded()
  useTitle(`${getAppConfigValue('brandName')} | ${t('Sign Up')}`)
  useMeta({ name: 'description', content: getAppConfigValue('meta.description') })

  const signUp = async e => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = `${getAppConfigValue('apiUrl')}/api/v1/auth/signup`
      const res = await axios.post(url, {
        email: email.trim(),
        password: password.trim()
      })
      setSaving(false)
      setUser(res.data.user)
      localStorage.set(AUTH_TOKEN, res.data.token)
      history.push(getAppConfigValue('homeUrl') || link('/'))
    } catch (err) {
      setSaving(false)
      console.log(err)
      toastErr(err)
    }
  }

  let valid: boolean
  try {
    valid = email.trim().length > 0 && password.trim().length >= 8 && password.trim() === password2.trim()
  } catch {
    valid = false
  }

  return (
    <AuthLayout>
      <form
        onSubmit={signUp}
        style={{
          backgroundColor: '#fff',
          padding: '16px',
          width: '100%',
          maxWidth: 360,
          borderRadius: 6,
          marginBottom: '16px'
        }}
      >
        <Text color="textSecondary" variant="h2" marginBottom="16px">
          {t('Sign Up')}
        </Text>

        {/* <Flex marginBottom="16px">
          <Box marginRight="4px">
            <Label
              id="email-label"
              htmlFor="first-name"
              color="textSecondary"
              marginBottom="8px"
            >
              First Name
            </Label>
            <Input
              fullWidth
              ref={firstName}
              id="first-name"
              style={{
                border: '1px solid #ebebeb',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              placeholder="John"
              type="text"
            />
          </Box>

          <Box marginLeft="4px">
            <Label
              id="last-name-label"
              htmlFor="last-name"
              marginBottom="8px"
              color="textSecondary"
            >
              Last Name
            </Label>
            <Input
              fullWidth
              ref={lastName}
              id="last-name"
              style={{
                border: '1px solid #ebebeb',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              placeholder="Doe"
              type="text"
            />
          </Box>
        </Flex> */}

        <Label id="email-label" htmlFor="email" color="textSecondary" marginBottom="8px">
          {t('Email')}
        </Label>

        <Input
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          id="email"
          placeholder="email@example.com"
          type="email"
          marginBottom="16px"
          style={{
            border: '1px solid #ebebeb',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />

        <Label id="password-label" htmlFor="password" color="textSecondary" marginBottom="8px">
          {t('Password')}
        </Label>
        <Input
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          id="password"
          type="password"
          marginBottom="16px"
          style={{
            border: '1px solid #ebebeb',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />

        <Label id="password2-label" htmlFor="password2" color="textSecondary" marginBottom="8px">
          {t('Confirm Password')}
        </Label>
        <Input
          fullWidth
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          id="password2"
          type="password"
          marginBottom="16px"
          style={{
            border: '1px solid #ebebeb',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />

        <Button type="submit" color="primary" disabled={saving || !valid} fullWidth>
          {t('Sign Up')}
        </Button>
      </form>
      <Text paragraph>
        {t('Already have an account?')}{' '}
        <Link color="textPrimary" to={link('/login')}>
          {t('Sign In')}
        </Link>
      </Text>
      <Text>
        <Link color="textPrimary" to={link('/')}>
          {t('Back to home page')}
        </Link>
      </Text>
    </AuthLayout>
  )
}
