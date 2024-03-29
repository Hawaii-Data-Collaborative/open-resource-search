import { HTMLAttributes } from 'react'
import styled from 'styled-components'
import {
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
  typography,
  TypographyProps
} from 'styled-system'
import { defaultTheme } from '../../styles/theme'
import { Color } from '../../types'

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: string
}

interface StyledTextProps extends TextProps, SpaceProps, TextAlignProps, LayoutProps, FlexboxProps, TypographyProps {
  paragraph?: boolean
  color?: Color
  whiteSpace?: string
}

function Text({ variant, children, className, dangerouslySetInnerHTML }: TextProps) {
  const otherProps: any = {}
  if (typeof children === 'string') {
    otherProps.title = children
  }
  if (dangerouslySetInnerHTML) {
    otherProps.dangerouslySetInnerHTML = dangerouslySetInnerHTML
  }
  switch (variant) {
    case 'h1':
      return (
        <h1 className={className} {...otherProps}>
          {children}
        </h1>
      )
    case 'title':
    case 'h2':
      return (
        <h2 className={className} {...otherProps}>
          {children}
        </h2>
      )
    case 'subtitle':
    case 'h3':
      return (
        <h3 className={className} {...otherProps}>
          {children}
        </h3>
      )
    case 'h4':
      return (
        <h3 className={className} {...otherProps}>
          {children}
        </h3>
      )
    case 'srOnly':
      return (
        <span className={className} {...otherProps}>
          {children}
        </span>
      )
    case 'div':
      return (
        <div className={className} {...otherProps}>
          {children}
        </div>
      )
    case 'body1':
    case 'body2':
    case 'small':
    case 'caption':
    default:
      return (
        <p className={className} {...otherProps}>
          {children}
        </p>
      )
  }
}

const StyledText = styled(Text)<StyledTextProps>`
  color: ${props =>
    props.style != null && props.style.color != null
      ? props.style.color
      : props.color != null
      ? props.theme.pallete[props.color]
      : props.theme.pallete['textPrimary']};
  white-space: ${props => props.whiteSpace};
  margin: ${props => (props.paragraph ? '0 0 8px' : 0)};
  ${props => (props.variant != null ? props.theme.typography[props.variant] : props.theme.typography['body1'])}
  ${space};
  ${layout};
  ${flexbox};
  ${textAlign};
  ${typography};
`

StyledText.defaultProps = {
  theme: defaultTheme
}

export { StyledText as Text }
export default StyledText
