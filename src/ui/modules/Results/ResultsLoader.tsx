import Result from '../Result/Hit'
import { t } from '../../../labels'
export default function ResultsLoader({ results, location }) {
  return (
    <>
      {results.isLoading &&
        [0, 1, 2, 3, 4, 5].map(i => {
          return <Result key={i} />
        })}

      {results?.data?.map(result => {
        return <Result key={result.id} hit={result} location={location} />
      })}

      {!results.isLoading && !results?.data?.length ? (
        <div
          style={{
            padding: 20,
            paddingTop: 50,
            color: '#999',
            fontSize: 14,
            maxWidth: 300,
            margin: 'auto',
            textAlign: 'center'
          }}
        >
          {t("No results. If you are having a hard time finding what you're looking for,")}
          <a href="https://auw211.org/tips-for-search/" target="_blank" rel="noreferrer noopener">
            {t('check out our tips page')}
          </a>{' '}
          {t('or call 211.')}
        </div>
      ) : null}
    </>
  )
}
