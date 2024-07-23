import { Stack } from '@mui/material'
import { useAppContext } from '../hooks'
import { Box, Button, Modal, Text } from './elements'
import { useHistory } from 'react-router-dom'
import { link } from '../utils'

const modals = {
  LOGIN_PROMPT: LoginPrompt
}

export function Modals() {
  const { modal, setState } = useAppContext()

  const Modal = modals[modal]
  if (!Modal) {
    return null
  }

  return <Modal onClose={() => setState({ modal: null })} />
}

function LoginPrompt({ onClose }) {
  const history = useHistory()

  const login = () => {
    history.push(link('/login'))
    onClose()
  }

  const signup = () => {
    history.push(link('/signup'))
    onClose()
  }

  return (
    <Modal handleClose={onClose} open>
      <Box pt={4}>
        <Text color="textSecondary" textAlign="center">
          You must be logged in to use Favorites.
        </Text>
      </Box>
      <Stack spacing={1} pt={4}>
        <Button onClick={login} fullWidth>
          Log In
        </Button>
        <Button onClick={signup} fullWidth>
          Sign Up
        </Button>
      </Stack>
    </Modal>
  )
}
