import {Box, Card, CardMedia, Grid, Typography} from '@mui/material';
import {ICocktail, IRating} from '../../types';
import {useAppSelector} from '../../app/hooks.ts';

interface Props {
  slide: ICocktail;
}

const SliderItem: React.FC<Props> = ({slide}) => {
  const {ratings} = useAppSelector((state) => state.cocktailsStore);

  const formatName = (name: string) => {
    const splitName = name.split(' ');
    return splitName.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
  };

  const sumRating = (ratings: IRating[]) => {
    const result = ratings.reduce((acc, item) => acc + item.rating, 0) / ratings.length;
    return result || 5;
  };

  return (
    <Card sx={{borderRadius: '30px', py: '20px'}}>
      <Grid
        container
        item
        sx={{
          justifyContent: 'flex-start',
          px: '40px',
          mb: '20px',
          flexWrap: 'nowrap',
          alignItems: 'center',
        }}
      >
        <Box sx={{mr: '20px'}}>
          <CardMedia
            component="img"
            height="300"
            sx={{backgroundSize: 'contain', objectFit: 'contain', borderRadius: '10px'}}
            image={slide ? slide?.image : ''}
            alt="slide picture"
          />
        </Box>
        <Box sx={{mb: '10px', maxWidth: '500px'}}>
          <Typography variant="h4" sx={{fontWeight: 'bold', mb: '10px'}}>
            {slide ? formatName(slide.name) : ''}
          </Typography>
          <Typography variant="subtitle1" sx={{mb: '10px'}}>
            <strong>Rating:</strong> {sumRating(ratings).toFixed(1)}{' '}
            {`(${slide?.ratings.length} votes)`}
          </Typography>
          <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
            Recipe:
          </Typography>
          <Typography variant="body1" sx={{pl: '8px'}}>
            {slide?.recipe}
          </Typography>
        </Box>
      </Grid>
    </Card>
  );
};

export default SliderItem;
