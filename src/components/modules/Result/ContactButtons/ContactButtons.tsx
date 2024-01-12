import { useState } from 'react';
import { Button as MuiButton, Dialog, Tooltip } from '@material-ui/core';
import { Phone, Language, Navigation, FileCopy } from '@material-ui/icons';
import { Button2 } from 'src/components/elements/Button/Button';
import Flex from 'src/components/elements/Flex/Flex';
import Link from 'src/components/elements/Link/Link';
import theme from 'src/constants/theme';
import { logEvent } from 'src/analytics';
import { getWebsiteUrl } from '@util/stringUtil';
import ClipboardJS from 'clipboard';
import { onCopyToClipboard } from '@util/domUtil';

export default function ContactButtons({ hit }) {
  const [action, setAction] = useState(null);

  if (!hit) return null;

  return (
    <Flex marginBottom="16px" style={{ gap: 10 }}>
      {hit.phone && (
        <Button2
          style={{ flex: '1 1 50%' }}
          onClick={() => {
            setAction('call');
            logEvent('Referral.Phone.ShowInfo', {
              currentPage: window.location.toString(),
              program: hit.title,
              phone: hit.phone,
            });
          }}
        >
          <Phone style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }} />{' '}
          Call
        </Button2>
      )}

      {hit.website && (
        <Button2
          style={{ flex: '1 1 50%' }}
          onClick={() => {
            setAction('website');

            logEvent('Referral.Website.ShowInfo', {
              currentPage: window.location.toString(),
              program: hit.title,
              url: getWebsiteUrl(hit.website),
            });
          }}
        >
          <Language
            style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }}
          />{' '}
          Website
        </Button2>
      )}

      {hit.locationLat && hit.locationLon ? (
        <Button2
          style={{ flex: '1 1 50%' }}
          onClick={() => {
            setAction('directions');

            logEvent('Referral.Directions.ShowInfo', {
              currentPage: window.location.toString(),
              program: hit.title,
            });
          }}
        >
          <Navigation
            style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }}
          />
          Directions
        </Button2>
      ) : null}

      {action ? (
        <ContactButtonsDialog
          action={action}
          hit={hit}
          onClose={() => setAction(null)}
        />
      ) : null}
    </Flex>
  );
}

let clipboard: ClipboardJS;

