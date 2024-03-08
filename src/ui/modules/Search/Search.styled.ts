import { Autocomplete, FormControl } from '@mui/material'
import styled from 'styled-components'
import {
  background,
  space,
  layout,
  typography,
  color,
  position,
  PositionProps,
  BackgroundProps,
  flexbox,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  TypographyProps,
  ColorProps
} from 'styled-system'

interface AutocompleteProps
  extends SpaceProps,
    LayoutProps,
    TypographyProps,
    FlexboxProps,
    BackgroundProps,
    PositionProps,
    ColorProps {}

export const StyledAutocomplete = styled(Autocomplete)<AutocompleteProps>`
  ${space};
  ${layout};
  ${typography};
  ${color};
  ${flexbox};
  ${background};
  ${position};
`

export const StyledFormControl = styled(FormControl)<AutocompleteProps>`
  ${space};
  ${layout};
  ${typography};
  ${color};
  ${flexbox};
  ${background};
  ${position};
`
