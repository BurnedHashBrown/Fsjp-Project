import React from 'react';
import { SearchX, Loader2 } from 'lucide-react';
import RecipeCard from './RecipeCard';

export default function RecipeList({ 
  recipes, 
  loading, 
  onRecipeClick,
  onResetFilters 
}) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-secondary)' }}>
        <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 12px' }} />
        <p style={{ fontSize: 15, fontWeight: 500 }}>Fetching recipes from Spring Boot API...</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <SearchX size={44} className="empty-icon" />
        <h3 className="empty-title">No Recipes Match Your Filter</h3>
        <p className="empty-text">
          Try adjusting your search keywords or switch dietary type category filters.
        </p>
        <button 
          type="button" 
          className="btn-secondary" 
          onClick={onResetFilters}
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          onClick={onRecipeClick} 
        />
      ))}
    </div>
  );
}
