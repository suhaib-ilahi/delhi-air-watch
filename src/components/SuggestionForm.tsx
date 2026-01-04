import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Suggestion } from '@/types/pollution';
import { MessageSquare, Upload, CheckCircle, Clock } from 'lucide-react';

interface SuggestionFormProps {
  wardId: string;
  wardName: string;
  suggestions: Suggestion[];
  onAddSuggestion: (suggestion: Suggestion) => void;
}

const categories = [
  'Traffic & Transport',
  'Construction',
  'Industrial',
  'Waste Management',
  'Green Spaces',
  'Policy Improvement',
  'Other',
];

export const SuggestionForm = ({
  wardId,
  wardName,
  suggestions,
  onAddSuggestion,
}: SuggestionFormProps) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !description.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please select a category and provide a description.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      const newSuggestion: Suggestion = {
        id: `suggestion-${Date.now()}`,
        ward: wardName,
        category,
        description: description.trim(),
        createdAt: new Date().toISOString(),
      };

      onAddSuggestion(newSuggestion);
      setCategory('');
      setDescription('');
      setIsSubmitting(false);

      toast({
        title: 'Suggestion Submitted',
        description: 'Thank you for your contribution to improving air quality!',
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Share Your Suggestion</h4>
              <p className="text-sm text-muted-foreground">Help improve air quality in your ward</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ward">Ward</Label>
              <Input id="ward" value={wardName} disabled className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Issue Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue and your suggestion for improvement..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Attach Image (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click or drag to upload</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
            </Button>
          </form>
        </Card>

        {/* Community Suggestions */}
        <Card className="p-6">
          <h4 className="font-semibold mb-4">Community Suggestions</h4>
          
          {suggestions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No suggestions yet. Be the first to contribute!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {suggestion.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(suggestion.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{suggestion.description}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
