import Box from '../../elements/Box'
import Alert from '../../elements/Alert'
import { t } from '../../../labels'
import Hit from './Hit/Hit'
import FeedbackMargin from '../FeedbackButton/FeedbackMargin'
import { SingleResultContainer } from './SingleResult.styles'

interface SingleResultProps {
  data?: any
}

export default function SingleResult({ data }: SingleResultProps) {
  if (!data) {
    return (
      <SingleResultContainer>
        <Box padding="8px">
          <Alert color="error">
            {t(
              'No data was found for this result. If you believe this is a mistake, please submit a request through our feedback form.'
            )}
          </Alert>
        </Box>
      </SingleResultContainer>
    )
  }

  return (
    <SingleResultContainer>
      <Hit hit={data} />
      <FeedbackMargin />
    </SingleResultContainer>
  )
}
