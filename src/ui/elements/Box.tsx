import styled from 'styled-components'
import {
  background,
  space,
  layout,
  typography,
  color,
  borders,
  BordersProps,
  BackgroundProps,
  SpaceProps,
  LayoutProps,
  TypographyProps,
  ColorProps,
  boxShadow,
  BoxShadowProps,
  position,
  PositionProps,
  flexbox,
  FlexboxProps
} from 'styled-system'

interface BoxProps
  extends SpaceProps,
    LayoutProps,
    TypographyProps,
    BackgroundProps,
    ColorProps,
    BordersProps,
    BoxShadowProps,
    PositionProps,
    FlexboxProps {}

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${space};
  ${layout};
  ${typography};
  ${color};
  ${background};
  ${borders};
  ${boxShadow};
  ${position};
  ${flexbox};
`

export default Box
