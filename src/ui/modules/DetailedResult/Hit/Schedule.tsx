import Text from '../../../elements/Text'
import Box from '../../../elements/Box'
import { t } from '../../../../labels'

export default function Schedule({ hit }) {
  if (!hit?.schedule) return null

  return (
    <Box marginTop="32px">
      <Text variant="h2" color="primary" paddingBottom="8px">
        {t('Hours')}
      </Text>
      <Text
        variant="div"
        color="textSecondary"
        fontSize={15}
        whiteSpace="pre-line"
        dangerouslySetInnerHTML={{
          __html: hit.schedule?.replaceAll('\\n', '\n')
        }}
      />
    </Box>
  )
}
