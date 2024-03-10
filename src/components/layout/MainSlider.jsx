"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

export default function MainSlider() {
  return (
    <section className="container">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="main-swiper"
      >
        <SwiperSlide>
          <img src={"/main-page/slider/01.jpg"} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/main-page/slider/02.jpg"} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"/main-page/slider/03.jpg"} alt="slide_image" />
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <Image
              src={"/main-page/slider/arrow-left-icon.svg"}
              width={30}
              height={30}
              alt="Назад"
            />
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next slider-arrow">
            <Image
              src={"/main-page/slider/arrow-right-icon.svg"}
              width={30}
              height={30}
              alt="Вперед"
            />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
