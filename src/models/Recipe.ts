export interface Recipe {
  id: number;
  title: string;
  time: number;
  image: string;
  ingredients: Ingredients[];
  instructions: Instructions[];
}

export interface Ingredients {
  name: string;
  amount: string;
}

export interface Instructions {
  steps: string;
}