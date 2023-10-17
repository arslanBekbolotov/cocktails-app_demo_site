import mongoose, {Schema} from 'mongoose';
import {User} from './User';
import {IRating} from '../types';

const RatingSchema = new Schema<IRating>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Schema.Types.ObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
  rating: {
    type: Number,
    min: [1, 'Minimal value is 1'],
    max: 5,
    required: true,
  },
});

export const Rating = mongoose.model('Rating', RatingSchema);
