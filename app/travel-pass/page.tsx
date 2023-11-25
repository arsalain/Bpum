'use client'
import React, { useState, useEffect,useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/Components/Navbar/Header/Header';
import Footer from '@/Components/Navbar/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import { faGift, faPercent, faConciergeBell, faCalendarCheck, faMapMarkedAlt, faPlaneDeparture, faCreditCard, faUserClock, faLock, faTag, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import EnquiryForm from '@/Components/Book/EnquiryForm';

type FaqContent = {
  General: { question: string; answer: string }[];
  Safety: { question: string; answer: string }[];
  Service: { question: string; answer: string }[];
  Policy: { question: string; answer: string }[];
  Booking: { question: string; answer: string }[];
  Payment: { question: string; answer: string }[];
};
const tabs: (keyof FaqContent)[] = ['General', 'Safety', 'Service', 'Policy', 'Booking', 'Payment'];

const Page = () => {
const backgroundImages = [
'https://source.unsplash.com/random/?mountains',
'https://source.unsplash.com/random/?beach',
'https://source.unsplash.com/random/?jungle',
];
const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
const [showEnquiry, setShowEnquiry] = useState(false);

useEffect(() => {
const intervalId = setInterval(() => {
setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
}, 3000);
return () => clearInterval(intervalId);
}, []);
const [isMobile, setIsMobile] = useState(false);
const [showAllTreks, setShowAllTreks] = useState(false);
const [showAllTours, setShowAllTours] = useState(false);

// States and refs for tours

const topOfTreksListRef = useRef<HTMLDivElement | null>(null);
const topOfToursListRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  // Update isMobile based on the actual window width
  const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
  checkIfMobile();

  // Handle window resize
  window.addEventListener('resize', checkIfMobile);
  return () => window.removeEventListener('resize', checkIfMobile);
}, []);



 const handleViewChangeTreks = () => {
    const shouldScroll = showAllTreks;
    setShowAllTreks(!showAllTreks);

    if (shouldScroll && topOfTreksListRef.current) {
      (topOfTreksListRef.current as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewChangeTours = () => {
    const shouldScroll = showAllTours;
    setShowAllTours(!showAllTours);

    if (shouldScroll && topOfToursListRef.current) {
      (topOfToursListRef.current as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
    }
  };
  const adventures = [
    { src: '/pass/1_Kudremukh.webp', alt: 'Trek1' },
    { src: '/pass/2_Ettina-Bhuja.webp', alt: 'Trek2' },
    { src: '/pass/3_belkal theertha Falls Trek.webp', alt: 'Trek3' },
    { src: '/pass/4_Bandaje_11zon.webp', alt: 'Trek4' },
    { src: '/pass/5_Ermayi and Didupe Falls Trek.webp', alt: 'Trek5' },
    { src: '/pass/6_Gokarna Beach Trek.webp', alt: 'Trek6 ' },
    { src: '/pass/7_Thekkady.webp', alt: 'Tour1' },
    { src: '/pass/8_Kodaikanal.webp', alt: 'Tour2' },
    { src: '/pass/9_Pondicherry.webp', alt: 'Tour3' },
    { src: '/pass/10_Goa.webp', alt: 'Tour4' },
    { src: '/pass/11_gokarna-murudeshwara.webp', alt: 'Tour5' },
    { src: '/pass/12_Hampi.webp', alt: 'Tour6' },
    ];
const treks = [
  'Kudremukh Trek', 'Nethravathi Trek', 'Bandaje Falls Trek', 'Gangadikal Trek',
  'Gokarna Beach Trek', 'Kumara Parvatha Coorg Trek', 'Tadiandamol Trek', 'Ethina Bhuja Trek',
  'Ombattu Gudda Trek', 'Ermayi and Didupe Falls Trek', 'Karwar Beach Trek', 'Kurinjal Trek',
  'Nishani Motte Trek ', 'Kumara Parvatha Kukke Trek', 'Narasimha Parvatha Trek', 'Kodachadri Trek',
  'Galibeedu Trek', 'Meruthi Hill Trek', 'Belkal Theertha Falls Trek', 'Pandavara Betta Trek' ,
  ];
  
  const tours = [
  'Wayanad Weekend Getaway', 'Chikmagalur Weekend Getaway', 'Hampi Weekend Getaway', 'Kodaikanal Weekend Getaway',
  'Munnar Weekend Getaway', 'Coorg Weekend Getaway', 'Ooty Weekend Getaway', 'Pondicherry Weekend Getaway'  ,
  'Sakleshpur Weekend Getaway', 'Gokarna-Murudeshwar Weekend Getaway', 'Kannur Weekend Getaway', 'Udupi-Mangalore Weekend Getaway',
  'Chikmagalur Backpacking Tour', 'Kodaikanal Backpacking Tour', 'Ooty Backpacking Tour', 'Valparai Weekend Getaway',
  'Thekkady Weekend Getaway', 'BR Hills Weekend Getaway', 'Badami Weekend Getaway', 'Dandeli Weekend Getaway',
  ];
const displayLimit = isMobile ? 5 : treks.length;
  const displayedTreks = showAllTreks ? treks : treks.slice(0, displayLimit);
  const displayLimita = isMobile ? 5 : tours.length;
  const displayedTours = showAllTours ? tours : tours.slice(0, displayLimita);
  const faqContent = {
    General: [
    { question: ' How many participants are there on a trip?', answer: 'We typically host 12-20 travelers in a single batch for our tours, and for trekking adventures, groups usually consist of 20-30 travelers per batch. Larger groups are possible during long weekends, ensuring a better experience for all.' },
    { question: 'Do your trips have any age limitations?', answer: 'Yes, participants must be 18 years or older. However, guardians or parents accompanying the group are welcome to bring their children along for the trek or tour.' },
    {
    question: ' Is it possible to make last-minute modifications to the trek or trip?',
    answer: 'No, changes cannot be made within 7 days of the travel date. Please confirm your travel plans at least 7 days before your scheduled departure to avoid the trek or tour being considered as lapsed.'
    },
    {
    question: 'How frequently am I allowed to travel within a month using the travel pass?',
    answer: 'With our travel pass, you are entitled to travel once per month. Additional treks or tours within the same month require payment of the specified price for that particular journey.'
    },
    {
    question: 'Are the listed Treks suitable for beginners?',
    answer: 'Absolutely! We cater to all levels of experience and provide detailed information on the difficulty level for each Trek.'
    }
    ],
    Safety: [
    { question: ' What support is available if I encounter issues during my adventure?', answer: 'We provide 24/7 support for any issues or emergencies that may arise during your Trip/Tour. Your safety and satisfaction are our top priorities.' },
    { question: ' Is it safe for a female to travel solo on your treks and tours?   ', answer: 'As a travel company dedicated to safe and enriching experiences, we ensure that solo female travel on our treks and tours is secure and enjoyable. ' },
    {
    question: ' What safety measures are in place for the adventures?',
    answer: 'We ensure all adventures meet strict safety standards and are led by qualified professionals.'
    },
    {
    question: 'Are there female trek captains or guides available for your adventure treks and tours?  ',
    answer: 'Absolutely. We are proud to offer female trek captains and guides on many of our adventure tours.'
    },
    {
    question: 'Are there any specific health requirements before we embark on a Trek?',
    answer: 'Participants should be in good health and may be required to sign a waiver before embarking on a Trek.'
    }
    ],
    Service: [
    { question: 'How does your travel company facilitate transportation for tours and treks ?', answer: 'Our travel company provides end-to-end transportation for all tours and treks, ensuring a seamless and comfortable journey for our clients.' },
    { question: 'What makes the experiences offered by your travel company unique?', answer: 'Our travel company stands out by offering first-hand experiences, ensuring our clients enjoy authentic and immersive journeys that are both memorable and personal.' },
    ],
    Policy: [
    { question: 'What is the procedure if a trip or trek gets canceled?', answer: 'In case of cancellation, we follow specific policies for rescheduling due to circumstances like natural disasters, governmental actions, conflicts, public disturbances, national crises, rebellions, epidemics, strikes, transportation challenges, or delays.' },
    { question: ' Will I get a refund if I cancel my Travel pass?', answer: 'No, the Travel pass is non-refundable.' },
    { question: ' Are there Travel pass exclusive trips/treks?', answer: 'Yes, there are invite-only trips/treks exclusively for Travel pass owners.' },
    ],
    Booking: [
    { question: 'Can I gift my Travel Pass?', answer: 'You can gift a new pass to someone, but a registered pass cannot be transferred.' },
    { question: 'Can I pause my Travel Pass?', answer: 'No, the Travel pass cannot be paused.' },
    ],
    Payment: [
    { question: 'Are installment options like EMI available for payment?', answer: 'Yes, we offer EMI (Equated Monthly Installment) options on credit cards and select debit cards.' },
    { question: 'What payment methods are accepted?', answer: 'We accept all credit cards, Debit cards, UPI payments, Netbanking, Wallets and EMI.' },
    ],
    };
  
  // State for the active tab
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
  <div className='bg-gradient-to-r from-gray-900 to-gray-800 text-white'>
  <Header />
  
  {/* Dynamic background section */}
  <div className="relative h-screen">
  <div className="absolute inset-0 bg-black bg-opacity-50" /> {/* Overlay */}
  <div className="flex items-center justify-center bg-no-repeat bg-cover bg-center transition-opacity duration-1000 h-full"
  style={{ backgroundImage: `url(${backgroundImages[currentBackgroundIndex]})` }}>
  {/* Content for the dynamic background section */}
  <div className="text-center text-white p-12 z-10">
  <h1 className="md:text-5xl text-4xl font-bold mb-6"><span className='text-yellow-500'>Explore South India:</span> Your Pass, Backpackers Style</h1>
  <p className="text-xl mb-6">Embark on amazing expeditions with our Backpackers United Community with the United Travel Pass. One stop shop for amazing experiences and a lifetime of memories.</p>
 <Link href='/travel-pass/book'> <button className="text-black bg-yellow-400 border border-yellow-400 font-bold py-2 px-4 rounded-full hover:text-yellow-400 hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition-colors duration-300">
      JOIN NOW
  </button></Link>
  
  </div>
  </div>
  </div>
  <div className="bg-black">
  <div className="py-8 px-4 md:px-4">
  {/* Changed text-white to text-black */} {/* Added text-white class */}
  <h2 className="md:text-4xl  text-3xl font-bold text-center mb-5 text-yellow-500">Exclusive Benefits</h2>
  <div className="flex justify-center  md:pb-10 pb-5">
          <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
        </div>
  <p className="text-justify md:mx-6 mb-10 break-words">
  Join the Backpackers United Member community once you avail the travel pass!  It offers you a choice of either 20 treks or tours, each promising unforgettable experiences under Trek pass and Tour passes respectively. You'll also get additional benefits like round-the-clock travel concierge, member only trips, fixed discounts on trips other than the ones included in the pass, customised travel plans, and more. Embrace the extraordinary with Backpackers United, where each experience enriches your travel with amazing perks, making every getaway more than just a trip – it's a journey of discovery and a world full of backpacking enthusiasts!
  </p>
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:gap-6 gap-3 text-black">
  {/* Welcome Bonus Card */}
  <div className="rounded-lg shadow md:p-6 p-4 flex flex-col items-end" style={{ background: 'linear-gradient(to right, #fff59d, #ffeb3b)', color: '#333333' }}>
   
  {/* Image on the right */}
  <div className="mb-4">
  <FontAwesomeIcon icon={faGift} className="text-black text-3xl" />
  </div>
  {/* Text on the left */}
  <div className="text-left">
  <h3 className="text-lg font-semibold mb-2">Giveaway</h3>
  <p>Unlock your adventure with our exclusive giveaway.</p>
  
  </div>
  </div>
  <div className="rounded-lg shadow md:p-6 p-4  flex flex-col items-end h-[250px] md:h-auto" style={{ background: 'linear-gradient(to right, #fff59d, #ffeb3b)', color: '#333333' }}>
   
  {/* Image on the right */}
  <div className="mb-4">
  <FontAwesomeIcon icon={faPercent} className=" text-black text-3xl" />
  </div>
  {/* Text on the left */}
  <div className="text-left text-black ">
  <h3 className="text-lg font-semibold mb-2">Save 50% Today</h3>
  <p>Save 50% Today: Half Price, Full Value!</p>
  </div>
  </div>
  <div className="rounded-lg shadow md:p-6 p-4  flex flex-col items-end h-[250px] md:h-auto" style={{ background: 'linear-gradient(to right, #fff59d, #ffeb3b)', color: '#333333' }}>
   
  {/* Image on the right */}
  <div className="mb-4">
  <FontAwesomeIcon icon={faUserClock} className="text-black text-3xl" />
  </div>
  {/* Text on the left */}
  <div className="text-left text-black">
  <h3 className="text-lg font-semibold mb-2">24/7 Travel Concierge</h3>
  <p>Journey nonstop with our 24/7 concierge service.</p>
  </div>
  </div>
  <div className="rounded-lg shadow md:p-6 p-4 flex flex-col items-end h-[250px] md:h-auto" style={{ background: 'linear-gradient(to right, #fff59d, #ffeb3b)', color: '#333333' }}>
    
  {/* Image on the right */}
  <div className="mb-4">
  <FontAwesomeIcon icon={faLock} className="text-black text-3xl" />
  </div>
  {/* Text on the left */}
  <div className="text-left text-black">
  <h3 className="text-lg font-semibold mb-2">Member Only Invites
  </h3>
  <p>Exclusive Access: Member-Only Minutes.</p>
  </div>
  </div>
  <div className="rounded-lg shadow md:p-6 p-4 flex flex-col items-end h-[250px] md:h-auto" style={{ background: 'linear-gradient(to right, #fff59d, #ffeb3b)', color: '#333333' }}>
    {/* Image on the right */}
  <div className="mb-4">
  <FontAwesomeIcon icon={faTag} className="text-black text-3xl" />
  </div>
  {/* Text on the left */}
  <div className="text-left text-black">
  <h3 className="text-lg font-semibold mb-2">Fixed Discounts
  </h3>
  <p>Fixed Discounts on Extended Trips, Beyond 2D/1N.</p>
  </div>
  </div>
  <div className="rounded-lg shadow md:p-6 p-4 flex flex-col items-end h-[250px] md:h-auto" style={{ background: 'linear-gradient(to right, #fff59d, #ffeb3b)', color: '#333333' }}>
   
  {/* Image on the right */}
  <div className="mb-4">
  <FontAwesomeIcon icon={faSuitcase} className="text-black text-3xl" />
  </div>
  {/* Text on the left */}
  <div className="text-left text-black">
  <h3 className="text-lg font-semibold mb-2">Customized Travel Plans
  </h3>
  <p>Your journey, your way: Customized Travel Plans.</p>
  </div>
  </div>
  <div className="rounded-lg shadow md:p-6 p-4 flex flex-col items-end h-[250px] md:h-auto" style={{ background: 'linear-gradient(to right, #fff59d, #ffeb3b)', color: '#333333' }}>
   
  {/* Image on the right */}
  <div className="mb-4">
  <FontAwesomeIcon icon={faCalendarCheck} className="text-black text-3xl" />
  </div>
  {/* Text on the left */}
  <div className="text-left text-black">
  <h3 className="text-lg font-semibold mb-2">No Blackout Dates
  </h3>
  <p>Travel when you want: No Blackout Dates, no restrictions.</p>
  </div>
  </div>
  <div className="rounded-lg shadow md:p-6 p-4  flex flex-col items-end h-[250px] md:h-auto" style={{ background: 'linear-gradient(to right, #fff59d, #ffeb3b)', color: '#333333' }}>
   
  {/* Image on the right */}
  <div className="mb-4">
  <FontAwesomeIcon icon={faCreditCard} className="text-black text-3xl" />
  </div>
  {/* Text on the left */}
  <div className="text-left text-black">
  <h3 className="text-lg font-semibold mb-2">EMI Option Available
  </h3>
  <p>Budget-friendly with Monthly EMI Options.</p>
  </div>
  </div>
  </div>
  <div className="bg-black text-white pl-auto pr-auto ">
  <div className="container mx-auto md:my-12 mt-12 md:p-6 relative">
  {/* Overlay Title */}
  <div className="relative">
  {/* Image Grid */}
  <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 md:gap-2 gap-1">
  {adventures.slice(0, isMobile ? 6 : adventures.length).map((adventure, index) => (
  <div key={index} className="relative w-full md:h-[150px] h-[100px] ">
  {/* Ensure your images are square by providing the same width and height, or by using aspect-ratio classes */}
  <Image
  src={adventure.src}
  alt={adventure.alt}
  layout="fill"
  objectFit="cover"
  className="rounded-lg"
  />
  </div>
  ))}
  </div>
  
  <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
  <div className="text-white md:text-4xl text-2xl font-bold p-4 bg-black bg-opacity-50 rounded-lg">
  40 DESTINATIONS
  </div>
  </div>
  </div>
  
  
  {/* Stats Section */}
  <div className="flex justify-around md:mt-12 mt-6">
    <div className="text-center">
      <span className="md:text-6xl text-4xl font-bold text-yellow-500">20</span>
      <p className="md:text-xl text-sm font-semibold">TREKS TO</p>
      <p className="md:text-xl text-sm font-semibold">CHOOSE FROM</p>
    </div>
    <div className="text-center">
      <span className="md:text-6xl text-4xl font-bold text-yellow-500">20</span>
      <p className="md:text-xl text-sm font-semibold">TOURS TO</p>
      <p className="md:text-xl text-sm font-semibold">CHOOSE FROM</p>
    </div>
    <div className="text-center">
      <span className="md:text-6xl text-4xl font-bold text-yellow-500">50%</span>
      <p className="md:text-xl text-sm font-semibold">DISCOUNTED</p>
      <p className="md:text-xl text-sm font-semibold">RATES</p>
    </div>
  </div>
  <div className="flex justify-around mt-6">
    <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full border-2 border-yellow-500 hover:bg-black hover:text-yellow-500 hover:border-yellow-500 transition duration-300" onClick={() => setShowEnquiry(true)}>
      Send Enquiry
    </button>
  
  <Link href='/travel-pass/book'> <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full border-2 border-yellow-500 hover:bg-black hover:text-yellow-500 hover:border-yellow-500 transition duration-300">
      Avail Now
    </button></Link> 
  </div>
  
  </div>
  </div>
  </div>
  </div>
  <div className="bg-white py-12">
  <div className="container mx-auto md:px-4">
  <div className="text-center md:mb-10 mb-5 text-black">
  <h2 className="text-2xl font-semibold ">Unlock a World of Adventure with Backpackers United Travel Pass</h2>
  <div className="flex justify-center  pt-3">
          <hr className="border-t-2 border-yellow-500 md:w-[60PX] w-[30px]" />
        </div>
  <p className="mt-4 text-gray-600 text-justify break-words md:mx-6 mx-4">
  Embark on an extraordinary journey with our exclusive Travel Pass. Gain access to over 40 unique travel experiences, designed for adventurous souls seeking exploration, connection, and unforgettable moments. Whether you're yearning for a thrilling trek through breathtaking landscapes or a cultural tour that unveils hidden gems, our Trek and Tour Pass is your key to a seamless backpacking adventure tailored to your wanderlust. More than just a pass, it's your ticket to a world of discovery.</p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-6 px-4" >
  <div className="flex flex-col items-center text-center">
  <h3 className="text-xl font-semibold text-black">Exclusive Travel Deals for Pass holders</h3>
  <div className="flex justify-center  pt-3">
          <hr className="border-t-2 border-yellow-500 md:w-[60PX] w-[30px]" />
        </div>
  <p className="mt-2 text-gray-500 text-justify break-words">
  Unlock savings with our Travel Pass! As a valued member, access exclusive deals on flights, hotels, and vacation packages tailored for memorable and affordable journeys. Our commitment to unbeatable value ensures your membership pays for itself with each incredible adventure.
  </p>
  </div>
  
  <div className="flex flex-col items-center text-center">
  <h3 className="text-xl font-semibold text-black">Personalized Travel Concierge Services</h3>
  <div className="flex justify-center  pt-3">
          <hr className="border-t-2 border-yellow-500 md:w-[60PX] w-[30px]" />
        </div>
  <p className="mt-2 text-gray-500 text-justify break-words">
  Elevate your travel with our concierge! Our dedicated team curates bespoke itineraries, offers insider tips, and assists with queries, ensuring a seamless, stress-free experience for romantic getaways, family vacations, or solo adventures.
  </p>
  </div>
  
  <div className="flex flex-col items-center text-center">
  <h3 className="text-xl font-semibold text-black">Priority Access and Invite only Trips</h3>
  <div className="flex justify-center  pt-3">
          <hr className="border-t-2 border-yellow-500 md:w-[60PX] w-[30px]" />
        </div>
  <p className="mt-2 text-gray-500 text-justify break-words">
  Skip lines with our Travel Pass! Gain privileges like early booking, priority boarding, and fast-track services. Members enjoy special perks, including freebies, exclusive invite-only trips, and merchandise, making your travels extraordinary and exclusive.
  </p>
  </div>
  </div>
  </div>
  </div>
  
  
  {/* Rest of the page content */}
  {/* ... */}
  {/* Make sure to replace < /> with the actual Faq component call and pass the necessary props */}
  {/* <Faq faqItems={faqItems} /> */}
  <div ref={topOfTreksListRef} className="treks-section">
  <div className="relative text-white text-center py-12" style={{ background: 'linear-gradient(to right, #7b4397, #dc2430)' }}>
  {/* Title */}
  <h1 className="md:text-4xl text-3xl font-bold mb-6">TREK PASS</h1>
  <h2 className="md:text-2xl text-xl font-semibold mb-8">20 TREKS TO CHOOSE FROM </h2>
  
  {/* Treks grid */}
  
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {displayedTreks.map((trek, index) => (
            <div key={index} className="bg-white bg-opacity-20 rounded-full px-6 h-[60px] flex justify-center items-center">
              <Link href={`/treks/${trek.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="hover:text-gray-300">{trek}</div>
              </Link>
            </div>
          ))}
        </div>
        {isMobile && treks.length > 5 && (
          <div className="text-center mt-4">
            <button
              onClick={handleViewChangeTreks}
              className="text-yellow-500  font-bold py-2 px-4 rounded"
            >
              {showAllTreks ? 'View Less' : 'View All'}
            </button>
          </div>
        )}
  </div>
  </div>
  {/* Title */}
  
  {/* Tours grid */}
  <div ref={topOfToursListRef} className="tours-section">
  <div className="relative text-white text-center py-12"
  style={{ background: 'linear-gradient(to right, #0000FF, #00FF00)' }}>
  {/* Title */}
  
  <h1 className="md:text-4xl text-3xl font-bold mb-6">TOUR PASS </h1>
  <h2 className="md:text-2xl text-xl font-semibold mb-8">20 TOURS TO CHOOSE FROM</h2>
  
  {/* Tours grid */}
  
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {displayedTours.map((tour, index) => (
            <div key={index} className="bg-white bg-opacity-20 rounded-full px-6 h-[60px] flex justify-center items-center">
              <Link href={`/tours/${tour.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="hover:text-gray-300">{tour}</div>
              </Link>
            </div>
          ))}
        </div>
        {isMobile && tours.length > 5 && (
          <div className="text-center mt-4">
            <button
             onClick={handleViewChangeTours }
              className=" text-yellow-500 font-bold py-2 px-4 rounded"
            >
              {showAllTours ? 'View Less' : 'View All'}
            </button>
          </div>
        )}
  </div>
  </div>
  <div className="bg-black py-12">
  <div className="container mx-auto">
  <h2 className="md:text-4xl  text-3xl font-bold text-center mb-5 text-yellow-500">FAQ's</h2>
  <div className="flex justify-center  md:pb-10 pb-5">
          <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
        </div>
  <div className="flex justify-center mb-6 w-auto border-b border-yellow-500">
  {tabs.map((tab, index) => (
  <button
  key={index}
  className={`md:px-4 px-2 py-2 text-sm sm:text-base md:text-lg border-b-2 ${activeTab === tab ? 'text-yellow-500 border-yellow-500' : 'text-gray-400 border-gray-700'}`}
  onClick={() => setActiveTab(tab)}
  >
  {tab}
  </button>
  ))}
  </div>
  <div className="max-w-4xl mx-auto px-4">
  {faqContent[activeTab]?.map((item, index) => (
  <div key={index} className="mb-4">
  <h3 className="text-xl font-semibold text-gray-200">{index + 1}. {item.question}</h3>
  <p className="text-gray-400 mt-2">{item.answer}</p>
  </div>
  ))}
  </div>
  </div>
  </div>
  {showEnquiry && <EnquiryForm onClose={() => setShowEnquiry(false)}/>}
  <Footer />
  </div>
  );
  };
  export default Page;