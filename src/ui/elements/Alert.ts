import styled from 'styled-components'
import { defaultTheme } from '../../styles/theme'
import Box from './Box'
import { getTextColorContrast } from '../../utils'
import { Color } from '../../types'

interface Props {
  color: Color
}

export const Alert = styled(Box)<Props>`
  background-color: ${props => props.theme.pallete[props.color]};
  border-radius: ${props => props.theme.shape.borderRadius};
  padding: 8px;
  color: ${props => getTextColorContrast(props.theme.pallete[props.color])};
`

Alert.defaultProps = {
  theme: defaultTheme,
  color: 'primary'
}

export default Alert
