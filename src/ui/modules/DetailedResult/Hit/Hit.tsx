import { useState } from 'react'
import Box from '../../../elements/Box'
import Flex from '../../../elements/Flex'
import SocialButtonsModal from './SocialButtonsModal'
import Heading from './Heading'
import Location from './Location'
import Description from './Description'
import ContactLinks from './ContactLinks'
import ContactButtons from './ContactButtons'
import Categories from './Categories'
import ServiceArea from './ServiceArea'
import ApplicationProcess from './ApplicationProcess'
import Languages from './Languages'
import Eligibility from './Eligibility'
import AgencyInfo from './AgencyInfo'
import Fees from './Fees'
import Actions from './Actions'
import { EmergencyInfo } from './EmergencyInfo'
import FavoriteButton from '../../Result/FavoriteButton'

type HitProps = {
  hit: any
}

export default function Hit({ hit }: HitProps) {
  const [share, setShare] = useState(false)

  return (
    <Box padding="16px 24px" className="Hit">
      <Actions setShare={setShare} />

      <EmergencyInfo hit={hit} />

      <Box marginBottom="16px">
        <Flex alignItems="flex-start" justifyContent="space-between">
          <Heading hit={hit} />
          <FavoriteButton hit={hit} />
        </Flex>
        <Location hit={hit} />
      </Box>

      <Description hit={hit} />
      <ContactLinks hit={hit} />
      <ContactButtons hit={hit} />
      <Categories hit={hit} />
      <ServiceArea hit={hit} />
      <ApplicationProcess hit={hit} />
      <Languages hit={hit} />
      <Eligibility hit={hit} />
      <Fees hit={hit} />
      <AgencyInfo hit={hit} />
      <SocialButtonsModal share={share} setShare={setShare} hit={hit} />
    </Box>
  )
}
