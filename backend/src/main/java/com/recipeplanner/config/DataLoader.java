package com.recipeplanner.config;

import com.recipeplanner.model.Recipe;
import com.recipeplanner.repository.RecipeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final RecipeRepository recipeRepository;

    public DataLoader(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @Override
    public void run(String... args) {
        if (recipeRepository.count() == 0) {
            List<Recipe> initialRecipes = Arrays.asList(
                new Recipe(
                    "Mediterranean Quinoa Bowl",
                    "Veg",
                    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
                    25,
                    2,
                    Arrays.asList(
                        "1 cup cooked quinoa",
                        "1 English cucumber, diced",
                        "1 cup cherry tomatoes, halved",
                        "1/2 cup Kalamata olives, sliced",
                        "1/3 cup crumbled feta cheese",
                        "2 tbsp extra virgin olive oil",
                        "1 tbsp fresh lemon juice",
                        "1 tsp dried oregano, salt & pepper"
                    ),
                    Arrays.asList(
                        "Rinse quinoa under cold water and cook according to package instructions until fluffy.",
                        "Chop cucumbers, tomatoes, and olives into bite-sized pieces.",
                        "In a small mixing bowl, whisk olive oil, fresh lemon juice, oregano, salt, and pepper to make dressing.",
                        "Divide warm quinoa into serving bowls and arrange veggies and feta on top.",
                        "Drizzle with lemon herb vinaigrette and serve immediately or refrigerate for meal prep."
                    )
                ),
                new Recipe(
                    "Garlic Butter Herb Salmon",
                    "Non-Veg",
                    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
                    20,
                    2,
                    Arrays.asList(
                        "2 fresh salmon fillets (6 oz each)",
                        "2 tbsp unsalted butter, melted",
                        "3 cloves garlic, minced",
                        "1 tbsp fresh lemon juice",
                        "1 tbsp chopped fresh parsley",
                        "1/2 tsp smoked paprika",
                        "Sea salt and freshly ground black pepper"
                    ),
                    Arrays.asList(
                        "Pat salmon fillets dry with paper towels and season generously with salt, pepper, and paprika.",
                        "Heat an oven-safe skillet over medium-high heat with olive oil.",
                        "Sear salmon fillets skin-side down for 4 minutes until golden and crisp.",
                        "Flip gently and stir melted butter, minced garlic, and lemon juice into the pan.",
                        "Baste salmon with garlic butter for 3-4 minutes until cooked through. Garnish with parsley."
                    )
                ),
                new Recipe(
                    "Avocado Toast with Poached Egg",
                    "Quick Snack",
                    "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
                    10,
                    1,
                    Arrays.asList(
                        "2 slices sourdough bread",
                        "1 ripe Haas avocado",
                        "2 large organic eggs",
                        "1 tbsp lemon juice",
                        "1/4 tsp chili flakes",
                        "1 tbsp microgreens or fresh cilantro",
                        "Flaky sea salt to taste"
                    ),
                    Arrays.asList(
                        "Toast sourdough slices until golden and crisp.",
                        "Mash avocado in a small bowl with lemon juice, salt, and pepper.",
                        "Bring a small pot of water to a gentle simmer with 1 tsp vinegar. Swirl and poach eggs for 3 minutes.",
                        "Spread avocado evenly over toasted sourdough slices.",
                        "Top with poached eggs, sprinkle chili flakes and flaky sea salt, and garnish with microgreens."
                    )
                ),
                new Recipe(
                    "Creamy Tuscan Garlic Chicken",
                    "Non-Veg",
                    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
                    30,
                    4,
                    Arrays.asList(
                        "2 large chicken breasts, halved horizontally",
                        "1 cup heavy cream",
                        "1/2 cup chicken broth",
                        "1 cup baby spinach",
                        "1/2 cup sun-dried tomatoes, drained",
                        "1/2 cup grated Parmesan cheese",
                        "4 cloves garlic, minced",
                        "1 tbsp olive oil & 1 tbsp butter"
                    ),
                    Arrays.asList(
                        "Season chicken with salt, pepper, and Italian herb seasoning.",
                        "Heat olive oil in a large skillet over medium-high heat and sear chicken for 5 minutes per side until cooked through. Set aside.",
                        "In the same pan, melt butter and sauté minced garlic for 1 minute until fragrant.",
                        "Pour in chicken broth and heavy cream; bring to a gentle simmer for 3 minutes.",
                        "Stir in sun-dried tomatoes, spinach, and Parmesan cheese until spinach wilts and sauce thickens.",
                        "Return chicken to the skillet, spoon creamy sauce over top, and serve warm with pasta or crusty bread."
                    )
                ),
                new Recipe(
                    "Spicy Chickpea & Spinach Curry",
                    "Veg",
                    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
                    25,
                    3,
                    Arrays.asList(
                        "1 can (15 oz) chickpeas, rinsed and drained",
                        "3 cups fresh baby spinach",
                        "1 can (14 oz) diced fire-roasted tomatoes",
                        "1/2 cup canned coconut milk",
                        "1 medium yellow onion, diced",
                        "3 cloves garlic & 1 inch ginger, minced",
                        "1 tbsp curry powder & 1 tsp garam masala",
                        "2 tbsp cooking oil, salt & cilantro"
                    ),
                    Arrays.asList(
                        "Heat oil in a deep pot over medium heat. Sauté diced onions until translucent (approx. 5 minutes).",
                        "Add garlic, ginger, curry powder, and garam masala; toast spices for 60 seconds until aromatic.",
                        "Add diced tomatoes and drained chickpeas; simmer covered for 10 minutes to allow flavors to meld.",
                        "Stir in coconut milk and fresh spinach leaves; cook for 3 minutes until spinach wilts.",
                        "Adjust seasoning with sea salt and serve warm over basmati rice with lime wedges."
                    )
                ),
                new Recipe(
                    "Berry Protein Energy Bites",
                    "Quick Snack",
                    "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
                    12,
                    6,
                    Arrays.asList(
                        "1 cup rolled oats",
                        "1/2 cup creamy peanut butter or almond butter",
                        "1/3 cup raw honey or maple syrup",
                        "1/4 cup chia seeds",
                        "1/3 cup dried cranberries or blueberries",
                        "1 scoop vanilla protein powder (optional)",
                        "Pinch of sea salt"
                    ),
                    Arrays.asList(
                        "Combine rolled oats, nut butter, honey, chia seeds, dried berries, and protein powder in a bowl.",
                        "Mix thoroughly with a sturdy spatula until a sticky dough forms.",
                        "Scoop tablespoon-sized portions and roll between hands into 1-inch balls.",
                        "Place on parchment paper and chill in the refrigerator for 20 minutes to firm up.",
                        "Store in an airtight container in the fridge for up to 10 days for rapid meal prep snacks."
                    )
                )
            );

            recipeRepository.saveAll(initialRecipes);
        }
    }
}
