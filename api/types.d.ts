import {Schema} from 'mongoose';

export interface IUser {
  username: string;
  displayName: string;
  avatar?: string;
  role: string;
  password: string;
  token: string;
  googleID?: string;
}

export interface IRating {
  rating: number;
  user: Schema.Types.ObjectId;
}

export interface IIngredient {
  name: string;
  amount: string;
}

export interface ICocktail {
  name: string;
  user: Schema.Types.ObjectId;
  image: string;
  recipe: string;
  isPublished?: boolean;
  ingredients: IIngredient[];
  ratings: IRating[];
}
