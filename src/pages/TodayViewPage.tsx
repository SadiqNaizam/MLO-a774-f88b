import React, { useState, useEffect } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import AffirmationDisplayCard from '@/components/AffirmationDisplayCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw } from 'lucide-react';

const affirmations = [
  "Today is a new beginning.",
  "I am capable of amazing things.",
  "I choose to be happy and grateful today.",
  "I embrace the challenges that help me grow.",
  "My potential is limitless."
];

const TodayViewPage = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const { toast } = useToast();

  const fetchNewAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[randomIndex]);
    console.log('Fetched new affirmation for TodayViewPage');
  };

  useEffect(() => {
    fetchNewAffirmation();
    console.log('TodayViewPage loaded');
  }, []);

  const handleNextText = () => {
    fetchNewAffirmation();
    toast({
      title: "New Affirmation",
      description: "Here's a fresh thought for you!",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 text-center">
        <section className="w-full max-w-md md:max-w-lg lg:max-w-xl mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-6">Your Daily Affirmation</h1>
          {currentAffirmation ? (
            <AffirmationDisplayCard text={currentAffirmation} className="shadow-lg" />
          ) : (
            <p>Loading affirmation...</p>
          )}
        </section>
        <Button onClick={handleNextText} size="lg">
          <RefreshCw className="mr-2 h-5 w-5" /> Next Text
        </Button>
      </main>
    </div>
  );
};

export default TodayViewPage;