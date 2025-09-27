import WeatherWidget from '../WeatherWidget';

export default function WeatherWidgetExample() {
  return (
    <div className="p-4 max-w-sm">
      <WeatherWidget 
        data={{
          temperature: 28,
          humidity: 65,
          rainfall: 2.5,
          windSpeed: 12,
          condition: 'cloudy',
          forecast: 'Partly cloudy with light winds. Good conditions for irrigation.'
        }}
        isOnline={true}
      />
    </div>
  );
}