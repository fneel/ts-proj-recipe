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
export const getRecipes = () => {
    return [...recipes];
};
