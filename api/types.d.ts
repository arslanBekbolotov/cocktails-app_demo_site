import mongoose, {Schema} from 'mongoose';

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
  _id?: mongoose.ObjectId;
  rating: number;
  user: Schema.Types.ObjectId;
}

export interface IIngredient {
  name: string;
  amount?: string;
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
