import wardsData from '@/data/wards.json';
import pollutionLevelsData from '@/data/pollutionLevels.json';
import pollutionSourcesData from '@/data/pollutionSources.json';
import historicalTrendsData from '@/data/historicalTrends.json';
import predictionsData from '@/data/predictions.json';
import citizenActionsData from '@/data/citizenActions.json';
import policiesData from '@/data/policies.json';
import {
  Ward,
  PollutionLevel,
  PollutionSource,
  TrendData,
  Prediction,
  CitizenAction,
  Policy,
} from '@/types/pollution';

export const getWards = (): Ward[] => {
  return wardsData.wards.map(w => ({
    ...w,
    coordinates: w.coordinates as [number, number]
  }));
};

export const getWardById = (id: string): Ward | undefined => {
  const ward = wardsData.wards.find((w) => w.id === id);
  if (!ward) return undefined;
  return { ...ward, coordinates: ward.coordinates as [number, number] };
};

export const getPollutionLevel = (wardId: string): PollutionLevel | undefined => {
  return (pollutionLevelsData.levels as Record<string, PollutionLevel>)[wardId];
};

export const getAllPollutionLevels = (): Record<string, PollutionLevel> => {
  return pollutionLevelsData.levels as Record<string, PollutionLevel>;
};

export const getPollutionSources = (wardId: string): PollutionSource[] => {
  return (pollutionSourcesData.sources as Record<string, PollutionSource[]>)[wardId] || [];
};

export const getHistoricalTrends = (wardId: string): TrendData | undefined => {
  return (historicalTrendsData.trends as Record<string, TrendData>)[wardId];
};

export const getPrediction = (wardId: string): Prediction | undefined => {
  return (predictionsData.predictions as Record<string, Prediction>)[wardId];
};

export const getCitizenActions = (pollutant: string): CitizenAction | undefined => {
  return (citizenActionsData.actions as Record<string, CitizenAction>)[pollutant];
};

export const getPolicies = (wardId: string): Policy[] => {
  const policies = (policiesData.policies as Record<string, Policy | Policy[]>)[wardId];
  if (!policies) return [];
  return Array.isArray(policies) ? policies : [policies];
};
