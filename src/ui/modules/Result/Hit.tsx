import Box from '../../elements/Box'
import Text from '../../elements/Text'
import Flex from '../../elements/Flex'
import Heading from './Heading'
import Location from './Location'
import Description from './Description'
import ContactButtons from './ContactButtons'
import MoreInformation from './MoreInformation'
import FavoriteButton from './FavoriteButton'
import { checkString } from '../../../utils'

interface ILocation {
  lat?: number
  lng?: number
  zoom?: number
}

interface HitProps {
  hit?: any
  location?: ILocation
  score?: any
  mutate?: any
}

export default function Hit({ hit, location, score }: HitProps) {
  return (
    <Box
      id={hit?.id}
      margin="16px"
      padding="16px"
      borderBottom="1px solid #dedede"
      backgroundColor="#ffffff"
      borderRadius="6px"
      boxShadow="0 0 8px #D0C9D6"
    >
      <Box marginBottom="16px">
        <Flex alignItems="flex-start" justifyContent="space-between">
          <Heading hit={hit} />
          <FavoriteButton hit={hit} />
        </Flex>
        <Location hit={hit} location={location} />
      </Box>

      <Description hit={hit} />
      <ContactButtons hit={hit} />
      <MoreInformation hit={hit} />

      {(import.meta.env.MODE === 'development' || import.meta.env.VITE_DEBUG) != null && checkString(score) && (
        <Flex justifyContent="flex-end" alignItems="center">
          <Text color="textSecondary" variant="body1">
            score: {score}
          </Text>
        </Flex>
      )}
    </Box>
  )
}
