import { useState } from 'react'
import Box from 'src/components/elements/Box/Box'
import Flex from 'src/components/elements/Flex/Flex'

import SocialButtonsModal from './SocialButtonsModal/SocialButtonsModal'
import Heading from './Heading/Heading'
import Location from './Location/Location'
import Description from './Description/Description'
import ContactLinks from './ContactLinks/ContactLinks'
import ContactButtons from './ContactButtons/ContactButtons'
import Categories from './Categories/Categories'
import ServiceArea from './ServiceArea/ServiceArea'
import ApplicationProcess from './ApplicationProcess/ApplicationProcess'
import Languages from './Languages/Languages'
import Eligibility from './Eligibility/Eligibility'
import AgencyInfo from './AgencyInfo/AgencyInfo'
import Fees from './Fees/Fees'
import Actions from './Actions/Actions'
import { EmergencyInfo } from './EmergencyInfo/EmergencyInfo'
import FavoriteButton from '../../Result/FavoriteButton/FavoriteButton'

type HitProps = {
  hit: any
  query: any
}

export default function Hit({ hit }: HitProps) {
  const [share, setShare] = useState(false)

  return (
    <Box padding="16px 24px" className="Hit">
      <Actions setShare={setShare} />

      <EmergencyInfo hit={hit} />

      <Flex marginBottom="16px" justifyContent="space-between">
        <Flex flex={1} paddingRight="16px" flexDirection="column">
          <Heading hit={hit} />
          <Location hit={hit} />
        </Flex>

        <FavoriteButton hit={hit} />
      </Flex>

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
