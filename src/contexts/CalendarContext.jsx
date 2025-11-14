import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadEvents, saveEvents, loadTags, saveTags } from '../services/eventStorage';
import { formatDateKey } from '../utils/dateHelpers';
import { generateEventId, sanitizeEvent, getAllTags } from '../utils/eventHelpers';

const CalendarContext = createContext();

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within CalendarProvider');
  }
  return context;
};

export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Load data on mount
  useEffect(() => {
    const loadedEvents = loadEvents();
    const loadedTags = loadTags();
    setEvents(loadedEvents);
    setTags(loadedTags);
  }, []);

  // Save events when they change
  useEffect(() => {
    saveEvents(events);
  }, [events]);

  // Save tags when they change
  useEffect(() => {
    saveTags(tags);
  }, [tags]);

  // Add event
  const addEvent = useCallback((date, eventData) => {
    const dateKey = formatDateKey(date);
    const newEvent = sanitizeEvent({
      ...eventData,
      id: generateEventId(),
    });

    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newEvent],
    }));

    // Add new tags
    if (eventData.tags && eventData.tags.length > 0) {
      setTags((prev) => {
        const newTags = eventData.tags.filter((tag) => !prev.includes(tag));
        return [...prev, ...newTags];
      });
    }

    return newEvent;
  }, []);

  // Update event
  const updateEvent = useCallback((date, eventId, eventData) => {
    const dateKey = formatDateKey(date);
    
    setEvents((prev) => {
      const dateEvents = prev[dateKey] || [];
      const updatedEvents = dateEvents.map((event) =>
        event.id === eventId ? sanitizeEvent({ ...event, ...eventData }) : event
      );
      
      return {
        ...prev,
        [dateKey]: updatedEvents,
      };
    });

    // Update tags
    if (eventData.tags && eventData.tags.length > 0) {
      setTags((prev) => {
        const allEventTags = getAllTags(events);
        const newTags = [...new Set([...prev, ...eventData.tags])];
        return newTags;
      });
    }
  }, [events]);

  // Delete event
  const deleteEvent = useCallback((date, eventId) => {
    const dateKey = formatDateKey(date);
    
    setEvents((prev) => {
      const dateEvents = prev[dateKey] || [];
      const filteredEvents = dateEvents.filter((event) => event.id !== eventId);
      
      if (filteredEvents.length === 0) {
        const { [dateKey]: removed, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [dateKey]: filteredEvents,
      };
    });
  }, []);

  // Move event to different date
  const moveEvent = useCallback((fromDate, toDate, eventId) => {
    const fromKey = formatDateKey(fromDate);
    const toKey = formatDateKey(toDate);

    if (fromKey === toKey) return;

    setEvents((prev) => {
      const fromEvents = prev[fromKey] || [];
      const event = fromEvents.find((e) => e.id === eventId);
      
      if (!event) return prev;

      const updatedFromEvents = fromEvents.filter((e) => e.id !== eventId);
      const updatedToEvents = [...(prev[toKey] || []), event];

      const newState = { ...prev };
      
      if (updatedFromEvents.length === 0) {
        delete newState[fromKey];
      } else {
        newState[fromKey] = updatedFromEvents;
      }
      
      newState[toKey] = updatedToEvents;

      return newState;
    });
  }, []);

  // Get events for a specific date
  const getEventsForDate = useCallback((date) => {
    const dateKey = formatDateKey(date);
    return events[dateKey] || [];
  }, [events]);

  // Navigate month
  const navigateMonth = useCallback((direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  }, []);

  // Go to today
  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // Toggle tag filter
  const toggleTagFilter = useCallback((tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      return [...prev, tag];
    });
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedCategory('all');
  }, []);

  // Add tag
  const addTag = useCallback((tag) => {
    const normalizedTag = tag.trim().toLowerCase();
    if (normalizedTag && !tags.includes(normalizedTag)) {
      setTags((prev) => [...prev, normalizedTag]);
    }
  }, [tags]);

  // Remove tag
  const removeTag = useCallback((tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const value = {
    // State
    currentDate,
    events,
    tags,
    selectedDate,
    selectedEvent,
    searchQuery,
    selectedTags,
    selectedCategory,

    // Setters
    setSelectedDate,
    setSelectedEvent,
    setSearchQuery,
    setSelectedCategory,

    // Event operations
    addEvent,
    updateEvent,
    deleteEvent,
    moveEvent,
    getEventsForDate,

    // Navigation
    navigateMonth,
    goToToday,

    // Filtering
    toggleTagFilter,
    clearFilters,

    // Tags
    addTag,
    removeTag,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
