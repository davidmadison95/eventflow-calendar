const STORAGE_KEY = 'calendar-events';
const TAGS_KEY = 'calendar-tags';
const SETTINGS_KEY = 'calendar-settings';

/**
 * Get all events from localStorage
 */
export const loadEvents = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading events:', error);
    return {};
  }
};

/**
 * Save events to localStorage
 */
export const saveEvents = (events) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    return true;
  } catch (error) {
    console.error('Error saving events:', error);
    return false;
  }
};

/**
 * Get all tags from localStorage
 */
export const loadTags = () => {
  try {
    const data = localStorage.getItem(TAGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading tags:', error);
    return [];
  }
};

/**
 * Save tags to localStorage
 */
export const saveTags = (tags) => {
  try {
    localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
    return true;
  } catch (error) {
    console.error('Error saving tags:', error);
    return false;
  }
};

/**
 * Get settings from localStorage
 */
export const loadSettings = () => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : getDefaultSettings();
  } catch (error) {
    console.error('Error loading settings:', error);
    return getDefaultSettings();
  }
};

/**
 * Save settings to localStorage
 */
export const saveSettings = (settings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

/**
 * Get default settings
 */
export const getDefaultSettings = () => {
  return {
    theme: 'light',
    defaultView: 'month',
    weatherCity: 'London',
    weekStartsOn: 0, // 0 = Sunday, 1 = Monday
    showWeather: true,
    notifications: true,
  };
};

/**
 * Clear all data from localStorage
 */
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TAGS_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

/**
 * Export all data
 */
export const exportAllData = () => {
  return {
    events: loadEvents(),
    tags: loadTags(),
    settings: loadSettings(),
    exportDate: new Date().toISOString(),
  };
};

/**
 * Import all data
 */
export const importAllData = (data) => {
  try {
    if (data.events) saveEvents(data.events);
    if (data.tags) saveTags(data.tags);
    if (data.settings) saveSettings(data.settings);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};
