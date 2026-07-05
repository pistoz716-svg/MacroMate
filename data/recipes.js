const RECIPES = {
  Breakfast: [
    {
      id: 1,
      name: "Power Oat Bowl",
      category: "Breakfast",
      cuisine: "American",
      difficulty: "Easy",
      prepTime: 5,
      cookTime: 0,
      totalTime: 5,
      servings: 1,
      estimatedCost: 3.25,
      cost: 3.25,
      image: "assets/recipe-images/power-oat-bowl.jpg",
      rating: 4.7,
      reviews: 86,

      macros: {
        calories: 430,
        protein: 32,
        carbs: 52,
        fat: 14,
        fiber: 7,
        sugar: 18,
        sodium: 120
      },

      tags: ["breakfast", "high-protein", "quick", "budget"],

      equipment: ["Mixing bowl", "Spoon", "Measuring cup"],

      ingredients: [
        { food: "Greek Yogurt", amount: 1, unit: "serving", multiplier: 1, notes: "plain or vanilla" },
        { food: "Oats", amount: 1, unit: "serving", multiplier: 1, notes: "dry oats" },
        { food: "Banana", amount: 1, unit: "serving", multiplier: 1, notes: "sliced" },
        { food: "Peanut Butter", amount: 1, unit: "serving", multiplier: 1, notes: "added last" }
      ],

      directions: [
        { title: "Add yogurt", body: "Place Greek yogurt into a mixing bowl." },
        { title: "Add oats", body: "Stir oats into the yogurt until evenly combined." },
        { title: "Add fruit", body: "Slice banana over the top of the bowl." },
        { title: "Finish", body: "Add peanut butter last and lightly mix before eating." }
      ],

      mealPrep: [
        "Pre-portion oats into containers.",
        "Add yogurt the morning you plan to eat it.",
        "Add banana and peanut butter last so the texture stays fresh."
      ],

      storage: "Best eaten fresh. Can be refrigerated up to 24 hours.",
      reheating: "No reheating needed. Eat cold.",

      chefTips: [
        "Use thicker Greek yogurt for better texture.",
        "Let oats sit longer if you want an overnight-oats style bowl."
      ],

      mistakes: [
        "Do not add banana too early if storing overnight because it may brown.",
        "Do not overmix peanut butter or the bowl may become too thick."
      ],

      variations: [
        "Add cinnamon.",
        "Swap banana for blueberries.",
        "Use almond butter instead of peanut butter."
      ],

      substitutions: ["Blueberries", "Strawberries", "Apple"]
    }
  ],

  Lunch: [
    {
      id: 100,
      name: "Chicken Rice Bowl",
      category: "Lunch",
      cuisine: "American",
      difficulty: "Easy",
      prepTime: 10,
      cookTime: 20,
      totalTime: 30,
      servings: 1,
      estimatedCost: 4.85,
      cost: 4.85,
      image: "assets/recipe-images/chicken-rice-bowl.jpg",
      rating: 4.8,
      reviews: 124,

      macros: {
        calories: 520,
        protein: 46,
        carbs: 42,
        fat: 16,
        fiber: 5,
        sugar: 3,
        sodium: 520
      },

      tags: ["lunch", "high-protein", "meal-prep", "budget", "easy"],

      equipment: ["Skillet", "Saucepan or rice cooker", "Cutting board", "Knife", "Measuring cup", "Food scale"],

      ingredients: [
        { food: "Chicken Breast", amount: 1, unit: "serving", multiplier: 1, notes: "trimmed and seasoned" },
        { food: "White Rice", amount: 1, unit: "serving", multiplier: 1, notes: "cooked" },
        { food: "Broccoli", amount: 1, unit: "serving", multiplier: 1, notes: "steamed" },
        { food: "Avocado", amount: 1, unit: "serving", multiplier: 1, notes: "sliced" }
      ],

      directions: [
        { title: "Prepare the chicken", body: "Pat chicken breast dry with a paper towel. Season both sides with salt, pepper, garlic powder, and paprika." },
        { title: "Cook the chicken", body: "Heat a skillet over medium heat. Cook chicken until golden on both sides and fully cooked through." },
        { title: "Prepare the rice", body: "Cook rice according to package directions. Fluff with a fork when finished." },
        { title: "Steam the broccoli", body: "Steam broccoli until bright green and tender." },
        { title: "Assemble the bowl", body: "Place rice in the bowl first, add broccoli, top with sliced chicken, and finish with avocado." }
      ],

      mealPrep: [
        "Cook chicken and rice in bulk.",
        "Let hot food cool before sealing containers.",
        "Store avocado separately and add fresh when eating."
      ],

      storage: "Keeps 4 days refrigerated in an airtight container.",
      reheating: "Microwave rice, chicken, and broccoli for 1–2 minutes. Add avocado after heating.",

      chefTips: [
        "Let chicken rest for 5 minutes before slicing.",
        "Slice chicken against the grain for better texture.",
        "Add lemon juice to avocado to slow browning."
      ],

      mistakes: [
        "Do not overcook the chicken or it may become dry.",
        "Do not store avocado mixed into hot food.",
        "Do not seal hot food immediately because trapped steam can make meals soggy."
      ],

      variations: [
        "Mexican style: add salsa and lime.",
        "Asian style: add low-sodium soy sauce.",
        "High-protein style: add extra chicken."
      ],

      substitutions: ["Brown Rice", "Quinoa", "Sweet Potato"]
    }
  ],

  Snack: [
    {
      id: 200,
      name: "Greek Yogurt Snack",
      category: "Snack",
      cuisine: "American",
      difficulty: "Easy",
      prepTime: 3,
      cookTime: 0,
      totalTime: 3,
      servings: 1,
      estimatedCost: 2.5,
      cost: 2.5,
      image: "assets/recipe-images/greek-yogurt-snack.jpg",
      rating: 4.6,
      reviews: 71,

      macros: {
        calories: 280,
        protein: 24,
        carbs: 32,
        fat: 8,
        fiber: 4,
        sugar: 14,
        sodium: 90
      },

      tags: ["snack", "high-protein", "quick", "budget"],

      equipment: ["Small bowl", "Spoon"],

      ingredients: [
        { food: "Greek Yogurt", amount: 1, unit: "serving", multiplier: 1, notes: "cold" },
        { food: "Granola", amount: 1, unit: "serving", multiplier: 1, notes: "added last" },
        { food: "Blueberries", amount: 1, unit: "serving", multiplier: 1, notes: "fresh or frozen" },
        { food: "Almonds", amount: 1, unit: "serving", multiplier: 1, notes: "sprinkled on top" }
      ],

      directions: [
        { title: "Add yogurt", body: "Place Greek yogurt into a small bowl." },
        { title: "Add toppings", body: "Top with granola, blueberries, and almonds." },
        { title: "Serve", body: "Eat cold immediately for the best texture." }
      ],

      mealPrep: [
        "Keep granola separate until eating.",
        "Pre-portion yogurt and blueberries in small containers."
      ],

      storage: "Best eaten fresh. Can be refrigerated up to 24 hours.",
      reheating: "No reheating needed. Eat cold.",

      chefTips: [
        "Add granola last so it stays crunchy.",
        "Use frozen blueberries if fresh berries are expensive."
      ],

      mistakes: [
        "Do not mix granola in too early or it will soften.",
        "Do not overdo almonds if trying to keep fats lower."
      ],

      variations: [
        "Add cinnamon.",
        "Use strawberries instead of blueberries.",
        "Add honey if more carbs are needed."
      ],

      substitutions: ["Banana", "Apple", "Strawberries"]
    }
  ],

  Dinner: [
    {
      id: 300,
      name: "Salmon Sweet Potato Plate",
      category: "Dinner",
      cuisine: "American",
      difficulty: "Medium",
      prepTime: 10,
      cookTime: 25,
      totalTime: 35,
      servings: 1,
      estimatedCost: 6.5,
      cost: 6.5,
      image: "assets/recipe-images/salmon-sweet-potato-plate.jpg",
      rating: 4.9,
      reviews: 98,

      macros: {
        calories: 610,
        protein: 44,
        carbs: 48,
        fat: 24,
        fiber: 8,
        sugar: 9,
        sodium: 430
      },

      tags: ["dinner", "high-protein", "meal-prep"],

      equipment: ["Baking sheet", "Foil or parchment paper", "Knife", "Cutting board", "Small pot or steamer"],

      ingredients: [
        { food: "Salmon", amount: 1, unit: "serving", multiplier: 1, notes: "seasoned" },
        { food: "Sweet Potato", amount: 1, unit: "serving", multiplier: 1, notes: "cooked until soft" },
        { food: "Green Beans", amount: 1, unit: "serving", multiplier: 1, notes: "steamed" },
        { food: "Olive Oil", amount: 1, unit: "serving", multiplier: 1, notes: "drizzled over vegetables" }
      ],

      directions: [
        { title: "Season salmon", body: "Season salmon with salt, pepper, garlic, and lemon if available." },
        { title: "Cook salmon", body: "Bake or pan-sear salmon until cooked through and flaky." },
        { title: "Cook sweet potato", body: "Cook sweet potato until soft and easy to pierce with a fork." },
        { title: "Steam vegetables", body: "Steam green beans until tender." },
        { title: "Plate meal", body: "Plate salmon, sweet potato, and green beans. Drizzle olive oil over the vegetables or sweet potato." }
      ],

      mealPrep: [
        "Cook sweet potatoes ahead of time.",
        "Store salmon separately from vegetables for best texture.",
        "Reheat gently to avoid drying out the fish."
      ],

      storage: "Keeps 3 days refrigerated.",
      reheating: "Microwave gently for 60–90 seconds or reheat salmon in a covered pan on low heat.",

      chefTips: [
        "Do not overcook salmon.",
        "Let salmon rest for 2–3 minutes before eating.",
        "Add lemon juice after cooking for better flavor."
      ],

      mistakes: [
        "Avoid reheating salmon too long or it can dry out.",
        "Do not store salmon uncovered in the fridge.",
        "Do not over-steam green beans or they lose texture."
      ],

      variations: [
        "Use garlic butter seasoning.",
        "Swap green beans for broccoli.",
        "Use rice instead of sweet potato."
      ],

      substitutions: ["Chicken Breast", "Tuna", "Turkey Breast"]
    }
  ]
};