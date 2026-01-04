import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AQIBadge } from '@/components/AQIBadge';
import { Ward, PollutionLevel, PollutionSource } from '@/types/pollution';
import { MapPin, Wind, ArrowRight, Factory, Car } from 'lucide-react';

interface WardPopupCardProps {
  ward: Ward;
  pollution: PollutionLevel;
  topSources: PollutionSource[];
  onClose?: () => void;
}

export const WardPopupCard = ({ ward, pollution, topSources, onClose }: WardPopupCardProps) => {
  const navigate = useNavigate();

  const handleViewReport = () => {
    onClose?.();
    navigate(`/ward/${ward.id}`);
  };

  return (
    <Card className="w-80 overflow-hidden border-0 shadow-xl animate-scale-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-foreground">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary-foreground/80 text-sm mb-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{ward.zone}</span>
            </div>
            <h3 className="font-bold text-lg">{ward.name}</h3>
          </div>
          <AQIBadge category={pollution.category} aqi={pollution.aqi} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Dominant Pollutant */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Wind className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Dominant Pollutant</p>
            <p className="font-semibold">{pollution.dominantPollutant}</p>
          </div>
        </div>

        {/* Top Sources */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Pollution Sources</h4>
          <div className="space-y-2">
            {topSources.slice(0, 2).map((source, index) => (
              <div
                key={source.source}
                className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {index === 0 ? (
                    <Car className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Factory className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm">{source.source}</span>
                </div>
                <span className="text-sm font-semibold text-primary">{source.contribution}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Button onClick={handleViewReport} className="w-full group" size="lg">
          View Full Ward Report
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
};
