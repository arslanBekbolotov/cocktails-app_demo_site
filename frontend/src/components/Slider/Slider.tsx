import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import {Pagination, EffectFade, Autoplay} from 'swiper/modules';
import SliderItem from './SliderItem.tsx';
import {Box} from '@mui/material';
import {useAppSelector} from '../../app/hooks.ts';

const Slider = () => {
  const {mostPopularCocktails} = useAppSelector((state) => state.cocktailsStore);

  return (
    <Box sx={{mb: '50px'}}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, EffectFade, Autoplay]}
        className="mySwiper"
      >
        {mostPopularCocktails.map((slide) => (
          <SwiperSlide key={slide._id}>
            <SliderItem slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Slider;
