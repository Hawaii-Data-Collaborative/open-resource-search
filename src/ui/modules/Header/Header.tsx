import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Box } from '@mui/material'
import { CloseOutlined, MenuOutlined } from '@mui/icons-material'
import Link from '../../elements/Link'
import { THEME_CONSTANTS as theme } from '../../../constants'
import { getAppConfigValue, link } from '../../../utils'
import { useBannerQuery, useAuthContext, useAppContext } from '../../../hooks'
import * as Styles from './Header.styles'
import { LanguageSelector } from './LanguageSelector'
import { t } from '../../../labels'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const banner = useBannerQuery()
  const { setAppState } = useAppContext()
  const { user } = useAuthContext()

  const onFavClick = e => {
    e.preventDefault()
    setAppState({ modal: 'LOGIN_PROMPT' })
  }

  const desktopDivider = (
    <span
      style={{
        backgroundColor: theme.PRIMARY_COLOR,
        marginLeft: '1rem',
        marginRight: '1rem',
        width: 1,
        height: 24
      }}
    />
  )

  return (
    <>
      <Styles.StyledHeader>
        <Styles.StyledContainer>
          <RouterLink to={link('/')}>
            <span style={{ lineHeight: 0 }}>
              <Styles.StyledImage src={link('/logo.svg')} alt="Go back to search home page" />
            </span>
          </RouterLink>

          <Styles.VisibleOnMobile>
            <button
              onClick={() => setIsOpen(prev => !prev)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {isOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </Styles.VisibleOnMobile>
        </Styles.StyledContainer>

        <Styles.HiddenOnMobile>
          <>
            <Link to={getAppConfigValue('homeUrl') || link('/')} rel="noreferrer" variant="normal" color="primary">
              {t('Home')}
            </Link>

            {desktopDivider}

            <Link to="https://auw211.org/" variant="normal" color="primary" external>
              {t('Main Site')}
            </Link>

            {user ? (
              <>
                {desktopDivider}

                <Link to={link('/profile')} variant="normal" color="primary">
                  {t('Profile')}
                </Link>

                {desktopDivider}

                <Link to={link('/profile/favorites')} variant="normal" color="primary">
                  {t('Favorites')}
                </Link>
              </>
            ) : (
              <>
                {desktopDivider}

                <Link to={link('/profile/favorites')} variant="normal" color="primary" onClick={onFavClick}>
                  {t('Favorites')}
                </Link>

                {desktopDivider}

                <Link to={link('/login')} variant="normal" color="primary">
                  {t('Log in')}
                </Link>

                {desktopDivider}

                <Link to={link('/signup')} variant="normal" color="primary">
                  {t('Sign up')}
                </Link>
              </>
            )}

            <Box pl={2}>
              <LanguageSelector />
            </Box>
          </>
        </Styles.HiddenOnMobile>

        <Styles.VisibleOnMobile style={{ width: '100%' }}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ maxHeight: 0, overflow: 'hidden' }}
                animate={{
                  maxHeight: 300
                }}
                transition={{ duration: 0.3 }}
                exit={{ maxHeight: 0, overflow: 'hidden' }}
                style={{
                  width: '100%',
                  marginBottom: '1rem',
                  overflow: 'unset'
                }}
              >
                <div
                  style={{
                    marginTop: '1rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch'
                  }}
                >
                  <Link
                    to={getAppConfigValue('homeUrl') || link('/')}
                    rel="noreferrer"
                    variant="normal"
                    color="primary"
                    style={{ paddingTop: 10, paddingBottom: 10 }}
                  >
                    {t('Home')}
                  </Link>

                  <Link
                    to="https://auw211.org/"
                    variant="normal"
                    color="primary"
                    style={{ paddingTop: 10, paddingBottom: 10 }}
                    external
                  >
                    {t('Main Site')}
                  </Link>

                  {user ? (
                    <>
                      <Link
                        to={link('/profile')}
                        variant="normal"
                        color="primary"
                        style={{ paddingTop: 10, paddingBottom: 10 }}
                      >
                        {t('Profile')}
                      </Link>

                      <Link
                        to={link('/profile/favorites')}
                        variant="normal"
                        color="primary"
                        style={{ paddingTop: 10, paddingBottom: 10 }}
                      >
                        {t('Favorites')}
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={link('/profile/favorites')}
                        variant="normal"
                        color="primary"
                        style={{ paddingTop: 10, paddingBottom: 10 }}
                        onClick={onFavClick}
                      >
                        {t('Favorites')}
                      </Link>

                      <Link
                        to={link('/login')}
                        variant="normal"
                        color="primary"
                        style={{ paddingTop: 10, paddingBottom: 10 }}
                      >
                        {t('Log in')}
                      </Link>

                      <Link
                        to={link('/signup')}
                        variant="normal"
                        color="primary"
                        style={{ paddingTop: 10, paddingBottom: 10 }}
                      >
                        {t('Sign up')}
                      </Link>
                    </>
                  )}

                  <Box>
                    <LanguageSelector mobile />
                  </Box>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Styles.VisibleOnMobile>
      </Styles.StyledHeader>

      {banner?.text ? (
        <Styles.StyledBanner>
          <a href={banner.link} target="_blank" rel="noreferrer">
            {banner.text}
          </a>
        </Styles.StyledBanner>
      ) : null}
    </>
  )
}
