import {Box, Typography} from '@mui/material';
import Slider from '../Slider/Slider.tsx';
import {useEffect} from 'react';
import {fetchMostPopularCocktails} from '../../features/cocktails/cocktailsThunk.ts';
import {useAppDispatch} from '../../app/hooks.ts';

const SliderSection = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMostPopularCocktails());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h4" sx={{mb: '20px'}}>
        Most popular
      </Typography>
      <Slider />
    </Box>
  );
};

export default SliderSection;
