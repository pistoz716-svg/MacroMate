/*
=========================================
MacroMate
Recipe Viewer Engine
Version: 2.0
=========================================
*/

let activeRecipeViewerTab = "overview";

function formatRecipeDirections(directions) {
  if (!Array.isArray(directions)) return "";

  return directions.map((step, index) => {
    if (typeof step === "string") {
      return `
        <li>
          <strong>Step ${index + 1}</strong>
          <p>${step}</p>
        </li>
      `;
    }

    return `
      <li>
        <strong>${step.title || `Step ${index + 1}`}</strong>
        <p>${step.body || ""}</p>
      </li>
    `;
  }).join("");
}

function renderRecipeHero(recipe) {
  return `
    <div class="recipe-hero-card">
      <div class="recipe-hero-image">
        <span>${recipe.category}</span>
      </div>

      <div class="recipe-hero-content">
        <p class="eyebrow">${recipe.cuisine || "General"} • ${recipe.category}</p>

        <h2>${recipe.name}</h2>

        <div class="recipe-rating">
          ★★★★★ <span>${recipe.rating || 0} (${recipe.reviews || 0} reviews)</span>
        </div>

        <div class="recipe-hero-meta">
          <div><strong>${recipe.difficulty || "Easy"}</strong><small>Difficulty</small></div>
          <div><strong>${recipe.totalTime || recipe.prepTime + recipe.cookTime} min</strong><small>Total Time</small></div>
          <div><strong>$${Number(recipe.estimatedCost || recipe.cost || 0).toFixed(2)}</strong><small>Est. Cost</small></div>
          <div><strong>${recipe.servings || 1}</strong><small>Servings</small></div>
        </div>

        <div class="recipe-hero-actions">
          <button type="button" onclick="toggleFavoriteFromLibrary(${recipe.id})">
            ${isFavorite(recipe.id) ? "❤ Saved" : "♡ Favorite"}
          </button>

          <button type="button" class="secondary-btn" onclick="window.print()">
            Print Recipe
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderNutritionPanel(recipe) {
  const macros = recipe.macros || {};

  return `
    <div class="nutrition-panel">
      <div><strong>${macros.calories || 0}</strong><small>Calories</small></div>
      <div><strong>${macros.protein || 0}g</strong><small>Protein</small></div>
      <div><strong>${macros.carbs || 0}g</strong><small>Carbs</small></div>
      <div><strong>${macros.fat || 0}g</strong><small>Fat</small></div>
      <div><strong>${macros.fiber || 0}g</strong><small>Fiber</small></div>
      <div><strong>${macros.sugar || 0}g</strong><small>Sugar</small></div>
      <div><strong>${macros.sodium || 0}mg</strong><small>Sodium</small></div>
    </div>
  `;
}

function renderRecipeViewerTabs(recipe) {
  return `
    <div class="recipe-viewer-tabs">
      <button class="recipe-viewer-tab active" type="button" data-recipe-tab="overview">Overview</button>
      <button class="recipe-viewer-tab" type="button" data-recipe-tab="nutrition">Nutrition</button>
      <button class="recipe-viewer-tab" type="button" data-recipe-tab="ingredients">Ingredients</button>
      <button class="recipe-viewer-tab" type="button" data-recipe-tab="directions">Directions</button>
      <button class="recipe-viewer-tab" type="button" data-recipe-tab="prep">Meal Prep</button>
      <button class="recipe-viewer-tab" type="button" data-recipe-tab="tips">Tips</button>
    </div>

    <div id="recipeTabOverview" class="recipe-tab-panel active-recipe-tab">
      <div class="recipe-box">
        <h5>Recipe Overview</h5>
        <p>
          ${recipe.name} is a ${recipe.difficulty || "simple"} ${recipe.category.toLowerCase()}
          recipe designed for practical macro-focused meal planning.
        </p>

        <h5>Tags</h5>
        <div class="tag-row">
          ${(recipe.tags || []).map(tag => `<span>${tag}</span>`).join("")}
        </div>
      </div>
    </div>

    <div id="recipeTabNutrition" class="recipe-tab-panel">
      <div class="recipe-box">
        <h5>Nutrition Facts</h5>
        ${renderNutritionPanel(recipe)}
      </div>
    </div>

    <div id="recipeTabIngredients" class="recipe-tab-panel">
      <div class="recipe-box">
        <h5>Equipment</h5>
        <ul>
          ${(recipe.equipment || []).map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h5>Ingredients</h5>
        <ul>
          ${(recipe.ingredients || []).map(item => `
            <li>
              <strong>${item.amount || 1} ${item.unit || "serving"}</strong> ${item.food}
              ${item.notes ? `<br><small>${item.notes}</small>` : ""}
            </li>
          `).join("")}
        </ul>
      </div>
    </div>

    <div id="recipeTabDirections" class="recipe-tab-panel">
      <div class="recipe-box">
        <h5>Step-by-Step Directions</h5>
        <ol class="detailed-directions">
          ${formatRecipeDirections(recipe.directions)}
        </ol>
      </div>
    </div>

    <div id="recipeTabPrep" class="recipe-tab-panel">
      <div class="recipe-box">
        <h5>Meal Prep</h5>
        <ol>
          ${(recipe.mealPrep || []).map(step => `<li>${step}</li>`).join("")}
        </ol>

        <h5>Storage</h5>
        <p>${recipe.storage || "No storage instructions listed."}</p>

        <h5>Reheating</h5>
        <p>${recipe.reheating || "No reheating instructions listed."}</p>
      </div>
    </div>

    <div id="recipeTabTips" class="recipe-tab-panel">
      <div class="recipe-box">
        <h5>Chef Tips</h5>
        <ul>
          ${(recipe.chefTips || []).map(tip => `<li>${tip}</li>`).join("")}
        </ul>

        <h5>Common Mistakes</h5>
        <ul>
          ${(recipe.mistakes || []).map(mistake => `<li>${mistake}</li>`).join("")}
        </ul>

        <h5>Variations</h5>
        <ul>
          ${(recipe.variations || []).map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h5>Substitutions</h5>
        <p>${
          Array.isArray(recipe.substitutions)
            ? recipe.substitutions.join(", ")
            : recipe.substitutions || "No substitutions listed."
        }</p>
      </div>
    </div>
  `;
}

function bindRecipeViewerTabs() {
  const buttons = document.querySelectorAll(".recipe-viewer-tab");
  const panels = document.querySelectorAll(".recipe-tab-panel");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      panels.forEach(panel => panel.classList.remove("active-recipe-tab"));

      button.classList.add("active");

      const tab = button.dataset.recipeTab;
      const panel = document.getElementById(
        "recipeTab" + tab.charAt(0).toUpperCase() + tab.slice(1)
      );

      if (panel) {
        panel.classList.add("active-recipe-tab");
      }
    });
  });
}

function renderProfessionalRecipeViewer(recipe) {
  return `
    ${renderRecipeHero(recipe)}
    ${renderRecipeViewerTabs(recipe)}
  `;
}