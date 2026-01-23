import { renderRecipe } from "./components/RecipeList.js";
import { saveRecipes, loadFromLocalStorage } from "./utils/Storage.js";
import { getRecipes } from "./services/RecipeService.js";
/* p27GfJIZYBJN6PFQgHZbvdoySmSglXOBwrPrzW6TIYC5DIn8OdjrykDM */
// --- DOM / VARIABLER ---
// --- RECIPE CONTAINER ---
const recipeContainer = document.querySelector("#main-content");
console.log("recipeContainer found:", recipeContainer);
// --- SEARCH INPUT ---
const searchInput = document.querySelector("#search-input");
// --- BUTTONS ---
const openBtn = document.querySelector("#open-modal-btn");
const closeBtn = document.querySelector("#close-modal-btn");
// --- FORM ELEMENTS ---
const dialog = document.getElementById("add-recipe-dialog");
const addForm = document.querySelector("#add-recipe-form");
const titleInput = document.querySelector("#title-input");
const timeInput = document.querySelector("#time-input");
const imageInput = document.querySelector("#image-input");
const ingredientsInput = document.querySelector("#ingredients-input");
const instructionsInput = document.querySelector("#instructions-input");
// --- INITIAL RENDERING OF RECIPES ---
const recipes = []; //namn??
//här burkar man visa tex spinner el liknande som visar att systemet jobbar/tänker
async function initApp() {
    console.log("Initierar app, hämtar data...");
    try {
        // Load from both sources and merge
        const storedRecipes = loadFromLocalStorage();
        const apiRecipes = await getRecipes();
        // merge: start with API recipes, then add/overwrite with stored recipes
        const mergedRecipes = [...apiRecipes];
        storedRecipes.forEach((storedRecipe) => {
            const exists = mergedRecipes.some((recipe) => recipe.id === storedRecipe.id);
            if (!exists) {
                mergedRecipes.push(storedRecipe);
            }
        });
        recipes.push(...mergedRecipes);
        console.log("Loaded recipes from both API and localStorage:", recipes.length);
        renderRecipe("main-content", recipes);
    }
    catch (error) {
        console.log("Fel", error);
    }
}
//event Delegation for activating recipe cards (cosmetic only)
if (recipeContainer) {
    recipeContainer.addEventListener("click", (e) => {
        const target = e.target;
        //find closest recipe item
        const recipeItem = target.closest(".recipe-item");
        if (recipeItem) {
            const idStr = recipeItem.dataset.id;
            if (idStr) {
                const id = Number(idStr);
                const currentActive = document.querySelector(".recipe-item.active");
                if (currentActive) {
                    currentActive.classList.remove("active");
                }
                recipeItem.classList.add("active");
                console.log(id);
            }
        }
        else {
            // Click was outside any recipe item (OBS only works inside recipeContainer) - remove active class
            const currentActive = document.querySelector(".recipe-item.active");
            if (currentActive) {
                currentActive.classList.remove("active");
            }
        }
    });
}
// --- DIALOG FUNCTIONALITY ---
openBtn.addEventListener("click", () => {
    dialog?.showModal();
});
closeBtn.addEventListener("click", () => {
    dialog?.close();
});
// --- ADD RECIPE FORM FUNCTIONALITY ---
addForm.addEventListener("submit", (e) => {
    console.log("SUBMIT TRIGGERED");
    e.preventDefault();
    const title = titleInput.value;
    const image = imageInput.value;
    const ingredientsRaw = ingredientsInput.value;
    const timeStr = timeInput.value;
    const instructions = instructionsInput.value;
    const [hrStr, minStr] = timeStr.split(":");
    const hours = Number(hrStr);
    const minutes = Number(minStr);
    if (isNaN(hours) || isNaN(minutes)) {
        timeInput.classList.add("input-error");
        alert("Please enter a valid time in HH:MM format.");
        return;
    }
    timeInput.classList.remove("input-error");
    const totalMins = hours * 60 + minutes;
    const newRecipe = {
        id: Date.now(),
        title: title,
        time: totalMins,
        image: image,
        ingredients: ingredientsRaw.split(",").map((item) => {
            const parts = item.split(" - ");
            return {
                name: parts[0]?.trim() || "",
                amount: parts[1]?.trim() || "",
            };
        }),
        instructions: instructions.split(",").map((step) => {
            return {
                steps: step.trim(),
            };
        }),
    };
    console.log("New recipe created:", newRecipe);
    recipes.push(newRecipe);
    saveRecipes(recipes);
    renderRecipe("main-content", recipes);
    console.log("Recipes array after push:", recipes);
    console.log("About to render new recipe");
    console.log(recipes);
    addForm.reset();
    dialog?.close();
});
// --- SEARCH FUNCTIONALITY ---
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const target = e.target;
        const searchTerm = target.value.toLowerCase();
        console.log("Search term:", searchTerm);
        const allCards = document.querySelectorAll(".recipe-item");
        console.log("Found recipe cards:", allCards.length);
        allCards.forEach((recipeItem) => {
            const title = recipeItem.querySelector("h3")?.textContent?.toLowerCase();
            console.log("Card title:", title);
            if (title?.includes(searchTerm)) {
                console.log("MATCH:", title, "includes", searchTerm);
                recipeItem.classList.remove("hidden");
            }
            else {
                console.log("NO MATCH:", title, "does not include", searchTerm);
                recipeItem.classList.add("hidden");
            }
        });
    });
}
else {
    console.log("Search input not found!");
}
initApp();
