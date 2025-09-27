import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Cloud, CloudRain, Sun, Thermometer, Droplets as Humidity, Wind } from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  forecast: string;
}

interface WeatherWidgetProps {
  data?: WeatherData;
  isOnline?: boolean;
}

export default function WeatherWidget({ 
  data = {
    temperature: 28,
    humidity: 65,
    rainfall: 0,
    windSpeed: 12,
    condition: 'cloudy',
    forecast: 'Partly cloudy with light winds'
  },
  isOnline = true 
}: WeatherWidgetProps) {
  
  const getWeatherIcon = () => {
    switch (data.condition) {
      case 'sunny': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'rainy': return <CloudRain className="h-8 w-8 text-chart-2" />;
      default: return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  const getTemperatureColor = () => {
    if (data.temperature > 35) return 'text-red-500';
    if (data.temperature < 15) return 'text-blue-500';
    return 'text-foreground';
  };

  return (
    <Card className="hover-elevate" data-testid="card-weather">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Weather Conditions</CardTitle>
        <Badge variant={isOnline ? "default" : "secondary"} data-testid="badge-weather-status">
          {isOnline ? 'Live' : 'Offline'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Weather Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon()}
            <div>
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-bold ${getTemperatureColor()}`} data-testid="text-temperature">
                  {isOnline ? data.temperature : '--'}
                </span>
                <span className="text-lg text-muted-foreground">°C</span>
              </div>
              <p className="text-sm text-muted-foreground capitalize" data-testid="text-condition">
                {isOnline ? data.condition : 'No data'}
              </p>
            </div>
          </div>
        </div>

        {/* Weather Metrics */}
        {isOnline && (
          <div className="grid grid-cols-1 gap-3">
            {/* Humidity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Humidity className="h-4 w-4 text-chart-2" />
                  <span className="text-sm font-medium">Humidity</span>
                </div>
                <span className="text-sm font-bold" data-testid="text-humidity">
                  {data.humidity}%
                </span>
              </div>
              <Progress value={data.humidity} className="h-2" />
            </div>

            {/* Rainfall */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <CloudRain className="h-4 w-4 text-chart-2" />
                  <span className="text-sm font-medium">Rainfall (24h)</span>
                </div>
                <span className="text-sm font-bold" data-testid="text-rainfall">
                  {data.rainfall} mm
                </span>
              </div>
              <Progress value={Math.min((data.rainfall / 50) * 100, 100)} className="h-2" />
            </div>

            {/* Wind Speed */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Wind Speed</span>
                </div>
                <span className="text-sm font-bold" data-testid="text-wind-speed">
                  {data.windSpeed} km/h
                </span>
              </div>
              <Progress value={Math.min((data.windSpeed / 50) * 100, 100)} className="h-2" />
            </div>
          </div>
        )}

        {/* Forecast */}
        {isOnline && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground" data-testid="text-forecast">
              {data.forecast}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}