import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Bell, CheckCircle, X, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AlertPanel({ 
  alerts = [
    {
      id: '1',
      type: 'critical',
      category: 'soil',
      title: 'Low Soil Moisture',
      message: 'Soil moisture in Field A has dropped below 30%. Immediate irrigation recommended.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      acknowledged: false
    },
    {
      id: '2',
      type: 'warning',
      category: 'weather',
      title: 'Heavy Rain Forecast',
      message: 'Heavy rainfall expected in next 6 hours. Consider pausing irrigation.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      acknowledged: false
    },
    {
      id: '3',
      type: 'info',
      category: 'equipment',
      title: 'Sensor Maintenance Due',
      message: 'pH sensor in Field B is due for calibration. Schedule maintenance.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      acknowledged: true
    }
  ],
  onAcknowledge = (id) => console.log('Acknowledged alert:', id),
  onDismiss = (id) => console.log('Dismissed alert:', id)
}) {
  
  const [alertList, setAlertList] = useState(alerts);

  const handleAcknowledge = (alertId) => {
    setAlertList(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
    onAcknowledge(alertId);
  };

  const handleDismiss = (alertId) => {
    setAlertList(prev => prev.filter(alert => alert.id !== alertId));
    onDismiss(alertId);
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-chart-3" />;
      default: return <Bell className="h-4 w-4 text-chart-2" />;
    }
  };

  const getAlertVariant = (type) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'soil': return 'bg-chart-4 text-white';
      case 'weather': return 'bg-chart-2 text-white';
      case 'equipment': return 'bg-chart-1 text-white';
      case 'irrigation': return 'bg-chart-3 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const unacknowledgedAlerts = alertList.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alertList.filter(alert => alert.acknowledged);

  return (
    <Card data-testid="card-alerts">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bell className="h-4 w-4" />
          System Alerts
        </CardTitle>
        {unacknowledgedAlerts.length > 0 && (
          <Badge variant="destructive" data-testid="badge-alert-count">
            {unacknowledgedAlerts.length} Active
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {alertList.length === 0 ? (
          <div className="text-center py-4">
            <CheckCircle className="h-8 w-8 text-chart-1 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground" data-testid="text-no-alerts">
              All systems operating normally
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Unacknowledged Alerts */}
            {unacknowledgedAlerts.map((alert) => (
              <Alert 
                key={alert.id} 
                variant={alert.type === 'critical' ? 'destructive' : 'default'}
                className={alert.acknowledged ? 'opacity-60' : ''}
                data-testid={`alert-${alert.id}`}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-start gap-2 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm" data-testid={`text-alert-title-${alert.id}`}>
                          {alert.title}
                        </span>
                        <Badge 
                          className={`text-xs ${getCategoryColor(alert.category)}`}
                          data-testid={`badge-category-${alert.id}`}
                        >
                          {alert.category.toUpperCase()}
                        </Badge>
                      </div>
                      <AlertDescription className="text-xs" data-testid={`text-alert-message-${alert.id}`}>
                        {alert.message}
                      </AlertDescription>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span data-testid={`text-alert-time-${alert.id}`}>
                          {formatTimestamp(alert.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    {!alert.acknowledged && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAcknowledge(alert.id)}
                        className="h-6 px-2 text-xs"
                        data-testid={`button-acknowledge-${alert.id}`}
                      >
                        Ack
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDismiss(alert.id)}
                      className="h-6 w-6 p-0"
                      data-testid={`button-dismiss-${alert.id}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Alert>
            ))}

            {/* Acknowledged Alerts (Collapsed) */}
            {acknowledgedAlerts.length > 0 && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">
                  {acknowledgedAlerts.length} acknowledged alert{acknowledgedAlerts.length !== 1 ? 's' : ''}
                </p>
                {acknowledgedAlerts.slice(0, 2).map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between text-xs text-muted-foreground py-1">
                    <span>{alert.title}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDismiss(alert.id)}
                      className="h-4 w-4 p-0"
                      data-testid={`button-dismiss-${alert.id}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}