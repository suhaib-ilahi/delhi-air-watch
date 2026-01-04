import { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getWards, getPollutionLevel, getPollutionSources } from '@/lib/dataService';
import { WardPopupCard } from '@/components/WardPopupCard';
import { AQI_COLORS, getAQICategory } from '@/types/pollution';

// Delhi center coordinates
const DELHI_CENTER: LatLngExpression = [28.6139, 77.2090];
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

export const DelhiMap = () => {
  const wards = useMemo(() => getWards(), []);

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
                <WardPopupCard
                  ward={ward}
                  pollution={pollution}
                  topSources={sortedSources}
                />
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};
