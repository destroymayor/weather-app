import Head from 'next/head';

import { useState } from 'react';

import clsx from 'clsx';
import useDebounce from '@/hooks/use-debounce';
import useWeatherOneCall from '@/hooks/use-weather-one-call';
import useGeocodingAPI from '@/hooks/use-geocoding-api';

import SearchSelect from '@/components/shared/SearchSelect';
import CurrentForecast from '@/components/CurrentForecast';
import HourlyForecast from '@/components/HourlyForecast';
import DailyForecast from '@/components/DailyForecast';
import colorMapping from '@/utils/color-mapping';

export default function Home() {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectLocation, setSelectLocation] = useState({ name: null, lat: null, lon: null });

  const debouncedLocation = useDebounce(searchLocation, 500);
  const { data: geoData } = useGeocodingAPI(debouncedLocation);

  const { data: weatherOneCallData } = useWeatherOneCall({
    lat: selectLocation?.lat,
    lon: selectLocation?.lon,
  });

  const getCurrentWeatherIcon = weatherOneCallData?.current?.weather?.[0]?.icon;
  const containerBgColor = colorMapping?.[getCurrentWeatherIcon]?.containerBgColor ?? 'bg-gray-400';
  const mainBgColor = colorMapping?.[getCurrentWeatherIcon]?.mainBgColor ?? 'bg-gray-500';
  const mainTextColor = colorMapping?.[getCurrentWeatherIcon]?.color ?? 'text-gray-100';

  return (
    <div
      className={clsx(`${containerBgColor}`, 'flex min-h-screen justify-center bg-gradient-to-r')}
    >
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={clsx(
          `${mainBgColor}`,
          `${mainTextColor}`,
          'm-2 flex max-h-[650px] min-w-[400px] max-w-[400px] flex-col gap-4 overflow-hidden rounded-2xl bg-gradient-to-b shadow-2xl '
        )}
      >
        <div className="px-3 pt-3">
          <SearchSelect
            options={geoData}
            loading={!geoData}
            value={searchLocation}
            onSearch={(value) => setSearchLocation(value)}
            onSelect={(value) =>
              setSelectLocation({ name: value?.local_names?.zh, lat: value.lat, lon: value.lon })
            }
            renderItem={({ option }) => (
              <span>
                {option.name} - {option.state} ({option.country})
              </span>
            )}
          />
        </div>
        <div className="overflow-y-auto">
          <CurrentForecast name={selectLocation.name} data={weatherOneCallData?.current} />
          <HourlyForecast data={weatherOneCallData?.hourly} />
          <DailyForecast data={weatherOneCallData?.daily} />
        </div>
      </main>
    </div>
  );
}
