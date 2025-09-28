import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Droplets, Gauge, Play, Square, Timer } from 'lucide-react';

export default function IrrigationControl({
  isAutoMode = true,
  isPumpRunning = false,
  flowRate = 35.2,
  pressure = 3.8,
  tankLevel = 85,
  onAutoToggle = (enabled) => console.log('Auto mode:', enabled),
  onPumpToggle = () => console.log('Pump toggled'),
  onScheduleIrrigation = () => console.log('Irrigation scheduled')
}) {
  const [autoMode, setAutoMode] = useState(isAutoMode);
  const [pumpState, setPumpState] = useState(isPumpRunning);

  const handleAutoToggle = (enabled) => {
    setAutoMode(enabled);
    onAutoToggle(enabled);
  };

  const handlePumpToggle = () => {
    if (!autoMode) {
      setPumpState(!pumpState);
      onPumpToggle();
    }
  };

  const getPressureStatus = () => {
    if (pressure < 2) return 'Low';
    if (pressure > 5) return 'High';
    return 'Normal';
  };

  const getFlowStatus = () => {
    if (flowRate < 10) return 'Low';
    if (flowRate > 50) return 'High';
    return 'Normal';
  };

  return (
    <Card className="col-span-full" data-testid="card-irrigation-control">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-chart-2" />
          Irrigation Control System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Auto Mode Toggle */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-mode"
                checked={autoMode}
                onCheckedChange={handleAutoToggle}
                data-testid="switch-auto-mode"
              />
              <Label htmlFor="auto-mode" className="font-medium">
                Automatic Mode
              </Label>
            </div>
            <Badge variant={autoMode ? "default" : "secondary"} data-testid="badge-mode">
              {autoMode ? 'AUTO' : 'MANUAL'}
            </Badge>
          </div>

          {/* Pump Control */}
          <div className="space-y-3">
            <Label className="font-medium">Pump Control</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={pumpState ? "default" : "outline"}
                onClick={handlePumpToggle}
                disabled={autoMode}
                className="flex items-center gap-1"
                data-testid="button-pump-start"
              >
                <Play className="h-3 w-3" />
                Start
              </Button>
              <Button
                size="sm"
                variant={!pumpState ? "destructive" : "outline"}
                onClick={handlePumpToggle}
                disabled={autoMode}
                className="flex items-center gap-1"
                data-testid="button-pump-stop"
              >
                <Square className="h-3 w-3" />
                Stop
              </Button>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-3">
            <Label className="font-medium">Schedule</Label>
            <Button
              size="sm"
              variant="outline"
              onClick={onScheduleIrrigation}
              className="flex items-center gap-1"
              data-testid="button-schedule"
            >
              <Timer className="h-3 w-3" />
              Set Schedule
            </Button>
          </div>
        </div>

        {/* Status Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Flow Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Flow Rate</Label>
              <Badge variant="outline" data-testid="badge-flow-status">
                {getFlowStatus()}
              </Badge>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold" data-testid="text-flow-rate">
                {flowRate}
              </span>
              <span className="text-sm text-muted-foreground">L/min</span>
            </div>
            <Progress value={(flowRate / 60) * 100} className="h-2" />
          </div>

          {/* Pressure */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Gauge className="h-3 w-3" />
                Pressure
              </Label>
              <Badge variant="outline" data-testid="badge-pressure-status">
                {getPressureStatus()}
              </Badge>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold" data-testid="text-pressure">
                {pressure}
              </span>
              <span className="text-sm text-muted-foreground">bar</span>
            </div>
            <Progress value={(pressure / 6) * 100} className="h-2" />
          </div>

          {/* Tank Level */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Water Tank Level</Label>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold" data-testid="text-tank-level">
                {tankLevel}
              </span>
              <span className="text-sm text-muted-foreground">%</span>
            </div>
            <Progress value={tankLevel} className="h-2" />
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-center p-4 bg-muted rounded-md">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${pumpState ? 'bg-chart-1 animate-pulse' : 'bg-muted-foreground'}`}></div>
            <span className="text-sm font-medium" data-testid="text-pump-status">
              Pump {pumpState ? 'Running' : 'Stopped'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}