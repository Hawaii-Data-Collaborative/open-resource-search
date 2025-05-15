import axios from 'axios'
import { useState } from 'react'
import { getAppConfigValue, getUserErrorMessage, link } from '../../utils'
import { usePageLoaded, useTitle, useMeta } from '../../hooks'
import { Box, Button, Flex, If, Input, Label, Link, Text } from '../elements'
import { localStorage, toast } from '../../services'
import { AUTH_TOKEN } from '../../constants'

export default function PasswordReset() {
  const [errorMessage, setErrorMessage] = useState('')
  const [step, setStep] = useState<'ENTER_EMAIL' | 'ENTER_CODE' | 'ENTER_PASSWORD'>('ENTER_EMAIL')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')
  const [saving, setSaving] = useState(false)

  usePageLoaded()
  useTitle(`${getAppConfigValue('brandName')} | Sign In`)
  useMeta({ name: 'description', content: getAppConfigValue('meta.description') })

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setSaving(true)
      if (step === 'ENTER_EMAIL') {
        const url = `/auth/send-code`
        const res = await axios.post(url, { email: email.trim() })
        setSaving(false)
        setToken(res.data)
        setStep('ENTER_CODE')
      } else if (step === 'ENTER_CODE') {
        const url = `/auth/check-code`
        await axios.post(url, { code: code.trim(), token })
        setSaving(false)
        setStep('ENTER_PASSWORD')
      } else if (step === 'ENTER_PASSWORD') {
        const url = `/auth/reset-password`
        const res = await axios.post(url, { password, token })
        localStorage.set(AUTH_TOKEN, res.data.token)
        toast('Your password was updated', 'success')
        setTimeout(() => {
          window.location = link('/')
        }, 2000)
      }
      setErrorMessage('')
    } catch (err) {
      setSaving(false)
      setMessage('')
      setErrorMessage(getUserErrorMessage(err) || '')
    }
  }

  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh" flexDirection="column">
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          padding: '16px',
          width: '100%',
          maxWidth: 360,
          borderRadius: 6,
          marginBottom: '16px'
        }}
      >
        <If value={message.length > 0}>
          <Box marginBottom="8px" backgroundColor="#3faa4b" borderRadius="6px" padding="8px">
            {message}
          </Box>
        </If>

        <If value={errorMessage.length > 0}>
          <Box marginBottom="8px" backgroundColor="#DA291C" color="#fff" borderRadius="6px" padding="8px">
            {errorMessage}
          </Box>
        </If>

        <If value={step === 'ENTER_EMAIL'}>
          <Text variant="h2" color="textSecondary" marginBottom="16px">
            Password Reset
          </Text>
          <Label id="email-label" htmlFor="email" marginBottom="8px" color="textSecondary">
            Email
          </Label>
          <Input
            fullWidth
            id="email"
            style={{
              border: '1px solid #ebebeb',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            placeholder="johndoe@example.com"
            type="email"
            marginBottom="16px"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button type="submit" color="primary" disabled={saving || email.trim().length < 3}>
            Send Code
          </Button>
        </If>

        <If value={step === 'ENTER_CODE'}>
          <Text variant="h2" color="textSecondary" marginBottom="16px">
            Enter six digit code sent to your email
          </Text>
          <Label id="email-label" htmlFor="email" marginBottom="8px" color="textSecondary">
            Code
          </Label>
          <Input
            fullWidth
            id="code"
            style={{
              border: '1px solid #ebebeb',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            placeholder="000000"
            type="text"
            marginBottom="16px"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <Button type="submit" color="primary" disabled={saving || code.length !== 6}>
            Verify Code
          </Button>
        </If>

        <If value={step === 'ENTER_PASSWORD'}>
          <Text variant="h2" color="textSecondary" marginBottom="16px">
            Change Password
          </Text>
          <Label id="password-label" htmlFor="password" marginBottom="8px" color="textSecondary">
            New Password
          </Label>
          <Input
            fullWidth
            id="password"
            style={{
              border: '1px solid #ebebeb',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            type="password"
            marginBottom="16px"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Label id="password2-label" htmlFor="password2" color="textSecondary" marginBottom="8px">
            Confirm Password
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

          <Button type="submit" color="primary" disabled={saving || password.length < 6 || password !== password2}>
            Change Password
          </Button>
        </If>
      </form>

      <Text paragraph>
        Want to sign in?{' '}
        <Link color="textPrimary" to="/login">
          Log In
        </Link>
      </Text>
      <Text>
        <Link color="textPrimary" to={link('/')}>
          Back to home page
        </Link>
      </Text>
    </Flex>
  )
}
