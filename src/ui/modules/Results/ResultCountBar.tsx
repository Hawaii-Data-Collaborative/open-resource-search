import Box from '../../elements/Box'
import Text from '../../elements/Text'
import { THEME_CONSTANTS as theme } from '../../../constants'
import { getTextColorContrast } from '../../../utils'

export default function ResultCountBar({ results }) {
  return (
    <Box padding="8px 16px" backgroundColor={theme.PRIMARY_COLOR}>
      <Text variant="body2" style={{ color: getTextColorContrast(theme.PRIMARY_COLOR) }}>
        {results.isLoading && 'Loading results...'}
        {!results.isLoading && <>Results: {results.data.length}</>}
      </Text>
    </Box>
  )
}
