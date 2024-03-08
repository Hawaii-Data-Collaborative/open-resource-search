import Text from '../../../elements/Text'
import Modal from '../../../elements/Modal'
import Flex from '../../../elements/Flex'
import { logEvent } from '../../../../analytics'

import { PrintButton, EmailButton, TwitterButton, FacebookButton } from './SocialButtons'

export default function SocialButtonsModal({ share, setShare, hit }) {
  if (!hit) return null

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
        Share Listing
      </Text>

      <Flex flexDirection="column">
        <PrintButton onClick={onPrintButtonClick}>Print this Listing</PrintButton>

        <EmailButton to={`mailto:?subject=${hit.title}&body=${window.location.href}`} onClick={onEmailButtonClick}>
          Share with Email
        </EmailButton>

        <FacebookButton
          target="_blank"
          rel="noreferrer"
          to={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          onClick={onFBButtonClick}
        >
          Share on Facebook
        </FacebookButton>

        <TwitterButton
          target="_blank"
          rel="noreferrer"
          to={`https://twitter.com/share?text=${hit.title}&url=${window.location.href}`}
          onClick={onTwitterButtonClick}
        >
          Share on Twitter
        </TwitterButton>
      </Flex>
    </Modal>
  )
}
