import styled from 'styled-components'
import Flex from '../../../elements/Flex'

export const DontPrintContainer = styled(Flex)`
  margin-bottom: 16px;

  @media print {
    display: none;
  }
`
