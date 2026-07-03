const FOODS = [

  // =====================
  // PROTEINS
  // =====================

  {
    name: "Chicken Breast",
    category: "protein",
    servingLabel: "4 oz",
    calories: 185,
    protein: 35,
    carbs: 0,
    fat: 4
  },

  {
    name: "Turkey Breast",
    category: "protein",
    servingLabel: "4 oz",
    calories: 160,
    protein: 32,
    carbs: 0,
    fat: 2
  },

  {
    name: "Lean Ground Beef",
    category: "protein",
    servingLabel: "4 oz",
    calories: 220,
    protein: 24,
    carbs: 0,
    fat: 13
  },

  {
    name: "Salmon",
    category: "protein",
    servingLabel: "4 oz",
    calories: 240,
    protein: 25,
    carbs: 0,
    fat: 15
  },

  {
    name: "Tuna",
    category: "protein",
    servingLabel: "1 can",
    calories: 120,
    protein: 26,
    carbs: 0,
    fat: 1
  },

  {
    name: "Eggs",
    category: "protein",
    servingLabel: "2 eggs",
    calories: 140,
    protein: 12,
    carbs: 1,
    fat: 10
  },

  {
    name: "Greek Yogurt",
    category: "protein",
    servingLabel: "1 cup",
    calories: 130,
    protein: 23,
    carbs: 9,
    fat: 0
  },

  {
    name: "Cottage Cheese",
    category: "protein",
    servingLabel: "1 cup",
    calories: 180,
    protein: 26,
    carbs: 8,
    fat: 5
  },

  {
    name: "Shrimp",
    category: "protein",
    servingLabel: "4 oz",
    calories: 120,
    protein: 24,
    carbs: 0,
    fat: 2
  },

  {
    name: "Tofu",
    category: "protein",
    servingLabel: "4 oz",
    calories: 110,
    protein: 12,
    carbs: 3,
    fat: 6
  },

  // =====================
  // CARBS
  // =====================

  {
    name: "White Rice",
    category: "carb",
    servingLabel: "1 cup cooked",
    calories: 205,
    protein: 4,
    carbs: 45,
    fat: 0
  },

  {
    name: "Brown Rice",
    category: "carb",
    servingLabel: "1 cup cooked",
    calories: 215,
    protein: 5,
    carbs: 45,
    fat: 2
  },

  {
    name: "Oats",
    category: "carb",
    servingLabel: "1/2 cup dry",
    calories: 150,
    protein: 5,
    carbs: 27,
    fat: 3
  },

  {
    name: "Sweet Potato",
    category: "carb",
    servingLabel: "1 medium",
    calories: 112,
    protein: 2,
    carbs: 26,
    fat: 0
  },

  {
    name: "Potato",
    category: "carb",
    servingLabel: "1 medium",
    calories: 160,
    protein: 4,
    carbs: 37,
    fat: 0
  },

  {
    name: "Whole Wheat Pasta",
    category: "carb",
    servingLabel: "1 cup cooked",
    calories: 180,
    protein: 8,
    carbs: 39,
    fat: 1
  },

  {
    name: "Quinoa",
    category: "carb",
    servingLabel: "1 cup cooked",
    calories: 222,
    protein: 8,
    carbs: 39,
    fat: 4
  },

  {
    name: "Whole Wheat Bread",
    category: "carb",
    servingLabel: "2 slices",
    calories: 160,
    protein: 8,
    carbs: 28,
    fat: 2
  },

  {
    name: "Bagel",
    category: "carb",
    servingLabel: "1 bagel",
    calories: 270,
    protein: 10,
    carbs: 53,
    fat: 1
  },

  {
    name: "Granola",
    category: "carb",
    servingLabel: "1/2 cup",
    calories: 220,
    protein: 5,
    carbs: 38,
    fat: 6
  },

  // =====================
  // HEALTHY FATS
  // =====================

  {
    name: "Peanut Butter",
    category: "fat",
    servingLabel: "2 tbsp",
    calories: 190,
    protein: 7,
    carbs: 8,
    fat: 16
  },

  {
    name: "Almonds",
    category: "fat",
    servingLabel: "1 oz",
    calories: 165,
    protein: 6,
    carbs: 6,
    fat: 14
  },

  {
    name: "Avocado",
    category: "fat",
    servingLabel: "1/2 avocado",
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15
  },

  {
    name: "Olive Oil",
    category: "fat",
    servingLabel: "1 tbsp",
    calories: 120,
    protein: 0,
    carbs: 0,
    fat: 14
  },

  {
    name: "Cashews",
    category: "fat",
    servingLabel: "1 oz",
    calories: 157,
    protein: 5,
    carbs: 9,
    fat: 12
  },

  {
    name: "Cheese",
    category: "fat",
    servingLabel: "1 oz",
    calories: 110,
    protein: 7,
    carbs: 1,
    fat: 9
  },

  // =====================
  // FRUITS
  // =====================

  {
    name: "Banana",
    category: "fruit",
    servingLabel: "1 medium",
    calories: 105,
    protein: 1,
    carbs: 27,
    fat: 0
  },

  {
    name: "Apple",
    category: "fruit",
    servingLabel: "1 medium",
    calories: 95,
    protein: 0,
    carbs: 25,
    fat: 0
  },

  {
    name: "Orange",
    category: "fruit",
    servingLabel: "1 medium",
    calories: 62,
    protein: 1,
    carbs: 15,
    fat: 0
  },

  {
    name: "Blueberries",
    category: "fruit",
    servingLabel: "1 cup",
    calories: 85,
    protein: 1,
    carbs: 21,
    fat: 0
  },

  {
    name: "Strawberries",
    category: "fruit",
    servingLabel: "1 cup",
    calories: 50,
    protein: 1,
    carbs: 12,
    fat: 0
  },

  // =====================
  // VEGETABLES
  // =====================

  {
    name: "Broccoli",
    category: "vegetable",
    servingLabel: "1 cup",
    calories: 55,
    protein: 4,
    carbs: 11,
    fat: 1
  },

  {
    name: "Spinach",
    category: "vegetable",
    servingLabel: "2 cups",
    calories: 15,
    protein: 2,
    carbs: 2,
    fat: 0
  },

  {
    name: "Green Beans",
    category: "vegetable",
    servingLabel: "1 cup",
    calories: 45,
    protein: 2,
    carbs: 10,
    fat: 0
  },

  {
    name: "Carrots",
    category: "vegetable",
    servingLabel: "1 cup",
    calories: 50,
    protein: 1,
    carbs: 12,
    fat: 0
  },

  {
    name: "Mixed Vegetables",
    category: "vegetable",
    servingLabel: "1 cup",
    calories: 80,
    protein: 3,
    carbs: 16,
    fat: 1
  }

];