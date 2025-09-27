import { useState } from 'react';
import { useRoute } from 'wouter';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Download, Settings, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';

export default function SensorDetails() {
  const [, params] = useRoute('/sensors/:type');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Mock historical data - todo: remove mock functionality
  const historicalData = [
    { time: '00:00', value: 62.5, optimal: 65 },
    { time: '04:00', value: 58.2, optimal: 65 },
    { time: '08:00', value: 55.8, optimal: 65 },
    { time: '12:00', value: 48.3, optimal: 65 },
    { time: '16:00', value: 52.1, optimal: 65 },
    { time: '20:00', value: 59.4, optimal: 65 },
    { time: '24:00', value: 63.2, optimal: 65 }
  ];

  const recentReadings = [
    { timestamp: '12:45 PM', value: 65.2, status: 'optimal' },
    { timestamp: '12:30 PM', value: 64.8, status: 'optimal' },
    { timestamp: '12:15 PM', value: 63.9, status: 'optimal' },
    { timestamp: '12:00 PM', value: 62.1, status: 'warning' },
    { timestamp: '11:45 AM', value: 60.5, status: 'warning' }
  ];

  const sensorType = params?.type || 'soil-moisture';
  const sensorConfig = {
    'soil-moisture': {
      name: 'Soil Moisture Sensor',
      unit: '%',
      currentValue: 65.2,
      range: { min: 0, max: 100, optimal: { min: 40, max: 80 } },
      location: 'Field A - Section 2',
      lastCalibrated: '2025-09-20'
    },
    'ph': {
      name: 'Soil pH Sensor',
      unit: 'pH',
      currentValue: 6.8,
      range: { min: 3, max: 10, optimal: { min: 6, max: 7.5 } },
      location: 'Field A - Section 1',
      lastCalibrated: '2025-09-15'
    },
    'npk': {
      name: 'NPK Nutrient Sensor',
      unit: 'mg/kg',
      currentValue: 145,
      range: { min: 0, max: 1999, optimal: { min: 100, max: 300 } },
      location: 'Field B - Section 3',
      lastCalibrated: '2025-09-18'
    }
  };

  const sensor = sensorConfig[sensorType as keyof typeof sensorConfig] || sensorConfig['soil-moisture'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'default';
      case 'warning': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'secondary';
    }
  };

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
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" data-testid="button-back">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold font-display" data-testid="text-sensor-title">
                {sensor.name}
              </h1>
              <p className="text-muted-foreground" data-testid="text-sensor-location">
                {sensor.location}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" data-testid="button-export">
              <Download className="h-4 w-4 mr-1" />
              Export Data
            </Button>
            <Button variant="outline" size="sm" data-testid="button-settings">
              <Settings className="h-4 w-4 mr-1" />
              Configure
            </Button>
          </div>
        </div>

        {/* Current Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Reading</label>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold" data-testid="text-current-value">
                    {sensor.currentValue}
                  </span>
                  <span className="text-muted-foreground">{sensor.unit}</span>
                </div>
                <Progress 
                  value={((sensor.currentValue - sensor.range.min) / (sensor.range.max - sensor.range.min)) * 100} 
                  className="h-2" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <div>
                  <Badge variant="default" className="mb-2" data-testid="badge-status">
                    OPTIMAL
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Within ideal range ({sensor.range.optimal?.min}-{sensor.range.optimal?.max} {sensor.unit})
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Last Calibrated</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm" data-testid="text-last-calibrated">
                    {sensor.lastCalibrated}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Visualization */}
        <Tabs defaultValue="chart" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chart" data-testid="tab-chart">
              <TrendingUp className="h-4 w-4 mr-1" />
              Chart View
            </TabsTrigger>
            <TabsTrigger value="readings" data-testid="tab-readings">
              Recent Readings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <CardTitle>24-Hour Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--chart-1))" 
                        strokeWidth={2}
                        name="Actual"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="optimal" 
                        stroke="hsl(var(--chart-2))" 
                        strokeDasharray="5 5"
                        name="Optimal"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="readings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Readings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReadings.map((reading, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-muted rounded-md"
                      data-testid={`reading-${index}`}
                    >
                      <div>
                        <span className="text-sm text-muted-foreground">
                          {reading.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {reading.value} {sensor.unit}
                        </span>
                        <Badge variant={getStatusColor(reading.status) as any}>
                          {reading.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-chart-1/10 rounded-md">
                <div className="w-2 h-2 bg-chart-1 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Maintain Current Conditions</p>
                  <p className="text-xs text-muted-foreground">
                    Sensor readings are within optimal range. Continue current irrigation schedule.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-chart-2/10 rounded-md">
                <div className="w-2 h-2 bg-chart-2 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-sm">Schedule Calibration</p>
                  <p className="text-xs text-muted-foreground">
                    Next calibration due in 15 days. Schedule maintenance to ensure accuracy.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}