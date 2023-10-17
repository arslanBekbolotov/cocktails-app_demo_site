import mongoose, {Schema} from 'mongoose';
import {User} from './User';
import {Ingredient} from './Ingredient';
import {ICocktail} from '../types';
import {Rating} from './Rating';

const CocktailSchema = new Schema<ICocktail>({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Schema.Types.ObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  isPublished: Boolean,
  ingredients: [Ingredient],
  ratings: [Rating],
});

export const Cocktail = mongoose.model('Cocktail', CocktailSchema);
