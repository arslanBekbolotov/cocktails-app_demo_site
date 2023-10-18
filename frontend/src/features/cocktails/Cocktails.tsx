import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {fetchCocktails} from './cocktailsThunk.ts';
import CocktailItem from './components/CocktailItem.tsx';
import Spinner from '../../components/Spinner.tsx';
import {Box} from '@mui/material';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const {cocktails, fetchLoading} = useAppSelector((state) => state.cocktailsStore);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <div>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: '20px',
        }}
      >
        {fetchLoading ? (
          <Spinner />
        ) : (
          cocktails.map((item) => <CocktailItem key={item._id} cocktail={item} />)
        )}
      </Box>
    </div>
  );
};

export default Cocktails;
