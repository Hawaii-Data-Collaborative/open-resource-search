import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import { defaultTheme } from '../../styles/theme'
import { getTextColorContrast } from '../../utils'
import { Color } from '../../types'

interface IButtonProps extends SpaceProps {
  color?: Color | 'gray'
  noPrint?: boolean
  noShadows?: boolean
  fullWidth?: boolean
}

export const Button = styled.button<IButtonProps>`
  align-items: center;
  background-color: ${props => (props.color === 'gray' ? 'rgb(247, 245, 249)' : props.theme.pallete[props.color])};
  border-radius: ${props => props.theme.shape.borderRadius};
  box-shadow: ${props => (props.noShadows ? 'none' : '0 0 8px #d0c9d6')};
  color: ${props =>
    props.color === 'gray' ? 'rgb(0, 81, 145)' : getTextColorContrast(props.theme.pallete[props.color])};
  border: none;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 0.9375rem;
  padding: 8px 16px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.5' : '1')};
  white-space: nowrap;
  transition: all 0.2s ease-in-out;
  width: ${props => (props.fullWidth ? '100%' : 'initial')};
  ${space};

  &:hover:not(:disabled) {
    background-color: ${props =>
      props.color === 'gray' ? 'rgb(0, 81, 145)' : props.theme.pallete[props.color + 'Medium']};
    color: ${props =>
      props.color === 'gray' ? '#fff' : getTextColorContrast(props.theme.pallete[props.color + 'Medium'])};
  }

  ${props =>
    props.noPrint &&
    `
        @media print {
            display: none;
        }
    `}
`

Button.defaultProps = {
  theme: defaultTheme,
  color: 'primary'
}

export default Button
