'use client'
import Header from '@/Components/Navbar/Header/Header'
import { useState, useEffect,  FC  } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign,faCircle, faMountainSun, faPersonHiking, faHotel, faMapLocationDot, faAngleDown, faAngleUp, faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import Booking from '@/Components/Book/Book'
import Footer from '@/Components/Navbar/Footer/Footer';
import EnquiryForm from '@/Components/Book/EnquiryForm';

interface PageProps {
  params: {
      name: string;
  }
}
interface Data {
  name:String;
  amount: number;
  batch: Batch[];
  day: string;
  days: DayDetail[];
  expectpara: string[];
  expecthead1: string;
  expecthead1para: string;
  expecthead2: string;
  expecthead2para: string;
  // Include all other fields as per your data structure
  faq: FAQ[];
  for: string;
  fromamount: number;
  over:string[];
  included: string[];
  notincluded: string[];
  itinerary: string;
  lead1name: string;
  level:string;
  levelname:string;
  // ... continue for all fields
  relatedtreks: Product[]; // If related treks are similar to products
  reserveamount: number;
  service: string;
  servicename: string;
  state: string;
  statename: string;
  statetype: string;
  testimage: string;
  things: string[];
  trektype: string;
  trektypename: string;
  _id: string;
}
interface Product {
  urllink: string;
  testimage: string;
  testimagealt: string;
  day: string;
  amount: number;
  name: string;
  service?: string;
  servicename?: string;
  level?: string;
  levelname?: string;
  state?: string;
  statename?: string;
}
interface Batch {
  date: string;
  amount: number;
  _id: string;
}
interface DayDetail {
  day: string;
  cityName: string;
  description: string[]; // or a more detailed object if needed
  image: string;
  imagealt:string;
  meals: string;
  _id?: string;
}
interface FAQ {
  question: string;
  answer: string;
}

