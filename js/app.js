let currentTargets = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0
};

let consumed = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0
};

let lastGeneratedMeal = null;
let savedMeals = JSON.parse(localStorage.getItem("savedMeals")) || [];
let waterCount = Number(localStorage.getItem("macroMateWaterCount")) || 0;

const tabButtons = document.querySelectorAll(".tab-btn");
const jumpButtons = document.querySelectorAll(".jump-btn");
const pages = document.querySelectorAll(".page");

const weightInput = document.getElementById("weight");
const goalWeightInput = document.getElementById("goalWeight");
const unitInput = document.getElementById("unit");
const goalInput = document.getElementById("goal");
const activityInput = document.getElementById("activity");
const calculateBtn = document.getElementById("calculateBtn");

const caloriesEl = document.getElementById("calories");
const proteinEl = document.getElementById("protein");
const carbsEl = document.getElementById("carbs");
const fatEl = document.getElementById("fat");

const dashCaloriesEl = document.getElementById("dashCalories");
const dashProteinEl = document.getElementById("dashProtein");
const dashCarbsEl = document.getElementById("dashCarbs");
const dashFatEl = document.getElementById("dashFat");

const dashboardGreetingEl = document.getElementById("dashboardGreeting");
const dashboardGoalLabelEl = document.getElementById("dashboardGoalLabel");
const dashboardProgressPercentEl = document.getElementById("dashboardProgressPercent");
const dashboardProgressTextEl = document.getElementById("dashboardProgressText");

const waterCountEl = document.getElementById("waterCount");
const waterTrackerTextEl = document.getElementById("waterTrackerText");
const increaseWaterBtn = document.getElementById("increaseWaterBtn");
const decreaseWaterBtn = document.getElementById("decreaseWaterBtn");

const remainingCaloriesEl = document.getElementById("remainingCalories");
const remainingProteinEl = document.getElementById("remainingProtein");
const remainingCarbsEl = document.getElementById("remainingCarbs");
const remainingFatEl = document.getElementById("remainingFat");

const foodSelect = document.getElementById("foodSelect");
const servingsInput = document.getElementById("servings");
const addFoodBtn = document.getElementById("addFoodBtn");
const mealList = document.getElementById("mealList");

const generateBreakfastBtn = document.getElementById("generateBreakfastBtn");
const generateLunchBtn = document.getElementById("generateLunchBtn");
const generateSnackBtn = document.getElementById("generateSnackBtn");
const generateDinnerBtn = document.getElementById("generateDinnerBtn");
const generatePlanBtn = document.getElementById("generatePlanBtn");
const generateMultiDayPlanBtn = document.getElementById("generateMultiDayPlanBtn");
const planLengthInput = document.getElementById("planLength");
const mealPlan = document.getElementById("mealPlan");

const savedMealsEl = document.getElementById("savedMeals");
const savedTotalsEl = document.getElementById("savedTotals");
const clearSavedMealsBtn = document.getElementById("clearSavedMealsBtn");
const generateGroceryListBtn = document.getElementById("generateGroceryListBtn");
const generateGroceryListBtnAlt = document.getElementById("generateGroceryListBtnAlt");
const groceryListEl = document.getElementById("groceryList");

const profileNameInput = document.getElementById("profileName");
const profileEmailInput = document.getElementById("profileEmail");
const saveProfileBtn = document.getElementById("saveProfileBtn");

function showPage(pageId) {
  pages.forEach(page => page.classList.remove("active-page"));
  tabButtons.forEach(button => button.classList.remove("active"));

  const selectedPage = document.getElementById(pageId);
  const selectedButton = document.querySelector(`[data-page="${pageId}"]`);

  if (selectedPage) selectedPage.classList.add("active-page");
  if (selectedButton) selectedButton.classList.add("active");
}

function loadFoods() {
  foodSelect.innerHTML = "";

  FOODS.forEach((food, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = food.servingLabel
      ? `${food.name} (${food.servingLabel})`
      : food.name;

    foodSelect.appendChild(option);
  });
}

