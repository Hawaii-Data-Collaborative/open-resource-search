import { Box } from '@material-ui/core'
import Alert, { Color } from '@material-ui/lab/Alert'
import { toastEmitter } from '@service/emitters'
import { useEffect, useState } from 'react'

interface IState {
  message: string
  severity: Color
}

export function Toast() {
  const [state, setState] = useState<IState>({ message: '', severity: null })

  useEffect(() => {
    toastEmitter.on('message', (message: string, severity: Color) => {
      setState({ message, severity })
      setTimeout(() => {
        setState({ message: '', severity: null })
      }, 2000)
    })
  })

  if (!state.message) {
    return null
  }

  return (
    <Box style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)' }}>
      <Alert elevation={2} severity={state.severity || 'info'}>
        {state.message}
      </Alert>
    </Box>
  )
}
