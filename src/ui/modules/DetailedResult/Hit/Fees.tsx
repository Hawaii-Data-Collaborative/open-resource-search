import Skeleton from 'react-loading-skeleton'
import Text from '../../../elements/Text'
import Box from '../../../elements/Box'

export default function Fees({ hit }) {
  return (
    <Box marginTop="32px">
      <Text variant="h2" color="primary">
        Fees
      </Text>
      <Text color="textSecondary">
        {!hit && <Skeleton count={3} />}
        {hit && hit.fees}
      </Text>
    </Box>
  )
}
