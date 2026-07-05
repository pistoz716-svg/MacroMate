/*
=========================================
MacroMate
Favorites Engine
Version: 2.0
=========================================
*/

const FAVORITES_KEY = "macroMateFavorites";

/*
=========================================
Load Favorites
=========================================
*/

function loadFavorites() {
    const saved = localStorage.getItem(FAVORITES_KEY);

    if (!saved) return [];

    try {
        return JSON.parse(saved);
    } catch (error) {
        console.error("Unable to load favorites.", error);
        return [];
    }
}

/*
=========================================
Save Favorites
=========================================
*/

function saveFavorites(favorites) {
    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );
}

/*
=========================================
Check Favorite
=========================================
*/

function isFavorite(recipeId) {
    const favorites = loadFavorites();

    return favorites.some(recipe => recipe.id === recipeId);
}

/*
=========================================
Add Favorite
=========================================
*/

function addFavorite(recipe) {

    let favorites = loadFavorites();

    if (favorites.some(item => item.id === recipe.id))
        return;

    favorites.push(recipe);

    saveFavorites(favorites);

    renderFavoriteRecipes();
}

/*
=========================================
Remove Favorite
=========================================
*/

function removeFavorite(recipeId) {

    let favorites = loadFavorites();

    favorites = favorites.filter(
        recipe => recipe.id !== recipeId
    );

    saveFavorites(favorites);

    renderFavoriteRecipes();
}

/*
=========================================
Toggle Favorite
=========================================
*/

function toggleFavorite(recipe) {

    if (isFavorite(recipe.id)) {

        removeFavorite(recipe.id);

    } else {

        addFavorite(recipe);

    }

}

/*
=========================================
Render Favorites
=========================================
*/

function renderFavoriteRecipes() {

    const container =
        document.getElementById("favoriteRecipes");

    if (!container)
        return;

    const favorites = loadFavorites();

    if (favorites.length === 0) {

        container.innerHTML = `
            <div class="empty-state">

                <h3>No Favorite Recipes Yet</h3>

                <p>
                    Tap the ❤ icon on any recipe to
                    save it here for quick access.
                </p>

            </div>
        `;

        return;
    }

    container.innerHTML = favorites.map(recipe => `

        <div class="favorite-card">

            <div>

                <h3>${recipe.name}</h3>

                <small>

                    ${recipe.category}

                    •

                    ${recipe.difficulty}

                    •

                    ${recipe.prepTime} min

                </small>

            </div>

            <button
                class="secondary-btn"
                onclick="removeFavorite(${recipe.id})">

                Remove

            </button>

        </div>

    `).join("");

}

/*
=========================================
Export Favorites
=========================================
*/

function exportFavorites() {

    const favorites = loadFavorites();

    const blob = new Blob(
        [JSON.stringify(favorites, null, 2)],
        {
            type: "application/json"
        }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "MacroMate_Favorites.json";

    link.click();
}

/*
=========================================
Import Favorites
=========================================
*/

function importFavorites(file) {

    const reader = new FileReader();

    reader.onload = function(event) {

        try {

            const favorites =
                JSON.parse(event.target.result);

            saveFavorites(favorites);

            renderFavoriteRecipes();

            alert("Favorites imported.");

        } catch {

            alert("Invalid favorites file.");

        }

    };

    reader.readAsText(file);

}

/*
=========================================
Initialize
=========================================
*/

document.addEventListener(
    "DOMContentLoaded",
    renderFavoriteRecipes
);