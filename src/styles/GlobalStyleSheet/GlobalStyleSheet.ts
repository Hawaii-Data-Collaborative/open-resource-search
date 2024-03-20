import { defaultTheme } from '../../styles/theme'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyleSheet = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  ::-webkit-input-placeholder {
    color: #9bb1c7;
  }
  ::-moz-placeholder {
    color: #9bb1c7;
  }
  :-ms-input-placeholder {
    color: #9bb1c7;
  }
  :-moz-placeholder {
    color: #9bb1c7;
  }

  html {
    background-color: ${props => (props.theme as any).pallete.primaryMedium};
    scroll-behavior: smooth;
    font-size: ${props => (props.theme as any).typography.htmlFontSize};
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "Open Sans", sans-serif;
  }

  .MuiAutocomplete-listbox .MuiAutocomplete-groupLabel {
    color: #888;
  }

  a {
    text-decoration: none;
  }
`
GlobalStyleSheet.defaultProps = {
  theme: defaultTheme
}
