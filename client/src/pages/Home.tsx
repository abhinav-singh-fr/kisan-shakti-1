import { useState } from 'react';
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
  MapPin
} from 'lucide-react';
import logoUrl from '@assets/generated_images/Kishan_Shakti_agricultural_logo_9e5268e2.png';
import heroImage from '@assets/generated_images/Terraced_farming_landscape_hero_10759361.png';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Government schemes and alerts data - todo: remove mock functionality
  const emergencyAlerts = [
    {
      id: 'gov-1',
      type: 'scheme' as const,
      priority: 'high' as const,
      title: 'PM Kisan Samman Nidhi - Apply Now',
      description: 'Direct cash transfer of ₹6000 per year. Last date: 30th September 2025',
      amount: '₹6,000',
      deadline: '2025-09-30',
      beneficiaries: '12+ crore farmers'
    },
    {
      id: 'gov-2',
      type: 'alert' as const,
      priority: 'urgent' as const,
      title: 'Heavy Rainfall Alert - Next 48 Hours',
      description: 'IMD issues orange alert for Punjab, Haryana. Secure your crops and equipment.',
      regions: 'Punjab, Haryana, UP',
      validUntil: '2025-09-29'
    },
    {
      id: 'gov-3',
      type: 'scheme' as const,
      priority: 'medium' as const,
      title: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance at subsidized rates. Premium: 2% for Kharif crops',
      amount: '2% premium',
      coverage: 'All crops',
      deadline: '2025-10-15'
    }
  ];

  const quickActions = [
    { title: 'Dashboard', icon: BarChart3, path: '/dashboard', color: 'text-chart-1' },
    { title: 'Irrigation', icon: Droplets, path: '/irrigation', color: 'text-chart-2' },
    { title: 'Weather', icon: CloudRain, path: '/weather', color: 'text-chart-3' },
    { title: 'Settings', icon: Settings, path: '/settings', color: 'text-muted-foreground' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-destructive bg-destructive/5';
      case 'high': return 'border-chart-3 bg-chart-3/5';
      default: return 'border-chart-1 bg-chart-1/5';
    }
  };

  const getPriorityIcon = (type: string, priority: string) => {
    if (priority === 'urgent') return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (type === 'scheme') return <IndianRupee className="h-4 w-4 text-chart-3" />;
    return <Info className="h-4 w-4 text-chart-1" />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Agricultural landscape" 
          className="w-full h-full object-cover"
        />
        {/* Dark wash for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={logoUrl} 
                  alt="Kishan Shakti Logo" 
                  className="h-16 w-16 rounded-lg"
                  data-testid="img-hero-logo"
                />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white font-display" data-testid="text-hero-title">
                    Kishan Shakti
                  </h1>
                  <p className="text-xl text-white/90" data-testid="text-hero-subtitle">
                    Smart Farming Solutions
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-white/80 mb-8">
                Empowering farmers with intelligent sensor monitoring, voice assistance, 
                and comprehensive agricultural management in multiple Indian languages.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30" data-testid="button-get-started">
                    Get Started
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30" data-testid="button-learn-more">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Section - Government Schemes & Alerts */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Megaphone className="h-5 w-5 text-chart-1" />
            <h2 className="text-xl font-bold font-display" data-testid="text-emergency-title">
              Government Schemes & Important Alerts
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyAlerts.map((alert) => (
              <Card key={alert.id} className={`${getPriorityColor(alert.priority)} hover-elevate`} data-testid={`card-alert-${alert.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(alert.type, alert.priority)}
                      <Badge variant={alert.type === 'scheme' ? 'default' : 'secondary'}>
                        {alert.type === 'scheme' ? 'SCHEME' : 'ALERT'}
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
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {alert.type === 'scheme' && (
                      <>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <p className="font-medium text-chart-3">{alert.amount}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Deadline:</span>
                          <p className="font-medium">{alert.deadline}</p>
                        </div>
                      </>
                    )}
                    
                    {alert.type === 'alert' && (
                      <>
                        <div>
                          <span className="text-muted-foreground">Regions:</span>
                          <p className="font-medium">{alert.regions}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Valid Until:</span>
                          <p className="font-medium">{alert.validUntil}</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <Button size="sm" className="w-full" data-testid={`button-view-${alert.id}`}>
                    {alert.type === 'scheme' ? 'Apply Now' : 'View Details'}
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Emergency Contacts */}
          <div className="mt-6 p-4 bg-card rounded-lg border">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Emergency Contacts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Kisan Call Centre:</span>
                <p className="font-medium">1800-180-1551</p>
              </div>
              <div>
                <span className="text-muted-foreground">Weather Helpline:</span>
                <p className="font-medium">1800-180-1551</p>
              </div>
              <div>
                <span className="text-muted-foreground">Local Agriculture Office:</span>
                <p className="font-medium">District Collector Office</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 font-display" data-testid="text-quick-actions">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.path} href={action.path}>
                <Card className="hover-elevate active-elevate-2 cursor-pointer text-center" data-testid={`card-action-${action.title.toLowerCase()}`}>
                  <CardContent className="p-6">
                    <Icon className={`h-8 w-8 mx-auto mb-3 ${action.color}`} />
                    <h3 className="font-medium">{action.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* App Features */}
      <div className="bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 font-display text-center">
            Why Choose Kishan Shakti?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-chart-1" />
                </div>
                <h3 className="font-semibold mb-2">Smart Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time sensor data for soil, weather, and irrigation systems
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-chart-2" />
                </div>
                <h3 className="font-semibold mb-2">Multi-Language</h3>
                <p className="text-sm text-muted-foreground">
                  Available in Hindi, Punjabi, Tamil, Bengali, and more
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-chart-3" />
                </div>
                <h3 className="font-semibold mb-2">Works Offline</h3>
                <p className="text-sm text-muted-foreground">
                  Save internet costs with offline functionality and local storage
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}