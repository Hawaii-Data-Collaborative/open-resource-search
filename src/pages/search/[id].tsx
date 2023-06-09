import Head from 'next/head';
import { useAppDispatch } from 'src/redux/store';
import { fetchLocation, setCenter, setZoom } from 'src/redux/slices/location';
import { useEffect } from 'react';
import SessionStorage from '@service/sessionStorage';
import { setResults } from 'src/redux/slices/results';
import SingleResult from '@module/DetailedResult/SingleResult';
import Map from 'src/components/modules/Map/Map';
import { getAppConfigValue } from 'src/utils/getAppConfigValue';
import axios from 'axios';
import Search from 'src/components/layouts/Search/Search';
import If from '@element/If/If';
import usePageLoaded from '@hook/usePageLoaded';
// import { resultFromApi } from 'src/adapters/result';

export const getServerSideProps = async (context) => {
  let data: any = {};

  const serviceAtLocation = await axios.get(
    `${getAppConfigValue('apiUrl')}/api/v1/service-at-location/${
      context.query.id
    }`
  );
  data = serviceAtLocation.data;

  return {
    props: {
      query: context.query,
      data,
    },
  };
};

function SingleResultPage({ data, query }) {
  const dispatch = useAppDispatch();

  usePageLoaded();

  useEffect(() => {
    (async function () {
      dispatch(setResults([data]));

      if (SessionStorage.has('lastLocation')) {
        await dispatch(
          fetchLocation({ location: SessionStorage.get('lastLocation') })
        );
      }

      dispatch(
        setCenter({
          lat:
            data?.locationLat ?? getAppConfigValue('services.map.center.lat'),
          lng:
            data?.locationLon ?? getAppConfigValue('services.map.center.lon'),
        })
      );
      dispatch(setZoom(12));
    })();
  }, []);

  return (
    <Search>
      <If value={!data}>
        <Head>
          <title>
            {getAppConfigValue('brandName')} | No data available for this result
          </title>
          <meta name="description" content="No data found for this result" />
        </Head>

        <SingleResult />
      </If>

      <If value={data}>
        <Head>
          <title>
            {getAppConfigValue('brandName')} | {data.title}
          </title>
          <meta name="description" content={data.description} />
        </Head>

        <SingleResult data={data} query={query} />
      </If>

      <Map />
    </Search>
  );
}

export default SingleResultPage;
