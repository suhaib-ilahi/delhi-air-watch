import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { AQIBadge } from '@/components/AQIBadge';
import { PollutantBreakdownChart } from '@/components/PollutantBreakdownChart';
import { SourceCards } from '@/components/SourceCards';
import { TrendChart } from '@/components/TrendChart';
import { PredictionChart } from '@/components/PredictionChart';
import { ActionRecommendations } from '@/components/ActionRecommendations';
import { PolicyCards } from '@/components/PolicyCards';
import { SuggestionForm } from '@/components/SuggestionForm';
import { ReportsSection } from '@/components/ReportsSection';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  getWardById,
  getPollutionLevel,
  getPollutionSources,
  getHistoricalTrends,
  getPrediction,
  getCitizenActions,
  getPolicies,
} from '@/lib/dataService';
import { Suggestion } from '@/types/pollution';
import { ArrowLeft, MapPin, Users, Ruler, Clock, AlertCircle } from 'lucide-react';

const WardDetail = () => {
  const { wardId } = useParams<{ wardId: string }>();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const ward = getWardById(wardId || '');
  const pollution = getPollutionLevel(wardId || '');
  const sources = getPollutionSources(wardId || '');
  const trends = getHistoricalTrends(wardId || '');
  const prediction = getPrediction(wardId || '');
  const actions = pollution ? getCitizenActions(pollution.dominantPollutant) : undefined;
  const policies = getPolicies(wardId || '');

  if (!ward || !pollution) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Ward Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested ward data is not available.</p>
          <Link to="/">
            <Button>Back to Map</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddSuggestion = (suggestion: Suggestion) => {
    setSuggestions((prev) => [suggestion, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-6 space-y-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Map
        </Link>

        {/* Section 1: Ward Overview */}
        <section className="animate-fade-in">
          <Card className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{ward.zone}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{ward.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {ward.population.toLocaleString()} residents
                  </span>
                  <span className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    {ward.area} km²
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Updated {new Date(pollution.lastUpdated).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <AQIBadge category={pollution.category} aqi={pollution.aqi} size="lg" />
            </div>
            <p className="text-muted-foreground">
              {ward.name} is currently experiencing <span className="font-semibold text-foreground">{pollution.category.replace('-', ' ')}</span> air quality 
              with <span className="font-semibold text-primary">{pollution.dominantPollutant}</span> as the dominant pollutant. 
              Residents are advised to take necessary precautions.
            </p>
          </Card>
        </section>

        {/* Section 2: Pollutant Breakdown */}
        <Section title="Pollutant-Wise Breakdown" number={2}>
          <PollutantBreakdownChart pollution={pollution} />
        </Section>

        {/* Section 3: Pollution Sources */}
        <Section title="Major Pollution Sources" number={3}>
          <SourceCards sources={sources} />
        </Section>

        {/* Section 4: Historical Trends */}
        {trends && (
          <Section title="Past Pollution Trends" number={4}>
            <TrendChart trends={trends} />
          </Section>
        )}

        {/* Section 5: Predictions */}
        {prediction && (
          <Section title="Future Pollution Prediction" number={5}>
            <PredictionChart prediction={prediction} />
          </Section>
        )}

        {/* Section 6: Citizen Actions */}
        {actions && (
          <Section title="Citizen Action Recommendations" number={6}>
            <ActionRecommendations actions={actions} pollutant={pollution.dominantPollutant} />
          </Section>
        )}

        {/* Section 7: Policy Recommendations */}
        <Section title="Government Policy Recommendations" number={7}>
          <PolicyCards policies={policies} wardName={ward.name} />
        </Section>

        {/* Section 8: Citizen Suggestions */}
        <Section title="Citizen Suggestion Form" number={8}>
          <SuggestionForm
            wardId={ward.id}
            wardName={ward.name}
            suggestions={suggestions}
            onAddSuggestion={handleAddSuggestion}
          />
        </Section>

        {/* Section 9: Reports */}
        <Section title="Reports & Open Data" number={9}>
          <ReportsSection wardName={ward.name} />
        </Section>
      </main>
    </div>
  );
};

interface SectionProps {
  title: string;
  number: number;
  children: React.ReactNode;
}

const Section = ({ title, number, children }: SectionProps) => (
  <section className="animate-fade-in" style={{ animationDelay: `${number * 50}ms` }}>
    <div className="flex items-center gap-3 mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
        {number}
      </span>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    <Card className="p-6">{children}</Card>
  </section>
);

export default WardDetail;
