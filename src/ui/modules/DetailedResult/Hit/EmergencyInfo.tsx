import { AnnouncementOutlined } from '@mui/icons-material'
import Flex from '../../../elements/Flex'
import Alert from '../../../elements/Alert'
import Text from '../../../elements/Text'
import { t } from '../../../../labels'

export function EmergencyInfo({ hit }) {
  if (!hit.emergencyInfo || hit.emergencyInfo.length === 0) return null

  return (
    <Alert color="error" mb="16px">
      <Flex alignItems="center" justifyContent="space-between" mb="4px">
        <Text variant="title">{t('Emergency Info')}</Text>

        <Text variant="title">
          <AnnouncementOutlined />
        </Text>
      </Flex>

      <Text variant="body1">{hit.emergencyInfo}</Text>
    </Alert>
  )
}

export default EmergencyInfo
