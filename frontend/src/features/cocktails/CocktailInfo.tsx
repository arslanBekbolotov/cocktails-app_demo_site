import {useEffect} from 'react';
import {fetchCocktailRating, fetchOneCocktail} from './cocktailsThunk.ts';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {useParams} from 'react-router-dom';
import {Box, CardMedia, Grid, List, ListItem, Typography} from '@mui/material';
import {IRating} from '../../types';
import Spinner from '../../components/Spinner.tsx';
import Rate from '../../components/Rate.tsx';

const CocktailInfo = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams() as {id: string};
  const {cocktail, fetchLoading, ratings} = useAppSelector((state) => state.cocktailsStore);

  const formatName = (name: string) => {
    const splitName = name.split(' ');
    return splitName.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
  };

  const sumRating = (ratings: IRating[]) => {
    const result = ratings.reduce((acc, item) => acc + item.rating, 0) / ratings.length;
    return result || 5;
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchCocktailRating(id));
      dispatch(fetchOneCocktail(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      {fetchLoading ? (
        <Spinner />
      ) : (
        <div>
          <Grid container item sx={{justifyContent: 'center', mb: '20px'}}>
            <Box sx={{mr: '20px'}}>
              <CardMedia
                component="img"
                height="300"
                sx={{backgroundSize: 'contain', objectFit: 'contain', borderRadius: '10px'}}
                image={cocktail ? cocktail?.image : ''}
                alt="cocktail picture"
              />
            </Box>
            <Box>
              <Typography variant="h4" sx={{fontWeight: 'bold', mb: '10px'}}>
                {cocktail ? formatName(cocktail.name) : ''}
              </Typography>
              <Typography variant="subtitle1" sx={{mb: '10px'}}>
                <strong>Rating:</strong> {sumRating(ratings).toFixed(1)}{' '}
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
              <Rate id={id} />
            </Box>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default CocktailInfo;
