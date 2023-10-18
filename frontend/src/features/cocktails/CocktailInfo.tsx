import {useEffect, useState} from 'react';
import {fetchOneCocktail, patchRating} from './cocktailsThunk.ts';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {useParams} from 'react-router-dom';
import {Box, CardMedia, Grid, List, ListItem, Rating, Typography} from '@mui/material';
import {IRating} from '../../types';
import Spinner from "../../components/Spinner.tsx";

const CocktailInfo = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams() as { id: string };
    const {cocktail, userLastRating, fetchLoading} = useAppSelector((state) => state.cocktailsStore);
    const [value, setValue] = useState<number>(0);

    const formatName = (name: string) => {
        const splitName = name.split(' ');
        return splitName.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
    };

    const sumRating = (ratings: IRating[]) => {
        return ratings.reduce((acc, item) => (acc += item.rating), 0) / ratings.length;
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchOneCocktail(id));
        }
    }, [dispatch, id]);

    const handleChange = async (value: number | null) => {
        if (value) {
            setValue(value);
            await dispatch(patchRating({id, rating: value}));
            await dispatch(fetchOneCocktail(id));
        }
    };

    return (
        <div>
            {fetchLoading ? <Spinner/> : <div>
                <Grid container item sx={{justifyContent: 'center', mb: '20px'}}>
                    <Box sx={{mr: '20px'}}>
                        <CardMedia
                            component="img"
                            height="300"
                            sx={{backgroundSize: 'contain', objectFit: 'contain', borderRadius: '10px'}}
                            image={cocktail ? `http://localhost:8001/${cocktail?.image}` : ''}
                            alt="cocktail picture"
                        />
                    </Box>
                    <Box>
                        <Typography variant="h4" sx={{fontWeight: 'bold', mb: '10px'}}>
                            {cocktail ? formatName(cocktail.name) : ''}
                        </Typography>
                        <Typography variant="subtitle1" sx={{mb: '10px'}}>
                            <strong>Rating:</strong> {cocktail ? sumRating(cocktail.ratings).toFixed(1) : '5'}{' '}
                            {`(${cocktail?.ratings.length} votes)`}
                        </Typography>
                        <Box>
                            <Typography variant="subtitle1" sx={{fontWeight: 'bold', m: '0'}}>
                                Ingredients:
                            </Typography>
                            <List sx={{paddingY: '2px', mb: '10px', maxHeight: '200px', overflow: 'auto'}}>
                                {cocktail?.ingredients.map((item) => (
                                    <ListItem key={item._id} sx={{padding: '2px 8px'}}>
                                        {item.name} {item.amount ? ' - ' + item.amount : ''}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Grid>
                <Grid container item alignItems="center" direction="column">
                    <Box sx={{mb: '10px', maxWidth: '400px'}}>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            Recipe:
                        </Typography>
                        <Typography variant="body1" sx={{pl: '8px'}}>
                            {cocktail?.recipe}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            Rate:
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={value ? value : userLastRating}
                            onChange={(_, newValue) => handleChange(newValue)}
                        />
                    </Box>
                </Grid>
            </div>}
        </div>
    );
};

export default CocktailInfo;
