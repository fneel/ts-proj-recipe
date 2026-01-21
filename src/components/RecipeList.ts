import type { Recipe, Ingredients } from "../models/Recipe.js";

export const renderRecipe = (containerId: string, recipes: Recipe[]) => {

    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.replaceChildren(); // Clear existing content  

  recipes.forEach(({ id, title, image, time, ingredients }) => {
    const recipeElement = document.createElement("article");
    recipeElement.classList.add("recipe-item");
    recipeElement.dataset.id = String(id);

    const img = document.createElement("img");
    img.src = image;
    img.alt = title;

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    const timeElement = document.createElement("p");
    timeElement.textContent = `${time} minuter`;

    const ul = document.createElement("ul");

    ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = `${ingredient.name} - ${ingredient.amount}`;
      ul.appendChild(li);
    });

    recipeElement.append(img, titleElement, timeElement, ul);
    console.log("Appending recipe to DOM:", title);

    if (container) {
      container.append(recipeElement);
    }
  });
}