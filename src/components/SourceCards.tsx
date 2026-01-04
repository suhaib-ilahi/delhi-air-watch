import { Card } from '@/components/ui/card';
import { PollutionSource } from '@/types/pollution';
import { Car, Building2, Factory, Flame, Home, TrendingUp } from 'lucide-react';

interface SourceCardsProps {
  sources: PollutionSource[];
}

const sourceIcons: Record<string, React.ReactNode> = {
  'Vehicular Traffic': <Car className="h-5 w-5" />,
  'Construction Dust': <Building2 className="h-5 w-5" />,
  'Industrial Emissions': <Factory className="h-5 w-5" />,
  'Waste Burning': <Flame className="h-5 w-5" />,
  'Domestic Fuel Usage': <Home className="h-5 w-5" />,
};

export const SourceCards = ({ sources }: SourceCardsProps) => {
  const sortedSources = [...sources].sort((a, b) => b.contribution - a.contribution);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedSources.map((source, index) => (
        <Card
          key={source.source}
          className="p-4 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {sourceIcons[source.source] || <TrendingUp className="h-5 w-5" />}
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">{source.contribution}%</span>
              <p className="text-xs text-muted-foreground">contribution</p>
            </div>
          </div>
          
          <h4 className="font-semibold mb-2">{source.source}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {source.description}
          </p>
          
          {/* Progress bar */}
          <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${source.contribution}%` }}
            />
          </div>
        </Card>
      ))}
    </div>
  );
};
