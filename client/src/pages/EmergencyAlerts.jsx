import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Siren, Phone, MapPin, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function EmergencyAlerts() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const alerts = [
    { id: 'a1', type: 'Weather', level: 'Severe', title: 'Severe Thunderstorm Warning', when: 'Next 2 hours', detail: 'High winds and lightning likely. Shelter livestock and avoid field work.' },
    { id: 'a2', type: 'Pest', level: 'High', title: 'Locust Activity Nearby', when: 'Today', detail: 'Use approved bio-pesticides. Avoid late-evening irrigation to reduce attraction.' },
    { id: 'a3', type: 'Market', level: 'Medium', title: 'Sudden Price Drop for Tomatoes', when: 'This week', detail: 'Consider postponing harvest or explore nearby mandi alternatives.' },
  ];

  const criticalContacts = [
    { name: 'Kisan Call Centre', number: '1800-180-1551' },
    { name: 'Disaster Management', number: '108' },
    { name: 'Nearest Krishi Vigyan Kendra', number: '+91-98765-43210' },
  ];

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-display" data-testid="text-page-title">
              Emergency Alerts & Critical Information
            </h1>
            <p className="text-muted-foreground">Immediate warnings, actions, and helpline information</p>
          </div>
          <Button variant="destructive" size="sm" data-testid="button-emergency-broadcast">
            <Siren className="h-4 w-4 mr-1" /> Broadcast Alert
          </Button>
        </div>

        {/* Live Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((a) => (
            <Card key={a.id} className="hover-elevate">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    {a.title}
                  </CardTitle>
                  <Badge variant={a.level === 'Severe' ? 'destructive' : a.level === 'High' ? 'default' : 'secondary'}>{a.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldAlert className="h-4 w-4" /> {a.type} • {a.when}
                </div>
                <p className="font-medium">{a.detail}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">View Map <MapPin className="h-3 w-3 ml-1" /></Button>
                  <Button size="sm" variant="default">Recommended Action</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Critical Contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Critical Contacts</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {criticalContacts.map((c) => (
              <div key={c.name} className="p-3 bg-card rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{c.name}</p>
                  <p className="font-medium text-lg">{c.number}</p>
                </div>
                <Button size="sm" variant="outline"><Phone className="h-3 w-3 mr-1" /> Call</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
