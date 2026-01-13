import { useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getWards, getPollutionLevel, getPollutionSources } from '@/lib/dataService';
import { getAQICategory } from '@/types/pollution';
import { AQIBadge } from '@/components/AQIBadge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Wind, ArrowRight, Factory, Car } from 'lucide-react';
import type { Ward, PollutionLevel, PollutionSource } from '@/types/pollution';

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Delhi center coordinates
type LatLngTuple = [number, number];

const DELHI_CENTER: LatLngTuple = [28.6139, 77.2090];
const DELHI_ZOOM = 11;

const getMarkerColor = (aqi: number): string => {
  const category = getAQICategory(aqi);
  const colorMap: Record<string, string> = {
    'good': '#22c55e',
    'moderate': '#eab308',
    'poor': '#f97316',
    'very-poor': '#ef4444',
    'severe': '#7c3aed',
  };
  return colorMap[category] || '#6b7280';
};

const getMarkerRadius = (aqi: number): number => {
  if (aqi <= 50) return 18;
  if (aqi <= 100) return 22;
  if (aqi <= 200) return 26;
  if (aqi <= 300) return 30;
  return 34;
};

// Simple popup content component without hooks
const PopupContent = ({ 
  ward, 
  pollution, 
  topSources,
  onViewReport 
}: { 
  ward: Ward; 
  pollution: PollutionLevel; 
  topSources: PollutionSource[];
  onViewReport: (wardId: string) => void;
}) => {
  return (
    <div className="w-72 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-3 text-white rounded-t-lg -m-3 mb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
              <MapPin className="h-3 w-3" />
              <span>{ward.zone}</span>
            </div>
            <h3 className="font-bold text-base">{ward.name}</h3>
          </div>
          <AQIBadge category={pollution.category} aqi={pollution.aqi} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 pt-2">
        {/* Dominant Pollutant */}
        <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
          <div className="p-1.5 bg-primary/10 rounded-md">
            <Wind className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Dominant Pollutant</p>
            <p className="font-semibold text-sm">{pollution.dominantPollutant}</p>
          </div>
        </div>

        {/* Top Sources */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-1.5">Top Pollution Sources</h4>
          <div className="space-y-1.5">
            {topSources.slice(0, 2).map((source, index) => (
              <div
                key={source.source}
                className="flex items-center justify-between p-1.5 bg-secondary/50 rounded-md"
              >
                <div className="flex items-center gap-1.5">
                  {index === 0 ? (
                    <Car className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <Factory className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <span className="text-xs">{source.source}</span>
                </div>
                <span className="text-xs font-semibold text-primary">{source.contribution}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={() => onViewReport(ward.id)} 
          className="w-full group" 
          size="sm"
        >
          View Full Ward Report
          <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export const DelhiMap = () => {
  const navigate = useNavigate();
  const wards = useMemo(() => getWards(), []);

  const handleViewReport = (wardId: string) => {
    navigate(`/ward/${wardId}`);
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border border-border">
      <MapContainer
        center={DELHI_CENTER}
        zoom={DELHI_ZOOM}
        className="w-full h-full"
        style={{ background: 'hsl(var(--background))' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {wards.map((ward) => {
          const pollution = getPollutionLevel(ward.id);
          const sources = getPollutionSources(ward.id);
          
          if (!pollution) return null;

          const sortedSources = [...sources].sort((a, b) => b.contribution - a.contribution);
          const color = getMarkerColor(pollution.aqi);
          const radius = getMarkerRadius(pollution.aqi);

          return (
            <CircleMarker
              key={ward.id}
              center={[ward.coordinates[0], ward.coordinates[1]]}
              radius={radius}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.7,
                weight: 3,
                opacity: 1,
              }}
            >
              <Popup className="ward-popup" closeButton={false}>
                <PopupContent
                  ward={ward}
                  pollution={pollution}
                  topSources={sortedSources}
                  onViewReport={handleViewReport}
                />
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};