import NextLink from 'next/link';

import * as Styles from './Header.styles';
import { useBannerQuery } from '@hook/useBannerQuery';

export default function Header() {
  const banner = useBannerQuery();

  return (
    <>
      <Styles.StyledHeader>
        <Styles.StyledContainer>
          <NextLink href="/" passHref>
            {/* eslint-disable-next-line */}
            <a style={{ lineHeight: 0 }}>
              <Styles.StyledImage
                src="/logo.svg"
                alt="Go back to search home page"
              />
            </a>
          </NextLink>
        </Styles.StyledContainer>
      </Styles.StyledHeader>

      {banner?.text ? (
        <Styles.StyledBanner>
          <a href={banner.link} target="_blank" rel="noreferrer">
            {banner.text}
          </a>
        </Styles.StyledBanner>
      ) : null}
    </>
  );
}
