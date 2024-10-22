import React from 'react';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';
import { ProcessedWeatherData } from '../types';

interface WeatherDashboardProps {
  weatherData: ProcessedWeatherData[];
}

const WeatherIcon: React.FC<{ condition: string }> = ({ condition }) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun className="text-yellow-500" />;
    case 'clouds':
      return <Cloud className="text-gray-500" />;
    case 'rain':
      return <CloudRain className="text-blue-500" />;
    case 'snow':
      return <Snowflake className="text-blue-300" />;
    default:
      return <Cloud className="text-gray-500" />;
  }
};

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ weatherData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {weatherData.map(data => (
        <div key={data.city} className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{data.city}</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold">{data.temp.toFixed(1)}°C</p>
              <p className="text-gray-600">Feels like: {data.feelsLike.toFixed(1)}°C</p>
            </div>
            <div className="text-5xl">
              <WeatherIcon condition={data.condition} />
            </div>
          </div>
          <p className="mt-4 text-gray-700">{data.condition}</p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(data.timestamp * 1000).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WeatherDashboard;