
import React from 'react';
import { Search } from 'lucide-react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { GlowInput } from '@/components/ui/glow-input';
import { GlowButton } from '@/components/ui/glow-button';
import { CommentFilters } from '@/types/comments';

interface SearchAndFiltersProps {
  filters: CommentFilters;
  onFiltersChange: (filters: CommentFilters) => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchText: e.target.value
    });
  };

  const handleFilterChange = (filterType: CommentFilters['filterType']) => {
    onFiltersChange({
      ...filters,
      filterType
    });
  };

  return (
    <GlowCard glowColor="blue" customSize className="w-full p-6 mb-6">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <GlowInput
            type="text"
            placeholder="Search comments..."
            value={filters.searchText}
            onChange={handleSearchChange}
            leftIcon={<Search className="w-4 h-4" />}
            glowColor="blue"
            className="w-full h-12"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          <GlowButton
            onClick={() => handleFilterChange('all')}
            glowColor={filters.filterType === 'all' ? 'blue' : 'purple'}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all
              ${filters.filterType === 'all' 
                ? 'text-blue-300 shadow-lg' 
                : 'text-gray-300 hover:text-white'
              }
            `}
          >
            All Comments
          </GlowButton>
          
          <GlowButton
            onClick={() => handleFilterChange('my-comments')}
            glowColor={filters.filterType === 'my-comments' ? 'green' : 'purple'}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all
              ${filters.filterType === 'my-comments' 
                ? 'text-green-300 shadow-lg' 
                : 'text-gray-300 hover:text-white'
              }
            `}
          >
            My Comments
          </GlowButton>
          
          <GlowButton
            onClick={() => handleFilterChange('others-comments')}
            glowColor={filters.filterType === 'others-comments' ? 'orange' : 'purple'}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all
              ${filters.filterType === 'others-comments' 
                ? 'text-orange-300 shadow-lg' 
                : 'text-gray-300 hover:text-white'
              }
            `}
          >
            Others' Comments
          </GlowButton>
        </div>
      </div>
    </GlowCard>
  );
};

export default SearchAndFilters;
