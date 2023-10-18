export interface GlobalError {
    error: string;
}

export interface IUser {
    _id: string;
    displayName: string;
    avatar?: string;
    username: string;
    token: string;
    role: string;
    password: string;
    googleID?: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
    avatar: File | null;
    displayName: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface RegisterResponse {
    user: User;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface IRating {
    _id: string;
    rating: number;
    user: string;
}

export interface IRatingMutation {
    id: string;
    rating: number;
}

export interface IIngredient {
    _id: string;
    name: string;
    amount: string;
}

export type IIngredientMutation = Omit<IIngredient, '_id'>;

export interface ICocktail {
    _id: string;
    name: string;
    user: string;
    image: string;
    recipe: string;
    isPublished?: boolean;
    ingredients: IIngredient[];
    ratings: IRating[];
}

export interface ICocktailForm {
    name: string;
    image: File | null;
    recipe: string;
}

export interface ICocktailApi extends ICocktailForm {
    ingredients: string;
}

export interface ICocktailApiMutation {
    _id: string;
    name: string;
    recipe: string;
    ingredients: string;
}

export interface ICocktailMutation {
    cocktail: ICocktail;
    rating?: IRating;
}

export interface ICocktailQuery {
    unpublished?: string;
    userUnpublished?: string;
}
