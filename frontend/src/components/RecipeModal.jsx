import React, { useState, useEffect } from 'react';
import { X, Clock, Users, Utensils, CheckCircle2 } from 'lucide-react';
import DietaryBadge from './DietaryBadge';

export default function RecipeModal({ recipe, onClose }) {
  // Session-persistent ingredient checklist state
  const [checkedIngredients, setCheckedIngredients] = useState(() => new Set());

  useEffect(() => {
    // Reset or keep checklist state per recipe session
    setCheckedIngredients(new Set());
  }, [recipe?.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!recipe) return null;

  const ingredients = recipe.ingredients || [];
  const steps = recipe.steps || [];
  const totalCount = ingredients.length;
  const checkedCount = checkedIngredients.size;

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-recipe-title"
    >
      <div className="modal-container">
        <header className="modal-header">
          <div className="modal-title-area">
            <DietaryBadge type={recipe.type} />
            <h2 id="modal-recipe-title" className="modal-title">{recipe.name}</h2>
          </div>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose} 
            aria-label="Close recipe details"
          >
            <X size={20} />
          </button>
        </header>

        <div className="modal-body">
          {recipe.imageUrl && (
            <div className="modal-banner">
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
          )}

          <div className="modal-meta-bar">
            <div className="modal-meta-item">
              <Clock size={16} color="#0066ee" />
              <span>Prep Time:</span> <strong>{recipe.prepTimeMinutes || 20} mins</strong>
            </div>
            <div className="modal-meta-item">
              <Users size={16} color="#0066ee" />
              <span>Servings:</span> <strong>{recipe.servings || 2}</strong>
            </div>
            <div className="modal-meta-item">
              <Utensils size={16} color="#0066ee" />
              <span>Ingredients:</span> <strong>{totalCount}</strong>
            </div>
          </div>

          {/* Section 1: Ingredients Checklist */}
          <div>
            <div className="modal-section-title">
              <span>Ingredients Checklist</span>
              {totalCount > 0 && (
                <span className="checklist-counter">
                  {checkedCount}/{totalCount} checked
                </span>
              )}
            </div>

            {ingredients.length === 0 ? (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>No ingredients listed for this recipe.</p>
            ) : (
              <ul className="checklist">
                {ingredients.map((ingredient, idx) => {
                  const isChecked = checkedIngredients.has(idx);
                  return (
                    <li 
                      key={idx}
                      className={`checklist-item ${isChecked ? 'checked' : ''}`}
                      onClick={() => toggleIngredient(idx)}
                    >
                      <input 
                        type="checkbox"
                        className="checklist-checkbox"
                        checked={isChecked}
                        onChange={() => toggleIngredient(idx)}
                        aria-label={ingredient}
                      />
                      <label className="checklist-label">
                        {ingredient}
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Section 2: Preparation Steps */}
          <div>
            <div className="modal-section-title">
              <span>Preparation Steps</span>
            </div>

            {steps.length === 0 ? (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>No instructions provided.</p>
            ) : (
              <ol className="steps-list">
                {steps.map((step, idx) => (
                  <li key={idx} className="step-card">
                    <div className="step-number">{idx + 1}</div>
                    <div className="step-text">{step}</div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
