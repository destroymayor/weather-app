import getConfig from 'next/config';

import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const API = `https://api.openweathermap.org/geo/1.0/`;

const GEO_API = `${API}/direct`;

const OPEN_WEATHER_API_KEY = getConfig()?.publicRuntimeConfig?.OPEN_WEATHER_API_KEY;

const useGeocodingAPI = (locationName) => {
  const q = `q=${locationName}`;
  const limit = `limit=10`;
  const appid = `appid=${OPEN_WEATHER_API_KEY}`;

  const url = `${GEO_API}?${q}&${limit}&${appid}`;

  const { data } = useSWR(locationName ? url : null, fetcher);

  return { data };
};

export default useGeocodingAPI;
