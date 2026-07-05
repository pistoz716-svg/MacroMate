/*
=========================================
MacroMate
Recipe Library Engine
Version: 2.0
=========================================
*/

let activeRecipeCategory = "all";
let activeRecipeSearch = "";

function getAllRecipes() {
  return Object.values(RECIPES).flat();
}

function findRecipeById(recipeId) {
  return getAllRecipes().find(recipe => Number(recipe.id) === Number(recipeId));
}

function getRecipeCost(recipe) {
  return Number(recipe.estimatedCost || recipe.cost || 0);
}

function renderRecipeCategories() {
  const container = document.getElementById("recipeCategoryFilters");

  if (!container) return;

  container.innerHTML = RECIPE_CATEGORIES.map(category => `
    <button
      type="button"
      class="recipe-filter-btn ${activeRecipeCategory === category.id ? "active" : ""}"
      onclick="setRecipeCategory('${category.id}')">
      ${category.label}
    </button>
  `).join("");
}

function setRecipeCategory(categoryId) {
  activeRecipeCategory = categoryId;
  renderRecipeCategories();
  renderRecipeLibrary();
}

function setRecipeSearch(value) {
  activeRecipeSearch = String(value || "").trim().toLowerCase();
  renderRecipeLibrary();
}

function getFilteredRecipes() {
  let recipes = getAllRecipes();

  if (activeRecipeCategory !== "all") {
    recipes = recipes.filter(recipe => {
      const tags = recipe.tags || [];

      return (
        recipe.category === activeRecipeCategory ||
        tags.includes(activeRecipeCategory)
      );
    });
  }

  if (activeRecipeSearch) {
    recipes = recipes.filter(recipe => {
      const searchableText = [
        recipe.name,
        recipe.category,
        recipe.cuisine,
        recipe.difficulty,
        ...(recipe.tags || []),
        ...(recipe.substitutions || []),
        ...(recipe.variations || [])
      ].join(" ").toLowerCase();

      return searchableText.includes(activeRecipeSearch);
    });
  }

  return recipes;
}

function renderRecipeCard(recipe) {
  const favorite = isFavorite(recipe.id);
  const macros = recipe.macros || {};

  return `
    <div class="library-recipe-card">
      <div>
        <p class="eyebrow">${recipe.category}</p>
        <h3>${recipe.name}</h3>

        <div class="recipe-meta">
          <span>${recipe.difficulty || "Easy"}</span>
          <span>${recipe.totalTime || recipe.prepTime + recipe.cookTime} min</span>
          <span>${macros.calories || 0} cal</span>
          <span>$${getRecipeCost(recipe).toFixed(2)}</span>
        </div>

        <div class="recipe-meta">
          <span>P ${macros.protein || 0}g</span>
          <span>C ${macros.carbs || 0}g</span>
          <span>F ${macros.fat || 0}g</span>
          <span>★ ${recipe.rating || 0}</span>
        </div>
      </div>

      <div class="library-card-actions">
        <button type="button" onclick="openRecipeDetail(${recipe.id})">
          View Recipe
        </button>

        <button type="button" class="secondary-btn" onclick="toggleFavoriteFromLibrary(${recipe.id})">
          ${favorite ? "❤ Saved" : "♡ Favorite"}
        </button>
      </div>
    </div>
  `;
}

function renderRecipeLibrary() {
  const container = document.getElementById("recipeLibraryResults");

  if (!container) return;

  const recipes = getFilteredRecipes();

  if (!recipes.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No Recipes Found</h3>
        <p>Try another search term or filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = recipes.map(renderRecipeCard).join("");
}

function openRecipeDetail(recipeId) {
  const recipe = findRecipeById(recipeId);
  const container = document.getElementById("recipeDetail");

  if (!recipe || !container) return;

  if (typeof renderProfessionalRecipeViewer === "function") {
    container.innerHTML = renderProfessionalRecipeViewer(recipe);
    bindRecipeViewerTabs();
  } else {
    container.innerHTML = `
      <div class="meal-card">
        <div class="meal-card-header">
          <h4>${recipe.name}</h4>
          <span>${recipe.category}</span>
        </div>

        <div class="recipe-box">
          <h5>Ingredients</h5>
          <ul>
            ${recipe.ingredients.map(item => `<li>${item.food}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
  }

  container.scrollIntoView({ behavior: "smooth" });
}

function toggleFavoriteFromLibrary(recipeId) {
  const recipe = findRecipeById(recipeId);

  if (!recipe) return;

  toggleFavorite(recipe);
  renderRecipeLibrary();
  openRecipeDetail(recipeId);
}

function initializeRecipeLibrary() {
  const searchInput = document.getElementById("recipeSearch");

  if (searchInput) {
    searchInput.addEventListener("input", event => {
      setRecipeSearch(event.target.value);
    });
  }

  renderRecipeCategories();
  renderRecipeLibrary();
}