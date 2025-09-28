import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, MicOff, Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import logoUrl from '@assets/generated_images/Kishan_Shakti_agricultural_logo_9e5268e2.png';
import { Link } from 'wouter';

export default function Header({ 
  isVoiceActive = false, 
  onVoiceToggle = () => console.log('Voice toggle'),
  selectedLanguage = 'en',
  onLanguageChange = (lang) => console.log('Language changed to:', lang),
  isOnline = true
}) {
  const [voiceState, setVoiceState] = useState(isVoiceActive);

  const handleVoiceToggle = () => {
    setVoiceState(!voiceState);
    onVoiceToggle();
  };

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी' },
    { value: 'pa', label: 'ਪੰਜਾਬੀ' },
    { value: 'ta', label: 'தமிழ்' },
    { value: 'bn', label: 'বাংলা' },
    { value: 'mr', label: 'मराठी' },
    { value: 'gu', label: 'ગુજરાતી' },
    { value: 'bh', label: 'Bhutia (བོད་སྐད་)' }
  ];

  return (
    <header className="bg-card border-b border-card-border px-4 py-3 flex items-center justify-between gap-4" data-testid="header-main">
      <Link href="/">
        <div className="flex items-center gap-3 hover-elevate rounded-md p-2 -m-2">
          <img 
            src={logoUrl} 
            alt="Kisan Shakti Logo" 
            className="h-10 w-10 rounded-md"
            data-testid="img-logo"
          />
          <div>
            <h1 className="text-xl font-bold text-foreground font-display" data-testid="text-app-name">
              Kisan Shakti
            </h1>
            <p className="text-sm text-muted-foreground" data-testid="text-tagline">
              Smart Farming Solutions
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        {/* Online/Offline Status */}
        <Badge 
          variant={isOnline ? "default" : "secondary"} 
          className="gap-1"
          data-testid={`badge-status-${isOnline ? 'online' : 'offline'}`}
        >
          {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          {isOnline ? 'Online' : 'Offline'}
        </Badge>

        {/* Language Selector */}
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-32" data-testid="select-language">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map(lang => (
              <SelectItem key={lang.value} value={lang.value} data-testid={`option-language-${lang.value}`}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Navigation - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="nav-dashboard-desktop">
              Dashboard
            </Button>
          </Link>
          <Link href="/irrigation">
            <Button variant="ghost" size="sm" data-testid="nav-irrigation-desktop">
              Irrigation
            </Button>
          </Link>
          <Link href="/manure">
            <Button variant="ghost" size="sm" data-testid="nav-manure-desktop">
              Manure
            </Button>
          </Link>
          <Link href="/alerts">
            <Button variant="ghost" size="sm" data-testid="nav-alerts-desktop">
              Alerts
            </Button>
          </Link>
          <Link href="/weather">
            <Button variant="ghost" size="sm" data-testid="nav-weather-desktop">
              Weather
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" size="sm" data-testid="nav-settings-desktop">
              Settings
            </Button>
          </Link>
        </div>

        {/* Voice Assistant */}
        <Button
          size="icon"
          variant={voiceState ? "default" : "outline"}
          onClick={handleVoiceToggle}
          className={voiceState ? "bg-primary text-primary-foreground" : ""}
          data-testid="button-voice-assistant"
        >
          {voiceState ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}