function updateTargetDisplay() {
  caloriesEl.textContent = currentTargets.calories;
  proteinEl.textContent = currentTargets.protein + "g";
  carbsEl.textContent = currentTargets.carbs + "g";
  fatEl.textContent = currentTargets.fat + "g";

  dashCaloriesEl.textContent = currentTargets.calories;
  dashProteinEl.textContent = currentTargets.protein + "g";
  dashCarbsEl.textContent = currentTargets.carbs + "g";
  dashFatEl.textContent = currentTargets.fat + "g";
}

function getRemainingMacros() {
  return {
    calories: Math.max(currentTargets.calories - consumed.calories, 0),
    protein: Math.max(currentTargets.protein - consumed.protein, 0),
    carbs: Math.max(currentTargets.carbs - consumed.carbs, 0),
    fat: Math.max(currentTargets.fat - consumed.fat, 0)
  };
}

function updateRemainingDisplay() {
  const remaining = getRemainingMacros();

  remainingCaloriesEl.textContent = remaining.calories;
  remainingProteinEl.textContent = remaining.protein + "g";
  remainingCarbsEl.textContent = remaining.carbs + "g";
  remainingFatEl.textContent = remaining.fat + "g";
}

function updateDashboardGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    dashboardGreetingEl.textContent = "Good Morning";
  } else if (hour < 18) {
    dashboardGreetingEl.textContent = "Good Afternoon";
  } else {
    dashboardGreetingEl.textContent = "Good Evening";
  }
}

function updateDashboardGoalLabel() {
  const labels = {
    auto: "Auto Goal",
    gain: "Lean Bulk",
    cut: "Fat Loss",
    maintain: "Maintenance"
  };

  dashboardGoalLabelEl.textContent = labels[goalInput.value] || "Macro Focus";
}

function updateDashboardProgress() {
  if (!currentTargets.calories || currentTargets.calories <= 0) {
    dashboardProgressPercentEl.textContent = "0%";
    dashboardProgressTextEl.textContent = "Calculate your macros to begin.";
    return;
  }

  const percent = Math.min(
    Math.round((consumed.calories / currentTargets.calories) * 100),
    100
  );

  dashboardProgressPercentEl.textContent = percent + "%";
  dashboardProgressTextEl.textContent = `${consumed.calories} of ${currentTargets.calories} calories logged.`;
}

function updateWaterDisplay() {
  waterCountEl.textContent = `${waterCount} / 8`;
  waterTrackerTextEl.textContent = `${waterCount} / 8 Glasses`;
  localStorage.setItem("macroMeWaterCount", String(waterCount));
}

function updateDashboard() {
  updateDashboardGreeting();
  updateDashboardGoalLabel();
  updateDashboardProgress();
  updateWaterDisplay();
}

