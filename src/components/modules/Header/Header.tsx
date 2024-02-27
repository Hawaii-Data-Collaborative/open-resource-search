import { useState } from 'react'
import NextLink from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CloseOutlined, MenuOutlined } from '@mui/icons-material'
import Link from 'src/components/elements/Link/Link'
import theme from 'src/constants/theme'

import * as Styles from './Header.styles'
import { getAppConfigValue } from 'src/utils/getAppConfigValue'
import { useBannerQuery } from '@hook/useBannerQuery'
import { useAuthContext } from 'src/hooks'
import { link } from '@util/stringUtil'

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
          <NextLink href="/" passHref>
            <span style={{ lineHeight: 0 }}>
              <Styles.StyledImage src={link('/logo.svg')} alt="Go back to search home page" />
            </span>
          </NextLink>

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
            <Link href={getAppConfigValue('homeUrl') || '/'} rel="noreferrer" variant="normal" color="primary">
              Home
            </Link>

            {divider}

            <Link href="https://auw211.org/" variant="normal" color="primary">
              Main Site
            </Link>

            {user ? (
              <>
                {divider}

                <Link href="/profile" variant="normal" color="primary">
                  Profile
                </Link>

                {divider}

                <Link href="/profile/favorites" variant="normal" color="primary">
                  Favorites
                </Link>
              </>
            ) : (
              <>
                {divider}

                <Link href="/login" variant="normal" color="primary">
                  Log in
                </Link>

                {divider}

                <Link href="/signup" variant="normal" color="primary">
                  Sign up
                </Link>
              </>
            )}
          </>
        </Styles.HiddenOnMobile>

        <Styles.VisibleOnMobile style={{ width: '100%' }}>
          {/* @ts-expect-error it's fine */}
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
                  <Link href={getAppConfigValue('homeUrl') || '/'} rel="noreferrer" variant="normal" color="primary">
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

                  <Link href="https://auw211.org/" variant="normal" color="primary">
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
