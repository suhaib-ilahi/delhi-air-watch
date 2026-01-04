import { Card } from '@/components/ui/card';
import { Policy } from '@/types/pollution';
import { AlertTriangle, Lightbulb, TrendingUp, ChevronRight } from 'lucide-react';

interface PolicyCardsProps {
  policies: Policy[];
  wardName: string;
}

export const PolicyCards = ({ policies, wardName }: PolicyCardsProps) => {
  if (!policies.length) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No specific policies available for this ward.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Ward-specific policy recommendations for <span className="font-semibold text-primary">{wardName}</span>:
      </p>

      <div className="space-y-4">
        {policies.map((policy, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Problem Section */}
              <div className="lg:col-span-4 p-5 bg-destructive/5 border-b lg:border-b-0 lg:border-r border-border">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="text-xs font-medium text-destructive uppercase tracking-wide">Problem</span>
                </div>
                <p className="text-sm font-medium">{policy.problem}</p>
              </div>

              {/* Policy Section */}
              <div className="lg:col-span-4 p-5 bg-primary/5 border-b lg:border-b-0 lg:border-r border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">Suggested Policy</span>
                </div>
                <p className="text-sm font-semibold mb-2">{policy.policy}</p>
                <p className="text-xs text-muted-foreground">{policy.description}</p>
              </div>

              {/* Impact Section */}
              <div className="lg:col-span-4 p-5 bg-aqi-good/5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-aqi-good" />
                  <span className="text-xs font-medium text-aqi-good uppercase tracking-wide">Expected Impact</span>
                </div>
                <p className="text-sm text-muted-foreground">{policy.impact}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
