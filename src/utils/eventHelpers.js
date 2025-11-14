/**
 * Event category definitions
 */
export const EVENT_CATEGORIES = {
  work: { label: 'Work', color: 'event-work' },
  personal: { label: 'Personal', color: 'event-personal' },
  important: { label: 'Important', color: 'event-important' },
  meeting: { label: 'Meeting', color: 'event-meeting' },
  deadline: { label: 'Deadline', color: 'event-deadline' },
  other: { label: 'Other', color: 'event-other' },
};

/**
 * Generate a unique ID for events
 */
export const generateEventId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get event category color class
 */
export const getEventCategoryColor = (category) => {
  return EVENT_CATEGORIES[category]?.color || 'event-other';
};

/**
 * Get event category label
 */
export const getEventCategoryLabel = (category) => {
  return EVENT_CATEGORIES[category]?.label || 'Other';
};

/**
 * Validate event data
 */
export const validateEvent = (event) => {
  if (!event.title || event.title.trim().length === 0) {
    return { valid: false, error: 'Event title is required' };
  }

  if (!event.category || !EVENT_CATEGORIES[event.category]) {
    return { valid: false, error: 'Invalid event category' };
  }

  return { valid: true };
};

/**
 * Sanitize event data for storage
 */
export const sanitizeEvent = (event) => {
  return {
    id: event.id || generateEventId(),
    title: event.title.trim(),
    description: event.description?.trim() || '',
    category: event.category,
    tags: event.tags || [],
    createdAt: event.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Filter events by search query
 */
export const filterEventsBySearch = (events, searchQuery) => {
  if (!searchQuery || searchQuery.trim().length === 0) {
    return events;
  }

  const query = searchQuery.toLowerCase();
  
  return events.filter((event) => {
    return (
      event.title.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query) ||
      event.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });
};

/**
 * Filter events by category
 */
export const filterEventsByCategory = (events, category) => {
  if (!category || category === 'all') {
    return events;
  }

  return events.filter((event) => event.category === category);
};

/**
 * Filter events by tags
 */
export const filterEventsByTags = (events, selectedTags) => {
  if (!selectedTags || selectedTags.length === 0) {
    return events;
  }

  return events.filter((event) => {
    return event.tags?.some((tag) => selectedTags.includes(tag));
  });
};

/**
 * Sort events by a specific field
 */
export const sortEvents = (events, sortBy = 'title', order = 'asc') => {
  const sorted = [...events].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Get events for a specific date
 */
export const getEventsForDate = (allEvents, dateKey) => {
  return allEvents[dateKey] || [];
};

/**
 * Group events by category
 */
export const groupEventsByCategory = (events) => {
  return events.reduce((groups, event) => {
    const category = event.category || 'other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(event);
    return groups;
  }, {});
};

/**
 * Get all unique tags from events
 */
export const getAllTags = (allEvents) => {
  const tagsSet = new Set();
  
  Object.values(allEvents).forEach((dateEvents) => {
    dateEvents.forEach((event) => {
      event.tags?.forEach((tag) => tagsSet.add(tag));
    });
  });

  return Array.from(tagsSet).sort();
};

/**
 * Export events as JSON
 */
export const exportEventsAsJSON = (events) => {
  const dataStr = JSON.stringify(events, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `calendar-events-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
};

/**
 * Import events from JSON file
 */
export const importEventsFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const events = JSON.parse(e.target.result);
        resolve(events);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};
