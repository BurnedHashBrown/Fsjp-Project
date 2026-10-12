import React from 'react';
import { Clock, Users, Utensils } from 'lucide-react';
import DietaryBadge from './DietaryBadge';

export default function RecipeCard({ recipe, onClick }) {
  const ingredientCount = recipe.ingredients ? recipe.ingredients.length : 0;
  const prepTime = recipe.prepTimeMinutes || 20;
  const servings = recipe.servings || 2;

  return (
    <article 
      className="recipe-card" 
      onClick={() => onClick(recipe)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(recipe);
        }
      }}
    >
      <div className="card-thumbnail-wrapper">
        <img 
          src={recipe.imageUrl || "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"} 
          alt={recipe.name} 
          className="card-thumbnail"
          loading="lazy"
        />
        <div className="card-tag-floating">
          <DietaryBadge type={recipe.type} />
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{recipe.name}</h3>

        <div className="card-meta">
          <span className="meta-item">
            <Utensils size={13} />
            {ingredientCount} ingredients
          </span>
          <span className="meta-item">
            <Clock size={13} />
            {prepTime}m
          </span>
          <span className="meta-item">
            <Users size={13} />
            {servings} {servings === 1 ? 'serving' : 'servings'}
          </span>
        </div>
      </div>
    </article>
  );
}
