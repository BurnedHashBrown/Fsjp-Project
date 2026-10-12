const API_BASE_URL = 'http://localhost:8080/api/recipes';

export async function fetchRecipes() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchRecipeById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipe #${id}: ${response.statusText}`);
  }
  return response.json();
}

export async function createRecipe(recipeData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to create recipe: ${errorBody || response.statusText}`);
  }
  return response.json();
}
