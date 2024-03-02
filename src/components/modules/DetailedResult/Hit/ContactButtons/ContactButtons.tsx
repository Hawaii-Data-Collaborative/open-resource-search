import { Phone, Language, Navigation } from '@mui/icons-material'
import theme from 'src/constants/theme'
import { logEvent } from 'src/analytics'
import { DontPrintContainer } from '../Hit.styles'
import { getWebsiteUrl } from '@util/stringUtil'
import { useState } from 'react'
import { Button } from '@element/Button/Button'
import { ContactButtonsDialog } from '@module/Result/ContactButtons/ContactButtons'

export default function ContactButtons({ hit }) {
  const [action, setAction] = useState(null)

  if (!hit) return null

  return (
    <DontPrintContainer style={{ gap: 10 }} className="ContactButtons">
      {!hit.phone ?? hit.phone.length === 0 ? null : (
        <Button
          color="gray"
          noShadows
          style={{ flex: '1 1 50%' }}
          onClick={() => {
            setAction('call')
            logEvent('Referral.Phone.ShowInfo', {
              currentPage: window.location.toString(),
              program: hit.title,
              phone: hit.phone
            })
          }}
        >
          <Phone style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }} /> Call
        </Button>
      )}

      {!hit.website || hit.website.length === 0 ? null : (
        <Button
          color="gray"
          noShadows
          style={{ flex: '1 1 50%' }}
          onClick={() => {
            setAction('website')

            logEvent('Referral.Website.ShowInfo', {
              currentPage: window.location.toString(),
              program: hit.title,
              url: getWebsiteUrl(hit.website)
            })
          }}
        >
          <Language style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }} /> Website
        </Button>
      )}

      {!hit.email || hit.email.length === 0 ? null : (
        <Button
          color="gray"
          noShadows
          style={{ flex: '1 1 50%' }}
          onClick={() => {
            setAction('email')

            logEvent('Referral.Email.ShowInfo', {
              currentPage: window.location.toString(),
              program: hit.title,
              url: getWebsiteUrl(hit.website)
            })
          }}
        >
          <Language style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }} /> Email
        </Button>
      )}

      {hit.locationLat && hit.locationLon ? (
        <Button
          color="gray"
          noShadows
          style={{ flex: '1 1 50%' }}
          onClick={() => {
            setAction('directions')

            logEvent('Referral.Directions.ShowInfo', {
              currentPage: window.location.toString(),
              program: hit.title
            })
          }}
        >
          <Navigation style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }} />
          Directions
        </Button>
      ) : null}

      {action ? <ContactButtonsDialog action={action} hit={hit} onClose={() => setAction(null)} /> : null}
    </DontPrintContainer>
  )
}
