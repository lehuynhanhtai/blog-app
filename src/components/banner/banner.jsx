"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./banner.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

const Banner = () => {
  return (
    <>
      <Swiper
        watchSlidesProgress
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className={styles.mySwiper}
      >
        <SwiperSlide>
          <Image
            src="/book3.jpg"
            alt=""
            priority={true}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            className={styles.image}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/book4.jpg"
            alt=""
            priority={true}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            className={styles.image}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/book1.jpg"
            alt=""
            priority={true}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            className={styles.image}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
