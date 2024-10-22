import React from 'react';
import { Alert } from '../types';

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Weather Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-center">
            {alert.icon}
            <span className="ml-2">
              <strong>{alert.city}:</strong> {alert.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;