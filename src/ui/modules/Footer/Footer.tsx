import Flex from '../../elements/Flex'
import Text from '../../elements/Text'
import Box from '../../elements/Box'
import Link from '../../elements/Link'
import { THEME_CONSTANTS as theme } from '../../../constants'
import FeedbackMargin from '../FeedbackButton/FeedbackMargin'
import { getAppConfigValue, getTextColorContrast } from '../../../utils'

export default function SiteFooter() {
  return (
    <Box backgroundColor={theme.PRIMARY_COLOR} padding="16px">
      <Flex maxWidth={1200} margin="0 auto" justifyContent="space-between" alignItems="center">
        <Text variant="small" style={{ color: getTextColorContrast(theme.PRIMARY_COLOR) }}>
          &copy; 2021, {getAppConfigValue('brandName')}. All rights reserved.
        </Text>
        <Box>
          <Link
            to="/admin"
            target="_blank"
            style={{
              color: getTextColorContrast(theme.PRIMARY_COLOR),
              marginRight: 20
            }}
          >
            Administrators
          </Link>
          <Link to="/privacy-policy" target="_blank" style={{ color: getTextColorContrast(theme.PRIMARY_COLOR) }}>
            Privacy Policy
          </Link>
        </Box>
      </Flex>
      <FeedbackMargin />
    </Box>
  )
}
