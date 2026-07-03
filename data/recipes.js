const RECIPES = {

Breakfast: [

{
id:1,
name:"Power Oat Bowl",
category:"Breakfast",
difficulty:"Easy",
prepTime:5,
cookTime:0,
cost:3.25,

ingredients:[
{food:"Greek Yogurt",multiplier:1},
{food:"Oats",multiplier:1},
{food:"Banana",multiplier:1},
{food:"Peanut Butter",multiplier:1}
],

directions:[
"Place Greek yogurt into a bowl.",
"Add oats.",
"Slice banana.",
"Top with peanut butter.",
"Mix and serve."
],

storage:"24 hours refrigerated.",

substitutions:[
"Blueberries",
"Strawberries",
"Apple"
]

},

{
id:2,
name:"Egg & Oats Breakfast",
category:"Breakfast",
difficulty:"Easy",
prepTime:5,
cookTime:8,
cost:3.75,

ingredients:[
{food:"Eggs",multiplier:1},
{food:"Oats",multiplier:1},
{food:"Blueberries",multiplier:1},
{food:"Avocado",multiplier:1}
],

directions:[
"Cook eggs.",
"Prepare oats.",
"Slice avocado.",
"Top oats with blueberries.",
"Serve."
],

storage:"2 days refrigerated.",

substitutions:[
"Greek Yogurt",
"Almonds"
]

}

],

Lunch:[

{
id:100,

name:"Chicken Rice Bowl",

category:"Lunch",

difficulty:"Easy",

prepTime:10,

cookTime:20,

cost:4.50,

ingredients:[

{food:"Chicken Breast",multiplier:1},

{food:"White Rice",multiplier:1},

{food:"Broccoli",multiplier:1},

{food:"Avocado",multiplier:1}

],

directions:[

"Season chicken.",

"Cook chicken until done.",

"Cook rice.",

"Steam broccoli.",

"Slice avocado.",

"Assemble bowl."

],

storage:"4 days refrigerated.",

substitutions:[
"Brown Rice",
"Quinoa",
"Sweet Potato"
]

}

],

Snack:[

{
id:200,

name:"Greek Yogurt Snack",

category:"Snack",

difficulty:"Easy",

prepTime:3,

cookTime:0,

cost:2.50,

ingredients:[

{food:"Greek Yogurt",multiplier:1},

{food:"Granola",multiplier:1},

{food:"Blueberries",multiplier:1},

{food:"Almonds",multiplier:1}

],

directions:[

"Add yogurt.",

"Top with granola.",

"Add berries.",

"Sprinkle almonds."

],

storage:"Eat fresh.",

substitutions:[
"Banana",
"Apple"
]

}

],

Dinner:[

{
id:300,

name:"Salmon Sweet Potato Plate",

category:"Dinner",

difficulty:"Medium",

prepTime:10,

cookTime:25,

cost:6.50,

ingredients:[

{food:"Salmon",multiplier:1},

{food:"Sweet Potato",multiplier:1},

{food:"Green Beans",multiplier:1},

{food:"Olive Oil",multiplier:1}

],

directions:[

"Season salmon.",

"Bake salmon.",

"Cook sweet potato.",

"Steam green beans.",

"Plate together."

],

storage:"3 days refrigerated.",

substitutions:[
"Chicken",
"Tuna",
"Turkey"
]

}

]

};