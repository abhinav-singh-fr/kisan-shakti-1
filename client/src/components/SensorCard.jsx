import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function SensorCard({ 
  title, 
  value, 
  unit, 
  range, 
  icon, 
  description,
  isOnline = true 
}) {
  const getStatus = () => {
    if (!isOnline) return 'offline';
    if (range.optimal) {
      if (value >= range.optimal.min && value <= range.optimal.max) return 'optimal';
      if (value < range.min || value > range.max) return 'critical';
      return 'warning';
    }
    if (value < range.min || value > range.max) return 'critical';
    return 'optimal';
  };

  const getProgressValue = () => {
    return ((value - range.min) / (range.max - range.min)) * 100;
  };

  const getStatusIcon = () => {
    const status = getStatus();
    switch (status) {
      case 'optimal': return <CheckCircle className="h-4 w-4 text-chart-1" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-chart-3" />;
      case 'critical': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <XCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    const status = getStatus();
    switch (status) {
      case 'optimal': return 'default';
      case 'warning': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card className="hover-elevate" data-testid={`card-sensor-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        {getStatusIcon()}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold" data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {isOnline ? value.toFixed(1) : '--'}
            </span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          
          {isOnline && (
            <Progress 
              value={getProgressValue()} 
              className="h-2"
              data-testid={`progress-${title.toLowerCase().replace(/\s+/g, '-')}`}
            />
          )}
          
          <div className="flex items-center justify-between">
            <Badge variant={getStatusColor()} data-testid={`badge-status-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {isOnline ? getStatus().toUpperCase() : 'OFFLINE'}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {range.min}-{range.max} {unit}
            </span>
          </div>
          
          {description && (
            <p className="text-xs text-muted-foreground" data-testid={`text-description-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}