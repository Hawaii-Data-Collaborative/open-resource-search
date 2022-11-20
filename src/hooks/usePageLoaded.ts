import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { logEvent } from 'src/analytics';

export function usePageLoaded() {
  const router = useRouter();

  const url = router.asPath;

  useEffect(() => {
    setTimeout(() => {
      logEvent('PageLoad', {
        url,
        pageTitle: window.document.title,
      });
    }, 500);
  }, []);
}

export default usePageLoaded;