export function ContactButtonsDialog({ action, hit, onClose }) {
  const onRef = (node: HTMLElement) => {
    console.log('[onRef] node=', node);
    if (node) {
      clipboard = new ClipboardJS(node, {
        container: document.querySelector('#ContactButtonsDialog'),
      });
    } else {
      clipboard?.destroy();
    }
  };

  const onPhoneClick = () => {
    logEvent('Referral.Phone.Call', {
      currentPage: window.location.toString(),
      program: hit.title,
      phone: hit.phone,
    });
  };

  const onWebsiteClick = () => {
    logEvent('Referral.Website.OpenInNewTab', {
      currentPage: window.location.toString(),
      program: hit.title,
      url: getWebsiteUrl(hit.website),
    });
  };

  const onEmailClick = () => {
    logEvent('Referral.Email.OpenInEmailClient', {
      currentPage: window.location.toString(),
      program: hit.title,
      email: hit.email,
    });
  };

  const onDirectionsClick = () => {
    logEvent('Referral.Directions.OpenInGoogleMaps', {
      currentPage: window.location.toString(),
      program: hit.title,
    });
  };

  const onCopyPhoneClick = (e) => {
    console.log('[onCopyPhoneClick] e.currentTarget=', e.currentTarget);
    onCopyToClipboard(e.currentTarget);
    logEvent('Referral.Phone.CopyNumber', {
      currentPage: window.location.toString(),
      program: hit.title,
      phone: hit.phone,
    });
  };

  const onCopyWebsiteClick = (e) => {
    onCopyToClipboard(e.currentTarget);
    logEvent('Referral.Website.CopyWebsite', {
      currentPage: window.location.toString(),
      program: hit.title,
      url: getWebsiteUrl(hit.website),
    });
  };

  const onCopyEmailClick = (e) => {
    onCopyToClipboard(e.currentTarget);
    logEvent('Referral.Email.CopyEmail', {
      currentPage: window.location.toString(),
      program: hit.title,
      email: hit.email,
    });
  };

  const onCopyAddressClick = (e) => {
    onCopyToClipboard(e.currentTarget);
    logEvent('Referral.Directions.CopyAddress', {
      currentPage: window.location.toString(),
      program: hit.title,
    });
  };

  return (
    <Dialog open onClose={onClose}>
      <div id="ContactButtonsDialog" style={{ padding: 30, width: 270 }}>
        {action === 'call' && hit.phone && (
          <>
            <Link
              external
              href={`tel:${hit.phone}`}
              variant="outline"
              color="primary"
              marginBottom="10px"
              background="#f7f5f9"
              border="none"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={onPhoneClick}
            >
              <Phone
                style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }}
              />{' '}
              Call from this device
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>{hit.phone}</span>
              <span style={{ display: 'inline-block', marginLeft: 5 }}>
                <MuiButton
                  style={{ minWidth: 35 }}
                  onClick={onCopyPhoneClick}
                  innerRef={onRef}
                  data-clipboard-text={hit.phone}
                >
                  <Tooltip title="Copy" style={{ color: '#ccc' }}>
                    <FileCopy fontSize="small" />
                  </Tooltip>
                </MuiButton>
              </span>
            </div>
          </>
        )}

        {action === 'website' && hit.website && (
          <>
            <Link
              external
              href={getWebsiteUrl(hit.website)}
              target="_blank"
              rel="noreferrer"
              marginBottom="10px"
              variant="outline"
              color="primary"
              background="#f7f5f9"
              border="none"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={onWebsiteClick}
            >
              <Language
                style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }}
              />{' '}
              Open in new tab
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>{hit.website}</span>
              <span style={{ display: 'inline-block', marginLeft: 5 }}>
                <MuiButton
                  style={{ minWidth: 35 }}
                  onClick={onCopyWebsiteClick}
                  innerRef={onRef}
                  data-clipboard-text={hit.website}
                >
                  <Tooltip title="Copy" style={{ color: '#ccc' }}>
                    <FileCopy fontSize="small" />
                  </Tooltip>
                </MuiButton>
              </span>
            </div>
          </>
        )}

        {action === 'email' && hit.email && (
          <>
            <Link
              external
              href={'mailto:' + hit.email}
              target="_blank"
              rel="noreferrer"
              marginBottom="10px"
              variant="outline"
              color="primary"
              background="#f7f5f9"
              border="none"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={onEmailClick}
            >
              <Language
                style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }}
              />{' '}
              Send Email
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>{hit.email}</span>
              <span style={{ display: 'inline-block', marginLeft: 5 }}>
                <MuiButton
                  style={{ minWidth: 35 }}
                  onClick={onCopyEmailClick}
                  innerRef={onRef}
                  data-clipboard-text={hit.email}
                >
                  <Tooltip title="Copy" style={{ color: '#ccc' }}>
                    <FileCopy fontSize="small" />
                  </Tooltip>
                </MuiButton>
              </span>
            </div>
          </>
        )}

        {action === 'directions' &&
        hit.locationName &&
        hit.locationLat &&
        hit.locationLon ? (
          <>
            <Link
              external
              href={`https://www.google.com/maps/dir/?api=1&destination=${hit.locationLat},${hit.locationLon}`}
              target="_blank"
              rel="noreferrer"
              color="primary"
              marginBottom="10px"
              variant="outline"
              background="#f7f5f9"
              border="none"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={onDirectionsClick}
            >
              <Navigation
                style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }}
              />
              Directions
            </Link>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>{hit.locationName}</span>
              <span style={{ display: 'inline-block', marginLeft: 5 }}>
                <MuiButton
                  style={{ minWidth: 35 }}
                  onClick={onCopyAddressClick}
                  innerRef={onRef}
                  data-clipboard-text={hit.locationName}
                >
                  <Tooltip title="Copy" style={{ color: '#ccc' }}>
                    <FileCopy fontSize="small" />
                  </Tooltip>
                </MuiButton>
              </span>
            </div>
          </>
        ) : null}
      </div>
    </Dialog>
  );
}
