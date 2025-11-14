import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from 'date-fns';

/**
 * Format a date as YYYY-MM-DD for storage keys
 */
export const formatDateKey = (date) => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Format a date for display
 */
export const formatDisplayDate = (date, formatStr = 'MMMM d, yyyy') => {
  return format(date, formatStr);
};

/**
 * Get all days to display in calendar grid
 */
export const getCalendarDays = (date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = [];
  let currentDay = calendarStart;

  while (currentDay <= calendarEnd) {
    days.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  return days;
};

/**
 * Check if a date is in the current month
 */
export const isDateInMonth = (date, currentMonth) => {
  return isSameMonth(date, currentMonth);
};

/**
 * Check if two dates are the same day
 */
export const isSameDayAs = (date1, date2) => {
  return isSameDay(date1, date2);
};

/**
 * Check if a date is today
 */
export const isTodayDate = (date) => {
  return isToday(date);
};

/**
 * Navigate to next/previous month
 */
export const navigateMonth = (date, direction) => {
  return addMonths(date, direction);
};

/**
 * Parse a date key back to Date object
 */
export const parseDateKey = (dateKey) => {
  return parseISO(dateKey);
};

/**
 * Get week day names
 */
export const getWeekDays = () => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};

/**
 * Get date range for weather forecast (next 5 days)
 */
export const getWeatherDateRange = () => {
  const today = new Date();
  const dates = [];
  
  for (let i = 0; i < 5; i++) {
    dates.push(addDays(today, i));
  }
  
  return dates;
};

/**
 * Check if a date is within weather forecast range
 */
export const isInWeatherRange = (date) => {
  const today = new Date();
  const fiveDaysFromNow = addDays(today, 5);
  
  return date >= today && date <= fiveDaysFromNow;
};

/**
 * Format time for display
 */
export const formatTime = (date, formatStr = 'h:mm a') => {
  return format(date, formatStr);
};

/**
 * Get month and year display string
 */
export const getMonthYearString = (date) => {
  return format(date, 'MMMM yyyy');
};
