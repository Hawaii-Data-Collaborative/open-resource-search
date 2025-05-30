import Skeleton from 'react-loading-skeleton'
import Text from '../../../elements/Text'
import Box from '../../../elements/Box'
import { t } from '../../../../labels'

export default function AgencyInfo({ hit }) {
  return (
    <Box marginTop="32px">
      <Text variant="h2" color="primary">
        {t('Agency Info')}
      </Text>
      <Text variant="subtitle" color="primary">
        {!hit ? <Skeleton /> : hit.organizationName}
      </Text>
      <Text color="textSecondary" whiteSpace="pre-wrap">
        {!hit && <Skeleton count={3} />}
        {hit && hit.organizationDescription}
      </Text>
    </Box>
  )
}
