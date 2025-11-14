import { formatDateKey } from '../utils/dateHelpers';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const DEFAULT_CITY = import.meta.env.VITE_DEFAULT_CITY || 'London';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather icon mappings
const WEATHER_ICONS = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Fog: '🌫️',
  Haze: '🌫️',
};

// Cache for weather data
const weatherCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get weather icon for condition
 */
export const getWeatherIcon = (condition) => {
  return WEATHER_ICONS[condition] || '🌤️';
};

/**
 * Check if API key is configured
 */
export const isWeatherConfigured = () => {
  return Boolean(API_KEY && API_KEY !== 'your_api_key_here');
};

/**
 * Get cached weather data if valid
 */
const getCachedWeather = (dateKey) => {
  const cached = weatherCache.get(dateKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  return null;
};

/**
 * Set weather data in cache
 */
const setCachedWeather = (dateKey, data) => {
  weatherCache.set(dateKey, {
    data,
    timestamp: Date.now(),
  });
};

/**
 * Clean expired cache entries
 */
const cleanCache = () => {
  const now = Date.now();
  
  for (const [key, value] of weatherCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      weatherCache.delete(key);
    }
  }
};

/**
 * Fetch weather forecast from API
 */
export const fetchWeatherForecast = async (city = DEFAULT_CITY) => {
  if (!isWeatherConfigured()) {
    console.warn('Weather API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    return processWeatherData(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

/**
 * Process raw weather data from API
 */
const processWeatherData = (data) => {
  const processed = {};

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = formatDateKey(date);

    // Get noon forecast or closest to noon
    const hour = date.getHours();
    
    if (!processed[dateKey] || Math.abs(hour - 12) < Math.abs(processed[dateKey].hour - 12)) {
      processed[dateKey] = {
        temp: Math.round(item.main.temp),
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        feelsLike: Math.round(item.main.feels_like),
        condition: item.weather[0].main,
        description: item.weather[0].description,
        icon: getWeatherIcon(item.weather[0].main),
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed),
        hour: hour,
      };
    }
  });

  return processed;
};

/**
 * Get weather for a specific date
 */
export const getWeatherForDate = async (date, city = DEFAULT_CITY) => {
  const dateKey = formatDateKey(date);

  // Check cache first
  const cached = getCachedWeather(dateKey);
  if (cached) {
    return cached;
  }

  // Fetch forecast
  const forecast = await fetchWeatherForecast(city);
  
  if (!forecast) {
    return null;
  }

  // Cache all forecast data
  Object.keys(forecast).forEach((key) => {
    setCachedWeather(key, forecast[key]);
  });

  // Clean old cache entries
  cleanCache();

  return forecast[dateKey] || null;
};

/**
 * Get weather for multiple dates
 */
export const getWeatherForDates = async (dates, city = DEFAULT_CITY) => {
  const forecast = await fetchWeatherForecast(city);
  
  if (!forecast) {
    return {};
  }

  const results = {};
  
  dates.forEach((date) => {
    const dateKey = formatDateKey(date);
    if (forecast[dateKey]) {
      results[dateKey] = forecast[dateKey];
    }
  });

  return results;
};

/**
 * Clear weather cache
 */
export const clearWeatherCache = () => {
  weatherCache.clear();
};