const page : FC<PageProps> = ({ params })=> {
    const [openDay, setOpenDay] = useState<null | number>(null);
    const [openItem, setOpenItem] = useState<null | number>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [data, setData] = useState<Data | null>(null);
    const [openSection, setOpenSection] = useState<string[]>([]);
    const [showEnquiry, setShowEnquiry] = useState(false);
    const toggleSection = (sectionName: string) => {
      if (openSection.includes(sectionName)) {
        // If the section is already open, close it
        setOpenSection(openSection.filter((section) => section !== sectionName));
      } else {
        // If the section is closed, open it
        setOpenSection([...openSection, sectionName]);
      }
    };
    const [expanded, setExpanded] = useState(false);

    // Function to toggle the expanded state
    const toggleExpanded = () => {
      setExpanded(!expanded);
    };
  
    // Determine the number of batches to show
    const batches = data?.batch || [];
    const displayedBatches = expanded ? batches : batches.slice(0, 2);
    // const toggleSection = (section) => {
    //     if (openSection === section) {
    //         setOpenSection(null);
    //     } else {
    //         setOpenSection(section);
    //     }
    // }
    const name = params.name
    console.log(name,"id")
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:4000/trek/trek/${name}`);
        const data = await response.json();
        console.log("ata",data)
        setData(data);
      };
  
      if (name) {
        fetchData();
      }
    }, [name])
    const toggleItem = (index:number) => {
      if (openItem === index) {
        setOpenItem(null);
      } else {
        setOpenItem(index);
      }
    };
  
    const toggleOpen = (day: number) => {
      if (openDay === day) {
        setOpenDay(null);
      } else {
        setOpenDay(day);
      }
    };
    const faq = [
      {
        question: "What is the number of participants on a trip?",
        answer: "For our tours, we typically host 12-20 travelers in a single batch. If the number of travelers exceeds this range, we organize them into multiple batches for a better experience. For trekking adventures, our groups usually consist of 20-30 travelers per batch, with the possibility of slightly larger groups during long weekends."
      },
      {
        question: "Do your trips have any age limitations?",
        answer: "Yes, we have an age restriction in place, requiring participants to be 18 years or older. However, if guardians or parents are accompanying the group, they are welcome to bring their children along for the trek or tour."
      },
      {
        question: "How can I reserve my slot?",
        answer: "You can directly reserve your slots by booking on the website, please ensure proper dates are selected before confirming your booking."
      },
      {
        question: "Is it safe for Women travelers?",
        answer: " Safety and Security Guidelines are followed at all times, and it is our topmost priority. We have certified trek leads (Male/Female) accompanying the participants at all times and our stay follows well-rounded safety measures."
      },
      {
        question: "What payment options do I have?",
        answer: "We have multiple payment options on the website that you can refer to."
      }
    ];
    if (!data) {
      return <div>Loading...</div>;
  }
  return (
    <div >
        <Header />
     
    <div className='flex flex-col'>
      
      <div className=" h-screen w-full relative ">
        <Image src={`http://localhost:4000/uploads/${data.testimage}`}  alt="kudremukha" layout="fill" objectFit="cover" className='absolute' /> 
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div> 
           <div className='absolute left-0 bottom-0 w-full' >

           <h1 className='text-3xl md:text-5xl text-white font-bold pl-10 pb-5'>{data.name}</h1>
            <div className="flex flex-col md:flex-row items-center justify-center py-4 md:pl-10 px-4 w-full bg-black mx-auto">
          {/* <div className='flex flex-row pb-4 md:pb-0'> */}
          <div className="text-white md:w-[15rem] w-auto mt-6 md:mt-0 ">
            <div className='flex flex-row md:flex-col' >
            <div className="font-bold md:text-xl text-lg">{data.day}</div>
            <div className="flex flex-row  items-center md:text-base text-lg md:pl-0 pl-2 text-yellow-500">{data.for} <FontAwesomeIcon icon={faIndianRupeeSign} className='text-sm w-4 h-4 ' /> {data.fromamount}</div>
            </div>
           <Link href="#date"> <div className="underline">View All Dates & Prices</div></Link>
          </div>
      
            {/* </div> */}
          <div className="grid grid-cols-2 md:grid-cols-4  p-1  text-white rounded-lg">
          <div className="flex flex-row items-center md:w-[13rem] mt-6 md:mt-0">
            <FontAwesomeIcon icon={faMountainSun} className='md:w-8 md:h-8 w-6 h-6' /> 
            <div className='flex flex-col pl-4' >
              <span className='text-yellow-500'>{data.trektype}</span>
              <span>{data.trektypename}</span>
              </div>
            </div>
            <div className="flex flex-row items-center md:w-[13rem] mt-6 md:mt-0">
            <FontAwesomeIcon icon={faPersonHiking} className='md:w-8 md:h-8 w-6 h-6'/> 
            <div className='flex flex-col pl-4' >
              <span className='text-yellow-500'>{data.level}</span>
              <span>{data.levelname}</span>
              </div>
            </div>
            <div className="flex flex-row items-center md:w-[13rem] mt-6 md:mt-0">
            <FontAwesomeIcon icon={faHotel} className='md:w-8 md:h-8 w-6 h-6'/> 
            <div className='flex flex-col pl-4' >
              <span className='text-yellow-500'>{data.service}</span>
              <span>{data.servicename}</span>
              </div>
            </div>
            <div className="flex flex-row items-center md:w-[6rem] mt-6 md:mt-0">
            <FontAwesomeIcon icon={faMapLocationDot} className='md:w-8 md:h-8 w-6 h-6' /> 
            <div className='flex flex-col pl-4' >{/* Replace with your icon */}
              <span className='text-yellow-500'>{data.state}</span>
              <span>{data.statename}</span>
              </div>
            </div>
          </div>
          { data && data.batch && data.batch.length > 1 &&      <div className="hidden  md:flex justify-center items-center ">
          <button className="bg-yellow-500 text-black px-6 py-2 rounded-md"   onClick={() => setShowPopup(true)}> BOOK NOW</button>
        </div> }
        </div>
      </div>
      </div>
   
     
      
      <div className="flex md:h-screen md:sticky md:top-0 ">
            <div className="hidden md:block md:w-1/4 min-h-screen bg-gray text-black p-4  " >
          
                <Link href="#expedition-overview">
                    <span className="block  hover:font-bold p-2">Overview</span>
                </Link>
                <Link href="#iternary">
                    <span className="block mb-2 hover:font-bold px-2">Itinerary</span>
                </Link>
                <Link href="#what">
                    <span className="block mb-2 hover:font-bold px-2">What to Expect</span>
                </Link>
                <Link href="#date">
                    <span className="block mb-2 hover:font-bold px-2">Dates and Prices</span>
                </Link>
                <Link href="#inclu">
                    <span className="block mb-2 hover:font-bold px-2">What's Included</span>
                </Link>
                <Link href="#things">
                    <span className="block mb-2 hover:font-bold px-2">Things to Carry</span>
                </Link>
                <Link href="#faq">
                    <span className="block  hover:font-bold px-2">FAQ's</span>
                </Link>
                        <div className="border-t-2 border-gray-300 mt-4 mb-1"></div>

                        { data && data.batch && data.batch.length > 1 &&     <button className="w-full py-4 bg-yellow-500 hover:bg-black border-2 hover:text-yellow-500 border-yellow-500  rounded"   onClick={() => setShowPopup(true)}>BOOK NOW</button> }
      <div className="text-center mt-6">Call <a href="tel:+919364099494" className='text-yellow-500 font-bold hover:underline '>+91 93640-99494</a></div>
      <button className="w-full my-4 mt-4  text-xl text-yellow-500 font-bold hover:underline " onClick={() => setShowEnquiry(true)}>Send Enquiry</button>
                {/* Add other links similarly */}
            </div>
            <div className="ml-1/4 md:w-3/4 w-full overflow-y-auto">
            <section id="expedition-overview">
                <div className="bg-white md:p-10 p-4 text-black">
                    <div className="border-b-2 border-gray-300 md:py-8 py-2">
                        <div className="flex justify-between items-center md:hidden">
                           {/* hidden on medium and above screens */}
                            <h1 className="text-2xl font-bold md:mb-6 mb-2">OVERVIEW</h1>
                            <button onClick={() => toggleSection("expedition")} className='text-xl'>
                            {openSection.includes("expedition")  ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                            </button>
                        </div>
                        {openSection.includes("expedition")  && (
                            <div className="md:hidden"> {/* hidden on medium and above screens */}
                                <SpecialOffers />
                                <FeatureList data={data} />
                            </div>
                        )}
                        <div className="hidden md:block"> {/* shown only on medium and above screens */}
                        <div className="flex items-left">
      <div className="bg-yellow-500 w-1 h-6 mr-4 mt-[6px]"></div>
                            <h1 className="text-3xl font-bold mb-6">OVERVIEW</h1>
                            </div>
                            <SpecialOffers />
                            <FeatureList data={data} />
                        </div>
                    </div>
                </div>
                </section>
        <section id="itinerary">
    <div className="bg-white md:p-10 p-4 pt-0 md:pt-0 text-black">
        <div className="border-b-2 border-gray-300 md:pb-8 py-1">
            <div className="flex justify-between items-center md:hidden"> {/* hidden on medium and above screens */}
                <h1 className="text-2xl font-bold md:mb-6 mb-2">ITINERARY</h1>
                <button onClick={() => toggleSection("itinerary")} className='text-xl'>
                    {openSection.includes("itinerary")  ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </button>
            </div>
            {openSection.includes("itinerary") && (
                <div className="md:hidden"> {/* hidden on medium and above screens */}
                    <p className="text-gray-600 mb-10">{data.itinerary}</p>
                    <div className="container mx-auto">
                        {data && data.days && data.days.map((days, index) => (
                            <div key={index} className="border-b pb-4 mb-4">
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleOpen(index + 1)}>
                                    <h3 className="text-xl font-semibold">{days.day} : {days.cityName}</h3>
                                    <span>{openDay === index + 1 ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />}</span>
                                </div>
                                {openDay === index + 1 && (
                                    <div className="mt-4">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="flex-1 p-4 pl-0 pt-0 ">
                                                {days && days.description && days.description.map((des, index) => (
                                                    <p key={index} className="mb-1 flex flex-row">
                                                        <FontAwesomeIcon icon={faCircle} className='w-[5px] h-[5px] pr-2 pt-[9px]' />
                                                        {des}
                                                    </p>
                                                ))}
                                                <p className="font-semibold pt-4">Meals : {days.meals}</p>
                                            </div>
                                            {days.image &&
                                                  <div className="w-auto h-40 relative rounded-lg mx-4 ">
                                                  <Image
                                                      src={`http://localhost:4000/uploads/${days.image}`}
                                                      alt={days.imagealt}
                                                    layout='fill'
                                                    objectFit='cover'
                                                  className='rounded-lg'
                                                  />
                                              </div>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="hidden md:block"> 
            <div className="flex items-left">
      <div className="bg-yellow-500 w-1 h-6 mr-4 mt-[6px]"></div>
                <h1 className="text-3xl font-bold mb-6">ITINERARY</h1>
                </div>
                <p className="text-gray-600 mb-10">{data.itinerary}</p>
                <div className="container mx-auto">
                    {data && data.days && data.days.map((days, index) => (
                        <div key={index} className="border-b pb-4 mb-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleOpen(index + 1)}>
                            <h3 className="text-xl font-semibold">{days.day} : {days.cityName}</h3>
                            <span>{openDay === index + 1 ? <FontAwesomeIcon icon={faCaretUp} className='pr-6'/> : <FontAwesomeIcon icon={faCaretDown} className='pr-6'/>}</span>
                        </div>
                        {openDay === index + 1 && (
                            <div className="mt-4">
                                <div className="flex flex-col md:flex-row">
                                    <div className="flex-1 p-4 pl-0 pt-0 ">
                                        {days && days.description && days.description.map((des, index) => (
                                            <p key={index} className="mb-1 flex flex-row">
                                                <FontAwesomeIcon icon={faCircle} className='w-[5px] h-[5px] pr-2 pt-[9px]' />
                                                {des}
                                            </p>
                                        ))}
                                        <p className="font-semibold pt-4">Meals : {days.meals}</p>
                                    </div>
                                    {days.image &&
                                        <div className="w-full md:w-1/3 h-40 relative rounded-lg overflow-hidden">
                                            <Image
                                                src={`http://localhost:4000/uploads/${days.image}`}
                                                alt={days.imagealt}
                                              layout='fill'
                                              objectFit='cover'
                              
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
)}
  </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
</section>
<section id="what">
        <div className="mx-auto bg-white md:p-10 p-4 pt-0 md:pt-0">
        <div className="border-b-2 border-gray-300 md:pb-8 py-1">
          <div className="flex justify-between  md:hidden">
            <h1 className="text-2xl  font-bold pb-2 ">WHAT TO EXPECT</h1>
            <button onClick={() => toggleSection("expect")} className="text-xl">
              {openSection.includes("expect") ? (
                <FontAwesomeIcon icon={faAngleUp} />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} />
              )}
            </button>
          </div>
          {openSection.includes('expect')  && (
            <div className="md:hidden py-2">
              <ExpectContent data={data} />
            </div>
          )}
          <div className="hidden md:block">
          <div className="flex items-left">
      <div className="bg-yellow-500 w-1 h-6 mr-4 mt-[6px]"></div>
            <h1 className="text-3xl font-bold mb-6">WHAT TO EXPECT</h1>
            </div>
            <ExpectContent data={data} />
          </div>
        </div>
        </div>
      </section>
                <section id="date">
    <div className="bg-white md:p-10 p-4 pt-0 md:pt-0">
    <div className="border-b-2 border-gray-300 md:pb-8 py-1">
        <div className="flex justify-between items-center md:hidden"> {/* hidden on medium and above screens */}
            <h2 className="text-2xl font-bold mb-2">DATES & PRICES</h2>
            <button onClick={() => toggleSection("date")} className='text-xl'>
                {openSection.includes("date")  ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
            </button>
        </div>
        {openSection.includes("date") && (
            <div className="md:hidden"> {/* hidden on medium and above screens */}
                <DateContent data={data} expanded={expanded} toggleExpanded={toggleExpanded} displayedBatches={displayedBatches} setShowEnquiry={setShowEnquiry} setShowPopup={setShowPopup} />
            </div>
        )}
        <div className="hidden md:block"> 
        <div className="flex items-left">
      <div className="bg-yellow-500 w-1 h-6 mr-4 mt-[6px]"></div>
            <h2 className="text-3xl font-bold mb-6">DATES & PRICES</h2>
            </div>
            <DateContent data={data} expanded={expanded} toggleExpanded={toggleExpanded} displayedBatches={displayedBatches} setShowEnquiry={setShowEnquiry} setShowPopup={setShowPopup} />
        </div>
    </div>
    </div>
</section>
 <section id='inclu'>
 <div className="flex justify-between md:p-10 md:pt-0 p-4 pt-0 mx-auto bg-white">
 <div className='border-b-2 border-gray-300 md:pb-8 py-1'>
 <div className="flex justify-between items-center md:hidden"> 
 <h2 className="text-2xl font-bold mb-4">INCLUSIONS AND EXCLUSIONS</h2>
 <button onClick={() => toggleSection("inclu")} className='text-xl'>
                {openSection.includes("inclu")  ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
            </button>
        </div>
        {openSection.includes("inclu") && (
            <div className="md:hidden"> {/* hidden on medium and above screens */}
                <IncluContent data={data} />
            </div>
        )}
        <div className="hidden md:block"> 
        <div className="flex items-left">
      <div className="bg-yellow-500 w-1 h-6 mr-4 mt-[6px]"></div>
            <h2 className="text-3xl font-bold mb-6">INCLUSIONS AND EXCLUSIONS</h2>
            </div>
            <IncluContent data={data} />
        </div>
      </div>
    </div>
   
 </section>
 <section id="things">
    <div className="bg-white md:p-10 p-4 pt-0 md:pt-0">
        <div className="border-b-2 border-gray-300 md:pb-8 py-1">
            <div className="flex justify-between items-center md:hidden"> {/* hidden on medium and above screens */}
                <h2 className="text-2xl font-bold mb-2">THINGS TO CARRY</h2>
                <button onClick={() => toggleSection("things")} className='text-xl'>
                    {openSection.includes("things") ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </button>
            </div>
            {openSection.includes("things") && (
                <div className="md:hidden"> {/* hidden on medium and above screens */}
                    <ThingsContent data={data} />
                </div>
            )}
            <div className="hidden md:block">
            <div className="flex items-left">
      <div className="bg-yellow-500 w-1 h-6 mr-4 mt-[6px]"></div>
                <h2 className="text-3xl font-bold mb-6">THINGS TO CARRY</h2>
                </div>
                <ThingsContent data={data} />
            </div>
        </div>
    </div>
</section>

 <section id='faq'>
  <div className='md:p-10 md:pt-0 p-4 bg-white '>
  <div className='border-b-2 border-gray-300 md:pb-8 pb-4'>
  <div className="flex items-left">
      <div className="bg-yellow-500 w-1 h-6 mr-4 mt-[6px]"></div>
 <h2 className="text-2xl font-semibold mb-6 ">FAQs</h2>
 </div>
 {faq.map((faq, index) => (
             <div key={index} className="mb-4 p-4 border rounded-lg shadow-md">
             <div className="flex justify-start items-center cursor-pointer" onClick={() => toggleItem(index)}>
               <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                 {openItem === index ? '−' : '+'}
               </div>
               <span className="font-medium text-lg">{faq.question}</span>
             </div>
             {openItem === index && <p className="mt-2 ml-14 text-gray-600">{faq.answer}</p>}
           </div>
      ))}
    </div>
    </div>
 </section>
                <section >
                <div className="container mx-auto md:p-10 p-4 md:pt-0 bg-white">
                <div className="flex items-left">
      <div className="bg-yellow-500 w-1 h-6 mr-4 mt-[6px]"></div>
      <h2 className="text-2xl font-semibold mb-6 ">RELATED TRIPS</h2>
      </div>
      <div className='relative px-6'>
        {/* Trip 1 */}
        <Swiper
        spaceBetween={30}
        slidesPerView={4}
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
        // scrollbar={{ draggable: true }}
        // className="overflow-visible"
        modules={[ Navigation]}
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
            slidesPerView: 3,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {data && data.relatedtreks && data.relatedtreks.map((related, index) => (
       
            <SwiperSlide key={index}>
                 <Link  href={`/trek/${related.urllink}`} >
        <div className="border rounded-lg overflow-hidden ">
          <Image
            src={`http://localhost:4000/uploads/${related.testimage}`}
            alt={related.testimagealt}
            style={{ height: '200px' }}
            width={400} 
            height={300} 
          />
          <div className="p-4 bg-white">
            <div className="mb-4 border-b pb-2 flex justify-between">
              <div className="text-lg font-semibold">{related.day}</div> <div><FontAwesomeIcon icon={faIndianRupeeSign} className='text-sm w-4 h-4 pt-1 ' />{related.amount}</div> 
            </div>
            <h3 className="font-semibold text-xl mb-3">{related.name}</h3>
            {related.service &&   <p><strong>{related.service}</strong> : {related.servicename}</p>}
            {related.level &&   <p><strong>{related.level}</strong> : {related.levelname}</p>}
            {related.state &&   <p><strong>{related.state}</strong> : {related.statename}</p>}
          </div>
        </div>
        </Link> 
        </SwiperSlide>
     
        ))}
             </Swiper>
             <div className="flex justify-between mt-4">
      <button className="swiper-button-prev flex items-center justify-center w-5 h-5 left-0 text-white shadow-md rounded-full bg-black">
</button>
<button className="swiper-button-next flex items-center justify-center w-5 h-5 text-white  shadow-md rounded-full bg-black ">
</button>
      </div>
    </div>
    </div>

                </section>
                {/* Add other content sections similarly */}
            </div>
        </div>
    </div>
    <Footer />
    <div className="fixed bottom-0 left-0 w-full bg-yellow-500 p-4 md:hidden z-10">
      <div className="flex justify-center space-x-4">
        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowEnquiry(true)}>Send Enquiry</button>
        <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={() => setShowPopup(true)}>Book Now</button>
      </div>
    </div>
    {showPopup && <Booking  onClose={() => setShowPopup(false)} Batch={data.batch} reserveamount={data.reserveamount} foramount={data.amount} withoutamount={data.fromamount} name={data.name.toString()}/> }
    {showEnquiry && <EnquiryForm onClose={() => setShowEnquiry(false)}/>}
    </div>
  )
}
const SpecialOffers = () => (
  <div className="shadow-md p-4 md:p-6 rounded-md mb-6 relative border border-gray-400">
      <h2 className="text-sm font-semibold mb-2">SPECIAL OFFERS</h2>
      <p>Experience Unbeatable Prices: Unleash exclusive travel advantages and Enjoy Up to 50% Off On Your Next Weekend Getaway!</p>
     <Link href='/travel-pass'> <button className="mt-2 text-yellow-500 hover:underline">AVAIL NOW</button></Link>
  </div>
);
interface FeatureListProps {
  data: Data;
}
const FeatureList: FC<FeatureListProps> =({ data }) => (
  <>
      {data && data.over && data.over.map((over, index) => (
          <div key={index} className='mb-2'>{over}</div>
      ))}
  </>
);
interface ExpectProps {
  data: Data;
}
const ExpectContent: FC<ExpectProps> = ({ data }) => (
  <>
    <p className="text-gray-600 mb-6">{data.expectpara}</p>
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">{data.expecthead1}</h2>
      <p className="text-gray-600 mb-6">{data.expecthead1para}</p>
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-4">{data.expecthead2}</h2>
      <p className="text-gray-600">{data.expecthead2para}</p>
    </div>
  </>
);
interface DateContentProps {
  displayedBatches: Batch[];
  toggleExpanded: () => void;
  data: Data;
  expanded: boolean;
  setShowEnquiry: (show: boolean) => void;
  setShowPopup: (show: boolean) => void;
}

const  DateContent: FC<DateContentProps> = ({ displayedBatches, toggleExpanded, data, expanded, setShowEnquiry, setShowPopup }) => (
  <div>
     { data && data.batch && data.batch.length > 1 && (
      <div>
      <div className="border-b border-gray-300 mb-4 p-2">
          <h3>Batches</h3>
      </div>
      {displayedBatches.map((batch, idx) => (
        <div key={idx} className="flex md:justify-between md:items-center flex-col md:flex-row border-b border-gray-300 bg-gray-200 mb-4 p-4 gap-2">
          <div>
            <p className="text-lg font-bold">{batch.date}</p>
          </div>
          <div>
            <div className='flex flex-row'>  
              <FontAwesomeIcon icon={faIndianRupeeSign} className='text-sm w-4 h-4 pt-1 ' />
              {batch.amount} /- Per Person
            </div>
          </div>
          <div className='flex flex-row gap-4'>
            <div className="cursor-pointer">
              <button className='bg-gray-500 py-2 px-10 rounded-lg text-white' onClick={() => setShowEnquiry(true)}>Send Enquiry</button>
            </div>
            <div className="cursor-pointer">
              <button className='bg-yellow-500 py-2 px-10 rounded-lg' onClick={() => setShowPopup(true)}>Book Now</button>
            </div>
          </div>
        </div>
      ))}

      {data && data.batch && data.batch.length > 2 && (
        <div className="text-center my-4">
          <button
            onClick={toggleExpanded}
            className="border border-black text-black py-2 px-10 rounded-lg "
          >
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      )}
      </div>
     )
      }
      <div className="text-sm text-gray-500">
          <p>For more information, please dont hesitate to give us a call at <a href="tel:+919364099494" className='text-yellow-500 font-bold hover:underline '>+91 93640-99494</a></p>
      </div>
  </div>
);
interface IncluContentProps {
  data: Data;
}
const IncluContent: FC<IncluContentProps> = ({ data }) => (
  <div className='flex flex-col md:flex-row m-2 md:m-0'>
      <div className="md:w-1/2 w-full pr-4">
        <h2 className="mb-4 text-lg font-bold">WHAT'S INCLUDED</h2>
        <div>
           {data && data.included && data.included.map((included, idx) => (
            <div key={idx} className="mb-2 list-decimal flex flex-row "><FontAwesomeIcon icon={faCircle} className='w-[5px] h-[5px] pr-2 pt-[9px] text-yellow-500' />{included}</div>
          ))}
        </div>
      </div>
      <div className="hidden md:block border-l-2 border-gray-300 mx-4"></div>
      <div className="md:w-1/2 w-full md:pl-4 ">
        <h2 className="mb-4 text-lg font-bold">WHAT'S NOT INCLUDED</h2>
        <div>
        {data && data.notincluded && data.notincluded.map((notincluded, idx) => (
            <div key={idx} className="mb-2 list-decimal flex flex-row "><FontAwesomeIcon icon={faCircle} className='w-[5px] h-[5px] pr-2 pt-[9px] text-yellow-500' />{notincluded}</div>
          ))}
        </div>
        </div>
      </div>
);
interface ThingsContentProps {
  data: Data;
}
const ThingsContent: FC<ThingsContentProps> = ({ data }) => (
  <div className="md:mt-10 m-2 md:m-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {data && data.things && data.things.map((things, idx) => (
              <div key={idx} className="flex flex-row">
                  <FontAwesomeIcon icon={faCircle} className='w-[5px] h-[5px] pr-2 pt-[9px] text-yellow-500' />{things}
              </div>
          ))}
      </div>
  </div>
);

export default page

