import { toastEmitter } from './emitters'
import { Color } from '@material-ui/lab/Alert'

export function toast(msg: string, severity: Color | undefined) {
  toastEmitter.emit('message', msg, severity)
}

export function toastErr(err) {
  toastEmitter.emit('message', err.response?.data?.message || err.response?.data || err.message, 'error')
}
