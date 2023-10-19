import mongoose from 'mongoose';
import config from './config';
import {User} from './models/User';
import {randomUUID} from 'crypto';
import {Cocktail} from './models/Cocktail';

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('cocktails');
    } catch (error) {
        console.log('Collection were not present, skipping drop...');
    }

    const [user_1, user_2] = await User.create(
        {
            username: 'user',
            password: '123',
            displayName: 'John Doe',
            token: randomUUID(),
            role: 'user',
        },
        {
            username: 'admin',
            password: '123',
            displayName: 'Will Smith',
            token: randomUUID(),
            role: 'admin',
        },
    );

    await Cocktail.create(
        {
            name: 'Mojito',
            image: 'fixtures/mojito.png',
            user: user_1._id,
            isPublished: true,
            recipe:
                "Mojito is a refreshing cocktail with mint. You'll need fresh mint leaves, 1-2 lime wedges, 1 teaspoon of sugar, and 50 ml of light rum. Muddle the mint and lime in a glass, add sugar and rum. Fill the glass with ice and stir.",
            ingredients: [
                {name: 'Fresh mint leaves'},
                {name: 'Lime wedges', amount: '1-2'},
                {name: 'Light rum', amount: '50 ml'},
                {name: 'Sugar', amount: '1 tsp'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Daiquiri',
            image: 'fixtures/daiquiri.png',
            user: user_1._id,
            isPublished: true,
            recipe:
                "Daiquiri is a rum and lime juice-based cocktail. You'll need 50 ml light rum, 25 ml freshly squeezed lime juice, 1 teaspoon of sugar, and ice. Mix rum, lime juice, and sugar in a shaker with ice. Shake well and strain into a cocktail glass.",
            ingredients: [
                {name: 'Lime juice', amount: '25 ml'},
                {name: 'Sugar', amount: '1 tsp'},
                {name: 'Light rum', amount: '50 ml'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Piña Colada',
            image: 'fixtures/pino-colada.png',
            user: user_2._id,
            isPublished: true,
            recipe:
                ' In a blender, combine white rum, coconut cream, pineapple juice, and a handful of ice. Blend until smooth.Pour into a glass and garnish with a pineapple slice and maraschino cherry.',
            ingredients: [
                {name: 'White rum', amount: '50 ml'},
                {name: 'Coconut cream', amount: '50 ml'},
                {name: 'Pineapple juice', amount: '100 ml'},
                {name: 'Pineapple slice and maraschino cherry'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Piña Colada 2',
            image: 'fixtures/pino-colada.png',
            user: user_1._id,
            recipe:
                ' In a blender, combine white rum, coconut cream, pineapple juice, and a handful of ice. Blend until smooth.Pour into a glass and garnish with a pineapple slice and maraschino cherry.',
            ingredients: [
                {name: 'White rum', amount: '50 ml'},
                {name: 'Coconut cream', amount: '50 ml'},
                {name: 'Pineapple juice', amount: '100 ml'},
                {name: 'Pineapple slice and maraschino cherry'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Mojito',
            image: 'fixtures/mojito.png',
            user: user_1._id,
            isPublished: true,
            recipe:
                "Mojito is a refreshing cocktail with mint. You'll need fresh mint leaves, 1-2 lime wedges, 1 teaspoon of sugar, and 50 ml of light rum. Muddle the mint and lime in a glass, add sugar and rum. Fill the glass with ice and stir.",
            ingredients: [
                {name: 'Fresh mint leaves'},
                {name: 'Lime wedges', amount: '1-2'},
                {name: 'Light rum', amount: '50 ml'},
                {name: 'Sugar', amount: '1 tsp'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Daiquiri',
            image: 'fixtures/daiquiri.png',
            user: user_1._id,
            isPublished: true,
            recipe:
                "Daiquiri is a rum and lime juice-based cocktail. You'll need 50 ml light rum, 25 ml freshly squeezed lime juice, 1 teaspoon of sugar, and ice. Mix rum, lime juice, and sugar in a shaker with ice. Shake well and strain into a cocktail glass.",
            ingredients: [
                {name: 'Lime juice', amount: '25 ml'},
                {name: 'Sugar', amount: '1 tsp'},
                {name: 'Light rum', amount: '50 ml'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Piña Colada',
            image: 'fixtures/pino-colada.png',
            user: user_2._id,
            isPublished: true,
            recipe:
                ' In a blender, combine white rum, coconut cream, pineapple juice, and a handful of ice. Blend until smooth.Pour into a glass and garnish with a pineapple slice and maraschino cherry.',
            ingredients: [
                {name: 'White rum', amount: '50 ml'},
                {name: 'Coconut cream', amount: '50 ml'},
                {name: 'Pineapple juice', amount: '100 ml'},
                {name: 'Pineapple slice and maraschino cherry'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Piña Colada 2',
            image: 'fixtures/pino-colada.png',
            user: user_1._id,
            recipe:
                ' In a blender, combine white rum, coconut cream, pineapple juice, and a handful of ice. Blend until smooth.Pour into a glass and garnish with a pineapple slice and maraschino cherry.',
            ingredients: [
                {name: 'White rum', amount: '50 ml'},
                {name: 'Coconut cream', amount: '50 ml'},
                {name: 'Pineapple juice', amount: '100 ml'},
                {name: 'Pineapple slice and maraschino cherry'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Mojito',
            image: 'fixtures/mojito.png',
            user: user_1._id,
            isPublished: true,
            recipe:
                "Mojito is a refreshing cocktail with mint. You'll need fresh mint leaves, 1-2 lime wedges, 1 teaspoon of sugar, and 50 ml of light rum. Muddle the mint and lime in a glass, add sugar and rum. Fill the glass with ice and stir.",
            ingredients: [
                {name: 'Fresh mint leaves'},
                {name: 'Lime wedges', amount: '1-2'},
                {name: 'Light rum', amount: '50 ml'},
                {name: 'Sugar', amount: '1 tsp'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Daiquiri',
            image: 'fixtures/daiquiri.png',
            user: user_1._id,
            isPublished: true,
            recipe:
                "Daiquiri is a rum and lime juice-based cocktail. You'll need 50 ml light rum, 25 ml freshly squeezed lime juice, 1 teaspoon of sugar, and ice. Mix rum, lime juice, and sugar in a shaker with ice. Shake well and strain into a cocktail glass.",
            ingredients: [
                {name: 'Lime juice', amount: '25 ml'},
                {name: 'Sugar', amount: '1 tsp'},
                {name: 'Light rum', amount: '50 ml'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Piña Colada',
            image: 'fixtures/pino-colada.png',
            user: user_2._id,
            isPublished: true,
            recipe:
                ' In a blender, combine white rum, coconut cream, pineapple juice, and a handful of ice. Blend until smooth.Pour into a glass and garnish with a pineapple slice and maraschino cherry.',
            ingredients: [
                {name: 'White rum', amount: '50 ml'},
                {name: 'Coconut cream', amount: '50 ml'},
                {name: 'Pineapple juice', amount: '100 ml'},
                {name: 'Pineapple slice and maraschino cherry'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Piña Colada 2',
            image: 'fixtures/pino-colada.png',
            user: user_1._id,
            recipe:
                ' In a blender, combine white rum, coconut cream, pineapple juice, and a handful of ice. Blend until smooth.Pour into a glass and garnish with a pineapple slice and maraschino cherry.',
            ingredients: [
                {name: 'White rum', amount: '50 ml'},
                {name: 'Coconut cream', amount: '50 ml'},
                {name: 'Pineapple juice', amount: '100 ml'},
                {name: 'Pineapple slice and maraschino cherry'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Mojito',
            image: 'fixtures/mojito.png',
            user: user_1._id,
            isPublished: true,
            recipe:
                "Mojito is a refreshing cocktail with mint. You'll need fresh mint leaves, 1-2 lime wedges, 1 teaspoon of sugar, and 50 ml of light rum. Muddle the mint and lime in a glass, add sugar and rum. Fill the glass with ice and stir.",
            ingredients: [
                {name: 'Fresh mint leaves'},
                {name: 'Lime wedges', amount: '1-2'},
                {name: 'Light rum', amount: '50 ml'},
                {name: 'Sugar', amount: '1 tsp'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Daiquiri',
            image: 'fixtures/daiquiri.png',
            user: user_1._id,
            recipe:
                "Daiquiri is a rum and lime juice-based cocktail. You'll need 50 ml light rum, 25 ml freshly squeezed lime juice, 1 teaspoon of sugar, and ice. Mix rum, lime juice, and sugar in a shaker with ice. Shake well and strain into a cocktail glass.",
            ingredients: [
                {name: 'Lime juice', amount: '25 ml'},
                {name: 'Sugar', amount: '1 tsp'},
                {name: 'Light rum', amount: '50 ml'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Piña Colada',
            image: 'fixtures/pino-colada.png',
            user: user_2._id,
            recipe:
                ' In a blender, combine white rum, coconut cream, pineapple juice, and a handful of ice. Blend until smooth.Pour into a glass and garnish with a pineapple slice and maraschino cherry.',
            ingredients: [
                {name: 'White rum', amount: '50 ml'},
                {name: 'Coconut cream', amount: '50 ml'},
                {name: 'Pineapple juice', amount: '100 ml'},
                {name: 'Pineapple slice and maraschino cherry'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
        {
            name: 'Piña Colada 2',
            image: 'fixtures/pino-colada.png',
            user: user_1._id,
            recipe:
                ' In a blender, combine white rum, coconut cream, pineapple juice, and a handful of ice. Blend until smooth.Pour into a glass and garnish with a pineapple slice and maraschino cherry.',
            ingredients: [
                {name: 'White rum', amount: '50 ml'},
                {name: 'Coconut cream', amount: '50 ml'},
                {name: 'Pineapple juice', amount: '100 ml'},
                {name: 'Pineapple slice and maraschino cherry'},
                {name: 'Ice'},
            ],
            ratings: [
                {user: user_1._id, rating: 4.8},
                {user: user_2._id, rating: 4.4},
            ],
        },
    );

    await db.close();
};

run().catch((e) => console.log(e));
