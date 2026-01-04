import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Database, FileJson, ExternalLink } from 'lucide-react';

interface ReportsSectionProps {
  wardName: string;
}

export const ReportsSection = ({ wardName }: ReportsSectionProps) => {
  const handleDownload = () => {
    // Create a sample PDF-like content
    const content = `
Ward-Wise Pollution Report
==========================
Ward: ${wardName}
Generated: ${new Date().toLocaleDateString()}

This is a sample report demonstrating the download functionality.
In a production environment, this would be a comprehensive PDF report
containing detailed pollution analysis, trends, and recommendations.
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${wardName.replace(/\s+/g, '_')}_Pollution_Report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const dataFiles = [
    { name: 'wards.json', description: 'Ward boundaries and metadata' },
    { name: 'pollutionLevels.json', description: 'Current AQI and pollutant levels' },
    { name: 'pollutionSources.json', description: 'Source contribution analysis' },
    { name: 'historicalTrends.json', description: 'Historical pollution data' },
    { name: 'predictions.json', description: 'AI-based pollution forecasts' },
    { name: 'citizenActions.json', description: 'Recommended citizen actions' },
    { name: 'policies.json', description: 'Policy recommendations' },
  ];

  return (
    <div className="space-y-6">
      {/* Download Report */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold mb-1">Download Ward Report</h4>
            <p className="text-sm text-muted-foreground">
              Get a comprehensive PDF report with all pollution data and recommendations
            </p>
          </div>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </Card>

      {/* Open Data Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold">Open Data for Developers</h4>
            <p className="text-sm text-muted-foreground">
              Access raw data files for your own analysis and applications
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dataFiles.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileJson className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.description}</p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Schema Documentation: </span>
            All data files follow a consistent JSON schema with ward IDs as keys. 
            Pollution levels use standard AQI categories (good, moderate, poor, very-poor, severe). 
            Timestamps are in ISO 8601 format.
          </p>
        </div>
      </Card>
    </div>
  );
};
