import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useCalendar } from '../../contexts/CalendarContext';
import { DarkModeToggle } from '../UI/DarkModeToggle';
import { getMonthYearString } from '../../utils/dateHelpers';

export const CalendarHeader = () => {
  const { currentDate, navigateMonth, goToToday } = useCalendar();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between">
        {/* Month Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h1 className="text-2xl font-bold min-w-[200px] text-center">
            {getMonthYearString(currentDate)}
          </h1>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Today
          </button>
          
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
};
