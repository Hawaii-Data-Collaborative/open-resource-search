import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAppConfigValue } from '@util/getAppConfigValue';

export function useCategoriesQuery() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fn = async () => {
      // prettier-ignore
      const res = await axios.get(`${getAppConfigValue('apiUrl')}/api/v1/categories`);
      setData(res.data);
    };

    fn();
  }, []);

  return data;
}
