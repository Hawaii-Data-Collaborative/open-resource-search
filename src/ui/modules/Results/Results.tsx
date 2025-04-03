import { useRef } from 'react'
import debugInit from 'debug'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../../redux/store'
import FeedbackMargin from '../FeedbackButton/FeedbackMargin'
import { StyledResults } from './Results.styles'
import ResultCountBar from './ResultCountBar'
import ResultsLoader from './ResultsLoader'
import Search from '../../modules/Search/Search'
import { Box } from '../../elements/Box'
import { Text } from '../../elements/Text'
import { AdvancedFilters } from './AdvancedFilters'
import { t } from '../../../labels'

const debug = debugInit('app:ui:Results')

export default function Results({ hideSearch }) {
  const l = useLocation()
  const scrollParent = useRef()
  const results = useAppSelector(state => state.results)
  const location = useAppSelector(state => state.location)
  const taxonomies = useAppSelector(state => state.search.taxonomies)
  const params = new URLSearchParams(l.search)

  debug('rendering')

  return (
    <>
      <AdvancedFilters />
      <StyledResults ref={scrollParent}>
        {!hideSearch && (
          <Box padding="16px 16px 0px" backgroundColor="#ECE9F1" position="relative">
            <Search variant="filled" />

            {params.get('taxonomies') != null && params.get('taxonomies').length > 0 && (
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
                  {`${t('Taxonomy Search:')} ${taxonomies}`}
                </Text>
                <div
                  style={{
                    width: '100%',
                    height: 30,
                    background: 'linear-gradient(#ECE9F100 0%, #ECE9F133 40%, #ECE9F166 60%, #ECE9F1FF 100%)',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    pointerEvents: 'none'
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
    </>
  )
}
