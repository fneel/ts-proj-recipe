export const renderRecipe = (containerId, recipes) => {
    const container = document.getElementById(containerId);
    if (!container)
        return;
    container.replaceChildren(); // to clear existing content  
    recipes.forEach(({ id, title, image, time, ingredients, instructions }) => {
        const recipeElement = document.createElement("article");
        recipeElement.classList.add("recipe-item");
        recipeElement.dataset.id = String(id);
        const img = document.createElement("img");
        img.src = image;
        img.alt = title;
        const titleElement = document.createElement("h3");
        titleElement.textContent = title;
        const timeElement = document.createElement("p");
        timeElement.textContent = `${time} min`;
        timeElement.classList.add("recipe-time");
        const ul = document.createElement("ul");
        ul.textContent = "Ingredienser:";
        ul.classList.add("ingredient-list");
        ingredients.forEach((ingredient) => {
            const li = document.createElement("li");
            li.textContent = `${ingredient.name} - ${ingredient.amount}`;
            ul.appendChild(li);
        });
        const instructionsUl = document.createElement("ul");
        instructionsUl.textContent = "Instruktioner:";
        instructionsUl.classList.add("instructions-list");
        if (instructions && instructions.length > 0) {
            instructions.forEach((instruction) => {
                const li = document.createElement("li");
                li.textContent = `- ${instruction.steps}`;
                instructionsUl.appendChild(li);
            });
        }
        recipeElement.append(img, titleElement, timeElement, ul, instructionsUl);
        console.log("Appending recipe to DOM:", title);
        if (container) {
            container.append(recipeElement);
        }
    });
};
