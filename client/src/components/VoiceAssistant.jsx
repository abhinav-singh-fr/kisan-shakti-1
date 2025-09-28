import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

export default function VoiceAssistant({ 
  isActive = false, 
  onToggle = (active) => console.log('Voice assistant:', active),
  language = 'en'
}) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if Speech Recognition is supported
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const startListening = () => {
    if (!isSupported) {
      console.log('Speech recognition not supported');
      return;
    }

    setIsListening(true);
    setTranscript('');
    
    // Simulate speech recognition
    setTimeout(() => {
      const mockTranscripts = [
        "What is the soil moisture level?",
        "Start irrigation in field A",
        "Show me weather forecast",
        "Check sensor status",
        "Turn on automatic mode"
      ];
      const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
      setTranscript(randomTranscript);
      setIsListening(false);
      
      // Generate response
      generateResponse(randomTranscript);
    }, 2000);
  };

  const generateResponse = (query) => {
    const responses = {
      "soil moisture": "Current soil moisture is 65%. This is within optimal range for your crops.",
      "irrigation": "Starting irrigation in field A. Estimated duration: 45 minutes.",
      "weather": "Today's forecast: 28°C, partly cloudy with light winds. Good conditions for farming.",
      "sensor": "All sensors are online. Soil pH: 6.8, NPK levels: Normal, Temperature: 28°C.",
      "automatic": "Automatic irrigation mode is now enabled. System will monitor and adjust as needed."
    };

    let response = "I understand your request. ";
    Object.keys(responses).forEach(key => {
      if (query.toLowerCase().includes(key)) {
        response = responses[key];
      }
    });

    setResponse(response);
    speak(response);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getVoiceLanguage(language);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const getVoiceLanguage = (lang) => {
    const langMap = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'pa': 'pa-IN',
      'ta': 'ta-IN',
      'bn': 'bn-IN',
      'mr': 'mr-IN',
      'gu': 'gu-IN',
      // Bhutia (Sikkimese) uses Tibetan script; attempt Tibetan voice
      'bh': 'bo'
    };
    return langMap[lang] || 'en-US';
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getStatusText = () => {
    if (isListening) return 'Listening...';
    if (isSpeaking) return 'Speaking...';
    if (isActive) return 'Ready';
    return 'Inactive';
  };

  const getStatusColor = () => {
    if (isListening) return 'default';
    if (isSpeaking) return 'secondary';
    return 'secondary';
  };

  if (!isActive) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-80 shadow-lg border-2" data-testid="card-voice-assistant">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">Voice Assistant</h3>
          <Badge variant={getStatusColor()} data-testid="badge-voice-status">
            {getStatusText()}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant={isListening ? "default" : "outline"}
            onClick={startListening}
            disabled={!isSupported || isListening || isSpeaking}
            data-testid="button-voice-listen"
          >
            {isListening ? <Mic className="h-4 w-4 animate-pulse" /> : <MicOff className="h-4 w-4" />}
          </Button>
          
          {isSpeaking && (
            <Button
              size="icon"
              variant="outline"
              onClick={stopSpeaking}
              data-testid="button-voice-stop"
            >
              <VolumeX className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onToggle(false)}
            data-testid="button-voice-close"
          >
            Close
          </Button>
        </div>

        {transcript && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">You said:</p>
            <p className="text-sm bg-muted p-2 rounded" data-testid="text-voice-transcript">
              "{transcript}"
            </p>
          </div>
        )}

        {response && (
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <p className="text-xs text-muted-foreground">Response:</p>
              {isSpeaking && <Volume2 className="h-3 w-3 text-chart-1 animate-pulse" />}
            </div>
            <p className="text-sm bg-primary/10 p-2 rounded" data-testid="text-voice-response">
              {response}
            </p>
          </div>
        )}

        {!isSupported && (
          <p className="text-xs text-destructive" data-testid="text-voice-unsupported">
            Speech recognition not supported in this browser
          </p>
        )}
      </CardContent>
    </Card>
  );
}