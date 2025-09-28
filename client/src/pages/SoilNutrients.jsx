import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Leaf, Sprout, Calendar as CalendarIcon, MapPin, Beaker, Timer, Scale } from 'lucide-react';

export default function SoilNutrients() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fields = [
    { id: 'field-a', name: 'Field A - Vegetables' },
    { id: 'field-b', name: 'Field B - Grains' },
    { id: 'field-c', name: 'Field C - Fruits' },
  ];

  const recommendations = [
    { id: 'rec-1', crop: 'Tomato', stage: 'Flowering', mix: 'Vermicompost + Neem Cake', amount: '1.5 ton/acre' },
    { id: 'rec-2', crop: 'Wheat', stage: 'Tillering', mix: 'Cow Dung + Rock Phosphate', amount: '2 ton/acre' },
    { id: 'rec-3', crop: 'Banana', stage: 'Vegetative', mix: 'Poultry Manure + Potash', amount: '1 ton/acre' },
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-display" data-testid="text-page-title">
              Soil Nutrients & Manure Management
            </h1>
            <p className="text-muted-foreground">Plan organic applications just like irrigation: by field, time, and amount</p>
          </div>
          <Badge variant="secondary" className="gap-1"><Beaker className="h-3 w-3" /> Organic</Badge>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule" data-testid="tab-schedule">Schedule</TabsTrigger>
            <TabsTrigger value="manual" data-testid="tab-manual">Manual Apply</TabsTrigger>
            <TabsTrigger value="recommend" data-testid="tab-recommend">Recommendations</TabsTrigger>
          </TabsList>

          {/* Schedule Creator */}
          <TabsContent value="schedule" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CalendarIcon className="h-5 w-5" /> Create Manure Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="field-select">Select Field</Label>
                    <Select>
                      <SelectTrigger id="field-select" data-testid="select-field">
                        <SelectValue placeholder="Choose field" />
                      </SelectTrigger>
                      <SelectContent>
                        {fields.map(f => (
                          <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input id="start-time" type="time" defaultValue="06:00" data-testid="input-start-time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" type="number" placeholder="1500" data-testid="input-amount" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="manure-type">Manure Type</Label>
                      <Select>
                        <SelectTrigger id="manure-type" data-testid="select-manure-type">
                          <SelectValue placeholder="Choose type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cow-dung">Cow Dung</SelectItem>
                          <SelectItem value="vermicompost">Vermicompost</SelectItem>
                          <SelectItem value="poultry">Poultry Manure</SelectItem>
                          <SelectItem value="green">Green Manure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="repeat">Repeat</Label>
                      <Select>
                        <SelectTrigger id="repeat" data-testid="select-repeat">
                          <SelectValue placeholder="Frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" data-testid="button-save-schedule"><Timer className="h-4 w-4 mr-1" /> Save Schedule</Button>
                  <Button variant="outline" className="flex-1" data-testid="button-calc-amount"><Scale className="h-4 w-4 mr-1" /> Calculate Amount</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Sprout className="h-5 w-5" /> Soil Nutrient Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between"><span>Nitrogen (N)</span><Badge variant="default">Medium</Badge></div>
                  <div className="flex items-center justify-between"><span>Phosphorus (P)</span><Badge variant="secondary">Low</Badge></div>
                  <div className="flex items-center justify-between"><span>Potassium (K)</span><Badge variant="default">Good</Badge></div>
                  <p className="text-muted-foreground">Use recommendations tab to choose the right mix.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Manual Apply */}
          <TabsContent value="manual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Leaf className="h-5 w-5" /> Manual Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="field-select-manual">Field</Label>
                  <Select>
                    <SelectTrigger id="field-select-manual" data-testid="select-field-manual">
                      <SelectValue placeholder="Choose field" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map(f => (<SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="manual-time">Time</Label>
                    <Input id="manual-time" type="time" defaultValue="07:00" data-testid="input-manual-time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manual-amount">Amount</Label>
                    <Input id="manual-amount" type="number" placeholder="1200" data-testid="input-manual-amount" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="manual-type">Manure Type</Label>
                    <Select>
                      <SelectTrigger id="manual-type" data-testid="select-manual-type">
                        <SelectValue placeholder="Choose type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cow-dung">Cow Dung</SelectItem>
                        <SelectItem value="vermicompost">Vermicompost</SelectItem>
                        <SelectItem value="poultry">Poultry Manure</SelectItem>
                        <SelectItem value="green">Green Manure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" type="text" placeholder="Add any notes" data-testid="input-notes" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" data-testid="button-apply-now">Apply Now</Button>
                  <Button variant="outline" className="flex-1" data-testid="button-save-manual">Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommendations */}
          <TabsContent value="recommend" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crop-based Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map(r => (
                  <div key={r.id} className="p-3 bg-card rounded-lg space-y-1">
                    <p className="text-sm text-muted-foreground">{r.crop} • {r.stage}</p>
                    <p className="font-medium">Mix: {r.mix}</p>
                    <p className="text-sm">Amount: {r.amount}</p>
                    <Button size="sm" variant="outline" className="mt-2">Use this plan</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}