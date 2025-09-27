import { useState } from 'react';
import Header from '@/components/Header';
import SensorCard from '@/components/SensorCard';
import IrrigationControl from '@/components/IrrigationControl';
import WeatherWidget from '@/components/WeatherWidget';
import AlertPanel from '@/components/AlertPanel';
import VoiceAssistant from '@/components/VoiceAssistant';
import { 
  Droplets, 
  TestTube, 
  Sprout, 
  Gauge, 
  CloudRain, 
  Thermometer,
  Waves 
} from 'lucide-react';
import heroImage from '@assets/generated_images/Terraced_farming_landscape_hero_10759361.png';
import { Link } from 'wouter';

export default function Dashboard() {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isOnline] = useState(true); // Mock online status

  // Mock sensor data - todo: remove mock functionality
  const sensorData = [
    {
      title: "Soil Moisture",
      value: 65.5,
      unit: "%",
      range: { min: 0, max: 100, optimal: { min: 40, max: 80 } },
      icon: <Droplets className="h-4 w-4 text-chart-2" />,
      description: "Optimal for current crop stage",
      isOnline: true
    },
    {
      title: "Soil pH",
      value: 6.8,
      unit: "pH",
      range: { min: 3, max: 10, optimal: { min: 6, max: 7.5 } },
      icon: <TestTube className="h-4 w-4 text-chart-1" />,
      description: "Good for nutrient absorption",
      isOnline: true
    },
    {
      title: "NPK Nitrogen",
      value: 145,
      unit: "mg/kg",
      range: { min: 0, max: 1999, optimal: { min: 100, max: 300 } },
      icon: <Sprout className="h-4 w-4 text-chart-4" />,
      description: "Sufficient for growth phase",
      isOnline: true
    },
    {
      title: "NPK Phosphorus",
      value: 89,
      unit: "mg/kg",
      range: { min: 0, max: 1999, optimal: { min: 50, max: 150 } },
      icon: <Sprout className="h-4 w-4 text-chart-4" />,
      description: "Good levels detected",
      isOnline: false
    },
    {
      title: "NPK Potassium",
      value: 198,
      unit: "mg/kg",
      range: { min: 0, max: 1999, optimal: { min: 100, max: 400 } },
      icon: <Sprout className="h-4 w-4 text-chart-4" />,
      description: "Excellent for root development",
      isOnline: true
    },
    {
      title: "Water Flow",
      value: 35.2,
      unit: "L/min",
      range: { min: 1, max: 60, optimal: { min: 20, max: 50 } },
      icon: <Waves className="h-4 w-4 text-chart-2" />,
      description: "Normal irrigation flow",
      isOnline: true
    },
    {
      title: "System Pressure",
      value: 3.8,
      unit: "bar",
      range: { min: 0, max: 6, optimal: { min: 2, max: 5 } },
      icon: <Gauge className="h-4 w-4 text-chart-3" />,
      description: "Optimal pressure maintained",
      isOnline: true
    },
    {
      title: "Temperature",
      value: 28.5,
      unit: "°C",
      range: { min: -10, max: 50, optimal: { min: 15, max: 35 } },
      icon: <Thermometer className="h-4 w-4 text-chart-3" />,
      description: "Ideal growing conditions",
      isOnline: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        isVoiceActive={isVoiceActive}
        onVoiceToggle={() => setIsVoiceActive(!isVoiceActive)}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        isOnline={isOnline}
      />

      {/* Hero Section */}
      <div 
        className="relative h-48 bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})` 
        }}
        data-testid="section-hero"
      >
        <div className="text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 font-display">
            Smart Farming Dashboard
          </h2>
          <p className="text-sm md:text-base opacity-90">
            Monitor, Control, and Optimize Your Agricultural Operations
          </p>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sensorData.map((sensor, index) => (
            <Link key={index} href={`/sensors/${sensor.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <SensorCard
                title={sensor.title}
                value={sensor.value}
                unit={sensor.unit}
                range={sensor.range}
                icon={sensor.icon}
                description={sensor.description}
                isOnline={sensor.isOnline}
              />
            </Link>
          ))}
        </div>

        {/* Control Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Irrigation Control - Full Width on Mobile */}
          <div className="lg:col-span-2">
            <IrrigationControl
              isAutoMode={true}
              isPumpRunning={false}
              flowRate={35.2}
              pressure={3.8}
              tankLevel={85}
            />
          </div>

          {/* Side Panel with Weather and Alerts */}
          <div className="space-y-4">
            <WeatherWidget
              data={{
                temperature: 28,
                humidity: 65,
                rainfall: 2.5,
                windSpeed: 12,
                condition: 'cloudy',
                forecast: 'Partly cloudy with light winds. Good conditions for irrigation.'
              }}
              isOnline={isOnline}
            />
            <AlertPanel />
          </div>
        </div>

        {/* Offline Mode Banner */}
        {!isOnline && (
          <div className="bg-muted border border-border rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Offline Mode:</strong> Data shown is from last sync. 
              All controls are available for when connection is restored.
            </p>
          </div>
        )}
      </div>

      {/* Voice Assistant */}
      <VoiceAssistant
        isActive={isVoiceActive}
        onToggle={setIsVoiceActive}
        language={selectedLanguage}
      />
    </div>
  );
}