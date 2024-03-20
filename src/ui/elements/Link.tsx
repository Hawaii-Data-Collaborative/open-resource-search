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

const StyledAnchor = styled.a<StyledAnchorProps>`
  border-radius: ${props => props.theme.shape.borderRadius};
  transition: all 0.2s ease-in-out;
  pointer-events: ${props => (props.disabled ? 'none' : 'initial')};
  color: ${props => (props.color != null ? props.theme.pallete[props.color] : props.theme.pallete['textPrimary'])};
  display: ${props => props.display || 'inline-block'};
  font-weight: normal;
  ${props => getVariant(props)};
  ${space};
  ${background};
  ${borders};
  ${layout};
  ${flexbox};
  &:hover {
    text-decoration: none;
  }
`

StyledAnchor.defaultProps = {
  theme: defaultTheme
}

const StyledSpan = styled.span<StyledAnchorProps>`
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

StyledSpan.defaultProps = {
  theme: defaultTheme
}

interface LinkProps extends StyledAnchorProps {
  to: string
  rel?: string
  target?: string
  children: any
  style?: any
  external?: boolean
  onClick?: (...args: any[]) => void
}

function Link(props: LinkProps) {
  const { to, external, children, ...rest } = props
  if (external) {
    return (
      <StyledAnchor href={to} {...rest}>
        {children}
      </StyledAnchor>
    )
  }

  return (
    <RouterLink to={to}>
      <StyledSpan {...rest}>{children}</StyledSpan>
    </RouterLink>
  )
}

export { Link }
export default Link
