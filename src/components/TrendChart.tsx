import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendData } from '@/types/pollution';
import { cn } from '@/lib/utils';

interface TrendChartProps {
  trends: TrendData;
}

type TimeFilter = 'daily' | 'monthly' | 'yearly';

const filterLabels: Record<TimeFilter, string> = {
  daily: 'Last 30 Days',
  monthly: 'Last 6 Months',
  yearly: 'Last 5 Years',
};

export const TrendChart = ({ trends }: TrendChartProps) => {
  const [filter, setFilter] = useState<TimeFilter>('daily');

  const getData = () => {
    switch (filter) {
      case 'daily':
        return trends.daily.map((d) => ({
          name: new Date(d.date!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
          aqi: d.aqi,
        }));
      case 'monthly':
        return trends.monthly.map((d) => ({
          name: d.month,
          aqi: d.aqi,
        }));
      case 'yearly':
        return trends.yearly.map((d) => ({
          name: d.year,
          aqi: d.aqi,
        }));
    }
  };

  const data = getData();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(filterLabels) as TimeFilter[]).map((key) => (
          <Button
            key={key}
            variant={filter === key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(key)}
            className={cn(
              'transition-all',
              filter === key && 'shadow-md'
            )}
          >
            {filterLabels[key]}
          </Button>
        ))}
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-3 shadow-lg border">
                      <p className="text-sm text-muted-foreground">{payload[0].payload.name}</p>
                      <p className="font-bold text-lg">AQI: {payload[0].value}</p>
                    </Card>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="aqi"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAqi)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
