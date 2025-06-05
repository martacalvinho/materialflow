import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, PackageX, FileWarning, X } from 'lucide-react';

const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'discontinued',
      icon: PackageX,
      title: 'Frequently Used Material Discontinued',
      description: 'XStone Marble was used in 12 projects between 2015-2022 and is now discontinued.',
      severity: 'high',
      date: '2024-03-15'
    },
    {
      id: 2,
      type: 'sustainability',
      icon: AlertTriangle,
      title: 'Sustainability Rating Alert',
      description: '3 out of 5 top specified paints have lower sustainability ratings than average.',
      severity: 'medium',
      date: '2024-03-14'
    },
    {
      id: 3,
      type: 'trend',
      icon: TrendingDown,
      title: 'Usage Trend Alert',
      description: 'Material ABC has shown significant decrease in use after 2021 - may be outdated.',
      severity: 'low',
      date: '2024-03-13'
    },
    {
      id: 4,
      type: 'data',
      icon: FileWarning,
      title: 'Missing Data Alert',
      description: '25% of your projects in 2023 don\'t specify supplier for wood flooring.',
      severity: 'medium',
      date: '2024-03-12'
    }
  ]);

  const removeAlert = (alertId: number) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-accent-50 text-accent-700 border-accent-200';
      case 'medium':
        return 'bg-terracotta-50 text-terracotta-700 border-terracotta-200';
      case 'low':
        return 'bg-primary-50 text-primary-700 border-primary-200';
      default:
        return 'bg-surface-50 text-surface-700 border-surface-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-surface-900">Alerts</h1>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const severityStyles = getSeverityStyles(alert.severity);

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border relative ${severityStyles}`}
            >
              <button
                onClick={() => removeAlert(alert.id)}
                className="absolute top-4 right-4 text-current opacity-60 hover:opacity-100"
              >
                <X size={16} />
              </button>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-white">
                  <Icon className={`h-5 w-5 ${
                    alert.severity === 'high' ? 'text-accent-600' :
                    alert.severity === 'medium' ? 'text-terracotta-600' :
                    'text-primary-600'
                  }`} />
                </div>
                <div className="flex-1 pr-8">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{alert.title}</h3>
                    <span className="text-xs">{new Date(alert.date).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-1 text-sm opacity-90">{alert.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPage;