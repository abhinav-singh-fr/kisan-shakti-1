import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Megaphone, 
  AlertTriangle, 
  Info, 
  Users, 
  IndianRupee,
  BarChart3,
  Droplets,
  CloudRain,
  Settings,
  ChevronRight,
  Phone,
  MapPin,
  Shield,
  FileText,
  Bell,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Calendar,
  ExternalLink,
  Leaf,
  Sprout,
  Zap,
  Timer,
  Thermometer,
  Gauge,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import logoUrl from '@assets/generated_images/Kishan_Shakti_agricultural_logo_9e5268e2.png';
import heroImage from '@assets/generated_images/Terraced_farming_landscape_hero_10759361.png';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [manurePumpRunning, setManurePumpRunning] = useState(false);
  const [manureAutoMode, setManureAutoMode] = useState(true);
  const { toast } = useToast();

  // Emergency alerts data
  const emergencyAlerts = [
    {
      id: 'emergency-1',
      type: 'weather',
      priority: 'urgent',
      title: 'Heavy Rainfall Alert - Next 48 Hours',
      description: 'IMD issues orange alert for Punjab, Haryana. Secure your crops and equipment.',
      regions: 'Punjab, Haryana, UP',
      validUntil: '2025-09-29',
      action: 'Secure crops immediately'
    },
    {
      id: 'emergency-2',
      type: 'pest',
      priority: 'high',
      title: 'Locust Swarm Warning',
      description: 'Locust swarms detected 50km from your area. Prepare protective measures.',
      regions: 'Rajasthan, Punjab border',
      validUntil: '2025-09-30',
      action: 'Apply preventive pesticides'
    },
    {
      id: 'emergency-3',
      type: 'disease',
      priority: 'medium',
      title: 'Fungal Infection Alert',
      description: 'High humidity conditions favorable for fungal growth in wheat crops.',
      regions: 'Northern India',
      validUntil: '2025-10-05',
      action: 'Monitor crop health'
    }
  ];

  // Government schemes data
  const governmentSchemes = [
    {
      id: 'scheme-1',
      title: 'PM Kisan Samman Nidhi',
      description: 'Direct cash transfer of ₹6000 per year to farmer families',
      amount: '₹6,000/year',
      deadline: '2025-09-30',
      status: 'active',
      beneficiaries: '12+ crore farmers',
      requirements: 'Land ownership, Aadhaar linked bank account'
    },
    {
      id: 'scheme-2',
      title: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance at subsidized rates for all farmers',
      amount: '2% premium (Kharif), 1.5% (Rabi)',
      deadline: '2025-10-15',
      status: 'active',
      beneficiaries: 'All farmers',
      requirements: 'Valid land documents, bank account'
    },
    {
      id: 'scheme-3',
      title: 'Kisan Credit Card',
      description: 'Flexible credit facility for agricultural needs',
      amount: 'Up to ₹3 lakh',
      deadline: 'Ongoing',
      status: 'active',
      beneficiaries: 'All farmers',
      requirements: 'Land documents, income proof'
    }
  ];

  // Government alerts and notifications
  const governmentAlerts = [
    {
      id: 'alert-1',
      type: 'policy',
      priority: 'high',
      title: 'New MSP Rates Announced for Kharif 2025',
      description: 'Minimum Support Price increased for rice, wheat, and cotton crops',
      date: '2025-09-25',
      source: 'Ministry of Agriculture',
      action: 'Review and plan crop selection'
    },
    {
      id: 'alert-2',
      type: 'subsidy',
      priority: 'medium',
      title: 'Fertilizer Subsidy Extended',
      description: 'Additional subsidy on Urea and DAP fertilizers until December 2025',
      date: '2025-09-20',
      source: 'Fertilizer Association of India',
      action: 'Apply for subsidy benefits'
    }
  ];

  // Manure management data
  const manureData = {
    tankLevel: 75,
    flowRate: 12.5,
    pressure: 2.8,
    temperature: 22.5,
    ph: 6.8,
    nitrogen: 145,
    phosphorus: 89,
    potassium: 198,
    lastApplication: '2025-09-20',
    nextScheduled: '2025-09-27'
  };

  const manureTypes = [
    {
      id: 'cow-dung',
      name: 'Cow Dung',
      nutrient: 'NPK 0.5-0.2-0.5',
      applicationRate: '2-3 tons/acre',
      availability: 'High',
      cost: '₹500/ton'
    },
    {
      id: 'vermicompost',
      name: 'Vermicompost',
      nutrient: 'NPK 1.5-1.0-1.5',
      applicationRate: '1-2 tons/acre',
      availability: 'Medium',
      cost: '₹800/ton'
    },
    {
      id: 'poultry-manure',
      name: 'Poultry Manure',
      nutrient: 'NPK 3.5-2.5-1.5',
      applicationRate: '0.5-1 ton/acre',
      availability: 'High',
      cost: '₹600/ton'
    },
    {
      id: 'green-manure',
      name: 'Green Manure',
      nutrient: 'NPK 1.0-0.5-1.0',
      applicationRate: '2-4 tons/acre',
      availability: 'Seasonal',
      cost: '₹300/ton'
    }
  ];

  const handleApplyType = (type) => {
    // Simulate starting application and provide user feedback
    setManurePumpRunning(true);
    toast({
      title: `Applying ${type.name}`,
      description: `Scheduled application using ${type.nutrient} profile.`,
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-destructive bg-destructive/5';
      case 'high': return 'border-chart-3 bg-chart-3/5';
      default: return 'border-chart-1 bg-chart-1/5';
    }
  };

  const getPriorityIcon = (type, priority) => {
    if (priority === 'urgent') return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (type === 'weather') return <CloudRain className="h-4 w-4 text-blue-500" />;
    if (type === 'pest') return <Shield className="h-4 w-4 text-orange-500" />;
    if (type === 'disease') return <AlertCircle className="h-4 w-4 text-red-500" />;
    return <Info className="h-4 w-4 text-chart-1" />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'expired': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'policy': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'subsidy': return <IndianRupee className="h-4 w-4 text-green-500" />;
      case 'training': return <Users className="h-4 w-4 text-purple-500" />;
      default: return <Bell className="h-4 w-4 text-chart-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative h-32 overflow-hidden bg-gradient-to-r from-green-600 to-green-800">
        <img 
          src={heroImage} 
          alt="Agricultural landscape" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-green-800/90" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
                <img 
                  src={logoUrl} 
                  alt="Kisan Shakti Logo" 
                className="h-12 w-12 rounded-lg"
                />
                <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-display">
                  Kisan Shakti Dashboard
                  </h1>
                <p className="text-white/90">
                  Smart Farming Solutions & Government Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-6 space-y-8">
        
        {/* Emergency Alerts Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="text-xl font-bold font-display">
              Emergency Alerts & Critical Information
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyAlerts.map((alert) => (
              <Card key={alert.id} className={`${getPriorityColor(alert.priority)} hover-elevate`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(alert.type, alert.priority)}
                      <Badge variant={alert.priority === 'urgent' ? 'destructive' : 'secondary'}>
                        {alert.type.toUpperCase()}
                      </Badge>
                    </div>
                    {alert.priority === 'urgent' && (
                      <Badge variant="destructive">URGENT</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {alert.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                          <span className="text-muted-foreground">Regions:</span>
                      <span className="font-medium">{alert.regions}</span>
                        </div>
                    <div className="flex justify-between">
                          <span className="text-muted-foreground">Valid Until:</span>
                      <span className="font-medium">{alert.validUntil}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Action Required:</span>
                      <span className="font-medium text-chart-3">{alert.action}</span>
                        </div>
                  </div>
                  
                  <Button size="sm" className="w-full">
                    View Details
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Emergency Contacts */}
          <Card className="bg-destructive/5 border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Phone className="h-5 w-5" />
              Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-card rounded-lg">
                <span className="text-muted-foreground">Kisan Call Centre:</span>
                  <p className="font-medium text-lg">1800-180-1551</p>
              </div>
                <div className="p-3 bg-card rounded-lg">
                <span className="text-muted-foreground">Weather Helpline:</span>
                  <p className="font-medium text-lg">1800-180-1551</p>
                </div>
                <div className="p-3 bg-card rounded-lg">
                  <span className="text-muted-foreground">Disaster Management:</span>
                  <p className="font-medium text-lg">108</p>
              </div>
              </div>
            </CardContent>
          </Card>
            </div>

        {/* Manure Management Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-bold font-display">
              Manure Management & Organic Fertilization
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Manure Control Panel - Left Side */}
            <div className="lg:col-span-2">
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Sprout className="h-5 w-5" />
                    Manure Application Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Control Buttons */}
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${manurePumpRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                      <span className="font-medium">
                        {manurePumpRunning ? 'Pump Running' : 'Pump Stopped'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={manurePumpRunning ? "destructive" : "default"}
                        onClick={() => setManurePumpRunning(!manurePumpRunning)}
                        className={manurePumpRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                      >
                        {manurePumpRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {manurePumpRunning ? 'Stop' : 'Start'}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setManurePumpRunning(false)}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Auto Mode Toggle */}
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div>
                      <h3 className="font-medium">Auto Mode</h3>
                      <p className="text-sm text-muted-foreground">Automatically apply manure based on soil conditions</p>
                    </div>
                    <Button
                      size="sm"
                      variant={manureAutoMode ? "default" : "outline"}
                      onClick={() => setManureAutoMode(!manureAutoMode)}
                      className={manureAutoMode ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {manureAutoMode ? 'ON' : 'OFF'}
                    </Button>
                  </div>

                  {/* Manure System Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Tank Level</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{manureData.tankLevel}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${manureData.tankLevel}%` }}
                        ></div>
        </div>
      </div>

                    <div className="p-4 bg-white rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">Flow Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{manureData.flowRate} L/min</div>
                      <p className="text-xs text-muted-foreground mt-1">Optimal range: 10-15 L/min</p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Gauge className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Pressure</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{manureData.pressure} bar</div>
                      <p className="text-xs text-muted-foreground mt-1">System pressure</p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Temperature</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{manureData.temperature}°C</div>
                      <p className="text-xs text-muted-foreground mt-1">Manure temperature</p>
        </div>
      </div>

                  {/* Application Schedule */}
                  <div className="p-4 bg-white rounded-lg border">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      Application Schedule
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Last Application:</span>
                        <p className="font-medium">{manureData.lastApplication}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Scheduled:</span>
                        <p className="font-medium text-green-600">{manureData.nextScheduled}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Manure Types & Info - Right Side */}
            <div className="space-y-4">
              {/* Soil Nutrient Status */}
            <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Soil Nutrient Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Nitrogen (N)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(manureData.nitrogen/200)*100}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{manureData.nitrogen} mg/kg</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phosphorus (P)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(manureData.phosphorus/150)*100}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{manureData.phosphorus} mg/kg</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Potassium (K)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(manureData.potassium/400)*100}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{manureData.potassium} mg/kg</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">pH Level</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(manureData.ph/10)*100}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{manureData.ph}</span>
                    </div>
                </div>
              </CardContent>
            </Card>
            
              {/* Available Manure Types */}
            <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Available Manure Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {manureTypes.map((type) => (
                    <div key={type.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-green-800">{type.name}</h4>
                        <Badge variant="secondary" className="text-xs">{type.availability}</Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><span className="text-muted-foreground">Nutrient:</span> {type.nutrient}</p>
                        <p><span className="text-muted-foreground">Rate:</span> {type.applicationRate}</p>
                        <p><span className="text-muted-foreground">Cost:</span> <span className="font-medium text-green-600">{type.cost}</span></p>
                      </div>
                      <Button
                        size="sm"
                        className="w-full mt-2 bg-green-600 hover:bg-green-700"
                        onClick={() => handleApplyType(type)}
                      >
                        Select & Apply
                      </Button>
                </div>
                  ))}
              </CardContent>
            </Card>
            
              {/* Quick Actions */}
            <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/dashboard">
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Sensor Data
                    </Button>
                  </Link>
                  <Link href="/irrigation">
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Droplets className="h-4 w-4 mr-2" />
                      Irrigation Control
                    </Button>
                  </Link>
                  <Link href="/weather">
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <CloudRain className="h-4 w-4 mr-2" />
                      Weather Forecast
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Government Schemes Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <IndianRupee className="h-5 w-5 text-chart-3" />
            <h2 className="text-xl font-bold font-display">
              Government Schemes & Benefits
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {governmentSchemes.map((scheme) => (
              <Card key={scheme.id} className="hover-elevate">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(scheme.status)}
                      <Badge variant={scheme.status === 'active' ? 'default' : 'secondary'}>
                        {scheme.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-chart-3">{scheme.amount}</p>
                    </div>
                </div>
                  <CardTitle className="text-lg leading-tight">
                    {scheme.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                    {scheme.description}
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-medium">{scheme.deadline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Beneficiaries:</span>
                      <span className="font-medium">{scheme.beneficiaries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requirements:</span>
                      <span className="font-medium text-right max-w-48">{scheme.requirements}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full">
                    Apply Now
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Government Alerts Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-chart-1" />
            <h2 className="text-xl font-bold font-display">
              Government Notifications & Updates
            </h2>
          </div>
          
          <div className="space-y-4">
            {governmentAlerts.map((alert) => (
              <Card key={alert.id} className={`${getPriorityColor(alert.priority)} hover-elevate`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getAlertTypeIcon(alert.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                        <Badge variant={alert.priority === 'high' ? 'destructive' : 'secondary'}>
                          {alert.priority.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>Source: {alert.source}</span>
                          <span>Date: {alert.date}</span>
                        </div>
                        <span className="text-chart-3 font-medium">{alert.action}</span>
                      </div>
                    </div>
                  </div>
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}