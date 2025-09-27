import SensorCard from '../SensorCard';
import { Droplets } from 'lucide-react';

export default function SensorCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <SensorCard
        title="Soil Moisture"
        value={65.5}
        unit="%"
        range={{ min: 0, max: 100, optimal: { min: 40, max: 80 } }}
        icon={<Droplets className="h-4 w-4" />}
        description="Optimal for current crop stage"
        isOnline={true}
      />
      <SensorCard
        title="Soil pH"
        value={6.8}
        unit="pH"
        range={{ min: 3, max: 10, optimal: { min: 6, max: 7.5 } }}
        icon={<Droplets className="h-4 w-4" />}
        description="Good for nutrient absorption"
        isOnline={true}
      />
      <SensorCard
        title="NPK Nitrogen"
        value={125}
        unit="mg/kg"
        range={{ min: 0, max: 1999, optimal: { min: 100, max: 300 } }}
        icon={<Droplets className="h-4 w-4" />}
        description="Sufficient for growth phase"
        isOnline={false}
      />
    </div>
  );
}