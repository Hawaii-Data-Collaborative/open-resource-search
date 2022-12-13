import { useRef } from 'react';
import { Button as MuiButton, Tooltip } from '@material-ui/core';
import ClipboardJS from 'clipboard';
import { getDistance } from 'geolib';
import Skeleton from 'react-loading-skeleton';
import { FileCopy, Room } from '@material-ui/icons';
import Text from 'src/components/elements/Text/Text';
import theme from 'src/constants/theme';
import { logEvent } from 'src/analytics';
import { onCopyToClipboard } from '@util/domUtil';

let clipboard: ClipboardJS;

export default function Location({ hit, location }) {
  const distance = useRef(
    location?.lat != null &&
      location?.lng != null &&
      hit?.location_latitude != null &&
      hit?.location_longitude != null
      ? getDistance(
          {
            latitude: location.lat,
            longitude: location.lng,
          },
          {
            latitude: hit.location_latitude,
            longitude: hit.location_longitude,
          }
        ) / 1609.344
      : null
  );

  const onRef = (node: HTMLElement) => {
    if (node) {
      clipboard = new ClipboardJS(node);
    } else {
      clipboard?.destroy();
    }
  };

  const onCopyClick = (e) => {
    onCopyToClipboard(e.currentTarget);
    logEvent('Referral.Directions.CopyAddress', {
      currentPage: window.location.toString(),
      program: hit.title,
      address: hit.locationName,
    });
  };

  return (
    <Text
      variant="subtitle"
      color="primary"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      {!hit ? (
        <Skeleton />
      ) : (
        <>
          {hit.locationName && (
            <>
              <Room
                style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }}
              />
              {hit.locationName}
              <span style={{ color: '#666', marginLeft: 4 }}>
                {distance.current != null && (
                  <> - {distance.current.toFixed(1)} miles</>
                )}
              </span>

              <MuiButton
                style={{ minWidth: 35 }}
                onClick={onCopyClick}
                innerRef={onRef}
                data-clipboard-text={hit.locationName}
              >
                <Tooltip title="Copy" style={{ color: '#ccc' }}>
                  <FileCopy fontSize="small" />
                </Tooltip>
              </MuiButton>
            </>
          )}
        </>
      )}
    </Text>
  );
}
