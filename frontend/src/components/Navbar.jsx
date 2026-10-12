import React from 'react';
import { Plus, UtensilsCrossed } from 'lucide-react';

export default function Navbar({ recipeCount, onOpenAddModal }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-section">
          <div className="brand-icon">
            <UtensilsCrossed size={20} />
          </div>
          <div>
            <h1 className="brand-title">Recipe & Meal Prep Planner</h1>
            <p className="brand-subtitle">Utility-first recipe manager & active prep checklist</p>
          </div>
        </div>

        <div className="navbar-actions">
          <span className="recipe-count-badge">
            <strong>{recipeCount}</strong> {recipeCount === 1 ? 'Recipe' : 'Recipes'}
          </span>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={onOpenAddModal}
          >
            <Plus size={16} />
            <span>Add Recipe</span>
          </button>
        </div>
      </div>
    </header>
  );
}
