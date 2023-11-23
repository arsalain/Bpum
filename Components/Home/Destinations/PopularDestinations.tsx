'use client'
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,Scrollbar } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { destinations2 } from "./data"; // Make sure the path is correct
// import SwiperCore, { Navigation, Scrollbar } from 'swiper';
// TypeScript type definitions

// SwiperCore.use([Navigation, Scrollbar]);
const PopularDestinations = () => {
  return (
    <>
    {/* <div className="mx-10" > */}
      <Swiper
        spaceBetween={30}
        slidesPerView={4}
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
        // scrollbar={{ draggable: true }}
        // className="overflow-visible"
        scrollbar={{
          el: "#swiper-scrollbar",
          draggable: true,
        }}
        modules={[Scrollbar, Navigation]}
        // navigation={{
        //   nextEl: ".js-destination-next",
        //   prevEl: ".js-destination-prev",
        // }}
        breakpoints={{
          100: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
          1600: {
            slidesPerView: 5,
            spaceBetween: 30,
          }
        }}
      >
        {destinations2.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={`/destinations/${item.url}`}>
    <div className="block rounded-lg shadow-lg overflow-hidden  group hover:bg-opacity-100 transition-all ease-out duration-300 w-auto">
      <div className="w-auto h-[250px] md:w-[350px] md:h-[350px] relative ">
              <Image
                src={item.img}
                alt={item.city}
                layout="fill" objectFit="cover" 
                className="transition-transform ease-out duration-600 transform hover:scale-110"
              />
              </div>
              <div className="flex flex-col justify-between text-center p-7 bg-black bg-opacity-50 transition-opacity duration-2000 absolute inset-0">
                <div className="text-white text-base mb-2 opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500"></div>
                <div className="transition-all ease-out duration-500 transform group-hover:-translate-y-10">
                  <h4 className="text-2xl md:text-xl leading-snug text-white mb-4">
                    {item.city}
                  </h4>

                    <button className="w-full py-3  bg-yellow-500 text-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Discover
                    </button>
              
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b  via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-all ease-out duration-300"></div>
            </div>
           
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-between mt-4">
      <button className="swiper-button-prev flex items-center justify-center w-5 h-5  shadow-md rounded-full ">
</button>
<button className="swiper-button-next flex items-center justify-center w-10 h-5  shadow-md rounded-full ">
</button>
      {/* <button className="swiper-button-prev bg-black text-black !important"></button>
<button className="swiper-button-next"></button> */}
<div className=" bg-black-200  " id="swiper-scrollbar"></div>

      </div>
      {/* </div> */}
    </>
  );
};

export default PopularDestinations;
