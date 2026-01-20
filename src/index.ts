interface Recipe {
  id: number;
  title: string;
  time: number;
  image: string;
  ingredients: Ingredients[];
}

interface Ingredients {
  name: string;
  amount: string;
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: "Köttbullar",
    time: 10,
    image: "https://placehold.co/600x400",
    ingredients: [
      { name: "Mjöl", amount: "2 dl" },
      { name: "Mjölk", amount: "3 dl" },
      { name: "Ägg", amount: "2 st" },
      { name: "Salt", amount: "1 krm" },
    ],
  },
  {
    id: 2,
    title: "Korvstroganoff",
    time: 15,
    image: "https://placehold.co/600x400",
    ingredients: [
      { name: "Mjöl", amount: "2 dl" },
      { name: "Mjölk", amount: "3 dl" },
      { name: "Ägg", amount: "2 st" },
      { name: "Salt", amount: "1 krm" },
    ],
  },
  {
    id: 3,
    title: "Fiskgratäng",
    time: 20,
    image: "https://placehold.co/600x400",
    ingredients: [
      { name: "Mjöl", amount: "2 dl" },
      { name: "Mjölk", amount: "3 dl" },
      { name: "Ägg", amount: "2 st" },
      { name: "Salt", amount: "1 krm" },
    ],
  },
  {
    id: 4,
    title: "Pannacotta",
    time: 25,
    image: "https://placehold.co/600x400",
    ingredients: [
      { name: "Mjöl", amount: "2 dl" },
      { name: "Mjölk", amount: "3 dl" },
      { name: "Ägg", amount: "2 st" },
      { name: "Salt", amount: "1 krm" },
    ],
  },
];

//DOM / VARIABLER
const recipeContainer = document.getElementById("main-content") as HTMLElement;
console.log("recipeContainer found:", recipeContainer);

const asideContainer = document.getElementById("aside-container");
const recipeTitle = document.getElementById("skin-title");
const recipeImage = document.getElementById("skin-image") as HTMLImageElement;
const recipeTime = document.getElementById("skin-price");
const recipeIngredients = document.getElementById("skin-ingredients");

const searchInput = document.querySelector("#search-input") as HTMLInputElement;

const dialog = document.getElementById(
  "add-recipe-dialog",
) as HTMLDialogElement;

const openBtn = document.querySelector("#open-modal-btn") as HTMLButtonElement;
const closeBtn = document.querySelector(
  "#close-modal-btn",
) as HTMLButtonElement;
const saveBtn = document.querySelector("#save-recipe-btn") as HTMLButtonElement;

const addForm = document.querySelector("#add-recipe-form") as HTMLFormElement;
const titleInput = document.querySelector("#title-input") as HTMLInputElement;
const timeInput = document.querySelector("#time-input") as HTMLInputElement;
const imageInput = document.querySelector("#image-input") as HTMLInputElement;
const ingredientsInput = document.querySelector(
  "#ingredients-input",
) as HTMLInputElement;

// --- FUNKTIONALITET - RENDER RECIPES ---

function renderRecipe() {
  if (recipeContainer) {
    recipeContainer.replaceChildren();
  }

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

    if (recipeContainer) {
      recipeContainer.append(recipeElement);
    }
  });
}

//LOCAL STORAGE FUNCTIONALITY
const saveToLocalStorage = () => {
  const jsonString = JSON.stringify(recipes);
  localStorage.setItem("allMyRecipes", jsonString);

  console.log("JSON", jsonString);
};

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem("allMyRecipes");

  if (storedData) {
    const parsedData: Recipe[] = JSON.parse(storedData) as Recipe[];

    //Töm listan och fyll på med det som finns i localStorage
    recipes.length = 0;
    recipes.push(...parsedData);
    console.log("Loaded recipes from localStorage:", recipes);
  }
};

renderRecipe();
console.log("Initial recipes rendered");

//Event Delegation for activating recipe cards
if (recipeContainer) {
  recipeContainer.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    //find closest recipe item
    const recipeItem = target.closest(".recipe-item") as HTMLElement;

    //doesnt work
    if (!recipeItem) return;

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
  });
}

openBtn.addEventListener("click", () => {
  dialog?.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog?.close();
});

//LÄGG TILL RECEPT

addForm.addEventListener("submit", (e) => {
  console.log("SUBMIT TRIGGERED");
  e.preventDefault();
  const title = titleInput.value;
  const image = imageInput.value;
  const ingredientsRaw = ingredientsInput.value;
  const timeStr = timeInput.value;

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

  const newRecipe: Recipe = {
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
  };
  console.log("New recipe created:", newRecipe);

  recipes.push(newRecipe);

  saveToLocalStorage();
  renderRecipe();

  console.log("Recipes array after push:", recipes);
  console.log("About to render new recipe");

  console.log(recipes);
  addForm.reset();
  dialog?.close();
});

// SEARCH FUNCTIONALITY

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
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
      } else {
        console.log("NO MATCH:", title, "does not include", searchTerm);
        recipeItem.classList.add("hidden");
      }
    });
  });
} else {
  console.log("Search input not found!");
}

loadFromLocalStorage();
renderRecipe();
