import copy from 'copy-to-clipboard'
import Text from '../../../elements/Text'
import Modal from '../../../elements/Modal'
import { logEvent } from '../../../../analytics'
import { toast } from '../../../../services'
import { PrintButton, EmailButton, TwitterButton, FacebookButton, CopyButton } from './SocialButtons'
import { Tooltip } from '../../../elements/Tooltip'
import { Stack } from '@mui/material'
import { t } from '../../../../labels'

export default function SocialButtonsModal({ share, setShare, hit }) {
  if (!hit) return null

  const onCopyButtonClick = () => {
    logEvent('Referral.CopyLink', {
      currentPage: window.location.toString(),
      program: hit.title
    })
    copy(window.location.href)
    toast('Link copied to clipboard')
  }

  const onPrintButtonClick = () => {
    logEvent('Referral.Print', {
      currentPage: window.location.toString(),
      program: hit.title
    })
    window.print()
  }

  const onEmailButtonClick = () => {
    logEvent('Referral.Share.Email', {
      currentPage: window.location.toString(),
      program: hit.title
    })
  }

  const onFBButtonClick = () => {
    logEvent('Referral.Share.Facebook', {
      currentPage: window.location.toString(),
      program: hit.title
    })
  }

  const onTwitterButtonClick = () => {
    logEvent('Referral.Share.Twitter', {
      currentPage: window.location.toString(),
      program: hit.title
    })
  }

  return (
    <Modal open={share} handleClose={() => setShare(false)}>
      <Text variant="h2" color="primary" textAlign="center" marginBottom="24px">
        {t('Share Listing')}
      </Text>

      <Stack spacing={1}>
        <CopyButton onClick={onCopyButtonClick}>{t('Copy Link')}</CopyButton>

        <PrintButton onClick={onPrintButtonClick}>{t('Print this Listing')}</PrintButton>

        <div>
          <Tooltip
            title={t("Press to open your device's email app and start a draft message with a link to this program")}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -8]
                    }
                  }
                ]
              }
            }}
          >
            <span>
              <EmailButton
                to={`mailto:?subject=${hit.title}&body=${window.location.href}`}
                onClick={onEmailButtonClick}
                external
              >
                {t('Share with Email')}
              </EmailButton>
            </span>
          </Tooltip>
        </div>

        <FacebookButton
          target="_blank"
          rel="noreferrer"
          to={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          onClick={onFBButtonClick}
          external
        >
          {t('Share on Facebook')}
        </FacebookButton>

        <TwitterButton
          target="_blank"
          rel="noreferrer"
          to={`https://twitter.com/share?text=${hit.title}&url=${window.location.href}`}
          onClick={onTwitterButtonClick}
          external
        >
          {t('Share on Twitter')}
        </TwitterButton>
      </Stack>
    </Modal>
  )
}
