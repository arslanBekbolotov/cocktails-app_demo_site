import {Grid, TextField} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {IIngredientMutation} from '../types';
import React from 'react';

interface Props {
  item: IIngredientMutation;
  handleChangeIngredient: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => void;
  handleDeleteIngredient: (index: number) => void;
  index: number;
}

const Ingredient: React.FC<Props> = ({
  item,
  handleChangeIngredient,
  handleDeleteIngredient,
  index,
}) => {
  return (
    <>
      <Grid container item xs={12} key={item.unitId} sx={{mb: '20px'}}>
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
        {index !== 0 && (
          <IconButton
            aria-label="delete"
            sx={{p: '8px 16px', ml: '5px'}}
            onClick={() => handleDeleteIngredient(index)}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Grid>
    </>
  );
};

export default Ingredient;
