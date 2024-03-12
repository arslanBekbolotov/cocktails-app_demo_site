import {Box, Pagination, Typography} from '@mui/material';
import Spinner from '../Spinner.tsx';
import CocktailItem from '../../features/cocktails/components/CocktailItem.tsx';
import {fetchCocktails} from '../../features/cocktails/cocktailsThunk.ts';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {useEffect} from 'react';
import Navbar from '../../features/cocktails/components/Navbar.tsx';
import {selectUser} from '../../features/users/usersSlice.ts';

const CocktailsList = () => {
  const dispatch = useAppDispatch();
  const {cocktails, fetchLoading, query, totalPages} = useAppSelector(
    (state) => state.cocktailsStore,
  );

  const user = useAppSelector(selectUser);

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

export default CocktailsList;
