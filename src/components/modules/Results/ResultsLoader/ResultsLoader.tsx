import Result from '../../Result/Hit';

export default function ResultsLoader({ results, location }) {
  return (
    <>
      {results.isLoading &&
        [0, 1, 2, 3, 4, 5].map((i) => {
          return <Result key={i} />;
        })}

      {results?.data?.map((result) => {
        return (
          <Result
            key={result.id}
            hit={result}
            score={result?._score}
            location={location}
          />
        );
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
            textAlign: 'center',
          }}
        >
          No results. If you are having a hard time finding what you're looking
          for, call 211.
        </div>
      ) : null}
    </>
  );
}
