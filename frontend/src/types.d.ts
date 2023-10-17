

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