function calculateDayTotals(meals) {
  return meals.reduce(
    (total, meal) => {
      total.calories += meal.totals.calories;
      total.protein += meal.totals.protein;
      total.carbs += meal.totals.carbs;
      total.fat += meal.totals.fat;
      return total;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function saveSavedMeals() {
  localStorage.setItem("savedMeals", JSON.stringify(savedMeals));
}

function renderSavedMeals() {
  if (!savedMeals.length) {
    savedMealsEl.innerHTML = `<p class="hint">No saved meals yet.</p>`;
    savedTotalsEl.innerHTML = "No meals saved yet.";
    groceryListEl.innerHTML = "";
    return;
  }

  savedMealsEl.innerHTML = savedMeals.map((meal, index) => `
    <div class="saved-meal-card">
      <div>
        <strong>${meal.title}: ${meal.mealName}</strong>
        <small>
          ${meal.totals.calories} cal |
          P ${meal.totals.protein}g /
          C ${meal.totals.carbs}g /
          F ${meal.totals.fat}g
        </small>
      </div>

      <button type="button" onclick="removeSavedMeal(${index})">Remove</button>
    </div>
  `).join("");

  const totals = calculateDayTotals(savedMeals);

  savedTotalsEl.innerHTML = `
    <strong>Saved Daily Total:</strong><br>
    ${totals.calories} cal |
    ${totals.protein}g protein |
    ${totals.carbs}g carbs |
    ${totals.fat}g fat
  `;
}

function removeSavedMeal(index) {
  savedMeals.splice(index, 1);
  saveSavedMeals();
  renderSavedMeals();
  groceryListEl.innerHTML = "";
}

function saveMeal(meal) {
  savedMeals = savedMeals.filter(savedMeal => savedMeal.title !== meal.title);
  savedMeals.push(meal);

  const order = ["Breakfast", "Lunch", "Snack", "Dinner"];
  savedMeals.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title));

  saveSavedMeals();
  renderSavedMeals();
  groceryListEl.innerHTML = "";
}

function renderMealCard(meal, showSaveButton = true) {
  return `
    <div class="meal-card">
      <div class="meal-card-header">
        <h4>${meal.title}</h4>
        <span>${meal.mealName}</span>
      </div>

      <div class="recipe-meta">
        <span>Prep: ${meal.prepTime}</span>
        <span>Cook: ${meal.cookTime}</span>
        <span>${meal.difficulty}</span>
        <span>${meal.cost}</span>
      </div>

      <div class="meal-total">
        Meal Macros:
        ${meal.totals.calories} cal |
        ${meal.totals.protein}g protein |
        ${meal.totals.carbs}g carbs |
        ${meal.totals.fat}g fat
      </div>

      <div class="recipe-box">
        <h5>Equipment</h5>
        <ul>
          ${(meal.equipment || []).map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h5>Ingredients</h5>
        <ul>
          ${meal.foods.map(food => `
            <li>
              <strong>${food.servings} x ${food.servingLabel}</strong> ${food.name}
              ${food.notes ? `<br><small>${food.notes}</small>` : ""}
              <br>
              <small>${food.calories} cal | P ${food.protein}g / C ${food.carbs}g / F ${food.fat}g</small>
            </li>
          `).join("")}
        </ul>

        <h5>Directions</h5>
        <ol>
          ${meal.directions.map(step => `
            <li>
              <strong>${step.title}</strong>
              <p>${step.body}</p>
            </li>
          `).join("")}
        </ol>

        <h5>Meal Prep</h5>
        <ol>
          ${(meal.mealPrep || []).map(step => `<li>${step}</li>`).join("")}
        </ol>

        <h5>Storage</h5>
        <p>${meal.storage}</p>

        <h5>Reheating</h5>
        <p>${meal.reheating}</p>

        <h5>Chef Tips</h5>
        <ul>
          ${(meal.chefTips || []).map(tip => `<li>${tip}</li>`).join("")}
        </ul>

        <h5>Common Mistakes</h5>
        <ul>
          ${(meal.mistakes || []).map(mistake => `<li>${mistake}</li>`).join("")}
        </ul>

        <h5>Variations</h5>
        <ul>
          ${(meal.variations || []).map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h5>Substitutions</h5>
        <p>${meal.substitutions}</p>
      </div>

      ${showSaveButton ? `<button id="saveGeneratedMealBtn" type="button">Save ${meal.title}</button>` : ""}
    </div>
  `;
}

function bindSaveGeneratedMealButton() {
  const saveBtn = document.getElementById("saveGeneratedMealBtn");

  if (!saveBtn || !lastGeneratedMeal) return;

  saveBtn.addEventListener("click", () => {
    saveMeal(lastGeneratedMeal);
    alert(`${lastGeneratedMeal.title} saved.`);
  });
}

function generateMealByType(type) {
  if (currentTargets.calories === 0) {
    alert("Calculate your macros first.");
    showPage("goalsPage");
    return;
  }

  const remainingTargets = getRemainingMacros();
  const split = splitDailyTargets(remainingTargets);
  const mealTarget = split[type];

  if (!mealTarget) {
    alert("Meal type not found.");
    return;
  }

  const meal = buildNamedMeal(mealTarget);

  if (!meal) return;

  lastGeneratedMeal = meal;
  mealPlan.innerHTML = renderMealCard(meal, true);
  showPage("mealsPage");
  bindSaveGeneratedMealButton();
}

function generateFullDayPlan() {
  if (currentTargets.calories === 0) {
    alert("Calculate your macros first.");
    showPage("goalsPage");
    return;
  }

  const remainingTargets = getRemainingMacros();
  const dayMeals = generateGoalMealPlan(remainingTargets);
  const dayTotals = calculateDayTotals(dayMeals);

  let html = `
    <div class="day-header">
      <h3>Full Day Meal Plan</h3>
      <p>
        Goal: ${remainingTargets.calories} cal |
        Protein ${remainingTargets.protein}g |
        Carbs ${remainingTargets.carbs}g |
        Fat ${remainingTargets.fat}g
      </p>
    </div>

    <div class="day-total-box">
      <strong>Generated Daily Total:</strong><br>
      ${dayTotals.calories} cal |
      ${dayTotals.protein}g protein |
      ${dayTotals.carbs}g carbs |
      ${dayTotals.fat}g fat
    </div>
  `;

  dayMeals.forEach(meal => {
    html += renderMealCard(meal, false);
  });

  html += `<button id="saveFullDayBtn" type="button">Save Full Day</button>`;

  mealPlan.innerHTML = html;

  const saveFullDayBtn = document.getElementById("saveFullDayBtn");
  saveFullDayBtn.addEventListener("click", () => {
    savedMeals = dayMeals;
    saveSavedMeals();
    renderSavedMeals();
    groceryListEl.innerHTML = "";
    alert("Full day saved.");
  });
}

function renderDayPrepDirections(day, dayMeals) {
  return `
    <div class="recipe-box">
      <h5>Day ${day} Meal Prep Directions</h5>
      <ol>
        <li>Review all recipes for Day ${day} before cooking.</li>
        <li>Gather the ingredients listed in each meal card.</li>
        <li>Cook proteins first, such as eggs, chicken, turkey, beef, salmon, tuna, tofu, or yogurt-based proteins.</li>
        <li>Cook or portion carb sources next, such as oats, rice, potatoes, pasta, quinoa, bread, or granola.</li>
        <li>Wash, chop, steam, or portion fruits and vegetables.</li>
        <li>Add fats last, such as avocado, olive oil, peanut butter, almonds, cheese, or cashews.</li>
        <li>Package meals separately and label them Breakfast, Lunch, Snack, and Dinner.</li>
        <li>Refrigerate meals you will eat within 3–4 days.</li>
        <li>Freeze meals if preparing more than 4 days ahead.</li>
      </ol>

      <h5>Day ${day} Meal Order</h5>
      <ul>
        ${dayMeals.map(meal => `
          <li><strong>${meal.title}:</strong> ${meal.mealName}</li>
        `).join("")}
      </ul>
    </div>
  `;
}

function generateMultiDayPlan() {
  if (currentTargets.calories === 0) {
    alert("Calculate your macros first.");
    showPage("goalsPage");
    return;
  }

  const days = Number(planLengthInput.value || 7);
  const remainingTargets = getRemainingMacros();

  let html = `
    <div class="day-header">
      <h3>${days}-Day Detailed Meal Plan</h3>
      <p>
        Daily Goal: ${remainingTargets.calories} cal |
        Protein ${remainingTargets.protein}g |
        Carbs ${remainingTargets.carbs}g |
        Fat ${remainingTargets.fat}g
      </p>
    </div>
  `;

  for (let day = 1; day <= days; day++) {
    const dayMeals = generateGoalMealPlan(remainingTargets);
    const dayTotals = calculateDayTotals(dayMeals);

    html += `
      <div class="meal-plan-item">
        <div class="day-header">
          <h3>Day ${day}</h3>
          <p>
            ${dayTotals.calories} cal |
            ${dayTotals.protein}g protein |
            ${dayTotals.carbs}g carbs |
            ${dayTotals.fat}g fat
          </p>
        </div>
    `;

    dayMeals.forEach(meal => {
      html += renderMealCard(meal, false);
    });

    html += renderDayPrepDirections(day, dayMeals);
    html += `</div>`;
  }

  mealPlan.innerHTML = html;
  showPage("mealsPage");
}

calculateBtn.addEventListener("click", () => {
  const weight = Number(weightInput.value);
  const goalWeight = Number(goalWeightInput.value || weight);

  if (!weight || weight <= 0) {
    alert("Please enter your current weight.");
    return;
  }

  if (!goalWeight || goalWeight <= 0) {
    alert("Please enter your goal weight.");
    return;
  }

  currentTargets = calculateMacros(
    weight,
    goalWeight,
    unitInput.value,
    goalInput.value,
    activityInput.value
  );

  consumed = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  mealList.innerHTML = "";
  mealPlan.innerHTML = "";

  updateTargetDisplay();
  updateRemainingDisplay();
  updateDashboard();
  showPage("dashboardPage");
});

addFoodBtn.addEventListener("click", () => {
  const selectedFood = FOODS[foodSelect.value];
  const servings = Number(servingsInput.value);

  if (!selectedFood || servings <= 0) return;

  const added = {
    calories: Math.round(selectedFood.calories * servings),
    protein: Math.round(selectedFood.protein * servings),
    carbs: Math.round(selectedFood.carbs * servings),
    fat: Math.round(selectedFood.fat * servings)
  };

  consumed.calories += added.calories;
  consumed.protein += added.protein;
  consumed.carbs += added.carbs;
  consumed.fat += added.fat;

  const li = document.createElement("li");
  li.textContent = `${selectedFood.name} x ${servings} — ${added.calories} cal, ${added.protein}g protein, ${added.carbs}g carbs, ${added.fat}g fat`;

  mealList.appendChild(li);
  updateRemainingDisplay();
  updateDashboard();
});

tabButtons.forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

jumpButtons.forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

generateBreakfastBtn.addEventListener("click", () => generateMealByType("breakfast"));
generateLunchBtn.addEventListener("click", () => generateMealByType("lunch"));
generateSnackBtn.addEventListener("click", () => generateMealByType("snack"));
generateDinnerBtn.addEventListener("click", () => generateMealByType("dinner"));
generatePlanBtn.addEventListener("click", generateFullDayPlan);
generateMultiDayPlanBtn.addEventListener("click", generateMultiDayPlan);

generateGroceryListBtn.addEventListener("click", () => {
  groceryListEl.innerHTML = renderGroceryList(savedMeals, currentTargets);
  showPage("groceryPage");
});

generateGroceryListBtnAlt.addEventListener("click", () => {
  groceryListEl.innerHTML = renderGroceryList(savedMeals, currentTargets);
});

clearSavedMealsBtn.addEventListener("click", () => {
  savedMeals = [];
  saveSavedMeals();
  renderSavedMeals();
  groceryListEl.innerHTML = "";
});

increaseWaterBtn.addEventListener("click", () => {
  waterCount = Math.min(waterCount + 1, 20);
  updateWaterDisplay();
});

decreaseWaterBtn.addEventListener("click", () => {
  waterCount = Math.max(waterCount - 1, 0);
  updateWaterDisplay();
});

saveProfileBtn.addEventListener("click", () => {
  const profile = {
    name: profileNameInput.value,
    email: profileEmailInput.value
  };

  localStorage.setItem("macroMeProfile", JSON.stringify(profile));
  alert("Profile saved.");
});

function loadProfile() {
  const profile = JSON.parse(localStorage.getItem("macroMeProfile"));
  if (!profile) return;

  profileNameInput.value = profile.name || "";
  profileEmailInput.value = profile.email || "";
}

loadFoods();
loadProfile();
updateTargetDisplay();
updateRemainingDisplay();
renderSavedMeals();

if (typeof initializeRecipeLibrary === "function") {
  initializeRecipeLibrary();
}

if (typeof renderFavoriteRecipes === "function") {
  renderFavoriteRecipes();
}

updateDashboard();
showPage("dashboardPage");