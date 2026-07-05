function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function normalizeName(name) {
  return String(name || "").trim().toLowerCase();
}

function findFoodByName(name) {
  return FOODS.find(food => normalizeName(food.name) === normalizeName(name));
}

function makeMealItem(food, servings) {
  const roundedServings = Math.max(0.25, Math.round(servings * 4) / 4);

  return {
    name: food.name,
    category: food.category,
    servingLabel: food.servingLabel || "serving",
    servings: roundedServings,
    calories: Math.round(food.calories * roundedServings),
    protein: Math.round(food.protein * roundedServings),
    carbs: Math.round(food.carbs * roundedServings),
    fat: Math.round(food.fat * roundedServings)
  };
}

function calculateMealTotals(items) {
  return items.reduce(
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

function splitDailyTargets(targets) {
  return {
    breakfast: {
      title: "Breakfast",
      calories: Math.round(targets.calories * 0.25),
      protein: Math.round(targets.protein * 0.25),
      carbs: Math.round(targets.carbs * 0.25),
      fat: Math.round(targets.fat * 0.25)
    },
    lunch: {
      title: "Lunch",
      calories: Math.round(targets.calories * 0.35),
      protein: Math.round(targets.protein * 0.35),
      carbs: Math.round(targets.carbs * 0.35),
      fat: Math.round(targets.fat * 0.35)
    },
    snack: {
      title: "Snack",
      calories: Math.round(targets.calories * 0.15),
      protein: Math.round(targets.protein * 0.15),
      carbs: Math.round(targets.carbs * 0.15),
      fat: Math.round(targets.fat * 0.15)
    },
    dinner: {
      title: "Dinner",
      calories: Math.round(targets.calories * 0.25),
      protein: Math.round(targets.protein * 0.25),
      carbs: Math.round(targets.carbs * 0.25),
      fat: Math.round(targets.fat * 0.25)
    }
  };
}

function normalizeRecipeDirections(directions) {
  if (!Array.isArray(directions)) return [];

  return directions.map((step, index) => {
    if (typeof step === "string") {
      return {
        title: `Step ${index + 1}`,
        body: step
      };
    }

    return {
      title: step.title || `Step ${index + 1}`,
      body: step.body || ""
    };
  });
}

function getRecipeCost(recipe) {
  return Number(recipe.estimatedCost || recipe.cost || 0);
}

function getFoodRole(food) {
  const category = normalizeName(food.category);

  if (category === "protein") return "protein";
  if (category === "carb") return "carb";
  if (category === "fat") return "fat";
  if (category === "fruit") return "produce";
  if (category === "vegetable") return "produce";

  return "extra";
}

function calculateScaleForRole(role, food, mealTarget) {
  if (role === "protein" && food.protein > 0) {
    return mealTarget.protein / food.protein;
  }

  if (role === "carb" && food.carbs > 0) {
    return mealTarget.carbs / food.carbs;
  }

  if (role === "fat" && food.fat > 0) {
    return mealTarget.fat / food.fat;
  }

  return 1;
}

function buildMealFromRecipe(mealTarget) {
  const recipeList = RECIPES[mealTarget.title];

  if (!recipeList || recipeList.length === 0) {
    alert("No recipes found for " + mealTarget.title);
    return null;
  }

  const recipe = getRandomItem(recipeList);

  const missingFoods = recipe.ingredients
    .map(item => item.food)
    .filter(foodName => !findFoodByName(foodName));

  if (missingFoods.length > 0) {
    alert("Missing from foods.js: " + missingFoods.join(", "));
    return null;
  }

  const baseFoods = recipe.ingredients.map(item => {
    const food = findFoodByName(item.food);

    return {
      food: food,
      role: getFoodRole(food),
      multiplier: item.multiplier || 1,
      amount: item.amount || 1,
      unit: item.unit || "serving",
      notes: item.notes || ""
    };
  });

  const foods = baseFoods.map(item => {
    let servingScale = calculateScaleForRole(item.role, item.food, mealTarget);

    if (item.role === "produce" || item.role === "extra") {
      servingScale = item.multiplier || 1;
    } else {
      servingScale *= item.multiplier;
    }

    if (mealTarget.title === "Snack") {
      servingScale *= 0.75;
    }

    const mealItem = makeMealItem(item.food, servingScale);

    mealItem.amount = item.amount;
    mealItem.unit = item.unit;
    mealItem.notes = item.notes;

    return mealItem;
  });

  return {
    id: recipe.id,
    title: mealTarget.title,
    mealName: recipe.name,
    category: recipe.category,
    cuisine: recipe.cuisine || "General",
    prepTime: recipe.prepTime + " min",
    cookTime: recipe.cookTime + " min",
    totalTime: (recipe.totalTime || recipe.prepTime + recipe.cookTime) + " min",
    difficulty: recipe.difficulty || "Easy",
    cost: "$" + getRecipeCost(recipe).toFixed(2),
    image: recipe.image || "",
    rating: recipe.rating || 0,
    reviews: recipe.reviews || 0,
    macros: recipe.macros || null,
    tags: recipe.tags || [],
    equipment: recipe.equipment || [],
    directions: normalizeRecipeDirections(recipe.directions),
    mealPrep: recipe.mealPrep || [],
    storage: recipe.storage || "No storage instructions available.",
    reheating: recipe.reheating || "No reheating instructions available.",
    chefTips: recipe.chefTips || [],
    mistakes: recipe.mistakes || [],
    variations: recipe.variations || [],
    substitutions: Array.isArray(recipe.substitutions)
      ? recipe.substitutions.join(", ")
      : recipe.substitutions || "No substitutions listed.",
    target: mealTarget,
    foods: foods,
    totals: calculateMealTotals(foods)
  };
}

function buildNamedMeal(mealTarget) {
  return buildMealFromRecipe(mealTarget);
}

function generateGoalMealPlan(targets) {
  const split = splitDailyTargets(targets);

  return [
    buildNamedMeal(split.breakfast),
    buildNamedMeal(split.lunch),
    buildNamedMeal(split.snack),
    buildNamedMeal(split.dinner)
  ].filter(Boolean);
}

function generate90DayMealPlan(targets) {
  const plan = [];

  for (let day = 1; day <= 90; day++) {
    plan.push({
      day: day,
      meals: generateGoalMealPlan(targets)
    });
  }

  return plan;
}