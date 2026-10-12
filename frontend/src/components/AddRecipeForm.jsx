import React, { useState } from 'react';
import { X, Plus, Trash2, Loader2, Sparkles } from 'lucide-react';
import { createRecipe } from '../services/api';

export default function AddRecipeForm({ isOpen, onClose, onRecipeAdded }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Veg');
  const [imageUrl, setImageUrl] = useState('');
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(20);
  const [servings, setServings] = useState(2);
  const [ingredients, setIngredients] = useState(['', '']);
  const [steps, setSteps] = useState(['', '']);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  // Ingredient list handlers
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredientField = (index) => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Step list handlers
  const handleStepChange = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const addStepField = () => {
    setSteps([...steps, '']);
  };

  const removeStepField = (index) => {
    if (steps.length <= 1) return;
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide a recipe name.');
      return;
    }

    const cleanIngredients = ingredients.map(i => i.trim()).filter(Boolean);
    if (cleanIngredients.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }

    const cleanSteps = steps.map(s => s.trim()).filter(Boolean);
    if (cleanSteps.length === 0) {
      setError('Please add at least one preparation step.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        type,
        imageUrl: imageUrl.trim() || null,
        prepTimeMinutes: Number(prepTimeMinutes) || 20,
        servings: Number(servings) || 2,
        ingredients: cleanIngredients,
        steps: cleanSteps
      };

      const newRecipe = await createRecipe(payload);
      onRecipeAdded(newRecipe);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save recipe. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-container">
        <header className="modal-header">
          <div className="modal-title-area">
            <span className="dietary-pill pill-veg">New Recipe</span>
            <h2 className="modal-title">Add Meal Prep Recipe</h2>
          </div>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose} 
            disabled={loading}
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div className="modal-body">
            {error && (
              <div style={{
                backgroundColor: 'var(--tag-nonveg-bg)',
                color: 'var(--tag-nonveg)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-card)',
                fontSize: 14,
                fontWeight: 500,
                border: '1px solid var(--tag-nonveg)'
              }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="recipe-name">Recipe Title *</label>
              <input
                id="recipe-name"
                type="text"
                className="form-input"
                placeholder="e.g. Avocado Chickpea Salad"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-row-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="recipe-type">Dietary Type *</label>
                <select
                  id="recipe-type"
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="Quick Snack">Quick Snack</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="recipe-image">Thumbnail Image URL</label>
                <input
                  id="recipe-image"
                  type="url"
                  className="form-input"
                  placeholder="https://... (Leave blank for auto-default)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="recipe-prep">Prep Time (minutes)</label>
                <input
                  id="recipe-prep"
                  type="number"
                  min="1"
                  max="360"
                  className="form-input"
                  value={prepTimeMinutes}
                  onChange={(e) => setPrepTimeMinutes(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="recipe-servings">Servings</label>
                <input
                  id="recipe-servings"
                  type="number"
                  min="1"
                  max="50"
                  className="form-input"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                />
              </div>
            </div>

            {/* Dynamic Ingredients */}
            <div className="form-group">
              <label className="form-label">Ingredients Checklist *</label>
              {ingredients.map((ing, idx) => (
                <div key={idx} className="dynamic-list-row">
                  <input
                    type="text"
                    className="form-input"
                    placeholder={`Ingredient #${idx + 1} (e.g. 1 cup oats)`}
                    value={ing}
                    onChange={(e) => handleIngredientChange(idx, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addIngredientField();
                      }
                    }}
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      className="btn-remove-row"
                      onClick={() => removeIngredientField(idx)}
                      title="Remove ingredient"
                      aria-label="Remove ingredient"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn-add-item"
                onClick={addIngredientField}
              >
                <Plus size={15} /> Add Ingredient Row
              </button>
            </div>

            {/* Dynamic Steps */}
            <div className="form-group">
              <label className="form-label">Preparation Steps *</label>
              {steps.map((st, idx) => (
                <div key={idx} className="dynamic-list-row">
                  <textarea
                    rows={2}
                    className="form-textarea"
                    placeholder={`Step #${idx + 1} instructions...`}
                    value={st}
                    onChange={(e) => handleStepChange(idx, e.target.value)}
                  />
                  {steps.length > 1 && (
                    <button
                      type="button"
                      className="btn-remove-row"
                      onClick={() => removeStepField(idx)}
                      title="Remove step"
                      aria-label="Remove step"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn-add-item"
                onClick={addStepField}
              >
                <Plus size={15} /> Add Step Row
              </button>
            </div>
          </div>

          <footer className="form-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving Recipe...
                </>
              ) : (
                <>
                  <Plus size={16} /> Save Recipe
                </>
              )}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
