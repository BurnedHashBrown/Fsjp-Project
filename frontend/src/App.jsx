import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';
import AddRecipeForm from './components/AddRecipeForm';
import { fetchRecipes } from './services/api';
import './styles/App.css';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal states
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load recipes from Spring Boot API on mount
  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err.message || 'Unable to connect to backend service.');
    } finally {
      setLoading(false);
    }
  };

  // Real-time client-side filtering (by name or dietary type)
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const query = searchQuery.trim().toLowerCase();
      const nameMatches = recipe.name.toLowerCase().includes(query);
      const typeMatches = recipe.type.toLowerCase().includes(query);
      
      const textMatches = !query || nameMatches || typeMatches;

      const categoryMatches = 
        selectedCategory.toLowerCase() === 'all' || 
        recipe.type.toLowerCase() === selectedCategory.toLowerCase();

      return textMatches && categoryMatches;
    });
  }, [recipes, searchQuery, selectedCategory]);

  const handleRecipeAdded = (newRecipe) => {
    // Add to list without page reload
    setRecipes((prev) => [newRecipe, ...prev]);
    // Clear search so user sees their new recipe at the top
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="app-layout">
      <Navbar 
        recipeCount={recipes.length} 
        onOpenAddModal={() => setIsAddModalOpen(true)} 
      />

      <main className="main-content">
        <header className="planner-header">
          <h2 className="planner-heading">Digital Recipe & Meal Prep Planner</h2>
          <p className="planner-desc">
            Organize recipes, track weekly meal prep checklists, and filter nutrition categories in real time.
          </p>
        </header>

        {error && (
          <div style={{
            backgroundColor: 'var(--tag-nonveg-bg)',
            color: 'var(--tag-nonveg)',
            padding: '14px 18px',
            borderRadius: 'var(--radius-card)',
            marginBottom: '20px',
            border: '1px solid var(--tag-nonveg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>Backend Connection Notice:</strong> {error}
            </div>
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={loadRecipes}
              style={{ padding: '6px 12px', fontSize: 13 }}
            >
              Retry
            </button>
          </div>
        )}

        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <RecipeList 
          recipes={filteredRecipes}
          loading={loading}
          onRecipeClick={(recipe) => setSelectedRecipe(recipe)}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Detail Modal */}
      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {/* Add Recipe Modal Form */}
      <AddRecipeForm 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onRecipeAdded={handleRecipeAdded}
      />
    </div>
  );
}
