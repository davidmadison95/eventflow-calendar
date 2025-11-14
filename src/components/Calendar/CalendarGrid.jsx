import { CalendarDay } from './CalendarDay';
import { getCalendarDays, getWeekDays } from '../../utils/dateHelpers';

export const CalendarGrid = ({ currentMonth, weatherData, onDayClick }) => {
  const weekDays = getWeekDays();
  const calendarDays = getCalendarDays(currentMonth);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      {/* Week Day Labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date) => (
          <CalendarDay
            key={date.toISOString()}
            date={date}
            currentMonth={currentMonth}
            weatherData={weatherData}
            onDayClick={onDayClick}
          />
        ))}
      </div>
    </div>
  );
};
