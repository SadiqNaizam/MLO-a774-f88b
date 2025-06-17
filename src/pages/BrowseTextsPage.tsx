import React, { useState, useEffect, useMemo } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import AffirmationDisplayCard from '@/components/AffirmationDisplayCard';
import CategoryFilterChip from '@/components/CategoryFilterChip';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';
import { Search } from 'lucide-react';

const sampleTexts = [
  { id: '1', text: "I am resilient and can overcome any obstacle.", category: "Strength", isFavorite: false },
  { id: '2', text: "I attract positivity and abundance into my life.", category: "Positivity", isFavorite: true },
  { id: '3', text: "Every day is an opportunity for growth and learning.", category: "Growth", isFavorite: false },
  { id: '4', text: "I am grateful for the small joys in my life.", category: "Gratitude", isFavorite: false },
  { id: '5', text: "I believe in my abilities and trust my journey.", category: "Confidence", isFavorite: false },
  { id: '6', text: "Peace begins with me.", category: "Peace", isFavorite: true },
  { id: '7', text: "I am worthy of love and happiness.", category: "Self-love", isFavorite: false },
  { id: '8', text: "I radiate kindness and compassion.", category: "Kindness", isFavorite: false },
  { id: '9', text: "My mind is clear and focused.", category: "Clarity", isFavorite: false },
  { id: '10', text: "I am creating the life of my dreams.", category: "Manifestation", isFavorite: false },
];

const categories = ["All", "Strength", "Positivity", "Growth", "Gratitude", "Confidence", "Peace", "Self-love", "Kindness", "Clarity", "Manifestation"];
const ITEMS_PER_PAGE = 6;

const BrowseTextsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [texts, setTexts] = useState(sampleTexts);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    console.log('BrowseTextsPage loaded');
  }, []);

  const filteredTexts = useMemo(() => {
    return texts
      .filter(text => activeCategory === 'All' || text.category === activeCategory)
      .filter(text => text.text.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [texts, activeCategory, searchTerm]);

  const paginatedTexts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTexts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTexts, currentPage]);

  const totalPages = Math.ceil(filteredTexts.length / ITEMS_PER_PAGE);

  const handleToggleFavorite = (id: string) => {
    setTexts(prevTexts =>
      prevTexts.map(text =>
        text.id === id ? { ...text, isFavorite: !text.isFavorite } : text
      )
    );
    const currentText = texts.find(t => t.id === id);
    toast({
      title: currentText?.isFavorite ? "Removed from Favorites" : "Added to Favorites",
      description: `"${currentText?.text.substring(0,30)}..."`,
    });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Browse Affirmations</h1>
          <p className="text-muted-foreground">Explore our collection and find what resonates with you.</p>
        </header>

        <section className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full sm:max-w-xs">
            <Input
              type="search"
              placeholder="Search texts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </section>
        
        <section className="mb-6">
            <h2 className="text-lg font-medium mb-3 text-foreground">Categories</h2>
            <div className="flex flex-wrap gap-2">
            {categories.map(category => (
                <CategoryFilterChip
                key={category}
                categoryName={category}
                isActive={activeCategory === category}
                onClick={() => { setActiveCategory(category); setCurrentPage(1); }}
                />
            ))}
            </div>
        </section>

        <ScrollArea className="h-[calc(100vh-400px)] md:h-auto md:max-h-[600px] pr-3"> {/* Adjust height as needed */}
          {paginatedTexts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTexts.map(text => (
                <AffirmationDisplayCard
                  key={text.id}
                  text={text.text}
                  isFavorite={text.isFavorite}
                  onToggleFavorite={() => handleToggleFavorite(text.id)}
                  className="shadow-md hover:shadow-lg transition-shadow"
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-10">No affirmations found matching your criteria.</p>
          )}
        </ScrollArea>

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} aria-disabled={currentPage === 1} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (totalPages <= 5 || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                    return (
                        <PaginationItem key={page}>
                            <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(page); }} isActive={currentPage === page}>
                            {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                  } else if (Math.abs(page - currentPage) === 2 && totalPages > 5) {
                    return <PaginationItem key={page}><PaginationEllipsis /></PaginationItem>;
                  }
                  return null;
              })}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} aria-disabled={currentPage === totalPages} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </div>
  );
};

export default BrowseTextsPage;