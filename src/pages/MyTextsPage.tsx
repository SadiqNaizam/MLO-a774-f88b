import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import AffirmationDisplayCard from '@/components/AffirmationDisplayCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Trash2 } from 'lucide-react';

interface MyText {
  id: string;
  text: string;
  category?: string;
  isFavorite: boolean;
  isCustom: boolean; // To differentiate between favorited pre-existing texts and user-created texts
}

const initialTexts: MyText[] = [
  { id: 'fav1', text: "I attract positivity and abundance into my life.", category: "Positivity", isFavorite: true, isCustom: false },
  { id: 'fav2', text: "Peace begins with me.", category: "Peace", isFavorite: true, isCustom: false },
  { id: 'custom1', text: "I am learning and growing every day.", category: "Growth", isFavorite: false, isCustom: true },
  { id: 'custom2', text: "My journey is unique and valuable.", category: "Self-love", isFavorite: true, isCustom: true },
];

const MyTextsPage = () => {
  const [myTexts, setMyTexts] = useState<MyText[]>(initialTexts);
  const [textToDelete, setTextToDelete] = useState<MyText | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log('MyTextsPage loaded');
    // In a real app, fetch user's texts from a backend or local storage
  }, []);

  const favoritedTexts = myTexts.filter(text => text.isFavorite && !text.isCustom);
  const createdTexts = myTexts.filter(text => text.isCustom);

  const handleToggleFavorite = (id: string) => {
    setMyTexts(prevTexts =>
      prevTexts.map(text =>
        text.id === id ? { ...text, isFavorite: !text.isFavorite } : text
      ).filter(text => text.isFavorite || text.isCustom) // Remove if unfavorited and not custom
    );
    const text = myTexts.find(t => t.id ===id);
    toast({
      title: text?.isFavorite ? "Removed from Favorites" : "Added to Favorites",
      description: `"${text?.text.substring(0,30)}..."`,
    });
  };

  const handleDeleteCustomText = (id: string) => {
    setMyTexts(prevTexts => prevTexts.filter(text => text.id !== id));
    setTextToDelete(null);
    toast({
      title: "Text Deleted",
      description: "Your custom affirmation has been removed.",
      variant: "destructive"
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-1">My Affirmations</h1>
            <p className="text-muted-foreground">Your personal collection of inspiring texts.</p>
          </div>
          <Button onClick={() => navigate('/add')}>
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Text
          </Button>
        </header>

        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 lg:w-1/3 mb-6">
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="my-creations">My Creations</TabsTrigger>
          </TabsList>

          <TabsContent value="favorites">
            <ScrollArea className="h-[calc(100vh-350px)] md:h-auto md:max-h-[500px] pr-3">
              {favoritedTexts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoritedTexts.map(text => (
                    <AffirmationDisplayCard
                      key={text.id}
                      text={text.text}
                      isFavorite={text.isFavorite}
                      onToggleFavorite={() => handleToggleFavorite(text.id)}
                      className="shadow-md"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-10">You haven't favorited any texts yet. Explore in 'Browse'!</p>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="my-creations">
            <ScrollArea className="h-[calc(100vh-350px)] md:h-auto md:max-h-[500px] pr-3">
              {createdTexts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {createdTexts.map(text => (
                    <div key={text.id} className="relative group">
                      <AffirmationDisplayCard
                        text={text.text}
                        isFavorite={text.isFavorite} // Allow favoriting own texts
                        onToggleFavorite={() => handleToggleFavorite(text.id)}
                        className="shadow-md"
                      />
                       <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setTextToDelete(text)}
                          aria-label="Delete custom text"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-10">You haven't created any texts yet. Click 'Add New Text' to start!</p>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {textToDelete && (
          <AlertDialog open={!!textToDelete} onOpenChange={(open) => !open && setTextToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your custom affirmation: "{textToDelete.text.substring(0,50)}..."
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setTextToDelete(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteCustomText(textToDelete.id)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </main>
    </div>
  );
};

export default MyTextsPage;