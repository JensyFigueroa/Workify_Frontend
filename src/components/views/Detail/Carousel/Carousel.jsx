import React from 'react';
import style from "../Carousel/Carousel.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/css/navigation';
import 'swiper/css';
import SwiperCore, { Navigation } from 'swiper/core';
SwiperCore.use([Navigation]);

const Carousel = ({ images }) => {
    
  
    return (
      <div className={style.container}>
        
        <Swiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        className={style.carouselContainer}
          >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img className={style.carousel} src={image} alt={`Featured Project ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`swiper-button-prev ${style.customPrevButton}`}></div>
      <div className={`swiper-button-next ${style.customNextButton}`}></div>
      </div>
    );
  };

  export default Carousel;
  