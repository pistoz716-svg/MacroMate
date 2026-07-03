function calculateMacros(weight, unit, goal, activity) {
  let weightInLbs = unit === "kg" ? weight * 2.20462 : weight;

  let multiplier = 14;

  if (activity === "low") multiplier = 13;
  if (activity === "moderate") multiplier = 15;
  if (activity === "high") multiplier = 17;

  let calories = weightInLbs * multiplier;

  if (goal === "gain") calories += 300;
  if (goal === "cut") calories -= 300;

  let protein = weightInLbs * 1;
  let fat = weightInLbs * 0.35;

  let proteinCalories = protein * 4;
  let fatCalories = fat * 9;

  let remainingCalories = calories - proteinCalories - fatCalories;
  let carbs = remainingCalories / 4;

  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat)
  };
}