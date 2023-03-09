import React, { useRef } from 'react';
import { useAppSelector } from 'src/redux/store';
import { useRouter } from 'next/router';

import FeedbackMargin from '../FeedbackButton/FeedbackMargin';
import { StyledResults } from './Results.styles';
import ResultCountBar from './ResultCountBar/ResultCountBar';
import ResultsLoader from './ResultsLoader/ResultsLoader';
import Search from '@module/Search/Search';
import { Box } from 'src/components/elements/Box/Box';
import { Text } from 'src/components/elements/Text/Text';

export default function Results({ hideSearch }) {
  const router = useRouter();
  const scrollParent = useRef();
  const results = useAppSelector((state) => state.results);
  const location = useAppSelector((state) => state.location);
  const taxonomies = useAppSelector((state) => state.search.taxonomies);

  return (
    <StyledResults ref={scrollParent}>
      {!hideSearch && (
        <Box
          padding="16px 16px 0px"
          backgroundColor="#ECE9F1"
          position="relative"
        >
          <Search variant="filled" />

          {router.query.taxonomies != null &&
            router.query.taxonomies.length > 0 && (
              <>
                <Text
                  color="textSecondary"
                  minHeight={22}
                  maxHeight={70}
                  overflow="hidden"
                  fontSize={13}
                  lineHeight={1.4}
                  paddingBottom="2px"
                  paddingTop="5px"
                >
                  {`Taxonomy Search: ${taxonomies}`}
                </Text>
                <div
                  style={{
                    width: '100%',
                    height: 30,
                    background:
                      'linear-gradient(#ECE9F100 0%, #ECE9F133 40%, #ECE9F166 60%, #ECE9F1FF 100%)',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    pointerEvents: 'none',
                  }}
                />
              </>
            )}
        </Box>
      )}

      <ResultCountBar results={results} />
      <ResultsLoader results={results} location={location} />
      <FeedbackMargin />
    </StyledResults>
  );
}
