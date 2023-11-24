"use client"
import Destination from '@/Components/Destination/Destination'
import Footer from '@/Components/Navbar/Footer/Footer'
import Header from '@/Components/Navbar/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState,useEffect } from 'react'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Trek from '@/Components/Treks/Trek'
import Image from 'next/image'
const page = () => {
  const [searchInput, setSearchInput] = useState("")
  const [northIndiaTrekTreks, setNorthIndiaTrekTreks] = useState([]);
const [karnatakaTrekTreks, setKarnatakaTrekTreks] = useState([]);
const [keralaTrekTreks, setKeralaTrekTreks] = useState([]);
const [tnTrekTreks, setTnTrekTreks] = useState([]);

useEffect(() => {
  const fetchNorthIndiaTrekTreks = async () => {
    try {
      const response = await fetch('https://launch-api1.vercel.app/trek/northindiatrek');
      const data = await response.json();
      setNorthIndiaTrekTreks(data);
    } catch (error) {
      console.error('Error fetching North India Trek treks:', error);
    }
  };

  // Fetch data for North India Trek treks
  fetchNorthIndiaTrekTreks();
}, []);

useEffect(() => {
  const fetchKarnatakaTrekTreks = async () => {
    try {
      const response = await fetch('https://launch-api1.vercel.app/trek/karnatakatrek');
      const data = await response.json();
      setKarnatakaTrekTreks(data);
    } catch (error) {
      console.error('Error fetching Karnataka Trek treks:', error);
    }
  };

  // Fetch data for Karnataka Trek treks
  fetchKarnatakaTrekTreks();
}, []);

useEffect(() => {
  const fetchKeralaTrekTreks = async () => {
    try {
      const response = await fetch('https://launch-api1.vercel.app/trek/keralatrek');
      const data = await response.json();
      setKeralaTrekTreks(data);
    } catch (error) {
      console.error('Error fetching Kerala Trek treks:', error);
    }
  };

  // Fetch data for Kerala Trek treks
  fetchKeralaTrekTreks();
}, []);

useEffect(() => {
  const fetchTnTrekTreks = async () => {
    try {
      const response = await fetch('https://launch-api1.vercel.app/trek/tntrek');
      const data = await response.json();
      setTnTrekTreks(data);
    } catch (error) {
      console.error('Error fetching TN Trek treks:', error);
    }
  };

  // Fetch data for TN Trek treks
  fetchTnTrekTreks();
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
          src="/destination/Trek.webp"
          alt="Background"
          layout="fill"
          objectFit="cover"  // This will cover the entire div area
          quality={100}
        />
      </div>
      {/* <div className='relative h-[50vh] text-white font-bold text-center flex flex-col justify-center items-center  border-t-2 border-b-2 border-gray-700'> */}
      <div className='relative z-10 w-[80%] flex flex-col justify-center items-center'>
     <div className='text-xl md:text-4xl'>Treks</div> 
      <div className="flex items-center bg-white  md:w-1/2 rounded-xl p-1 border-2 border-gray-200 mt-4">
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
          <h2 className="text-center text-xl md:text-3xl font-bold text-yellow-500">Treks in Karnataka</h2>
          <div className="flex justify-center pt-2 md:pt-5">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
        </div>
    <div className='pt-10'>
      <Trek trek={karnatakaTrekTreks} name="trek" uniqueId="Karnataka" />
    </div>
 </div>
 <div className=' mx-10 pt-10'>
 <div className="text-center md:text-center">
          <h2 className="text-center text-xl md:text-3xl font-bold text-yellow-500">Treks in Kerala</h2>
          <div className="flex justify-center pt-2 md:pt-5">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
        </div>
    <div className='pt-10'>
    <Trek trek={keralaTrekTreks} name="trek" uniqueId="kerala" />
    </div>
 </div>
 <div className=' mx-10 py-10'>
 <div className="text-center md:text-center">
          <h2 className="text-center text-xl md:text-3xl font-bold text-yellow-500">Treks in Tamil Nadu</h2>
          <div className="flex justify-center pt-2 md:pt-5">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
        </div>
    <div className='pt-10'>
    <Trek trek={tnTrekTreks}  name="trek" uniqueId="tamilnadu" />
    </div>
 </div>
 <div className=' mx-10 py-10'>
 <div className="text-center md:text-center">
          <h2 className="text-center text-xl md:text-3xl font-bold text-yellow-500">Treks of North India</h2>
          <div className="flex justify-center pt-2 md:pt-5">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
        </div>
    <div className='pt-10'>
    <Trek trek={northIndiaTrekTreks} name="trek" uniqueId="northindia" />
    </div>
 </div>
      <Footer />
    </div>
  )
}

export default page
