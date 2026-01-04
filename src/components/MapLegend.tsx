import { AQI_LABELS, AQICategory } from '@/types/pollution';

const legendItems: { category: AQICategory; range: string }[] = [
  { category: 'good', range: '0-50' },
  { category: 'moderate', range: '51-100' },
  { category: 'poor', range: '101-200' },
  { category: 'very-poor', range: '201-300' },
  { category: 'severe', range: '301+' },
];

const colorMap: Record<AQICategory, string> = {
  'good': 'bg-aqi-good',
  'moderate': 'bg-aqi-moderate',
  'poor': 'bg-aqi-poor',
  'very-poor': 'bg-aqi-very-poor',
  'severe': 'bg-aqi-severe',
};

export const MapLegend = () => {
  return (
    <div className="absolute bottom-6 left-6 z-[1000] bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
      <h3 className="text-sm font-semibold mb-3">Air Quality Index</h3>
      <div className="space-y-2">
        {legendItems.map(({ category, range }) => (
          <div key={category} className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${colorMap[category]}`} />
            <span className="text-sm">
              <span className="font-medium">{AQI_LABELS[category]}</span>
              <span className="text-muted-foreground ml-1">({range})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
