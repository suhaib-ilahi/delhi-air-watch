import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { PollutionLevel } from '@/types/pollution';

interface PollutantBreakdownChartProps {
  pollution: PollutionLevel;
}

const pollutantLabels: Record<string, string> = {
  pm25: 'PM2.5',
  pm10: 'PM10',
  no2: 'NO₂',
  so2: 'SO₂',
  o3: 'O₃',
};

const getBarColor = (value: number, safeLimit: number): string => {
  const ratio = value / safeLimit;
  if (ratio <= 0.5) return 'hsl(var(--aqi-good))';
  if (ratio <= 1) return 'hsl(var(--aqi-moderate))';
  if (ratio <= 1.5) return 'hsl(var(--aqi-poor))';
  if (ratio <= 2) return 'hsl(var(--aqi-very-poor))';
  return 'hsl(var(--aqi-severe))';
};

export const PollutantBreakdownChart = ({ pollution }: PollutantBreakdownChartProps) => {
  const data = Object.entries(pollution.pollutants).map(([key, value]) => ({
    name: pollutantLabels[key] || key,
    value: value.value,
    safeLimit: value.safeLimit,
    unit: value.unit,
    ratio: value.value / value.safeLimit,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis
            type="category"
            dataKey="name"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            width={50}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <Card className="p-3 shadow-lg border">
                    <p className="font-semibold">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Current: <span className="font-medium text-foreground">{data.value} {data.unit}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Safe Limit: <span className="font-medium text-foreground">{data.safeLimit} {data.unit}</span>
                    </p>
                    <p className={`text-sm font-medium ${data.ratio > 1 ? 'text-aqi-poor' : 'text-aqi-good'}`}>
                      {data.ratio > 1 ? `${((data.ratio - 1) * 100).toFixed(0)}% above limit` : 'Within safe limit'}
                    </p>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.value, entry.safeLimit)} />
            ))}
          </Bar>
          <Bar dataKey="safeLimit" fill="transparent" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
