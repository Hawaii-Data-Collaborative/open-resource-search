import Skeleton from 'react-loading-skeleton'
import Text from '../../../elements/Text'
import Box from '../../../elements/Box'
import { t } from '../../../../labels'

export default function Eligibility({ hit }) {
  return (
    <Box marginTop="32px">
      <Text variant="h2" color="primary">
        {t('Eligibility')}
      </Text>
      <Text color="textSecondary" whiteSpace="pre-line">
        {!hit && <Skeleton count={3} />}

        {hit && hit.eligibility}
      </Text>
    </Box>
  )
}
