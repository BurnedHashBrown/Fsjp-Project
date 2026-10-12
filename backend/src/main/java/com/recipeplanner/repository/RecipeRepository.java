package com.recipeplanner.repository;

import com.recipeplanner.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    List<Recipe> findByTypeIgnoreCase(String type);

    List<Recipe> findByNameContainingIgnoreCase(String name);
}
