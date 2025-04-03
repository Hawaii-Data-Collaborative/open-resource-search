import Box from '../../elements/Box'
import Flex from '../../elements/Flex'
import Heading from './Heading'
import Location from './Location'
import Description from './Description'
import ContactButtons from './ContactButtons'
import MoreInformation from './MoreInformation'
import FavoriteButton from './FavoriteButton'
import { t } from '../../../labels'

interface ILocation {
  lat?: number
  lng?: number
  zoom?: number
}

interface HitProps {
  hit?: any
  location?: ILocation
  mutate?: any
}

export default function Hit({ hit, location }: HitProps) {
  return (
    <Box
      className="Result-Hit"
      id={hit?.id}
      margin="16px"
      padding="16px"
      borderBottom="1px solid #dedede"
      backgroundColor="#ffffff"
      borderRadius="6px"
      boxShadow="0 0 8px #D0C9D6"
      position="relative"
    >
      <Box marginBottom="16px">
        <Flex alignItems="flex-start" justifyContent="space-between">
          <Heading hit={hit} />
          {hit?.active !== false && <FavoriteButton hit={hit} />}
        </Flex>
        <Location hit={hit} location={location} />
      </Box>

      <Description hit={hit} />
      <ContactButtons hit={hit} />
      <MoreInformation hit={hit} />

      {hit?.active === false && (
        <>
          <Flex
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            backgroundColor="#ddda"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box backgroundColor="#fffb" p={1} pl={2} pr={2} borderRadius={4} fontSize={1}>
              {t('This program is no longer active')}
            </Box>
          </Flex>

          <Box position="absolute" zIndex={10} top={16} right={16}>
            <FavoriteButton hit={hit} />
          </Box>
        </>
      )}
    </Box>
  )
}
