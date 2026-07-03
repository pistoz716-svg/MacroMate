function buildGroceryList(meals) {
  const groceryMap = {};

  meals.forEach(meal => {
    meal.foods.forEach(food => {
      const key = food.name;

      if (!groceryMap[key]) {
        groceryMap[key] = {
          name: food.name,
          category: food.category || "other",
          servingLabel: food.servingLabel || "serving",
          servings: 0,
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        };
      }

      groceryMap[key].servings += Number(food.servings);
      groceryMap[key].calories += Number(food.calories);
      groceryMap[key].protein += Number(food.protein);
      groceryMap[key].carbs += Number(food.carbs);
      groceryMap[key].fat += Number(food.fat);
    });
  });

  return Object.values(groceryMap).map(item => ({
    ...item,
    servings: Math.round(item.servings * 4) / 4,
    calories: Math.round(item.calories),
    protein: Math.round(item.protein),
    carbs: Math.round(item.carbs),
    fat: Math.round(item.fat)
  }));
}

function groupGroceryList(groceryList) {
  const grouped = {};

  groceryList.forEach(item => {
    const categoryLabel = GROCERY_CATEGORIES[item.category] || "Other";

    if (!grouped[categoryLabel]) {
      grouped[categoryLabel] = [];
    }

    grouped[categoryLabel].push(item);
  });

  return grouped;
}

function calculateGroceryTotals(groceryList) {
  return groceryList.reduce(
    (total, item) => {
      total.calories += item.calories;
      total.protein += item.protein;
      total.carbs += item.carbs;
      total.fat += item.fat;
      return total;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function renderMacroComparison(targets, totals) {
  const calorieDiff = totals.calories - targets.calories;
  const proteinDiff = totals.protein - targets.protein;
  const carbsDiff = totals.carbs - targets.carbs;
  const fatDiff = totals.fat - targets.fat;

  return `
    <div class="grocery-macro-summary">
      <h4>Macro Coverage</h4>

      <div class="macro-compare-grid">
        <div>
          <strong>Goal</strong>
          <p>${targets.calories} cal</p>
          <p>${targets.protein}g protein</p>
          <p>${targets.carbs}g carbs</p>
          <p>${targets.fat}g fat</p>
        </div>

        <div>
          <strong>This Grocery Plan Provides</strong>
          <p>${totals.calories} cal</p>
          <p>${totals.protein}g protein</p>
          <p>${totals.carbs}g carbs</p>
          <p>${totals.fat}g fat</p>
        </div>

        <div>
          <strong>Difference</strong>
          <p>${calorieDiff >= 0 ? "+" : ""}${calorieDiff} cal</p>
          <p>${proteinDiff >= 0 ? "+" : ""}${proteinDiff}g protein</p>
          <p>${carbsDiff >= 0 ? "+" : ""}${carbsDiff}g carbs</p>
          <p>${fatDiff >= 0 ? "+" : ""}${fatDiff}g fat</p>
        </div>
      </div>
    </div>
  `;
}

function renderGroceryList(meals, targets = null) {
  if (!meals || meals.length === 0) {
    return `<p class="hint">Save meals first to generate a grocery list.</p>`;
  }

  const groceryList = buildGroceryList(meals);
  const grouped = groupGroceryList(groceryList);
  const totals = calculateGroceryTotals(groceryList);

  let html = `
    <div class="grocery-list-box">
      <h3>Grocery List To Reach Your Macros</h3>
  `;

  if (targets && targets.calories > 0) {
    html += renderMacroComparison(targets, totals);
  }

  Object.keys(grouped).forEach(category => {
    html += `
      <div class="grocery-category">
        <h4>${category}</h4>
        <ul>
          ${grouped[category].map(item => `
            <li>
              <div>
                <strong>${item.name}</strong>
                <small>
                  ${item.calories} cal |
                  P ${item.protein}g /
                  C ${item.carbs}g /
                  F ${item.fat}g
                </small>
              </div>

              <span>${item.servings} x ${item.servingLabel}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  });

  html += `</div>`;

  return html;
}