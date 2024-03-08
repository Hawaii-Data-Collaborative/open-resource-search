import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CloseOutlined, MenuOutlined } from '@mui/icons-material'
import Link from '../../elements/Link'
import { THEME_CONSTANTS as theme } from '../../../constants'
import { getAppConfigValue, link } from '../../../utils'
import { useBannerQuery, useAuthContext } from '../../../hooks'
import * as Styles from './Header.styles'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const banner = useBannerQuery()
  const { user } = useAuthContext()

  const divider = (
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
              Home
            </Link>

            {divider}

            <Link to="https://auw211.org/" variant="normal" color="primary">
              Main Site
            </Link>

            {user ? (
              <>
                {divider}

                <Link to="/profile" variant="normal" color="primary">
                  Profile
                </Link>

                {divider}

                <Link to="/profile/favorites" variant="normal" color="primary">
                  Favorites
                </Link>
              </>
            ) : (
              <>
                {divider}

                <Link to="/login" variant="normal" color="primary">
                  Log in
                </Link>

                {divider}

                <Link to="/signup" variant="normal" color="primary">
                  Sign up
                </Link>
              </>
            )}
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
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Link
                    to={getAppConfigValue('homeUrl') || link('/')}
                    rel="noreferrer"
                    variant="normal"
                    color="primary"
                  >
                    Home
                  </Link>

                  <span
                    style={{
                      backgroundColor: theme.PRIMARY_COLOR,
                      marginTop: '1rem',
                      marginBottom: '1rem',
                      width: 24,
                      height: 1
                    }}
                  ></span>

                  <Link to="https://auw211.org/" variant="normal" color="primary">
                    Main Site
                  </Link>
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
