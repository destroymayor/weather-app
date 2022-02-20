import { iconMapping } from '@/components/shared/WeatherIcons';
import { HumidityIcon, WindIcon } from '@/components/shared/Icons';

export default function CurrentForecast(props) {
  const { name = '', data } = props;

  const temp = `${Math.round(data?.temp)}°` ?? 'N/A';
  const icon = iconMapping[data?.weather?.[0]?.icon] ?? '';
  const weatherDescription = data?.weather?.[0]?.description ?? '';

  const windSpeed = `${Math.round(data?.wind_speed)} m/s` ?? 'N/A';
  const humidity = `${Math.round(data?.humidity)}%` ?? 'N/A';

  if (!data) return <div className="flex justify-center pt-6">查無天氣資訊</div>;

  return (
    <div className="flex flex-col">
      <h1 className="px-4 text-2xl">{name}</h1>
      <div className="flex flex-col items-center">
        <div>{icon}</div>
        <div>{weatherDescription}</div>
        <div className="text-6xl">{temp}</div>

        <div className="flex flex-col items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <WindIcon />
              <span>{windSpeed}</span>
            </div>

            <div className="flex items-center gap-1">
              <HumidityIcon />
              <span>{humidity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
