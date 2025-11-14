import { useState, useEffect } from "react";
import {
  getWeatherForDates,
  isWeatherConfigured,
} from "../services/weatherAPI";
import { getWeatherDateRange } from "../utils/dateHelpers";

/**
 * Custom hook for weather data
 */
export const useWeather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Default city from .env or fallback
  const [city, setCity] = useState(
    import.meta.env.VITE_DEFAULT_CITY || "London"
  );

  /**
   * Fetch weather for the configured date range
   */
  const fetchWeather = async () => {
    // Prevent fetching if no API key is set
    if (!isWeatherConfigured()) {
      setError("Weather API is not configured. Add your API key to .env.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dates = getWeatherDateRange();
      const data = await getWeatherForDates(dates, city);
      setWeatherData(data || {});
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError(err?.message || "Failed to fetch weather");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch weather on mount and when city changes
   */
  useEffect(() => {
    fetchWeather();

    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [city]);

  /**
   * Manual refresh
   */
  const refetchWeather = () => {
    fetchWeather();
  };

  return {
    weatherData,
    isLoading,
    error,
    city,
    setCity,
    refetchWeather,
    isConfigured: isWeatherConfigured(),
  };
};
