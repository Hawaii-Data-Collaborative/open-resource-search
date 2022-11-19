import { Phone, Language, Navigation } from '@material-ui/icons';
import Link from 'src/components/elements/Link/Link';
import Flex from 'src/components/elements/Flex/Flex';
import theme from 'src/constants/theme';
import { logEvent } from 'src/analytics';

function getUrl(url: string) {
  if (!url) {
    return '';
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url;
  }
  return url;
}

export default function ContactButtons({ hit, location }) {
  if (!hit) return null;

  const onPhoneClick = () => {
    logEvent('PhoneButtonClick', {
      currentPage: window.location.toString(),
      phone: hit.phone,
    });
  };

  const onWebsiteClick = () => {
    logEvent('WebsiteButtonClick', {
      currentPage: window.location.toString(),
      url: getUrl(hit.website),
    });
  };

  return (
    <Flex marginBottom="16px">
      {hit.phone && (
        <Link
          external
          href={`tel:${hit.phone}`}
          variant="outline"
          color="primary"
          marginRight="4px"
          background="#f7f5f9"
          border="none"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={onPhoneClick}
        >
          <Phone style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }} />{' '}
          Call
        </Link>
      )}

      {hit.website && (
        <Link
          external
          href={getUrl(hit.website)}
          target="_blank"
          rel="noreferrer"
          marginLeft="4px"
          marginRight="4px"
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
          Website
        </Link>
      )}

      {location.lat == null ||
      location.lng == null ||
      hit.locationLat == null ||
      hit.locationLon == null ? null : (
        <Link
          external
          href={`https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${hit.locationLat},${hit.locationLon}`}
          target="_blank"
          rel="noreferrer"
          color="primary"
          marginLeft="4px"
          variant="outline"
          background="#f7f5f9"
          border="none"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Navigation
            style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }}
          />
          Directions
        </Link>
      )}
    </Flex>
  );
}
