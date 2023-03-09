import axios from 'axios';
import { getAppConfigValue } from '@util/getAppConfigValue';
import { useEffect, useState } from 'react';
import { getAnalyticsUserId } from 'src/analytics';
import { useAppSelector } from '@redux/store';

export function useSuggestionsQuery() {
  const [data, setData] = useState([]);
  const searchText = useAppSelector((state) => state.search.query);

  useEffect(() => {
    const fn = async () => {
      // prettier-ignore
      const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/suggestions?userId=${getAnalyticsUserId()}&searchText=${searchText}`);
      setData(res.data);
    };

    fn();
  }, [searchText]);

  return data;
}
