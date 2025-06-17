import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
// For a more robust form, consider react-hook-form and zod
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

// const formSchema = z.object({
//   text: z.string().min(5, "Text must be at least 5 characters.").max(200, "Text must be at most 200 characters."),
//   category: z.string().optional(),
// });

const categories = ["General", "Motivation", "Gratitude", "Self-care", "Mindfulness", "Strength"];

const AddTextPage = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log('AddTextPage loaded');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 5) {
      toast({
        title: "Validation Error",
        description: "Affirmation text must be at least 5 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, save this data
    console.log('New Affirmation:', { text, category });
    toast({
      title: "Affirmation Saved!",
      description: "Your new one-line text has been successfully added.",
    });
    // Optionally clear form or navigate
    // setText('');
    // setCategory('');
    navigate('/my-texts'); // Navigate to My Texts page after saving
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Create Your Own Affirmation</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="affirmationText" className="text-lg">Your one-line text:</Label>
                <Textarea
                  id="affirmationText"
                  placeholder="e.g., I embrace today with joy and confidence."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  className="resize-none text-base"
                  maxLength={200}
                />
                <p className="text-sm text-muted-foreground text-right">{text.length}/200</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-lg">Category (Optional):</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="w-full text-base">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat} className="text-base">{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit">Save Affirmation</Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default AddTextPage;