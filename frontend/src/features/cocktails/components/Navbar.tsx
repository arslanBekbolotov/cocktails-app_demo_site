import {Grid, Paper} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {setQuery} from '../cocktailsSlice.ts';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.cocktailsStore.query);
  const items = [
    {name: 'Published', query: ''},
    {name: 'Your Cocktails', query: 'userCocktails'},
  ];

  const onClick = (query: string) => {
    dispatch(setQuery(query));
  };

  return (
    <div>
      <Grid container justifyContent="flex-start" alignItems="center">
        {items.map((item) => (
          <Paper
            key={Math.random()}
            onClick={() => onClick(item.query)}
            sx={{
              p: '5px 10px',
              m: '0 10px 15px 0',
              fontWeight: '600',
              fontSize: '18px',
              cursor: 'pointer',
              background: query === item.query ? '#2c2b2b' : '#1c1b1b',
            }}
          >
            {item.name}
          </Paper>
        ))}
      </Grid>
    </div>
  );
};

export default Navbar;
