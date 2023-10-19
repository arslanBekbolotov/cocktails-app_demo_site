import express from 'express';
import {Cocktail} from '../models/Cocktail';
import auth, {IRequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import {imagesUpload} from '../multer';
import mongoose, {Error} from 'mongoose';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
    try {
        const {page = 1, userUnpublished, all} = req.query;
        const limit = 4;

        const count = await Cocktail.find({isPublished: true}).count();
        const result = {
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        }

        if (userUnpublished) {
            const cocktails = await Cocktail.find({
                user: userUnpublished,
                isPublished: false
            }).skip((+page - 1) * limit).limit(limit);
            return res.send({...result, cocktails});
        }

        if (all) {
            const cocktails = await Cocktail.find();
            return res.send(cocktails);
        }

        const cocktails = await Cocktail.find({isPublished: true}).skip((+page - 1) * limit).limit(limit);
        return res.send({...result, cocktails});
    } catch (error) {
        next(error);
    }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const cocktail = await Cocktail.findById(id);

        if (!cocktail) {
            return res.status(404).send({error: 'not found'});
        }

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
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }

        next(error);
    }
});

cocktailsRouter.put(
    '/:id',
    auth,
    permit('admin'),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const {name, recipe, ingredients} = req.body;
            const parsedIngredients = JSON.parse(ingredients);

            const cocktail = await Cocktail.findByIdAndUpdate(id, {
                name,
                recipe,
                ingredients: parsedIngredients,
            });

            return res.send(cocktail);
        } catch (error) {
            if (error instanceof Error.ValidationError) {
                return res.status(400).send(error);
            }

            next(error);
        }
    },
);

cocktailsRouter.patch('/:id/rate', auth, async (req, res, next) => {
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

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const {id} = req.params;
        const cocktail = await Cocktail.findById(id);

        if (!cocktail) {
            return res.status(404).send({error: 'Cocktail not found'});
        }

        await Cocktail.findByIdAndUpdate(id, {isPublished: !cocktail.isPublished});

        return res.send({message: 'success'});
    } catch (error) {
        next(error);
    }
})

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
