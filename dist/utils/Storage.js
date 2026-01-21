const STORAGE_KEY = "myRecipes";
export const saveRecipes = (recipes) => {
    const json = JSON.stringify(recipes);
    localStorage.setItem(STORAGE_KEY, json);
};
export const loadFromLocalStorage = () => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData)
        return [];
    return JSON.parse(storedData);
};
/* const saveToLocalStorage = () => {
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
}; */ 
