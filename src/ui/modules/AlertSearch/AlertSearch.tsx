import Text from '../../elements/Text'
import Link from '../../elements/Link'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { setQuery } from '../../../redux/slices/search'
import { AlertsContainer, Container } from './AlertSearch.styles'
import { getAppConfigValue } from '../../../utils'

export default function AlertSearch() {
  const dispatch = useAppDispatch()
  const location = useAppSelector(state => state.search.location)
  let href

  if (getAppConfigValue('alertSearch.text') == null) return null

  function clearQuery() {
    dispatch(setQuery(''))
  }

  const url = getAppConfigValue('alertSearch.url')
  if (url != null) {
    href = url
  }

  if (href != null && location != null && location.length > 0) {
    href += `&location=${location}`
  }

  return (
    <Container>
      <AlertsContainer>
        <Text variant="h2" paddingRight="8px">
          {getAppConfigValue('alertSearch.text')}
        </Text>

        {href != null && (
          <Link onClick={clearQuery} to={href} variant="button" color="primary">
            {getAppConfigValue('alertSearch.buttonText') || 'Click here!'}
          </Link>
        )}
      </AlertsContainer>
    </Container>
  )
}
