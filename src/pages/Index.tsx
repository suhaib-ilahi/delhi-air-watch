import { Header } from '@/components/Header';
import { DelhiMap } from '@/components/DelhiMap';
import { MapLegend } from '@/components/MapLegend';
import { Card } from '@/components/ui/card';
import { getAllPollutionLevels, getWards } from '@/lib/dataService';
import { getAQICategory, AQI_LABELS } from '@/types/pollution';
import { Wind, AlertTriangle, TrendingDown, MapPin } from 'lucide-react';

const Index = () => {
  const wards = getWards();
  const pollutionLevels = getAllPollutionLevels();

  const stats = {
    totalWards: wards.length,
    severeCount: Object.values(pollutionLevels).filter(p => p.category === 'severe').length,
    avgAqi: Math.round(Object.values(pollutionLevels).reduce((sum, p) => sum + p.aqi, 0) / Object.keys(pollutionLevels).length),
    bestWard: wards.find(w => pollutionLevels[w.id]?.aqi === Math.min(...Object.values(pollutionLevels).map(p => p.aqi))),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative">
        {/* Stats Bar */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container px-4 py-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Monitoring</p>
                  <p className="font-semibold">{stats.totalWards} Wards</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-aqi-severe/10">
                  <AlertTriangle className="h-4 w-4 text-aqi-severe" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Severe AQI</p>
                  <p className="font-semibold">{stats.severeCount} Wards</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-aqi-poor/10">
                  <Wind className="h-4 w-4 text-aqi-poor" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">City Average</p>
                  <p className="font-semibold">AQI {stats.avgAqi}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-aqi-good/10">
                  <TrendingDown className="h-4 w-4 text-aqi-good" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cleanest Ward</p>
                  <p className="font-semibold">{stats.bestWard?.name || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-[calc(100vh-8rem)]">
          <DelhiMap />
          <MapLegend />
        </div>
      </main>
    </div>
  );
};

export default Index;
