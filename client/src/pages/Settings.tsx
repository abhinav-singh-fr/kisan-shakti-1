import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon,
  Wifi, 
  WifiOff, 
  Volume2, 
  Bell, 
  Smartphone, 
  Download,
  Upload,
  Trash2,
  Shield,
  Database,
  Globe
} from 'lucide-react';

export default function Settings() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isOnlineMode, setIsOnlineMode] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableVoiceAlerts, setEnableVoiceAlerts] = useState(true);
  const [autoIrrigation, setAutoIrrigation] = useState(true);

  const systemInfo = {
    appVersion: '2.1.3',
    lastSync: '2025-09-27 11:45 AM',
    storageUsed: '45 MB',
    sensorsConnected: 8,
    totalAlerts: 23,
    offlineDataSize: '12 MB'
  };

  const languageOptions = [
    { value: 'en', label: 'English', native: 'English' },
    { value: 'hi', label: 'Hindi', native: 'हिंदी' },
    { value: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { value: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { value: 'bn', label: 'Bengali', native: 'বাংলা' },
    { value: 'mr', label: 'Marathi', native: 'मराठी' },
    { value: 'gu', label: 'Gujarati', native: 'ગુજરાતી' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        isVoiceActive={isVoiceActive}
        onVoiceToggle={() => setIsVoiceActive(!isVoiceActive)}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        isOnline={isOnlineMode}
      />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold font-display flex items-center gap-2" data-testid="text-page-title">
            <SettingsIcon className="h-6 w-6" />
            Settings & Configuration
          </h1>
          <p className="text-muted-foreground">
            Customize your Kishan Shakti experience
          </p>
        </div>

        {/* Quick Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-1 mb-2">
                {isOnlineMode ? <Wifi className="h-4 w-4 text-chart-1" /> : <WifiOff className="h-4 w-4 text-muted-foreground" />}
                <Badge variant={isOnlineMode ? "default" : "secondary"}>
                  {isOnlineMode ? 'Online' : 'Offline'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Connection Status</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-lg font-bold text-chart-1" data-testid="text-sensors-count">
                {systemInfo.sensorsConnected}
              </p>
              <p className="text-xs text-muted-foreground">Sensors Active</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-lg font-bold text-chart-3" data-testid="text-storage-used">
                {systemInfo.storageUsed}
              </p>
              <p className="text-xs text-muted-foreground">Storage Used</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-lg font-bold text-chart-2" data-testid="text-app-version">
                v{systemInfo.appVersion}
              </p>
              <p className="text-xs text-muted-foreground">App Version</p>
            </CardContent>
          </Card>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" data-testid="tab-general">General</TabsTrigger>
            <TabsTrigger value="notifications" data-testid="tab-notifications">Alerts</TabsTrigger>
            <TabsTrigger value="voice" data-testid="tab-voice">Voice</TabsTrigger>
            <TabsTrigger value="data" data-testid="tab-data">Data</TabsTrigger>
            <TabsTrigger value="system" data-testid="tab-system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language & Region
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Display Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger id="language" data-testid="select-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label} ({lang.native})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="asia-kolkata">
                    <SelectTrigger id="timezone" data-testid="select-timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="asia-dhaka">Asia/Dhaka (BST)</SelectItem>
                      <SelectItem value="asia-kathmandu">Asia/Kathmandu (NPT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="units">Unit System</Label>
                  <Select defaultValue="metric">
                    <SelectTrigger id="units" data-testid="select-units">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (°C, km/h, mm)</SelectItem>
                      <SelectItem value="imperial">Imperial (°F, mph, in)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Farm Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farm-name">Farm Name</Label>
                  <Input 
                    id="farm-name" 
                    defaultValue="Green Valley Farm"
                    data-testid="input-farm-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farm-location">Location</Label>
                  <Input 
                    id="farm-location" 
                    defaultValue="Punjab, India"
                    data-testid="input-farm-location"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farm-size">Farm Size (acres)</Label>
                  <Input 
                    id="farm-size" 
                    type="number" 
                    defaultValue="25"
                    data-testid="input-farm-size"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Alert Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for critical sensor readings and system events
                    </p>
                  </div>
                  <Switch 
                    id="notifications" 
                    checked={enableNotifications}
                    onCheckedChange={setEnableNotifications}
                    data-testid="switch-notifications"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Alert Categories</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="soil-alerts">Soil Condition Alerts</Label>
                    <Switch id="soil-alerts" defaultChecked data-testid="switch-soil-alerts" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="weather-alerts">Weather Alerts</Label>
                    <Switch id="weather-alerts" defaultChecked data-testid="switch-weather-alerts" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="equipment-alerts">Equipment Status</Label>
                    <Switch id="equipment-alerts" defaultChecked data-testid="switch-equipment-alerts" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="irrigation-alerts">Irrigation Events</Label>
                    <Switch id="irrigation-alerts" defaultChecked data-testid="switch-irrigation-alerts" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="alert-frequency">Alert Frequency</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger id="alert-frequency" data-testid="select-alert-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="every-15min">Every 15 minutes</SelectItem>
                      <SelectItem value="hourly">Hourly summary</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voice" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Voice Assistant Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="voice-alerts">Voice Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Hear important alerts spoken aloud
                    </p>
                  </div>
                  <Switch 
                    id="voice-alerts" 
                    checked={enableVoiceAlerts}
                    onCheckedChange={setEnableVoiceAlerts}
                    data-testid="switch-voice-alerts"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice-language">Voice Language</Label>
                  <Select value={selectedLanguage}>
                    <SelectTrigger id="voice-language" data-testid="select-voice-language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.native}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice-speed">Speech Speed</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger id="voice-speed" data-testid="select-voice-speed">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="fast">Fast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Voice Commands</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>"What is the soil moisture level?"</p>
                    <p>"Start irrigation in field A"</p>
                    <p>"Show me weather forecast"</p>
                    <p>"Check sensor status"</p>
                    <p>"Turn on automatic mode"</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="offline-mode">Offline Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Save data locally to reduce internet usage
                    </p>
                  </div>
                  <Switch 
                    id="offline-mode" 
                    checked={!isOnlineMode}
                    onCheckedChange={(checked) => setIsOnlineMode(!checked)}
                    data-testid="switch-offline-mode"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sync-frequency">Auto Sync Frequency</Label>
                  <Select defaultValue="hourly">
                    <SelectTrigger id="sync-frequency" data-testid="select-sync-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time (when online)</SelectItem>
                      <SelectItem value="hourly">Every hour</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="manual">Manual only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Data Storage</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted rounded-md">
                      <p className="font-bold text-chart-1">{systemInfo.offlineDataSize}</p>
                      <p className="text-xs text-muted-foreground">Offline Data</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-md">
                      <p className="font-bold text-chart-2">{systemInfo.lastSync}</p>
                      <p className="text-xs text-muted-foreground">Last Sync</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" data-testid="button-export-data">
                    <Download className="h-4 w-4 mr-1" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="flex-1" data-testid="button-sync-now">
                    <Upload className="h-4 w-4 mr-1" />
                    Sync Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-muted-foreground">App Version</label>
                    <p className="font-medium">{systemInfo.appVersion}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Last Update</label>
                    <p className="font-medium">2025-09-20</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Total Alerts</label>
                    <p className="font-medium">{systemInfo.totalAlerts}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">Device ID</label>
                    <p className="font-medium text-xs">KS-2025-ABC123</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" data-testid="button-check-updates">
                    <Download className="h-4 w-4 mr-2" />
                    Check for Updates
                  </Button>

                  <Button variant="outline" className="w-full justify-start" data-testid="button-reset-settings">
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Reset to Default Settings
                  </Button>

                  <Button variant="outline" className="w-full justify-start text-destructive" data-testid="button-clear-data">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Local Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="auto-irrigation">Auto Irrigation</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow system to automatically control irrigation
                    </p>
                  </div>
                  <Switch 
                    id="auto-irrigation" 
                    checked={autoIrrigation}
                    onCheckedChange={setAutoIrrigation}
                    data-testid="switch-auto-irrigation"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="data-sharing">Anonymous Usage Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve the app by sharing anonymous usage statistics
                    </p>
                  </div>
                  <Switch id="data-sharing" defaultChecked data-testid="switch-data-sharing" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}