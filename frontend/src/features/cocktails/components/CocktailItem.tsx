import React from 'react';
import {ICocktail} from '../../../types';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import MouseOverPopover from '../../../components/Popover.tsx';

interface Props {
  cocktail: ICocktail;
}

const CocktailItem: React.FC<Props> = ({cocktail}) => {
  const navigate = useNavigate();

  const formatName = (name: string) => {
    const splitName = name.split(' ');
    return splitName.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    navigator.clipboard
      .writeText(cocktail._id)
      .then(() => {
        alert('ID коктейля скопирован в буфер обмена: ' + cocktail._id);
      })
      .catch((error) => {
        console.error('Ошибка копирования в буфер обмена: ', error);
      });
  };

  return (
    <Card
      onClick={() => navigate(`/${cocktail._id}`)}
      sx={{maxWidth: 345, borderRadius: '20px', position: 'relative'}}
    >
      {!cocktail.isPublished && (
        <Typography sx={{position: 'absolute', right: '0', border: '1px solid #ccc', p: '3px 7px'}}>
          Unpublished
        </Typography>
      )}
      <CardActionArea sx={{pt: '30px'}}>
        <CardMedia
          component="img"
          height="300"
          sx={{backgroundSize: 'contain', objectFit: 'contain'}}
          image={cocktail.image}
          alt="cocktail picture"
        />
        <CardContent onClick={handleClick}>
          <MouseOverPopover name={formatName(cocktail.name)} text={'Click to copy article'} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CocktailItem;
