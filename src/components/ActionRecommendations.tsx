import { Card } from '@/components/ui/card';
import { CitizenAction } from '@/types/pollution';
import { Shield, Clock, Users, CheckCircle2 } from 'lucide-react';

interface ActionRecommendationsProps {
  actions: CitizenAction;
  pollutant: string;
}

const categoryConfig = {
  personal: {
    icon: <Shield className="h-5 w-5" />,
    title: 'Personal Safety',
    description: 'Protect yourself from pollution exposure',
    color: 'bg-blue-500/10 text-blue-600',
  },
  daily: {
    icon: <Clock className="h-5 w-5" />,
    title: 'Daily Behavior Changes',
    description: 'Small changes for big impact',
    color: 'bg-green-500/10 text-green-600',
  },
  community: {
    icon: <Users className="h-5 w-5" />,
    title: 'Community Actions',
    description: 'Collective efforts for cleaner air',
    color: 'bg-purple-500/10 text-purple-600',
  },
};

export const ActionRecommendations = ({ actions, pollutant }: ActionRecommendationsProps) => {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Based on the dominant pollutant <span className="font-semibold text-primary">{pollutant}</span>, 
        here are recommended actions for citizens:
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const actionList = actions[key as keyof CitizenAction];
          
          return (
            <Card key={key} className="p-5 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl ${config.color}`}>
                  {config.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{config.title}</h4>
                  <p className="text-xs text-muted-foreground">{config.description}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {actionList.slice(0, 4).map((action, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{action}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
