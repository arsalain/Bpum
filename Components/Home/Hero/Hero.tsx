'use client'
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
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
const Hero = () => {
  const [changingText, setChangingText] = useState('TRAVEL');
  const words = ['TRAVEL', 'EXPLORE', 'DISCOVER', 'GET OUT', 'FIND PEACE'];
  const [searchInput, setSearchInput] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const fetchData = async () => {
    try {
      // Fetching treks, tours, and destinations
      const trekResponse = await fetch('http://localhost:4000/trek/trek');
      const tourResponse = await fetch('http://localhost:4000/trek/tour');
      const destinationResponse = await fetch('http://localhost:4000/dest');
  
      // Assuming all responses are in the correct format
      const treks = await trekResponse.json();
      const tours = await tourResponse.json();
 
      const destinations = await destinationResponse.json();
  
      const destWithType = destinations.data.map((item: BaseProduct) => ({ ...item, type: 'destinations' })) || [];
      const treksWithType = treks?.map((item: BaseProduct) => ({ ...item, type: 'trek' })) || [];
      const toursWithType = tours?.map((item: BaseProduct) => ({ ...item, type: 'tour' })) || [];
     

      setProducts([...destWithType,...treksWithType, ...toursWithType, ]);

      // console.log("Combined Data: ", combinedData); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSelectProduct = (product: Product) => {
    setSearchInput(product.name);
    setSelectedUrl(`/${product.type}/${product.urllink}`);
    console.log('Selected Product:', product); // Debug log
  };
  

  
  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i = (i + 1) % words.length;
      setChangingText(words[i]);
    }, 2000);
    return () => clearInterval(timer);
  }, []);
 
  return (
    <div className='relative' >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-screen flex items-center justify-center relative"
    >
   <div className=" h-screen w-full absolute">
  <Image src="/home/Hero_image.jpg" alt="Description" layout="fill" objectFit="cover"  />
</div>
      <div className="flex flex-col  items-start  md:w-1/2 absolute top-1/3 left-5 md:top-[40%] md:left-[10%]">
        <motion.h1
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-white md:text-4xl"
        >
          IT'S TIME TO <span className="text-yellow-500">{changingText}</span>
        </motion.h1>
        <motion.p
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-base md:text-lg md:p-2 mt-4 text-white rounded"
        >
          Discover amazing places at exclusive deals!
        </motion.p>
        <div className=" flex flex-row mt-6 ">
      <div className="px-3 py-2 rounded-lg bg-white w-[200px] md:w-[380px] z-10 ">
        <input
          type="text"
          placeholder="Search"
          className="bg-white  text-black outline-none w-full"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
   {Array.isArray(products) && searchInput.length >= 3 && products
              .filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
              .slice(0, 5)
              .map((product, index) => (
                <div 
                  className="text-black cursor-pointer"
                  onClick={() => handleSelectProduct(product)}
                  key={product.id || index}
                >
                  {product.name}
                </div>
              ))
            }


      </div>
      <motion.button
               initial={{ backgroundColor: "#FBBF24", color: "#000" }}
               whileHover={{ backgroundColor: "#000", color: "#FBBF24", scale: 1.05 }}
               transition={{ duration: 0.3 }}
            className="border border-yellow-500  w-[80px] h-[40px] md:w-[90px] rounded-lg ml-2 text-black shadow-lg"
            onClick={() => {
              console.log('Selected URL:', selectedUrl); // Debug log
              if (selectedUrl) {
                window.location.href = selectedUrl;
              } else {
                console.error('URL is not set correctly', selectedUrl);
              }
            }}
          
>
  Explore
      </motion.button>
    </div>
      </div>
      <div className="w-full absolute bottom-0 left-0 bg-black bg-opacity-50">
  <div className="flex justify-evenly items-center text-white py-4">
    <div className="text-center">
      <p className="md:text-4xl text-sm font-bold">
        <CountUp end={4.7} decimals={1} duration={2.75} />
      </p>
      <p className="text-yellow-400 md:text-base text-xs">Google Rating</p>
    </div>
    <div className="text-center">
      <p className="md:text-4xl text-sm font-bold">
        <CountUp end={100141} duration={2.75} separator="," />
      </p>
      <p className="text-yellow-400 md:text-base text-xs">Satisfied Travelers</p>
    </div>
    <div className="text-center">
      <p className="md:text-4xl text-sm  font-bold">
        <CountUp end={180} duration={2.75} />
      </p>
      <p className="text-yellow-400 md:text-base text-xs">Tour Captains</p>
    </div>
    <div className="text-center">
      <p className="md:text-4xl text-sm  font-bold">
        <CountUp end={50} duration={2.75} /> +
      </p>
      <p className="text-yellow-400 md:text-base text-xs">Destinations</p>
    </div>
  </div>
</div>
    </motion.div>
    </div>
  );
}
export default Hero