"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation,Pagination  } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
// SwiperCore.use([Navigation, Scrollbar]);
interface TrekItem {
  _id: string;
  urllink: string;
  testimage: string;
  title: string;
  name: string;
  amount: number;
  badge?: string; // Optional property
}

// Define the props for the Trek component
interface TrekProps {
  trek: TrekItem[];
  uniqueId: string;
  name: string;
}
const Trek: React.FC<TrekProps> = ({ trek, uniqueId, name }) => {
  return (
    <div className=" relative">
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
            nextEl: `.swiper-but-next-${uniqueId}`,
            prevEl: `.swiper-but-prev-${uniqueId}`
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
        modules={[ Navigation, Pagination]}
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
         {trek && trek.map((item) => (
   <SwiperSlide key={item._id}>
   <Link href={`${name}/${item.urllink}`} className="block"> {/* Make the entire card a link */}
     <div className="rounded-xl shadow-lg relative flex flex-col items-center justify-between h-full transition duration-300 cursor-pointer hover:shadow-2xl hover:scale-105 transform bg-black text-white p-4">
       <div className="overflow-hidden relative rounded-xl h-72 w-full">
         <Image
           src={`http://localhost:4000/uploads/${item.testimage}`} 
           alt={item.title}
           objectFit="cover"
           layout="fill"
           className="transform transition-transform duration-300"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div> {/* Gradient overlay */}
       </div>
       {item.badge && (
         <span className="absolute top-0 left-0 bg-yellow-500 text-white uppercase text-xs p-1 m-2 rounded">
           {item.badge}
         </span>
       )}
       <div className="p-4 text-center">
         <h4 className="text-lg mb-1">{item.name}</h4>
   
       <div className="flex justify-between w-full mt-2 mx-4">
       <p className="text-md pt-1"><FontAwesomeIcon icon={faIndianRupeeSign} className="pr-1"/>{item.amount}</p>
         <button className="px-3 py-1 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition duration-300">
           Book Now
         </button>
       </div>
       </div>
     </div>
   </Link>
  </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-4 items-center">
    <button className={`swiper-but-prev swiper-but-prev-${uniqueId} flex items-center justify-center w-5 h-5 shadow-md rounded-full mr-1`}><FontAwesomeIcon icon={faArrowLeft} /></button> {/* Unicode left arrow */}
    <div className={`swiper-pagination swiper-pagination-${uniqueId}`}></div>
    <button className={`swiper-but-next swiper-but-next-${uniqueId} flex items-center justify-center w-5 h-5 shadow-md rounded-full ml-1`}><FontAwesomeIcon icon={faArrowRight} /></button> {/* Unicode right arrow */}
</div>
    </div>
  );
};
export default Trek;