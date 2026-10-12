package com.recipeplanner.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Recipe name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Dietary type is required")
    @Column(nullable = false)
    private String type; // "Veg", "Non-Veg", "Quick Snack"

    @Column(length = 1000)
    private String imageUrl;

    private Integer prepTimeMinutes;

    private Integer servings;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "recipe_ingredients", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "ingredient", length = 500)
    private List<String> ingredients = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "recipe_steps", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "step", length = 1000)
    @OrderColumn(name = "step_order")
    private List<String> steps = new ArrayList<>();

    public Recipe() {
    }

    public Recipe(String name, String type, String imageUrl, Integer prepTimeMinutes, Integer servings, List<String> ingredients, List<String> steps) {
        this.name = name;
        this.type = type;
        this.imageUrl = imageUrl;
        this.prepTimeMinutes = prepTimeMinutes;
        this.servings = servings;
        this.ingredients = ingredients != null ? ingredients : new ArrayList<>();
        this.steps = steps != null ? steps : new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getPrepTimeMinutes() {
        return prepTimeMinutes;
    }

    public void setPrepTimeMinutes(Integer prepTimeMinutes) {
        this.prepTimeMinutes = prepTimeMinutes;
    }

    public Integer getServings() {
        return servings;
    }

    public void setServings(Integer servings) {
        this.servings = servings;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public List<String> getSteps() {
        return steps;
    }

    public void setSteps(List<String> steps) {
        this.steps = steps;
    }
}
