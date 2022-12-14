import Text from 'src/components/elements/Text/Text';
import Modal from 'src/components/elements/Modal/Modal';
import Flex from 'src/components/elements/Flex/Flex';
import { logEvent } from 'src/analytics';

import {
  PrintButton,
  EmailButton,
  TwitterButton,
  FacebookButton,
} from './SocialButtons';

export default function SocialButtonsModal({ share, setShare, hit }) {
  if (!hit) return null;

  const onPrintButtonClick = () => {
    logEvent('Referral.Print', {
      currentPage: window.location.toString(),
      program: hit.title,
    });
    if (process.browser) {
      window.print();
    }
  };

  const onEmailButtonClick = () => {
    logEvent('Referral.Share.Email', {
      currentPage: window.location.toString(),
      program: hit.title,
    });
  };

  const onFBButtonClick = () => {
    logEvent('Referral.Share.Facebook', {
      currentPage: window.location.toString(),
      program: hit.title,
    });
  };

  const onTwitterButtonClick = () => {
    logEvent('Referral.Share.Twitter', {
      currentPage: window.location.toString(),
      program: hit.title,
    });
  };

  return (
    <Modal open={share} handleClose={() => setShare(false)}>
      <Text variant="h2" color="primary" textAlign="center" marginBottom="24px">
        Share Listing
      </Text>

      <Flex flexDirection="column">
        <PrintButton onClick={onPrintButtonClick}>
          Print this Listing
        </PrintButton>

        <EmailButton
          href={`mailto:?subject=${hit.title}&body=${
            process.browser ? window.location.href : ''
          }`}
          onClick={onEmailButtonClick}
        >
          Share with Email
        </EmailButton>

        <FacebookButton
          target="_blank"
          rel="noreferrer"
          href={`https://www.facebook.com/sharer/sharer.php?u=${
            process.browser ? window.location.href : ''
          }`}
          onClick={onFBButtonClick}
        >
          Share on Facebook
        </FacebookButton>

        <TwitterButton
          target="_blank"
          rel="noreferrer"
          href={`https://twitter.com/share?text=${hit.title}&url=${
            process.browser ? window.location.href : ''
          }`}
          onClick={onTwitterButtonClick}
        >
          Share on Twitter
        </TwitterButton>
      </Flex>
    </Modal>
  );
}
