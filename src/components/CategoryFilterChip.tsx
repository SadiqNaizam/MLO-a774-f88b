import React from 'react';
import { Badge } from '@/components/ui/badge'; // Using Badge as a base for the chip
import { cn } from '@/lib/utils';

interface CategoryFilterChipProps {
  categoryName: string;
  isActive?: boolean;
  onClick: (categoryName: string) => void;
  className?: string;
}

const CategoryFilterChip: React.FC<CategoryFilterChipProps> = ({
  categoryName,
  isActive = false,
  onClick,
  className,
}) => {
  console.log("Rendering CategoryFilterChip:", categoryName, "Active:", isActive);

  const handleClick = () => {
    onClick(categoryName);
  };

  return (
    <Badge
      variant={isActive ? 'default' : 'outline'}
      className={cn(
        "cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground py-2 px-3 text-sm",
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      aria-pressed={isActive}
    >
      {categoryName}
    </Badge>
  );
};

export default CategoryFilterChip;