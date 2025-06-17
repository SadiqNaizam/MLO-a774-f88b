import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // For potential actions
import { Heart } from 'lucide-react'; // Example icon
import { cn } from '@/lib/utils';

interface AffirmationDisplayCardProps {
  text: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  // Add other props as needed, e.g., author, category
  className?: string;
}

const AffirmationDisplayCard: React.FC<AffirmationDisplayCardProps> = ({
  text,
  isFavorite = false,
  onToggleFavorite,
  className,
}) => {
  console.log("Rendering AffirmationDisplayCard with text:", text.substring(0, 20) + "...");

  return (
    <Card className={cn("w-full min-h-[120px] flex flex-col justify-between", className)}>
      <CardContent className="p-4 md:p-6 flex-grow">
        <p className="text-lg md:text-xl text-foreground text-center leading-relaxed">
          "{text}"
        </p>
      </CardContent>
      {onToggleFavorite && (
        <CardFooter className="p-2 md:p-4 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AffirmationDisplayCard;