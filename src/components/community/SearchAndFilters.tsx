
import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommentFilters } from '@/types/comments';
import { GlowCard } from '@/components/ui/spotlight-card';

interface SearchAndFiltersProps {
  filters: CommentFilters;
  onFiltersChange: (filters: CommentFilters) => void;
  totalComments: number;
  filteredCount: number;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  onFiltersChange,
  totalComments,
  filteredCount
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchText: e.target.value
    });
  };

  const handleFilterChange = (filterType: 'all' | 'mine' | 'others') => {
    onFiltersChange({
      ...filters,
      filterType
    });
  };

  const clearSearch = () => {
    onFiltersChange({
      ...filters,
      searchText: ''
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      searchText: '',
      filterType: 'all'
    });
  };

  const filterOptions = [
    { value: 'all', label: 'All Comments', count: totalComments },
    { value: 'mine', label: 'My Comments', count: 0 },
    { value: 'others', label: 'Others\' Comments', count: 0 }
  ];

  return (
    <GlowCard 
      glowColor="blue" 
      customSize={true}
      className="w-full mb-6 p-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Search Bar */}
        <GlowCard 
          glowColor="purple" 
          customSize={true}
          className="relative flex-1 max-w-md"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search comments..."
              value={filters.searchText}
              onChange={handleSearchChange}
              className="w-full bg-transparent border-none rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none"
            />
            {filters.searchText && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </GlowCard>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <div className="flex space-x-1">
            {filterOptions.map(option => (
              <GlowCard 
                key={option.value}
                glowColor={filters.filterType === option.value ? "red" : "blue"}
                customSize={true}
                className={`px-4 py-2 cursor-pointer transition-all ${
                  filters.filterType === option.value 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => handleFilterChange(option.value as 'all' | 'mine' | 'others')}
              >
                <span className="text-sm font-medium">{option.label}</span>
              </GlowCard>
            ))}
          </div>
        </div>

        {/* Results Count & Reset */}
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>
            Showing {filteredCount} of {totalComments} comments
          </span>
          {(filters.searchText || filters.filterType !== 'all') && (
            <GlowCard 
              glowColor="orange" 
              customSize={true}
              className="px-3 py-1 cursor-pointer text-gray-400 hover:text-white"
              onClick={resetFilters}
            >
              <span className="text-sm">Reset</span>
            </GlowCard>
          )}
        </div>
      </div>
    </GlowCard>
  );
};

export default SearchAndFilters;
