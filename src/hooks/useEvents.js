import { useMemo } from 'react';
import { useCalendar } from '../contexts/CalendarContext';
import {
  filterEventsBySearch,
  filterEventsByCategory,
  filterEventsByTags,
} from '../utils/eventHelpers';

/**
 * Custom hook for event operations with filtering
 */
export const useEvents = () => {
  const {
    events,
    searchQuery,
    selectedCategory,
    selectedTags,
    addEvent,
    updateEvent,
    deleteEvent,
    moveEvent,
    getEventsForDate,
  } = useCalendar();

  // Get filtered events for all dates
  const filteredEvents = useMemo(() => {
    const filtered = {};

    Object.keys(events).forEach((dateKey) => {
      let dateEvents = events[dateKey];

      // Apply search filter
      dateEvents = filterEventsBySearch(dateEvents, searchQuery);

      // Apply category filter
      dateEvents = filterEventsByCategory(dateEvents, selectedCategory);

      // Apply tag filter
      dateEvents = filterEventsByTags(dateEvents, selectedTags);

      if (dateEvents.length > 0) {
        filtered[dateKey] = dateEvents;
      }
    });

    return filtered;
  }, [events, searchQuery, selectedCategory, selectedTags]);

  // Get filtered events for a specific date
  const getFilteredEventsForDate = (date) => {
    let dateEvents = getEventsForDate(date);

    // Apply filters
    dateEvents = filterEventsBySearch(dateEvents, searchQuery);
    dateEvents = filterEventsByCategory(dateEvents, selectedCategory);
    dateEvents = filterEventsByTags(dateEvents, selectedTags);

    return dateEvents;
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery.trim().length > 0 ||
      selectedCategory !== 'all' ||
      selectedTags.length > 0
    );
  }, [searchQuery, selectedCategory, selectedTags]);

  // Get total event count
  const totalEvents = useMemo(() => {
    return Object.values(events).reduce((sum, dateEvents) => sum + dateEvents.length, 0);
  }, [events]);

  // Get filtered event count
  const filteredEventCount = useMemo(() => {
    return Object.values(filteredEvents).reduce(
      (sum, dateEvents) => sum + dateEvents.length,
      0
    );
  }, [filteredEvents]);

  return {
    events: filteredEvents,
    allEvents: events,
    addEvent,
    updateEvent,
    deleteEvent,
    moveEvent,
    getEventsForDate: getFilteredEventsForDate,
    hasActiveFilters,
    totalEvents,
    filteredEventCount,
  };
};
