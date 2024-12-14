import styled from 'styled-components'
import Flex from '../../../elements/Flex'

export const DontPrintContainer = styled(Flex)`
  margin-bottom: 16px;

  @media (max-width: 599px) {
    flex-wrap: wrap;
  }

  @media print {
    display: none;
  }
`
