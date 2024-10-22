import { ReactNode } from 'react';

export interface WeatherData {
  name: string;
  weather: { main: string }[];
  main: {
    temp: number;
    feels_like: number;
  };
  dt: number;
}

export interface ProcessedWeatherData {
  city: string;
  condition: string;
  temp: number;
  feelsLike: number;
  timestamp: number;
}

export interface Alert {
  city: string;
  message: string;
  icon: ReactNode;
}