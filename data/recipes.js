const RECIPES = {
  Breakfast: [
    {
      id: 1,
      name: "Power Oat Bowl",
      category: "Breakfast",
      difficulty: "Easy",
      prepTime: 5,
      cookTime: 0,
      cost: 3.25,
      equipment: ["Mixing bowl", "Spoon", "Measuring cup"],
      ingredients: [
        { food: "Greek Yogurt", multiplier: 1 },
        { food: "Oats", multiplier: 1 },
        { food: "Banana", multiplier: 1 },
        { food: "Peanut Butter", multiplier: 1 }
      ],
      directions: [
        "Add Greek yogurt to a bowl.",
        "Stir in oats until evenly mixed.",
        "Slice banana over the top.",
        "Add peanut butter last.",
        "Mix lightly and eat cold, or let sit for 10 minutes for softer oats."
      ],
      mealPrep: [
        "Pre-portion oats into containers.",
        "Add yogurt the morning you plan to eat it.",
        "Add banana and peanut butter last so the texture stays fresh."
      ],
      reheating: "No reheating needed. Eat cold.",
      storage: "Best eaten fresh. Can be refrigerated up to 24 hours.",
      chefTips: [
        "Use thicker Greek yogurt for better texture.",
        "Let oats sit longer if you want an overnight-oats style bowl."
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
      difficulty: "Easy",
      prepTime: 10,
      cookTime: 20,
      cost: 4.5,
      equipment: ["Skillet", "Saucepan or rice cooker", "Cutting board", "Knife", "Measuring cup"],
      ingredients: [
        { food: "Chicken Breast", multiplier: 1 },
        { food: "White Rice", multiplier: 1 },
        { food: "Broccoli", multiplier: 1 },
        { food: "Avocado", multiplier: 1 }
      ],
      directions: [
        "Pat chicken breast dry with a paper towel.",
        "Season chicken with salt, pepper, garlic powder, and paprika.",
        "Cook chicken in a skillet over medium heat until fully cooked.",
        "Cook rice according to package directions.",
        "Steam broccoli until tender.",
        "Slice avocado.",
        "Add rice to a bowl, then top with chicken, broccoli, and avocado."
      ],
      mealPrep: [
        "Cook chicken and rice in bulk.",
        "Let hot food cool before sealing containers.",
        "Store avocado separately and add fresh when eating."
      ],
      reheating: "Microwave rice, chicken, and broccoli for 1–2 minutes. Add avocado after heating.",
      storage: "Keeps 4 days refrigerated in an airtight container.",
      chefTips: [
        "Let chicken rest for 5 minutes before slicing.",
        "Slice chicken against the grain for better texture.",
        "Add lemon juice to avocado to slow browning."
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
      difficulty: "Easy",
      prepTime: 3,
      cookTime: 0,
      cost: 2.5,
      equipment: ["Small bowl", "Spoon"],
      ingredients: [
        { food: "Greek Yogurt", multiplier: 1 },
        { food: "Granola", multiplier: 1 },
        { food: "Blueberries", multiplier: 1 },
        { food: "Almonds", multiplier: 1 }
      ],
      directions: [
        "Add Greek yogurt to a bowl.",
        "Top with granola.",
        "Add blueberries.",
        "Sprinkle almonds on top.",
        "Eat cold."
      ],
      mealPrep: [
        "Keep granola separate until eating.",
        "Pre-portion yogurt and blueberries in small containers."
      ],
      reheating: "No reheating needed. Eat cold.",
      storage: "Best eaten fresh. Can be refrigerated up to 24 hours.",
      chefTips: [
        "Add granola last so it stays crunchy.",
        "Use frozen blueberries if fresh berries are expensive."
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
      difficulty: "Medium",
      prepTime: 10,
      cookTime: 25,
      cost: 6.5,
      equipment: ["Baking sheet", "Foil or parchment paper", "Knife", "Cutting board", "Small pot or steamer"],
      ingredients: [
        { food: "Salmon", multiplier: 1 },
        { food: "Sweet Potato", multiplier: 1 },
        { food: "Green Beans", multiplier: 1 },
        { food: "Olive Oil", multiplier: 1 }
      ],
      directions: [
        "Season salmon with salt, pepper, garlic, and lemon if available.",
        "Bake or pan-sear salmon until cooked through.",
        "Cook sweet potato until soft.",
        "Steam green beans until tender.",
        "Drizzle olive oil over the vegetables or sweet potato.",
        "Plate and serve warm."
      ],
      mealPrep: [
        "Cook sweet potatoes ahead of time.",
        "Store salmon separately from vegetables for best texture.",
        "Reheat gently to avoid drying out the fish."
      ],
      reheating: "Microwave gently for 60–90 seconds or reheat salmon in a covered pan on low heat.",
      storage: "Keeps 3 days refrigerated.",
      chefTips: [
        "Do not overcook salmon.",
        "Let salmon rest for 2–3 minutes before eating.",
        "Add lemon juice after cooking for better flavor."
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