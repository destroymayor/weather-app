import dayjs from 'dayjs';

import iconMapping from '@/components/shared/Icons';

export default function DailyForecast(props) {
  const { data } = props;

  if (!data) return null;

  return (
    <div className="m-2 rounded-md p-2">
      <h2 className="border-b border-gray-400 pb-1">一週預報</h2>
      <div className="overflow-hidden">
        <ul className="flex gap-2 overflow-x-auto py-2">
          {data?.map((item, index) => {
            const rainRate =
              Math.round(item.pop * 100) > 0 ? `${Math.round(item.pop * 100)}%` : null;
            return (
              <li
                key={`${index}`}
                className="flex flex-col items-center gap-4 rounded-md bg-slate-300 bg-opacity-60 p-4"
              >
                <div className="flex-[0.5]">
                  {dayjs(new Date(dayjs().add(index, 'day'))).format('MM/DD')}
                </div>
                <div className="flex flex-[0.5] items-center justify-center gap-2">
                  {iconMapping[item?.weather?.[0]?.icon]}
                  <div className="text-sm text-blue-500">{rainRate}</div>
                </div>
                <div className="text-">{Math.round(item?.temp?.day)}°</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
