import { AlertColor } from '@mui/material'
import { toastEmitter } from './emitters'

export function toast(msg: string, severity: AlertColor | undefined) {
  toastEmitter.emit('message', msg, severity)
}

export function toastErr(err) {
  toastEmitter.emit('message', err.response?.data?.message || err.response?.data || err.message, 'error')
}
