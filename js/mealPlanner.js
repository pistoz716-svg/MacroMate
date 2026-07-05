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
    return {
      food: findFoodByName(item.food),
      multiplier: item.multiplier || 1
    };
  });

  const proteinItem = baseFoods.find(item => item.food.category === "protein");
  const carbItem = baseFoods.find(item => item.food.category === "carb");
  const fatItem = baseFoods.find(item => item.food.category === "fat");

  const proteinScale =
    proteinItem && proteinItem.food.protein > 0
      ? mealTarget.protein / proteinItem.food.protein
      : 1;

  const carbScale =
    carbItem && carbItem.food.carbs > 0
      ? mealTarget.carbs / carbItem.food.carbs
      : 1;

  const fatScale =
    fatItem && fatItem.food.fat > 0
      ? mealTarget.fat / fatItem.food.fat
      : 1;

  const foods = baseFoods.map(item => {
    let servingScale = 1;

    if (item.food.category === "protein") servingScale = proteinScale;
    if (item.food.category === "carb") servingScale = carbScale;
    if (item.food.category === "fat") servingScale = fatScale;

    if (item.food.category === "fruit" || item.food.category === "vegetable") {
      servingScale = item.multiplier || 1;
    } else {
      servingScale = servingScale * item.multiplier;
    }

    if (mealTarget.title === "Snack") {
      servingScale *= 0.75;
    }

    return makeMealItem(item.food, servingScale);
  });

  return {
    title: mealTarget.title,
    mealName: recipe.name,
    prepTime: recipe.prepTime + " min",
    cookTime: recipe.cookTime + " min",
    difficulty: recipe.difficulty,
    cost: "$" + Number(recipe.cost).toFixed(2),
    directions: recipe.directions,
    storage: recipe.storage,
    substitutions: Array.isArray(recipe.substitutions)
      ? recipe.substitutions.join(", ")
      : recipe.substitutions,
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