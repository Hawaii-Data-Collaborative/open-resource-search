import Skeleton from 'react-loading-skeleton'
import Text from '../../../elements/Text'
import Box from '../../../elements/Box'
import { t } from '../../../../labels'

export default function AgeGroup({ hit }) {
  return (
    <Box marginTop="32px">
      <Text variant="h2" color="primary">
        {t('Age Group')}
      </Text>
      <Text color="textSecondary">
        {!hit && <Skeleton count={3} />}

        {hit && hit.ageRestrictions}
      </Text>
    </Box>
  )
}
