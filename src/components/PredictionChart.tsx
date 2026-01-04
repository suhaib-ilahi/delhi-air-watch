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
import { Badge } from '@/components/ui/badge';
import { Prediction } from '@/types/pollution';
import { AlertTriangle } from 'lucide-react';

interface PredictionChartProps {
  prediction: Prediction;
}

export const PredictionChart = ({ prediction }: PredictionChartProps) => {
  const data = prediction.forecast.map((d) => ({
    name: new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    aqi: d.aqi,
    lower: d.lower,
    upper: d.upper,
  }));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Simulated Forecast
        </Badge>
        <span className="text-sm text-muted-foreground">
          Confidence: <span className="font-semibold text-foreground">{(prediction.confidence * 100).toFixed(0)}%</span>
        </span>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
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
                  const d = payload[0].payload;
                  return (
                    <Card className="p-3 shadow-lg border">
                      <p className="text-sm text-muted-foreground mb-1">{d.name}</p>
                      <p className="font-bold">Predicted AQI: {d.aqi}</p>
                      <p className="text-xs text-muted-foreground">
                        Range: {d.lower} - {d.upper}
                      </p>
                    </Card>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="upper"
              stroke="transparent"
              fill="hsl(var(--primary))"
              fillOpacity={0.1}
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="transparent"
              fill="hsl(var(--background))"
              fillOpacity={1}
            />
            <Line
              type="monotone"
              dataKey="aqi"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              strokeDasharray="8 4"
              dot={{ fill: 'hsl(var(--primary))', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Methodology: </span>
          {prediction.methodology}
        </p>
      </Card>
    </div>
  );
};
