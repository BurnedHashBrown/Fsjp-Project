# Digital Recipe & Meal Prep Planner

A modern, utility-first recipe manager and active meal prep assistant inspired by MyFitnessPal's clean, data-dense design principles (documented in [design.md](file:///D:/No1/design.md)).

---

## 🛠 Tech Stack

* **Frontend:** React 18 (Functional Components, Hooks), Vite, Vanilla CSS design tokens, Lucide Icons
* **Backend:** Java 17, Spring Boot 3.3.5 (REST API, Spring Data JPA, Hibernate)
* **Database:** H2 In-Memory (configured for zero-setup instant development) + MySQL support
* **Styling:** Vanilla CSS design tokens following `design.md` (Inter typography, `#0066ee` primary blue, MFP-style dietary tags, card hover lifts, modal checklist animations)

---

## 🚀 Features Implemented

1. **Card-Based Recipe List View**:
   * Responsive grid layout (4 columns desktop, 2 tablet, 1 mobile).
   * Displays recipe thumbnail, dietary pill tag, recipe name, ingredient count, prep time, and servings.
2. **Real-Time Search & Dietary Filter**:
   * Real-time client-side filter on recipe names and dietary types.
   * Quick filter chips: **All Recipes**, **Veg** (`#2e9e5b`), **Non-Veg** (`#e4572e`), and **Quick Snack** (`#f0a020`).
3. **Recipe Detail Modal**:
   * Centered overlay with backdrop blur (full-screen responsive on mobile).
   * Displays full ingredient list and step-by-step instructions with step numbering badges.
4. **Session-Persistent Ingredient Checklist**:
   * Interactive checkboxes next to each ingredient in the detail modal.
   * Instant strikethrough animation when checked and dynamic counter (e.g., `3/6 checked`).
   * Clean session-level state (resets per viewing session without polluting the database).
5. **Add Recipe Form Modal**:
   * Interactive form with title, dietary type selector, optional thumbnail URL, prep time, and servings.
   * Dynamic row addition/removal for both ingredients and instructions.
   * Sends `POST /api/recipes` to the Spring Boot REST API and immediately prepends the recipe to the UI state without page reload.

---

## 📡 Backend REST API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/recipes` | Retrieve all recipes |
| `GET` | `/api/recipes/{id}` | Retrieve specific recipe details by ID |
| `POST` | `/api/recipes` | Create a new recipe (JSON payload) |

### Sample JSON Payload for `POST /api/recipes`
```json
{
  "name": "Mediterranean Quinoa Bowl",
  "type": "Veg",
  "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  "prepTimeMinutes": 25,
  "servings": 2,
  "ingredients": [
    "1 cup cooked quinoa",
    "1 English cucumber, diced",
    "1 cup cherry tomatoes, halved",
    "1/3 cup crumbled feta cheese",
    "2 tbsp extra virgin olive oil"
  ],
  "steps": [
    "Rinse quinoa and cook until fluffy.",
    "Chop cucumbers and tomatoes.",
    "Whisk olive oil and lemon juice dressing.",
    "Combine warm quinoa with veggies and feta, drizzle dressing."
  ]
}
```

---

## 🏃 Running the Application

### 1. Spring Boot Backend
```powershell
cd D:\No1\backend
mvnw.cmd spring-boot:run
```
* **API Root:** `http://localhost:8080/api/recipes`
* **H2 Console:** `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:recipedb`, User: `sa`, Password: empty)

### 2. React Frontend
```powershell
cd D:\No1\frontend
npm run dev
```
* **Frontend App:** `http://localhost:5173/`

### 3. Switching to MySQL (Optional)
In `backend/src/main/resources/application.properties`, uncomment the MySQL block and update your credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/recipedb?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```
