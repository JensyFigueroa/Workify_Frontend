import React from "react";
import style from "../Carousel/Carousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css";
import { RotatingLines } from "react-loader-spinner";
import SwiperCore, { Navigation, Thumbs, Pagination } from "swiper/core";
import { useState } from "react";
import { useEffect } from "react";
SwiperCore.use([Pagination, Navigation, Thumbs]);

const Carousel = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={style.container}>
      {loading ? (
        <div className={style.loadingContainer}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <div>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            thumbs={{ swiper: thumbsSwiper }}
            className={style.carouselContainer}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className={style.carousel}
                  src={image}
                  alt={`Featured Project ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={3}
            watchslidesvisibility="true"
            watchSlidesProgress={true}
            className={style.thumbsContainer}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className={style.thumb}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <button
        className={`swiper-button-prev ${style.customPrevButton}`}
      ></button>
      <button
        className={`swiper-button-next ${style.customNextButton}`}
      ></button>
    </div>
  );
};

export default Carousel;
