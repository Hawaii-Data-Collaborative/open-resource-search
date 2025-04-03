import Text from '../../../elements/Text'
import Box from '../../../elements/Box'
import { t } from '../../../../labels'

export default function ServiceArea({ hit }) {
  if (!hit?.serviceArea) {
    return null
  }

  return (
    <Box marginTop="32px">
      <Text variant="h2" color="primary">
        {t('Service Area')}
      </Text>
      <Text color="textSecondary">{hit.serviceArea}</Text>
    </Box>
  )
}
