"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import { Scrollbar,Pagination,Grid  } from 'swiper/modules';
import Image from 'next/image';
import Link from "next/link";

interface DestinationType {
  id: string | number; // Adjust the type based on your data
  urllink: string;
  coverimage: string;
  imagealt: string;
  name: string;
}

// Define the type for the props
interface DestinationProps {
  dest: DestinationType[];
  uniqueId: string;
  row: number;
  height: number;
}
const Destination: React.FC<DestinationProps> = ({ dest, uniqueId, row, height }) => {

  return (
    <div>
       <Swiper
        spaceBetween={40}
        slidesPerView={4}
        grid= {{
            rows: row,
            fill: "row",
          }}
        pagination={{
            el:  `.swiper-pagination-${uniqueId}`,
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: function (index, className) {
              return '<span class="' + className + ' bg-black"></span>';
            },
        }}
        modules={[ Pagination, Grid ]}
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
        }}
      >
    {dest && dest.map((destination) => (
          <SwiperSlide key={destination.id}>
            <Link href={`/destinations/${destination.urllink}`}>
            <div className="relative w-full rounded-lg " style={{ height: `${height}px` }}>
              <Image
                src={`http://localhost:4000/uploads/${destination.coverimage}`}  
                alt={destination.imagealt}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
              {/* Text at top left */}
              <div className="absolute md:top-5 md:left-5 md:text-xl text-lg top-2 left-2 text-white">
                {destination.name}
                <hr className="border-t-2 border-white md:w-[20px] w-[20px]" />
              </div>
            </div>
            </Link>
          </SwiperSlide>
        ))}
   </Swiper>
   <div className="flex justify-center mt-4 items-center">
   <div className={`swiper-pagination swiper-pagination-${uniqueId}`}></div>
    </div>
    </div>
  )
}

export default Destination
