import { useCalendar } from '../../contexts/CalendarContext';
import { useEvents } from '../../hooks/useEvents';
import { WeatherWidget } from '../Weather/WeatherWidget';
import { EventCard } from '../Events/EventCard';
import { isDateInMonth, isTodayDate } from '../../utils/dateHelpers';
import clsx from 'clsx';

export const CalendarDay = ({ date, currentMonth, weatherData, onDayClick }) => {
  const { setSelectedDate } = useCalendar();
  const { getEventsForDate } = useEvents();

  const isCurrentMonth = isDateInMonth(date, currentMonth);
  const isToday = isTodayDate(date);
  const events = getEventsForDate(date);
  const visibleEvents = events.slice(0, 3);
  const moreCount = events.length - visibleEvents.length;

  const handleClick = () => {
    setSelectedDate(date);
    onDayClick(date);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'relative min-h-[100px] p-2 border rounded-lg cursor-pointer transition-all duration-200',
        'hover:shadow-md hover:-translate-y-0.5',
        {
          'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700': isCurrentMonth,
          'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 opacity-50': !isCurrentMonth,
          'ring-2 ring-primary border-primary': isToday,
        }
      )}
    >
      {/* Weather Widget */}
      {weatherData && <WeatherWidget date={date} weatherData={weatherData} />}

      {/* Day Number */}
      <div
        className={clsx(
          'text-sm font-medium mb-1',
          {
            'text-gray-900 dark:text-gray-100': isCurrentMonth,
            'text-gray-400 dark:text-gray-600': !isCurrentMonth,
            'text-primary font-bold': isToday,
          }
        )}
      >
        {date.getDate()}
      </div>

      {/* Events */}
      <div className="space-y-1">
        {visibleEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            draggable={false}
          />
        ))}
        
        {moreCount > 0 && (
          <div className="text-xs text-center py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400">
            +{moreCount} more
          </div>
        )}
      </div>
    </div>
  );
};
