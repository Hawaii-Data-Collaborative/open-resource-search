import ClipboardJS from 'clipboard';
import Skeleton from 'react-loading-skeleton';
import { Button as MuiButton, Tooltip } from '@material-ui/core';
import { FileCopy, Room, Info } from '@material-ui/icons';
import Text from 'src/components/elements/Text/Text';
import theme from 'src/constants/theme';
import { logEvent } from 'src/analytics';
import { onCopyToClipboard } from '@util/domUtil';

let clipboard: ClipboardJS;

export default function Location({ hit }) {
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
      marginTop="4px"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      {!hit && <Skeleton />}

      {hit?.locationName ? (
        <>
          <Room style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }} />
          {hit.locationName}

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
      ) : (
        <>
          <Room style={{ marginRight: '4px', color: theme.SECONDARY_COLOR }} />
          <span style={{ fontSize: '90%', color: '#999' }}>
            Address unavailable
          </span>
          <Tooltip title="This location may be confidential or not open to the public. Please choose another provided contact method for this service.">
            <Info
              fontSize="small"
              style={{
                marginLeft: '5px',
                transform: 'scale(0.9)',
                opacity: 0.7,
              }}
            />
          </Tooltip>
        </>
      )}
    </Text>
  );
}
