import {Schema} from 'mongoose';
import {IIngredient} from '../types';

export const IngredientSchema = new Schema<IIngredient>({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});
