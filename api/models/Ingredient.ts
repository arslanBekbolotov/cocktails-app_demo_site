import mongoose, {Schema} from 'mongoose';
import {IIngredient} from '../types';

const IngredientSchema = new Schema<IIngredient>({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

export const Ingredient = mongoose.model('Ingredient', IngredientSchema);
