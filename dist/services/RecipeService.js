const recipes = [
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
// "kopia" av receptlistan ("encapsulation")
/* export const getRecipes = (): Recipe[] => {
  return [...recipes];
}; */
export const getRecipes = async () => {
    const response = await fetch("/src/data/recipes.json");
    //ger svar i form av en bekräftelse - lyckades fetch eller inte
    if (!response.ok) {
        throw new Error(`HTTP ERROR: ${response.status}`);
    }
    //ber om innehållet
    const data = await response.json();
    return data;
};
//skapa tex en recipe.json som "api"
//gör om initiering för att vara async
