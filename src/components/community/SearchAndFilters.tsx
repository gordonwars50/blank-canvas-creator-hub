
import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommentFilters } from '@/types/comments';

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
    { value: 'mine', label: 'My Comments', count: 0 }, // This would be calculated from real data
    { value: 'others', label: 'Others\' Comments', count: 0 }
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search comments..."
            value={filters.searchText}
            onChange={handleSearchChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <div className="flex space-x-1">
            {filterOptions.map(option => (
              <Button
                key={option.value}
                variant={filters.filterType === option.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleFilterChange(option.value as 'all' | 'mine' | 'others')}
                className={
                  filters.filterType === option.value
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count & Reset */}
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>
            Showing {filteredCount} of {totalComments} comments
          </span>
          {(filters.searchText || filters.filterType !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-gray-400 hover:text-white h-8"
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
