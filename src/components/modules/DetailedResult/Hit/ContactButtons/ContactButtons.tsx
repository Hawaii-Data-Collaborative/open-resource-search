import { Phone, Language, Navigation } from '@material-ui/icons';
import { useAppSelector } from 'src/redux/store';
import theme from 'src/constants/theme';
import { logEvent } from 'src/analytics';
import { DontPrintContainer } from '../Hit.styles';
import { getWebsiteUrl } from '@util/stringUtil';
import { useState } from 'react';
import { Button2 } from '@element/Button/Button';
import { ContactButtonsDialog } from '@module/Result/ContactButtons/ContactButtons';

export default function ContactButtons({ hit }) {
  const [action, setAction] = useState(null);
  const location = useAppSelector((state) => state.location);

  if (!hit) return null;

  return (
    <DontPrintContainer style={{ gap: 10 }}>
      {!hit.phone ?? hit.phone.length === 0 ? null : (
        <Button2
          style={{ flex: '1 1 50%' }}
          onClick={() => {
            setAction('call');
            logEvent('PotentialReferral.Call', {
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

      {!hit.website || hit.website.length === 0 ? null : (
        <Button2
          style={{ flex: '1 1 50%' }}
          onClick={() => {
            setAction('website');

            logEvent('PotentialReferral.Website', {
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

      {!hit.email || hit.email.length === 0 ? null : (
        <Button2
          style={{ flex: '1 1 50%' }}
          onClick={() => {
            setAction('email');

            logEvent('PotentialReferral.Email', {
              currentPage: window.location.toString(),
              program: hit.title,
              url: getWebsiteUrl(hit.website),
            });
          }}
        >
          <Language
            style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }}
          />{' '}
          Email
        </Button2>
      )}

      {location?.lat == null ||
      location?.lng == null ||
      hit.locationLat == null ||
      hit.locationLon == null ? null : (
        <Button2
          style={{ flex: '1 1 50%' }}
          onClick={() => {
            setAction('directions');

            logEvent('PotentialReferral.Directions', {
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
      )}

      {action ? (
        <ContactButtonsDialog
          action={action}
          hit={hit}
          location={location}
          onClose={() => setAction(null)}
        />
      ) : null}
    </DontPrintContainer>
  );
}
