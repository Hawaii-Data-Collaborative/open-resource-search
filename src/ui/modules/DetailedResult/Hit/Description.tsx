import Skeleton from 'react-loading-skeleton'
import Text from '../../../elements/Text'
import Box from '../../../elements/Box'

export default function Description({ hit }) {
  return (
    <Box marginBottom="16px" className="Description">
      <Text color="textSecondary" whiteSpace="pre-line">
        {!hit && <Skeleton count={5} />}

        {hit && <>{hit.description}</>}
      </Text>
    </Box>
  )
}
