import { formatDateKey } from '../../utils/dateHelpers';

export const WeatherWidget = ({ date, weatherData }) => {
  const dateKey = formatDateKey(date);
  const weather = weatherData[dateKey];

  if (!weather) return null;

  return (
    <div
      className="absolute top-1 right-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-md px-2 py-1 text-xs flex items-center gap-1 shadow-sm border border-gray-200 dark:border-gray-700 z-10"
      title={`${weather.description} - Feels like ${weather.feelsLike}°C`}
    >
      <span className="text-base">{weather.icon}</span>
      <span className="font-medium">{weather.temp}°C</span>
    </div>
  );
};
