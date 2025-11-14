import { formatDateKey } from "../utils/dateHelpers";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const DEFAULT_CITY = import.meta.env.VITE_DEFAULT_CITY || "London";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Weather icon mappings
const WEATHER_ICONS = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Fog: "🌫️",
  Haze: "🌫️",
};

/**
 * Get readable emoji for weather condition
 */
export const getWeatherIcon = (condition = "") => {
  return WEATHER_ICONS[condition] || "🌤️";
};

/**
 * Ensure API key exists
 */
export const isWeatherConfigured = () => {
  return Boolean(API_KEY && API_KEY !== "your_api_key_here");
};

/**
 * Cache storage (in-memory)
 */
const weatherCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const getCachedWeather = (dateKey) => {
  const cached = weatherCache.get(dateKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedWeather = (dateKey, data) => {
  weatherCache.set(dateKey, { data, timestamp: Date.now() });
};

const cleanCache = () => {
  const now = Date.now();
  for (const [key, value] of weatherCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      weatherCache.delete(key);
    }
  }
};

/**
 * Fetch 5-day/3-hour forecast
 */
export const fetchWeatherForecast = async (city = DEFAULT_CITY) => {
  if (!isWeatherConfigured()) {
    console.warn("Weather API key not configured");
    return null;
  }

  try {
    const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Weather API error ${res.status}`);

    const data = await res.json();
    return processWeatherData(data);
  } catch (err) {
    console.error("Weather fetch failed:", err);
    return null;
  }
};

/**
 * Process weather API results into daily objects
 */
const processWeatherData = (data) => {
  const processed = {};

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = formatDateKey(date);
    const hour = date.getHours();

    // Pick the entry closest to noon (best forecast indicator)
    const existing = processed[dateKey];
    const isCloserToNoon =
      !existing || Math.abs(hour - 12) < Math.abs(existing.hour - 12);

    if (isCloserToNoon) {
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
        hour,
      };
    }
  });

  return processed;
};

/**
 * Get weather for a single date
 */
export const getWeatherForDate = async (date, city = DEFAULT_CITY) => {
  const dateKey = formatDateKey(date);

  const cached = getCachedWeather(dateKey);
  if (cached) return cached;

  const forecast = await fetchWeatherForecast(city);
  if (!forecast) return null;

  // save all
  for (const key in forecast) {
    setCachedWeather(key, forecast[key]);
  }

  cleanCache();
  return forecast[dateKey] || null;
};

/**
 * Get weather for multiple dates
 */
export const getWeatherForDates = async (dates, city = DEFAULT_CITY) => {
  const forecast = await fetchWeatherForecast(city);
  if (!forecast) return {};

  const results = {};
  for (const date of dates) {
    const key = formatDateKey(date);
    if (forecast[key]) {
      results[key] = forecast[key];
    }
  }

  return results;
};

/**
 * Clear weather cache
 */
export const clearWeatherCache = () => {
  weatherCache.clear();
};
