import { AQICategory, AQI_LABELS } from '@/types/pollution';
import { cn } from '@/lib/utils';

interface AQIBadgeProps {
  category: AQICategory;
  aqi?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

const categoryClasses: Record<AQICategory, string> = {
  'good': 'bg-aqi-good/15 text-aqi-good border-aqi-good/30',
  'moderate': 'bg-aqi-moderate/15 text-aqi-moderate border-aqi-moderate/30',
  'poor': 'bg-aqi-poor/15 text-aqi-poor border-aqi-poor/30',
  'very-poor': 'bg-aqi-very-poor/15 text-aqi-very-poor border-aqi-very-poor/30',
  'severe': 'bg-aqi-severe/15 text-aqi-severe border-aqi-severe/30',
};

export const AQIBadge = ({ category, aqi, size = 'md', showLabel = true }: AQIBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium border',
        sizeClasses[size],
        categoryClasses[category]
      )}
    >
      {aqi !== undefined && <span className="font-bold">{aqi}</span>}
      {showLabel && <span>{AQI_LABELS[category]}</span>}
    </span>
  );
};
