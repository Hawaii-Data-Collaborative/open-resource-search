import color from 'color'
import { useEffect } from 'react'
import InfoIcon from '@mui/icons-material/Info'
import { useMeta, usePageLoaded, useTitle } from '../../hooks'
import { useAppDispatch } from '../../redux/store'
import { sessionStorage } from '../../services'
import { setLocation } from '../../redux/slices/search'
import { getAppConfigValue, getTextColorContrast, link } from '../../utils'
import { DefaultLayout } from '../layouts'
import { Box, Flex, If, Link, Text } from '../elements'
import { THEME_CONSTANTS as theme } from '../../constants'
import Search from '../modules/Search/Search'
import AlertSearch from '../modules/AlertSearch/AlertSearch'
import Categories from '../modules/Categories/Categories'

export default function HomePage() {
  useTitle(getAppConfigValue('brandName'))
  useMeta({ name: 'description', content: getAppConfigValue('meta.description') })
  usePageLoaded()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (sessionStorage.has('lastLocation')) {
      dispatch(setLocation(sessionStorage.get('lastLocation')))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DefaultLayout>
      <Flex
        background={`url(${link('/hero.png')}) center bottom / cover`}
        maxWidth={1400}
        margin="0 auto"
        minHeight="35vw"
        padding="16px"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          maxWidth={840}
          minWidth={[320, 600]}
          padding="16px"
          borderRadius={theme.BORDER_RADIUS}
          backgroundColor={color(theme.PRIMARY_COLOR).alpha(0.9).string()}
        >
          <Text
            variant="h1"
            style={{
              color: getTextColorContrast(color(theme.PRIMARY_COLOR).alpha(0.9).string())
            }}
            marginBottom="16px"
          >
            {getAppConfigValue('search.title')}
          </Text>

          <Search />

          <div>
            <Text color="textPrimary" marginTop="8px" display="flex" alignItems="center" fontSize="90%">
              <InfoIcon style={{ marginRight: 5 }} fontSize="small" />
              <Link
                to="https://auw211.org/tips-for-search/"
                rel="noreferrer noopener"
                variant="normal"
                color="textPrimary"
                target="_blank"
                style={{
                  textDecoration: 'underline'
                }}
                external
              >
                Search tips
              </Link>
            </Text>
          </div>

          <If value={getAppConfigValue('search.subtitle')}>
            <Text color="textPrimary" marginTop="15px" fontWeight={300} fontSize="90%">
              {getAppConfigValue('search.subtitle')}
              {getAppConfigValue('search.subtitleUrlText') && ' '}
              {getAppConfigValue('search.subtitleUrl') && getAppConfigValue('search.subtitleUrlText') && (
                <Link
                  to={getAppConfigValue('search.subtitleUrl')}
                  rel="noreferrer noopener"
                  variant="normal"
                  color="textPrimary"
                  style={{
                    textDecoration: 'underline'
                  }}
                  external
                >
                  {getAppConfigValue('search.subtitleUrlText')}
                </Link>
              )}
            </Text>
          </If>

          <Text color="textPrimary" fontWeight={300} fontSize="90%">
            Providers:{' '}
            <Link
              to="https://auw211.org/providers/#new-agency"
              rel="noreferrer noopener"
              variant="normal"
              color="textPrimary"
              target="_blank"
              style={{
                textDecoration: 'underline'
              }}
              external
            >
              Click here
            </Link>{' '}
            to add your programs to the 211 database.
          </Text>
        </Box>
      </Flex>

      <AlertSearch />

      <Categories />
    </DefaultLayout>
  )
}
