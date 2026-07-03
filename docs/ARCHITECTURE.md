# MacroMate Architecture

## Overview

MacroMate is currently a static web application built with HTML, CSS, and JavaScript.

The app runs entirely in the browser and stores saved meals using LocalStorage.

## Core Files

### `index.html`

Provides the structure of the app, including:

- Goal form
- Macro target display
- Meal logger
- Meal generator
- Saved meal plan
- Grocery list display

### `css/style.css`

Controls the visual design of the app.

### `data/foods.js`

Contains the food database.

### `data/recipes.js`

Contains recipe definitions.

### `data/groceryCategories.js`

Maps food categories to grocery list sections.

### `js/macroCalculator.js`

Handles macro calculations.

### `js/mealPlanner.js`

Generates meals from recipes and target macros.

### `js/grocery.js`

Builds a grocery list from saved meals.

### `js/app.js`

Main UI controller.

## Storage

Current storage method:

```txt
localStorage
```

Future storage method:

```txt
Firebase Authentication + Firestore
```

## Future Architecture

```txt
js/
├── app.js
├── storage.js
├── auth.js
├── dashboard.js
├── mealPlanner.js
├── grocery.js
├── pantry.js
├── shopping.js
├── progress.js
└── ui.js
```
