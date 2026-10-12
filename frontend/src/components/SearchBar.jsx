import React from 'react';
import { Search, X } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Recipes' },
  { id: 'veg', label: 'Veg', activeClass: 'active-veg' },
  { id: 'non-veg', label: 'Non-Veg', activeClass: 'active-nonveg' },
  { id: 'quick snack', label: 'Quick Snack', activeClass: 'active-snack' }
];

export default function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange 
}) {
  return (
    <div className="toolbar-container">
      <div className="search-wrapper">
        <Search size={16} className="search-icon" />
        <input 
          type="text"
          className="search-input"
          placeholder="Search recipes or dietary type..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button 
            type="button" 
            className="search-clear-btn" 
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="filter-chips">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
          const activeClass = isSelected ? (cat.activeClass || 'active') : '';

          return (
            <button
              key={cat.id}
              type="button"
              className={`filter-chip ${activeClass}`}
              onClick={() => onCategoryChange(cat.id === 'all' ? 'all' : cat.label)}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
