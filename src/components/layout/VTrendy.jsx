"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeaders from "../elements/SectionHeaders";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import Link from "next/link";

export default function VTrendy() {
  return (
    <section className="pb-24">
      <SectionHeaders mainHeader={"В ТРЕНДІ"} />
      <div className="container">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          // autoplay={{
          //   delay: 5500,
          //   disableOnInteraction: false,
          // }}
          slidesPerView={"auto"}
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
          className="vtrendy-swiper"
        >
          <SwiperSlide>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/dosshovik-ariel.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>
              </Link>
              <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                ДОЩОВИК ARIEL
              </h3>
              <p className="text-lg text-gray-500">XS, XS2, S, M, L</p>
            </div>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/futbolka-maria.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>
              </Link>
              <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                ФУТБОЛКА MARIA
              </h3>
              <p className="text-lg text-gray-500">XS, XS2, S2, M, L</p>
            </div>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/tolstovka-bim.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>
                <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                  ХУДІ SOFIA
                </h3>
                <p className="text-lg text-gray-500">XS, XS2, S, M</p>
              </Link>
            </div>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/tolstovka-delicate-sira.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>

                <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                  ТОЛСТОВКА SOFT
                </h3>
                <p className="text-lg text-gray-500">XXS, XS, S</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/dosshovik-ariel.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>
              </Link>
              <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                ДОЩОВИК ARIEL
              </h3>
              <p className="text-lg text-gray-500">XS, XS2, S, M, L</p>
            </div>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/futbolka-maria.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>
              </Link>
              <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                ФУТБОЛКА MARIA
              </h3>
              <p className="text-lg text-gray-500">XS, XS2, S2, M, L</p>
            </div>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/tolstovka-bim.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>
                <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                  ХУДІ SOFIA
                </h3>
                <p className="text-lg text-gray-500">XS, XS2, S, M</p>
              </Link>
            </div>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/tolstovka-delicate-sira.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>

                <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                  ТОЛСТОВКА SOFT
                </h3>
                <p className="text-lg text-gray-500">XXS, XS, S</p>
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/dosshovik-ariel.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>
              </Link>
              <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                ДОЩОВИК ARIEL
              </h3>
              <p className="text-lg text-gray-500">XS, XS2, S, M, L</p>
            </div>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/futbolka-maria.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>
              </Link>
              <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                ФУТБОЛКА MARIA
              </h3>
              <p className="text-lg text-gray-500">XS, XS2, S2, M, L</p>
            </div>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/tolstovka-bim.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>
                <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                  ХУДІ SOFIA
                </h3>
                <p className="text-lg text-gray-500">XS, XS2, S, M</p>
              </Link>
            </div>
            <div className="vtrendy-item">
              <Link href={"/"}>
                <div className="vtrendy-item-image">
                  <img
                    src={"/main-page/vtrendy/tolstovka-delicate-sira.jpg"}
                    className="vtrendy-product"
                    alt="slide_image"
                  />
                  <Image
                    src={"/icons/search.svg"}
                    width={50}
                    height={50}
                    className="vtrendy-search"
                    alt="Пошук"
                  />
                </div>

                <h3 className="text-lg uppercase pt-8 pb-2 text-vtrendyTextColor">
                  ТОЛСТОВКА SOFT
                </h3>
                <p className="text-lg text-gray-500">XXS, XS, S</p>
              </Link>
            </div>
          </SwiperSlide>

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <Image
                src={"/main-page/vtrendy/arrow-left.svg"}
                width={30}
                height={30}
                alt="Назад"
              />
            </div>

            <div className="swiper-pagination"></div>

            <div className="swiper-button-next slider-arrow">
              <Image
                src={"/main-page/vtrendy/arrow-right.svg"}
                width={30}
                height={30}
                alt="Вперед"
              />
            </div>
          </div>
        </Swiper>
      </div>
    </section>
  );
}
