import { useState, useEffect } from 'react';
import { getWeatherForDates, isWeatherConfigured } from '../services/weatherAPI';
import { getWeatherDateRange } from '../utils/dateHelpers';

/**
 * Custom hook for weather data
 */
export const useWeather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(
    import.meta.env.VITE_DEFAULT_CITY || 'London'
  );

  const fetchWeather = async () => {
    if (!isWeatherConfigured()) {
      setError('Weather API not configured');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dates = getWeatherDateRange();
      const data = await getWeatherForDates(dates, city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather');
      console.error('Weather fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    
    // Refresh weather every 30 minutes
    const interval = setInterval(() => {
      fetchWeather();
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [city]);

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
