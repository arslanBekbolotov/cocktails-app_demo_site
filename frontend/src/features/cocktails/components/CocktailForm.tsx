import {Box, Button, Container, Grid, TextField, Typography,} from '@mui/material';
import React, {useCallback, useEffect, useState} from 'react';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import {useLocation, useNavigate} from 'react-router-dom';
import {ICocktail, ICocktailApi, ICocktailForm, IIngredientMutation} from "../../../types";
import FileInput from "../../../components/FileInput.tsx";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {createCocktail, updateCocktail} from "../cocktailsThunk.ts";
import FormDialog from "../../../components/Model.tsx";
import {setOpen} from "../cocktailsSlice.ts";

const CocktailForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {createError, createLoading, isOpen, cocktail} = useAppSelector(state => state.cocktailsStore);
    const [ingredients, setIngredients] = useState<IIngredientMutation[]>([{name: "", amount: ""}]);
    const initialState = (cocktail && pathname === '/edit') ? cocktail : {
        name: '',
        image: null,
        recipe: "",
    }

    const [state, setState] = useState<ICocktailForm | ICocktail>(initialState);

    const setModelOpen = useCallback((value: boolean) => {
        dispatch(setOpen(value));
    }, [dispatch])

    useEffect(() => {
        if (pathname === '/edit') {
            setModelOpen(true);

            if (cocktail) {
                setState(cocktail);
                setIngredients(JSON.parse(JSON.stringify(cocktail.ingredients)));
            }
        }
    }, [cocktail, pathname, setModelOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setState((prevState) => ({...prevState, [name]: value}));
    };

    const handleAddIngredient = () => {
        setIngredients(prevState => [...prevState, {name: "", amount: ""}])
    }

    const handleDeleteIngredient = (index: number) => {
        const filteredIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(filteredIngredients);
    }

    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        const name = e.target.name;

        if (files) {
            setState((prevState) => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    const handleChangeIngredient = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const {value, name} = e.target;
        const updatedIngredients = [...ingredients];

        if (name === 'name') {
            updatedIngredients[index] = {...updatedIngredients[index], name: value};
        } else if (name === 'amount') {
            updatedIngredients[index] = {...updatedIngredients[index], amount: value};
        }

        setIngredients(updatedIngredients);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const str = JSON.stringify(ingredients);

        try {
            if (pathname !== '/edit') {
                const data = {...state, ingredients: str} as ICocktailApi;
                await dispatch(createCocktail(data)).unwrap();
            } else if (pathname === '/edit' && cocktail) {
                const data = {
                    _id: cocktail?._id,
                    name: state.name,
                    recipe: state.recipe,
                    ingredients: str,
                };

                await dispatch(updateCocktail(data)).unwrap();
            }

            navigate('/');
        } catch {
            //nothing
        }
    };

    const getFieldError = (name: string) => {
        try {
            return createError?.errors[name].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={onSubmit} sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            autoComplete="set name of album"
                            name="name"
                            fullWidth
                            value={state.name}
                            label="Name"
                            onChange={handleChange}
                            error={Boolean(getFieldError('name'))}
                            helperText={getFieldError('name')}
                        />
                    </Grid>
                    <Box sx={{p: '16px 0 0 16px', width: '100%'}}>
                        <Typography variant='h6' sx={{fontWeight: '600', mb: '10px'}}>
                            Ingredients:
                        </Typography>
                        <Box sx={{width: '100%', mb: '16px'}}>
                            {ingredients.map((item, index) => (
                                <Grid container item xs={12} key={Math.random()} sx={{pt: '16px'}}>
                                    <TextField
                                        required
                                        sx={{flexGrow: 1, mr: '10px'}}
                                        label="Name"
                                        name="name"
                                        value={item.name}
                                        onChange={(e) => handleChangeIngredient(e, index)}
                                    />
                                    <TextField
                                        label="Amount"
                                        name="amount"
                                        value={item.amount}
                                        onChange={(e) => handleChangeIngredient(e, index)}
                                    />
                                    <IconButton aria-label="delete" sx={{p: '8px 16px', ml: '5px'}}
                                                onClick={() => handleDeleteIngredient(index)}>
                                        <ClearIcon/>
                                    </IconButton>
                                </Grid>
                            ))}
                        </Box>

                        <Grid container item justifyContent='flex-end'>
                            <Button variant="contained" sx={{ml: 'auto'}} onClick={handleAddIngredient}>
                                Add Ingredient
                            </Button>
                        </Grid>
                    </Box>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Recipe"
                            multiline
                            rows={3}
                            fullWidth
                            name="recipe"
                            value={state.recipe}
                            onChange={handleChange}
                            error={Boolean(getFieldError('recipe'))}
                            helperText={getFieldError('recipe')}
                        />
                    </Grid>
                    {pathname !== '/edit' && <Grid item xs={12} sx={{pt: '16px'}}>
                        <FileInput onChange={filesInputChangeHandler} name={'image'} label="image"/>
                    </Grid>}
                    <Grid container item xs={12} justifyContent="center">
                        <LoadingButton
                            loading={createLoading}
                            type="submit"
                            endIcon={<SendIcon/>}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, maxWidth: '25%'}}
                        >
                            Send
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
            <FormDialog text={'Enter the article to find the cocktail'} isOpen={isOpen} setOpen={setModelOpen}/>
        </Container>
    );
};

export default CocktailForm;