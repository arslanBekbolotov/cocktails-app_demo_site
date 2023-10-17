import mongoose, {HydratedDocument, Schema} from 'mongoose';
import {User} from './User';
import {ICocktail} from '../types';
import {IngredientSchema} from './Ingredient';
import {RatingSchema} from './Rating';

const CocktailSchema = new Schema<ICocktail>({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<ICocktail>, value: string) {
        if (!this.isModified('name')) return true;
        const cocktail = await Cocktail.findOne({name: value});
        if (cocktail) return false;
      },
      message: 'This name is already taken',
    },
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
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  ingredients: {
    type: [IngredientSchema],
    required: true,
  },
  ratings: [RatingSchema],
});

export const Cocktail = mongoose.model('Cocktail', CocktailSchema);
