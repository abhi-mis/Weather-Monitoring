import { WeatherData, ProcessedWeatherData } from '../types';

export const fetchWeatherData = async (city: string, apiKey: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},in&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch weather data for ${city}:`, error);
    throw new Error(`Failed to fetch weather data for ${city}`);
  }
};

export const processWeatherData = (data: WeatherData): ProcessedWeatherData => {
  return {
    city: data.name,
    condition: data.weather[0].main,
    temp: kelvinToCelsius(data.main.temp),
    feelsLike: kelvinToCelsius(data.main.feels_like),
    timestamp: data.dt,
  };
};

const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};