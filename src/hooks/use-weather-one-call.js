import getConfig from 'next/config';

import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const API = `https://api.openweathermap.org/data/2.5`;

const WEATHER_API = `${API}/onecall`;

const OPEN_WEATHER_API_KEY = getConfig()?.publicRuntimeConfig?.OPEN_WEATHER_API_KEY;

const useWeather = (props) => {
  const { lat, lon } = props;

  const latParam = `lat=${lat}`;
  const lonParam = `lon=${lon}`;
  const appid = `appid=${OPEN_WEATHER_API_KEY}`;
  const unites = `units=metric`;
  const lang = `lang=zh_tw`;

  const url = `${WEATHER_API}?${latParam}&${lonParam}&${unites}&${lang}&${appid}`;

  const { data } = useSWR(lat && lon ? url : null, fetcher);

  return { data };
};

export default useWeather;
