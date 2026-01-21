export interface Recipe {
  id: number;
  title: string;
  time: number;
  image: string;
  ingredients: Ingredients[];
}

export interface Ingredients {
  name: string;
  amount: string;
}
