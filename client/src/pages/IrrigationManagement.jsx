import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Droplets, Clock, MapPin, Play, Square, Calendar as CalendarIcon, Settings } from 'lucide-react';

export default function IrrigationManagement() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock irrigation zones data - todo: remove mock functionality
  const irrigationZones = [
    {
      id: 'zone-1',
      name: 'Field A - Vegetables',
      status: 'running',
      duration: '45 min remaining',
      flowRate: 35.2,
      soilMoisture: 65,
      nextScheduled: '2025-09-28T06:00:00'
    },
    {
      id: 'zone-2', 
      name: 'Field B - Grains',
      status: 'scheduled',
      duration: 'Starts in 2h',
      flowRate: 0,
      soilMoisture: 72,
      nextScheduled: '2025-09-27T14:00:00'
    },
    {
      id: 'zone-3',
      name: 'Field C - Fruits',
      status: 'idle',
      duration: 'Manual control',
      flowRate: 0,
      soilMoisture: 58,
      nextScheduled: null
    }
  ];

  const scheduleHistory = [
    { date: '2025-09-27', zone: 'Field A', duration: '45 min', amount: '1,250L', status: 'completed' },
    { date: '2025-09-27', zone: 'Field B', duration: '60 min', amount: '1,800L', status: 'completed' },
    { date: '2025-09-26', zone: 'Field A', duration: '40 min', amount: '1,100L', status: 'completed' },
    { date: '2025-09-26', zone: 'Field C', duration: '30 min', amount: '900L', status: 'completed' }
  ];

  const getZoneStatusColor = (status) => {
    switch (status) {
      case 'running': return 'default';
      case 'scheduled': return 'secondary';
      case 'idle': return 'outline';
      default: return 'secondary';
    }
  };

  const getZoneStatusIcon = (status) => {
    switch (status) {
      case 'running': return <Play className="h-3 w-3" />;
      case 'scheduled': return <Clock className="h-3 w-3" />;
      default: return <Square className="h-3 w-3" />;
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-display" data-testid="text-page-title">
              Irrigation Management
            </h1>
            <p className="text-muted-foreground">
              Control and schedule irrigation across all zones
            </p>
          </div>
          <Button data-testid="button-emergency-stop" variant="destructive" size="sm">
            <Square className="h-4 w-4 mr-1" />
            Emergency Stop All
          </Button>
        </div>

        {/* Zone Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {irrigationZones.map((zone) => (
            <Card key={zone.id} className="hover-elevate" data-testid={`card-zone-${zone.id}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-chart-1" />
                    {zone.name}
                  </CardTitle>
                  <Badge variant={getZoneStatusColor(zone.status)} className="gap-1">
                    {getZoneStatusIcon(zone.status)}
                    {zone.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <label className="text-muted-foreground">Duration</label>
                    <p className="font-medium" data-testid={`text-duration-${zone.id}`}>
                      {zone.duration}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Flow Rate</label>
                    <p className="font-medium" data-testid={`text-flow-${zone.id}`}>
                      {zone.flowRate} L/min
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Soil Moisture</label>
                    <p className="font-medium" data-testid={`text-moisture-${zone.id}`}>
                      {zone.soilMoisture}%
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Next Scheduled</label>
                    <p className="font-medium text-xs">
                      {zone.nextScheduled ? new Date(zone.nextScheduled).toLocaleString() : 'None'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={zone.status === 'running' ? "destructive" : "default"}
                    className="flex-1"
                    data-testid={`button-control-${zone.id}`}
                  >
                    {zone.status === 'running' ? 'Stop' : 'Start'}
                  </Button>
                  <Button size="sm" variant="outline" data-testid={`button-schedule-${zone.id}`}>
                    <CalendarIcon className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule" data-testid="tab-schedule">Schedule</TabsTrigger>
            <TabsTrigger value="manual" data-testid="tab-manual">Manual Control</TabsTrigger>
            <TabsTrigger value="history" data-testid="tab-history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Schedule Creator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Create Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="zone-select">Select Zone</Label>
                    <Select>
                      <SelectTrigger id="zone-select" data-testid="select-zone">
                        <SelectValue placeholder="Choose irrigation zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zone-1">Field A - Vegetables</SelectItem>
                        <SelectItem value="zone-2">Field B - Grains</SelectItem>
                        <SelectItem value="zone-3">Field C - Fruits</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input 
                        id="start-time" 
                        type="time" 
                        defaultValue="06:00"
                        data-testid="input-start-time"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (min)</Label>
                      <Input 
                        id="duration" 
                        type="number" 
                        placeholder="45"
                        data-testid="input-duration"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Repeat</Label>
                    <Select>
                      <SelectTrigger data-testid="select-repeat">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="every-2-days">Every 2 days</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-adjust" data-testid="switch-auto-adjust" />
                    <Label htmlFor="auto-adjust" className="text-sm">
                      Auto-adjust based on weather
                    </Label>
                  </div>

                  <Button className="w-full" data-testid="button-create-schedule">
                    Create Schedule
                  </Button>
                </CardContent>
              </Card>

              {/* Calendar View */}
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Manual Irrigation Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {irrigationZones.map((zone) => (
                    <div key={zone.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{zone.name}</h4>
                        <Badge variant={getZoneStatusColor(zone.status)}>
                          {zone.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`duration-${zone.id}`}>Duration (minutes)</Label>
                        <Input 
                          id={`duration-${zone.id}`}
                          type="number" 
                          placeholder="30"
                          data-testid={`input-manual-duration-${zone.id}`}
                        />
                      </div>

                      <Button 
                        className="w-full" 
                        variant={zone.status === 'running' ? "destructive" : "default"}
                        data-testid={`button-manual-control-${zone.id}`}
                      >
                        <Droplets className="h-4 w-4 mr-1" />
                        {zone.status === 'running' ? 'Stop Irrigation' : 'Start Irrigation'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Irrigation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduleHistory.map((entry, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-md"
                      data-testid={`history-entry-${index}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                        <div>
                          <p className="font-medium text-sm">{entry.zone}</p>
                          <p className="text-xs text-muted-foreground">{entry.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{entry.duration}</p>
                        <p className="text-xs text-muted-foreground">{entry.amount}</p>
                      </div>
                      <Badge variant="outline">
                        {entry.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}