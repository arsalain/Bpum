"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation,Scrollbar,Pagination  } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
// SwiperCore.use([Navigation, Scrollbar]);
const destinations = [
  {
    title: "Kedarkanta Trek",
    location: "Singtur Range, Uttarakhand",
    price: 5999,
    img: "/home/kedarkanta.webp",
    badge: "BEST SELLER",
    url:"kedarkantha-trek"
  },

  {
    title: "Brahmatal Trek",
    location: "Kuling, Uttarakhand",
    price: 6299,
    img: "/home/Brahmatal.webp",
    url:"brahmatal-trek"
  },
  {
    title: "Kudremukh",
    location: "Chikamagalur, Karnataka",
    price: 3999,
    img: "/home/kudremukh.webp",
    badge: "TOP RATED",
    url:"kudremukh-trek"
  },
  {
    title: "Kumara Parvatha",
    location: "Kukke Subramanya, ",
    price: 3999,
    img: "/home/kp.webp",
    badge: "TOP RATED",
    url:"kumara-parvatha-trek"
  },
  {
    title: "Hamta Pass Trek",
    location: "Kullu, Himachal Pradesh",
    price: 7000,
    img: "/home/Hampta.webp",
    url:"hampta-pass-trek"
  },
];
const TrekSlider = () => {
  return (
    <div className=" relative">
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
            nextEl: '.swiper-but-next',
            prevEl: '.swiper-but-prev'
        }}
        pagination={{
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: function (index, className) {
              return '<span class="' + className + ' bg-black"></span>';
            },
        }}
        scrollbar={{
          el: "#swiper-scrollbar",
          draggable: true,
        }}
        modules={[Scrollbar, Navigation, Pagination]}
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
         {destinations.map((item, idx) => (
   <SwiperSlide key={idx}>
{/* Make the entire card a link */}
     <div className="rounded-xl shadow-lg relative flex flex-col items-center justify-between h-full transition duration-300 cursor-pointer hover:shadow-2xl hover:scale-105 transform bg-black text-white p-4">
       <div className="overflow-hidden relative rounded-xl h-72 w-full">
         <Image
           src={item.img}
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
       <div className="p-4 pb-0 text-center">
  <h4 className="text-lg mb-1">{item.title}</h4>
  <p className="text-sm mb-2">{item.location}</p>
       </div>
       <div className="flex flex-col sm:flex-row justify-between items-center mt-2 space-x-0 sm:space-x-4"> {/* Adjusted margin-top and space between price and button */}
  <div className="flex flex-col items-start mb-2 sm:mb-0">
    <p className="text-xs text-gray-400">Starting from</p>
    <p className="text-lg font-bold">INR {item.price}</p>
  </div>
  <Link href={`/trek/${item.url}`} className="block"> 
  <button className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-full border-2 border-yellow-500 hover:bg-transparent hover:text-yellow-500 transition duration-300"> {/* Adjusted padding and hover effect for button */}
    Book Now
  </button>   </Link>
</div>
</div>

  </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-4 items-center">
    <button className="swiper-but-prev flex items-center justify-center w-5 h-5 shadow-md rounded-full mr-1"><FontAwesomeIcon icon={faArrowLeft} /></button> {/* Unicode left arrow */}
    <div className="swiper-pagination"></div>
    <button className="swiper-but-next flex items-center justify-center w-5 h-5 shadow-md rounded-full ml-1"><FontAwesomeIcon icon={faArrowRight} /></button> {/* Unicode right arrow */}
</div>
    </div>
  );
};
export default TrekSlider;