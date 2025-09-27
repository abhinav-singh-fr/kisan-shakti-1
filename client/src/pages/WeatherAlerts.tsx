import { useState } from 'react';
import Header from '@/components/Header';
import WeatherWidget from '@/components/WeatherWidget';
import AlertPanel from '@/components/AlertPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  Thermometer, 
  Eye,
  Umbrella,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

export default function WeatherAlerts() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Mock extended weather data - todo: remove mock functionality
  const extendedWeatherData = {
    current: {
      temperature: 28,
      humidity: 65,
      rainfall: 2.5,
      windSpeed: 12,
      pressure: 1013,
      visibility: 10,
      uvIndex: 6,
      condition: 'cloudy' as const
    },
    forecast: [
      { day: 'Today', high: 32, low: 22, condition: 'cloudy', rain: 20 },
      { day: 'Tomorrow', high: 29, low: 20, condition: 'rainy', rain: 80 },
      { day: 'Day 3', high: 31, low: 23, condition: 'sunny', rain: 5 },
      { day: 'Day 4', high: 33, low: 25, condition: 'sunny', rain: 0 },
      { day: 'Day 5', high: 30, low: 21, condition: 'cloudy', rain: 30 }
    ],
    hourlyData: [
      { time: '12 PM', temp: 28, humidity: 65, rain: 0 },
      { time: '1 PM', temp: 29, humidity: 62, rain: 0 },
      { time: '2 PM', temp: 30, humidity: 58, rain: 2 },
      { time: '3 PM', temp: 31, humidity: 55, rain: 5 },
      { time: '4 PM', temp: 29, humidity: 68, rain: 8 },
      { time: '5 PM', temp: 27, humidity: 72, rain: 3 },
      { time: '6 PM', temp: 26, humidity: 75, rain: 0 }
    ]
  };

  const weatherAlerts = [
    {
      id: 'weather-1',
      type: 'warning' as const,
      category: 'weather' as const,
      title: 'Heavy Rain Expected',
      message: 'Heavy rainfall (15-25mm) expected between 2 PM - 6 PM today. Consider delaying irrigation.',
      timestamp: new Date(Date.now() + 2 * 60 * 60 * 1000),
      acknowledged: false
    },
    {
      id: 'weather-2', 
      type: 'info' as const,
      category: 'weather' as const,
      title: 'High UV Index',
      message: 'UV index reaching 8-9 today. Protective measures recommended for outdoor work.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      acknowledged: false
    },
    {
      id: 'weather-3',
      type: 'warning' as const,
      category: 'weather' as const,
      title: 'Strong Winds Forecast',
      message: 'Wind speeds up to 25 km/h expected tomorrow. Secure loose equipment.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      acknowledged: true
    }
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'rainy': return <CloudRain className="h-6 w-6 text-chart-2" />;
      default: return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  const getUVLevel = (index: number) => {
    if (index <= 2) return { level: 'Low', color: 'text-chart-1' };
    if (index <= 5) return { level: 'Moderate', color: 'text-chart-3' };
    if (index <= 7) return { level: 'High', color: 'text-destructive' };
    return { level: 'Very High', color: 'text-destructive' };
  };

  const uvInfo = getUVLevel(extendedWeatherData.current.uvIndex);

  return (
    <div className="min-h-screen bg-background">
      <Header
        isVoiceActive={isVoiceActive}
        onVoiceToggle={() => setIsVoiceActive(!isVoiceActive)}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        isOnline={true}
      />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold font-display" data-testid="text-page-title">
            Weather & Alerts
          </h1>
          <p className="text-muted-foreground">
            Comprehensive weather monitoring and alert management
          </p>
        </div>

        {/* Current Weather Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeatherWidget data={{
            ...extendedWeatherData.current,
            forecast: 'Current conditions with high humidity. Good for irrigation.'
          }} isOnline={true} />
          </div>
          <AlertPanel alerts={weatherAlerts} />
        </div>

        {/* Detailed Weather Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover-elevate">
            <CardContent className="p-4 text-center">
              <Wind className="h-8 w-8 mx-auto mb-2 text-chart-2" />
              <p className="text-2xl font-bold" data-testid="text-wind-speed">
                {extendedWeatherData.current.windSpeed}
              </p>
              <p className="text-xs text-muted-foreground">km/h Wind</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-4 text-center">
              <Thermometer className="h-8 w-8 mx-auto mb-2 text-chart-3" />
              <p className="text-2xl font-bold" data-testid="text-pressure">
                {extendedWeatherData.current.pressure}
              </p>
              <p className="text-xs text-muted-foreground">hPa Pressure</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-4 text-center">
              <Eye className="h-8 w-8 mx-auto mb-2 text-chart-4" />
              <p className="text-2xl font-bold" data-testid="text-visibility">
                {extendedWeatherData.current.visibility}
              </p>
              <p className="text-xs text-muted-foreground">km Visibility</p>
            </CardContent>
          </Card>

          <Card className="hover-elevate">
            <CardContent className="p-4 text-center">
              <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <p className={`text-2xl font-bold ${uvInfo.color}`} data-testid="text-uv-index">
                {extendedWeatherData.current.uvIndex}
              </p>
              <p className="text-xs text-muted-foreground">UV Index ({uvInfo.level})</p>
            </CardContent>
          </Card>
        </div>

        {/* Weather Data Visualization */}
        <Tabs defaultValue="hourly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="hourly" data-testid="tab-hourly">Hourly Forecast</TabsTrigger>
            <TabsTrigger value="weekly" data-testid="tab-weekly">7-Day Forecast</TabsTrigger>
            <TabsTrigger value="rainfall" data-testid="tab-rainfall">Rainfall Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="hourly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Hourly Temperature & Humidity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={extendedWeatherData.hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="hsl(var(--chart-3))" 
                        strokeWidth={2}
                        name="Temperature (°C)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="humidity" 
                        stroke="hsl(var(--chart-2))" 
                        strokeWidth={2}
                        name="Humidity (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <div className="grid gap-4">
              {extendedWeatherData.forecast.map((day, index) => (
                <Card key={index} className="hover-elevate" data-testid={`forecast-day-${index}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getWeatherIcon(day.condition)}
                        <div>
                          <h4 className="font-medium">{day.day}</h4>
                          <p className="text-sm text-muted-foreground capitalize">
                            {day.condition}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-lg font-bold">{day.high}°</p>
                          <p className="text-sm text-muted-foreground">{day.low}°</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Umbrella className="h-4 w-4 text-chart-2" />
                          <span className="text-sm">{day.rain}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rainfall">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Rainfall Probability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={extendedWeatherData.hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="rain" 
                        fill="hsl(var(--chart-2))" 
                        name="Rainfall (mm)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Weather Impact Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Agricultural Impact Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Irrigation Efficiency</label>
                  <Badge variant="default">Good</Badge>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Current weather conditions are favorable for irrigation
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Crop Stress Level</label>
                  <Badge variant="secondary">Low</Badge>
                </div>
                <Progress value={25} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Temperature and humidity within optimal range
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Disease Risk</label>
                  <Badge variant="secondary">Moderate</Badge>
                </div>
                <Progress value={45} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  High humidity may increase fungal disease risk
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}