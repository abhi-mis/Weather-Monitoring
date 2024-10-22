import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import WeatherDashboard from './components/WeatherDashboard';
import AlertsPanel from './components/AlertsPanel';
import { fetchWeatherData, processWeatherData } from './utils/weatherUtils';
import { ProcessedWeatherData, Alert } from './types';

const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes

function App() {
  const [weatherData, setWeatherData] = useState<ProcessedWeatherData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!API_KEY) {
          throw new Error('OpenWeatherMap API key is not set');
        }

        const rawData = await Promise.all(
          CITIES.map(city => fetchWeatherData(city, API_KEY))
        );
        const processedData = rawData.map(processWeatherData);
        setWeatherData(processedData);
        setError(null);

        // Check for alerts
        const newAlerts = processedData.flatMap(data => {
          const alerts: Alert[] = [];
          if (data.temp > 35) {
            alerts.push({
              city: data.city,
              message: `High temperature alert: ${data.temp.toFixed(1)}°C`,
              icon: <AlertTriangle className="text-red-500" />
            });
          }
          return alerts;
        });
        setAlerts(prevAlerts => [...prevAlerts, ...newAlerts]);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchData();
    const interval = setInterval(fetchData, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800">Weather Monitoring System</h1>
        <p className="text-xl text-blue-600">Real-time weather data for major Indian metros</p>
      </header>
      {error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <WeatherDashboard weatherData={weatherData} />
          <AlertsPanel alerts={alerts} />
        </>
      )}
    </div>
  );
}

export default App;