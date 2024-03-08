import Text from '../../../elements/Text'
import Box from '../../../elements/Box'

export default function ServiceArea({ hit }) {
  if (!hit?.serviceArea) {
    return null
  }

  return (
    <Box marginTop="32px">
      <Text variant="h2" color="primary">
        Service Area
      </Text>
      <Text color="textSecondary">{hit.serviceArea}</Text>
    </Box>
  )
}
