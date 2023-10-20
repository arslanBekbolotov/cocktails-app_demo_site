import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {fetchCocktails} from './cocktailsThunk.ts';
import CocktailItem from './components/CocktailItem.tsx';
import Spinner from '../../components/Spinner.tsx';
import {Box, Pagination, Typography} from '@mui/material';
import Navbar from './components/Navbar.tsx';
import {selectUser} from '../users/usersSlice.ts';

const Cocktails = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const {cocktails, fetchLoading, query, totalPages} = useAppSelector(
    (state) => state.cocktailsStore,
  );

  useEffect(() => {
    dispatch(fetchCocktails({query}));
  }, [dispatch, query]);

  return (
    <div>
      {user && <Navbar />}
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
      {!fetchLoading && cocktails.length <= 0 && (
        <Typography variant="h3" sx={{textAlign: 'center', mt: '10%', whiteSpace: 'nowrap'}}>
          Nothing was found
        </Typography>
      )}
      {!query && (
        <Pagination
          onChange={(_, page) => dispatch(fetchCocktails({page}))}
          sx={{position: 'fixed', bottom: '30px', left: '50%', transform: 'translate(-50%)'}}
          count={totalPages}
          variant="outlined"
          shape="rounded"
        />
      )}
    </div>
  );
};

export default Cocktails;
