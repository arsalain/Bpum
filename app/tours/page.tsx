"use client"
import Footer from '@/Components/Navbar/Footer/Footer'
import Header from '@/Components/Navbar/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,useEffect } from 'react'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Trek from '@/Components/Treks/Trek'
import Image from 'next/image'
import Link from 'next/link'
interface Product {
  id: string;
  name: string;
  _id: string;
  urllink: string;
  type: 'trek' | 'tour' | 'destinations'; 
}
interface BaseProduct {
  id: string;
  name: string;
  _id: string;
  urllink: string;
  type: 'trek' | 'tour' | 'destinations'; 
}
const page = () => {
  const [groupTourTreks, setGroupTourTreks] = useState([]);
  const [longTourTreks, setLongTourTreks] = useState([]);
  const [internationalTreks, setInternationalTreks] = useState([]);
  const [northIndiaTourTreks, setNorthIndiaTourTreks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
      try {
          const trekResponse = await fetch('http://localhost:4000/trek/trek');
          const tourResponse = await fetch('http://localhost:4000/trek/tour');
          const destinationResponse = await fetch('http://localhost:4000/dest');

          const treks = await trekResponse.json();
          const tours = await tourResponse.json();
          const destinations = await destinationResponse.json();

          const destWithType = destinations.data.map((item: BaseProduct) => ({ ...item, type: 'destinations' })) || [];
          const treksWithType = treks?.map((item: BaseProduct) => ({ ...item, type: 'trek' })) || [];
          const toursWithType = tours?.map((item: BaseProduct) => ({ ...item, type: 'tour' })) || [];
         
    
          setProducts([...destWithType,...treksWithType, ...toursWithType, ]);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);
  useEffect(() => {
        const fetchGroupTourTreks = async () => {
          try {
            const response = await fetch('https://launch-api1.vercel.app/trek/grouptour');
            const data = await response.json();
            setGroupTourTreks(data);
          } catch (error) {
            console.error('Error fetching Group Tour treks:', error);
          }
        };
        
        // Fetch data for Group Tour treks
        fetchGroupTourTreks();
 
  }, []);
  useEffect(() => {
    const fetchLongTourTreks = async () => {
      try {
        const response = await fetch('https://launch-api1.vercel.app/trek/longtour');
        const data = await response.json();
        setLongTourTreks(data);
      } catch (error) {
        console.error('Error fetching Long Tour treks:', error);
      }
    };
  
    // Fetch data for Long Tour treks
    fetchLongTourTreks();
  }, []);
  
  // Fetch data for International treks
  useEffect(() => {
    const fetchInternationalTreks = async () => {
      try {
        const response = await fetch('https://launch-api1.vercel.app/trek/international');
        const data = await response.json();
        setInternationalTreks(data);
      } catch (error) {
        console.error('Error fetching International treks:', error);
      }
    };
  
    // Fetch data for International treks
    fetchInternationalTreks();
  }, []);
  
  // Fetch data for North India Tour treks
  useEffect(() => {
    const fetchNorthIndiaTourTreks = async () => {
      try {
        const response = await fetch('https://launch-api1.vercel.app/trek/northindiatour');
        const data = await response.json();
        setNorthIndiaTourTreks(data);
      } catch (error) {
        console.error('Error fetching North India Tour treks:', error);
      }
    };
  
    // Fetch data for North India Tour treks
    fetchNorthIndiaTourTreks();
  }, []);

  
  return (
    <div className='bg-black'>
      <Header />
      <div className='h-[60px] '>
      </div>
      <div className='relative h-[50vh] w-full text-white font-bold text-center flex flex-col justify-center items-center border-t-2 border-b-2 border-gray-700'>
      {/* Background Image */}
      <div className='absolute top-0 left-0 w-full h-full z-0'>
        <Image
          src="/destination/Tour.webp"
          alt="Background"
          layout="fill"
          objectFit="cover"  // This will cover the entire div area
          quality={100}
        />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div> 
      </div>
      {/* <div className='relative h-[50vh] text-white font-bold text-center flex flex-col justify-center items-center  border-t-2 border-b-2 border-gray-700'> */}
      <div className='relative z-10 w-[80%] flex flex-col justify-center items-center'>
     <div className='text-xl md:text-4xl'>Tours</div> 
     <div className="flex flex-col  bg-white  md:w-1/2 rounded-xl p-1 border-2 border-gray-200 mt-4">
        <div className='flex flex-row justify-between'>
                <input
                    type="text"
                    placeholder="Search for amazing destations"
                    className="flex-grow p-2 outline-none text-black"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                />
     
                <button className="text-black p-2">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
                </button>
            </div>
            <div className='flex flex-col items-start pl-2'>
            {Array.isArray(products) && searchInput.length >= 3 && products
                .filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
                .slice(0, 5)
                .map((product, index) => (
                    <div className="text-black cursor-pointer" key={product.id || index}>
                        <Link href={`/${product.type}/${product.urllink}`}>
                            <div className="text-black">{product.name}</div>
                        </Link>
                    </div>
                ))
            }
            </div>
            </div>
      </div>
</div>


            {/* {searchResult.filter(item => {
                const searchTerm = searchInput.toLowerCase()
                const fullname = item.name.toLowerCase()
                return searchTerm && fullname.startsWith(searchTerm)
            }).map((list) => (
                <div className="p-4 font-bold">
                    <Link href={list.link}>
                        <div className="no-underline text-black">{list.name}</div>
                    </Link>
                </div>
            ))} */}
      
 <div className=' mx-10 pt-10'>
 <div className="text-center md:text-center">
          <h2 className="text-center text-xl md:text-3xl font-bold text-yellow-500">Weekend Group Tours</h2>
          <div className="flex justify-center pt-2 md:pt-5">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
        </div>
    <div className='pt-10'>
      <Trek trek={groupTourTreks} name="tour" uniqueId="Karnataka" />
    </div>
 </div>
 <div className=' mx-10 pt-10'>
 <div className="text-center md:text-center">
          <h2 className="text-center text-xl md:text-3xl font-bold text-yellow-500">Long Weekend Tours</h2>
          <div className="flex justify-center pt-2 md:pt-5">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
        </div>
    <div className='pt-10'>
    <Trek trek={longTourTreks} name="tour"  uniqueId="kerala" />
    </div>
 </div>
 <div className=' mx-10 py-10'>
 <div className="text-center md:text-center">
          <h2 className="text-center text-xl md:text-3xl font-bold text-yellow-500">International Tours</h2>
          <div className="flex justify-center pt-2 md:pt-5">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
        </div>
    <div className='pt-10'>
    <Trek trek={internationalTreks} name="tour"   uniqueId="tamilnadu" />
    </div>
 </div>
 <div className=' mx-10 py-10'>
 <div className="text-center md:text-center">
          <h2 className="text-center text-xl md:text-3xl font-bold text-yellow-500">North Indian Tours</h2>
          <div className="flex justify-center pt-2 md:pt-5">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
        </div>
    <div className='pt-10'>
    <Trek trek={northIndiaTourTreks} name="tour"   uniqueId="northindia" />
    </div>
 </div>
      <Footer />
    </div>
  )
}

export default page
