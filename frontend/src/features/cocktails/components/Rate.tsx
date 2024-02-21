import {Rating, Typography} from '@mui/material';
import React, {useState} from 'react';
import {fetchCocktailRating, patchRating} from '../cocktailsThunk.ts';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';

interface Props {
  id: string;
}

const Rate: React.FC<Props> = ({id}) => {
  const dispatch = useAppDispatch();
  const {updateLoading, userLastRating} = useAppSelector((state) => state.cocktailsStore);
  const [value, setValue] = useState<number>(userLastRating?.rating || 0);

  const handleChange = async (value: number | null) => {
    if (value && userLastRating) {
      setValue(value);
      await dispatch(patchRating({id, rating: value}));
      await dispatch(fetchCocktailRating(id));
    }
  };

  return (
    <>
      {updateLoading ? (
        <div>...Loading</div>
      ) : (
        <>
          <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
            Rate:
          </Typography>
          <Rating
            name="simple-controlled"
            value={value || 0}
            onChange={(_, newValue) => handleChange(newValue)}
          />
        </>
      )}
    </>
  );
};

export default Rate;
