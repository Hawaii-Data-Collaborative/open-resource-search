import Skeleton from 'react-loading-skeleton'
import Text from '../../../elements/Text'
import Box from '../../../elements/Box'

export default function AgeGroup({ hit }) {
  return (
    <Box marginTop="32px">
      <Text variant="h2" color="primary">
        Age Group
      </Text>
      <Text color="textSecondary">
        {!hit && <Skeleton count={3} />}

        {hit && hit.ageRestrictions}
      </Text>
    </Box>
  )
}
