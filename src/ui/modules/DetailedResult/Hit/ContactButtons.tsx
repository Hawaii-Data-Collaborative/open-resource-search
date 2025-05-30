import { useState } from 'react'
import { Phone, Language, Navigation } from '@mui/icons-material'
import { THEME_CONSTANTS as theme } from '../../../../constants'
import { logEvent } from '../../../../analytics'
import { Button } from '../../../elements/Button'
import { ContactButtonsDialog } from '../../Result/ContactButtons'
import { getWebsiteUrl } from '../../../../utils'
import { DontPrintContainer } from './Hit.styles'
import { t } from '../../../../labels'

export default function ContactButtons({ hit }) {
  const [action, setAction] = useState(null)

  if (!hit) return null

  return (
    <DontPrintContainer style={{ gap: 10 }} className="ContactButtons">
      {!hit.phone?.length ? null : (
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
          <Phone style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }} /> {t('Call')}
        </Button>
      )}

      {!hit.website?.length ? null : (
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
          <Language style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }} /> {t('Website')}
        </Button>
      )}

      {!hit.email?.length ? null : (
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
          <Language style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }} /> {t('Email')}
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
          {t('Directions')}
        </Button>
      ) : null}

      {action ? <ContactButtonsDialog action={action} hit={hit} onClose={() => setAction(null)} /> : null}
    </DontPrintContainer>
  )
}
