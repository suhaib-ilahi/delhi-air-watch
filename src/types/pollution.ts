export type AQICategory = 'good' | 'moderate' | 'poor' | 'very-poor' | 'severe';

export interface Ward {
  id: string;
  name: string;
  zone: string;
  population: number;
  area: number;
  coordinates: [number, number];
}

export interface Pollutant {
  value: number;
  unit: string;
  safeLimit: number;
}

export interface PollutionLevel {
  aqi: number;
  category: AQICategory;
  dominantPollutant: string;
  lastUpdated: string;
  pollutants: {
    pm25: Pollutant;
    pm10: Pollutant;
    no2: Pollutant;
    so2: Pollutant;
    o3: Pollutant;
  };
}

export interface PollutionSource {
  source: string;
  contribution: number;
  description: string;
}

export interface TrendDataPoint {
  date?: string;
  month?: string;
  year?: string;
  aqi: number;
}

export interface TrendData {
  daily: TrendDataPoint[];
  monthly: TrendDataPoint[];
  yearly: TrendDataPoint[];
}

export interface ForecastDataPoint {
  date: string;
  aqi: number;
  lower: number;
  upper: number;
}

export interface Prediction {
  forecast: ForecastDataPoint[];
  confidence: number;
  methodology: string;
}

export interface CitizenAction {
  personal: string[];
  daily: string[];
  community: string[];
}

export interface Policy {
  problem: string;
  policy: string;
  description: string;
  impact: string;
}

export interface Suggestion {
  id: string;
  ward: string;
  category: string;
  description: string;
  createdAt: string;
}

export const AQI_COLORS: Record<AQICategory, string> = {
  'good': 'hsl(var(--aqi-good))',
  'moderate': 'hsl(var(--aqi-moderate))',
  'poor': 'hsl(var(--aqi-poor))',
  'very-poor': 'hsl(var(--aqi-very-poor))',
  'severe': 'hsl(var(--aqi-severe))',
};

export const AQI_BG_COLORS: Record<AQICategory, string> = {
  'good': 'bg-aqi-good',
  'moderate': 'bg-aqi-moderate',
  'poor': 'bg-aqi-poor',
  'very-poor': 'bg-aqi-very-poor',
  'severe': 'bg-aqi-severe',
};

export const AQI_TEXT_COLORS: Record<AQICategory, string> = {
  'good': 'text-aqi-good',
  'moderate': 'text-aqi-moderate',
  'poor': 'text-aqi-poor',
  'very-poor': 'text-aqi-very-poor',
  'severe': 'text-aqi-severe',
};

export const AQI_LABELS: Record<AQICategory, string> = {
  'good': 'Good',
  'moderate': 'Moderate',
  'poor': 'Poor',
  'very-poor': 'Very Poor',
  'severe': 'Severe',
};

export const getAQICategory = (aqi: number): AQICategory => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 200) return 'poor';
  if (aqi <= 300) return 'very-poor';
  return 'severe';
};

export const getAQIColor = (aqi: number): string => {
  return AQI_COLORS[getAQICategory(aqi)];
};
