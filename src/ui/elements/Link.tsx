import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import {
  space,
  SpaceProps,
  background,
  BackgroundProps,
  borders,
  BordersProps,
  flexbox,
  layout,
  LayoutProps,
  FlexboxProps
} from 'styled-system'
import { defaultTheme } from '../../styles/theme'
import { getVariant, Variant } from './linkVariants'
import { Color } from '../../types'

interface StyledAnchorProps extends SpaceProps, BackgroundProps, BordersProps, LayoutProps, FlexboxProps {
  disabled?: boolean
  variant?: Variant
  color?: Color
  children: any
}

const StyledAnchor = styled.span<StyledAnchorProps>`
  border-radius: ${props => props.theme.shape.borderRadius};
  transition: all 0.2s ease-in-out;
  pointer-events: ${props => (props.disabled ? 'none' : 'initial')};
  color: ${props => (props.color != null ? props.theme.pallete[props.color] : props.theme.pallete['textPrimary'])};
  display: ${props => props.display || 'inline-block'};
  ${props => getVariant(props)};
  ${space};
  ${background};
  ${borders};
  ${layout};
  ${flexbox};
`

StyledAnchor.defaultProps = {
  theme: defaultTheme
}

interface LinkProps extends StyledAnchorProps {
  to: string
  rel?: string
  target?: string
  children: any
  style?: any
  onClick?: (...args: any[]) => void
}

function Link(props: LinkProps) {
  const { to, children, ...rest } = props
  return (
    <RouterLink to={to}>
      <StyledAnchor {...rest}>{children}</StyledAnchor>
    </RouterLink>
  )
}

export { Link }
export default Link
