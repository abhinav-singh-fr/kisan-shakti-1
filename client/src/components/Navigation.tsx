import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Activity, 
  Droplets, 
  CloudRain, 
  Settings,
  BarChart3
} from 'lucide-react';

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/sensors/soil-moisture', icon: Activity, label: 'Sensors' },
    { path: '/irrigation', icon: Droplets, label: 'Irrigation' },
    { path: '/weather', icon: CloudRain, label: 'Weather' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 md:hidden" data-testid="nav-bottom">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location === item.path || (item.path === '/sensors/soil-moisture' && location.startsWith('/sensors'));
          const Icon = item.icon;
          
          return (
            <Link key={item.path} href={item.path}>
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className="flex flex-col h-12 w-12 p-1"
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <Icon className="h-4 w-4 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}