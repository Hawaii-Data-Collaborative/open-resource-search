import { useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { getAppConfigValue, link } from '../../utils'
import { usePageLoaded, useTitle, useMeta } from '../../hooks'
import { Box, Button, Flex, If, Input, Label, Link, Text } from '../elements'

export default function PasswordReset() {
  const params = new URLSearchParams(useLocation().search)
  const username = useRef<HTMLInputElement>()
  const newPassword = useRef<HTMLInputElement>()
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')
  const history = useHistory()

  usePageLoaded()
  useTitle(`${getAppConfigValue('brandName')} | Sign In`)
  useMeta({ name: 'description', content: getAppConfigValue('meta.description') })

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      if (params.get('confirmation_code') != null && params.get('user_name') != null) {
        // await Auth.forgotPasswordSubmit(params.get('user_name'), params.get('confirmation_code'), newPassword?.current?.value ?? '')
        history.push(link('/login?message=Password%20saved.%20Sign%20in%20with%20your%20new%20password.'))
      } else {
        // await Auth.forgotPassword(username?.current?.value ?? '')
        setMessage(
          'If an account exists with this email address, you will be receiving a confirmation link to your inbox.'
        )
      }
    } catch (err) {
      setMessage('')
      setErrorMessage(err?.message ?? '')
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

        <If value={params.get('confirmation_code') != null && params.get('user_name') != null}>
          <Text variant="h2" color="textSecondary" marginBottom="16px">
            Change Password
          </Text>
          <Label id="password-label" htmlFor="password" marginBottom="8px" color="textSecondary">
            New Password
          </Label>
          <Input
            fullWidth
            ref={newPassword}
            id="password"
            style={{
              border: '1px solid #ebebeb',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            placeholder="NewSuperSecretPassword"
            type="password"
            marginBottom="16px"
          />
          <Button type="submit" color="primary">
            Change Password
          </Button>
        </If>

        <If value={params.get('confirmation_code') == null && params.get('user_name') == null}>
          <Text variant="h2" color="textSecondary" marginBottom="16px">
            Password Reset
          </Text>
          <Label id="email-label" htmlFor="email" marginBottom="8px" color="textSecondary">
            Email
          </Label>
          <Input
            fullWidth
            ref={username}
            id="email"
            style={{
              border: '1px solid #ebebeb',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            placeholder="johndoe@example.com"
            type="email"
            marginBottom="16px"
          />
          <Button type="submit" color="primary">
            Send Code
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
