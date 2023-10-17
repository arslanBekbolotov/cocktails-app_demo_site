import express from 'express';
import {Cocktail} from '../models/Cocktail';
import auth, {IRequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
  try {
    const {unpublished, userUnpublished} = req.query;

    if (userUnpublished) {
      const cocktails = await Cocktail.find({user: userUnpublished, isPublished: false});
      return res.send(cocktails);
    }

    if (unpublished) {
      const cocktails = await Cocktail.find({isPublished: false});
      return res.send(cocktails);
    }

    const cocktails = await Cocktail.find();
    return res.send(cocktails);
  } catch (error) {
    next(error);
  }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;

    const cocktail = await Cocktail.findById(id);
    return res.send(cocktail);
  } catch (error) {
    next(error);
  }
});

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as IRequestWithUser).user;
    const {name, recipe, ingredients} = req.body;
    const parsedIngredients = JSON.parse(ingredients);

    const cocktail = await Cocktail.create({
      name,
      user: user._id,
      image: req.file && req.file.filename,
      recipe,
      ingredients: parsedIngredients,
    });

    return res.send(cocktail);
  } catch (error) {
    next(error);
  }
});

cocktailsRouter.put(
  '/:id',
  auth,
  permit('admin', 'creator'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const {name, recipe, ingredients} = req.body;
      const parsedIngredients = JSON.parse(ingredients);

      const cocktail = await Cocktail.findByIdAndUpdate(id, {
        name,
        recipe,
        image: req.file && req.file.filename,
        ingredients: parsedIngredients,
      });

      return res.send(cocktail);
    } catch (error) {
      next(error);
    }
  },
);

cocktailsRouter.patch('/:id', auth, async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = (req as IRequestWithUser).user;
    const cocktail = await Cocktail.findById(id);

    if (!cocktail) {
      return res.status(404).send({error: 'Cocktail not found'});
    }

    const userRatingIndex = cocktail.ratings.findIndex(
      (item) => item.user.toString() === user._id.toString(),
    );

    if (userRatingIndex !== -1) {
      cocktail.ratings[userRatingIndex].rating = req.body.rating;
    } else {
      cocktail.ratings.push({
        user: user._id as unknown as mongoose.ObjectId,
        rating: req.body.rating,
      });
    }

    await cocktail.save();

    return res.send({message: 'success'});
  } catch (error) {
    next(error);
  }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const {id} = req.params;
    await Cocktail.findByIdAndDelete(id);

    return res.send({message: 'success'});
  } catch (error) {
    next(error);
  }
});

export default cocktailsRouter;
