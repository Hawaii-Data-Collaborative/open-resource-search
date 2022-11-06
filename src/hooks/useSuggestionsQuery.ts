import axios from 'axios';
import { getAppConfigValue } from '@util/getAppConfigValue';
import { useEffect, useState } from 'react';

let _data = [];

export function useSuggestionsQuery() {
  const [data, setData] = useState(_data);

  useEffect(() => {
    const fn = async () => {
      const res = await axios.get(
        `${getAppConfigValue('apiUrl')}/api/v1/suggestion`
      );
      _data = res.data;
      setData(res.data);
    };

    if (!data.length) {
      fn();
    }
  }, []);

  return data;
}
