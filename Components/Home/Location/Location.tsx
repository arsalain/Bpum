'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
const LocationListSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const internationalLocations = ["Bhutan", "Cambodia", "Dubai", "Indonesia", "Maldives", "Singapore", "Sri Lanka", "Thailand", "Vietnam"];
  const northIndianLocations = ["Agra", "Bir", "Darjeeling", "Delhi", "Gangtok", "Haridwar", "Jaipur", "Jodhpur", "Kasol", "Kullu", "Leh", "Manali", "Mussoorie", "Meghalaya", "Rishikesh", "Shimla", "Spiti", "Srinagar", "Udaipur"];
  const southIndianLocations = ["Alleppey", "Bangalore", "Chennai", "Chikmagalur", "Coorg", "Dandeli", "Goa", "Gokarna", "Hampi", "Kochi", "Kannur", "Kodaikanal", "Mangalore", "Mysore", "Munnar", "Murdeshwar", "Ooty", "Pondicherry", "Sakleshpur", "Thekkady", "Vagamon", "Varkala", "Wayanad"];
  const getUrlForLocation = (location: string) => {
    return `/destinations/${location.replace(/\s+/g, '-').toLowerCase()}`;
  };
  const displayLocations = (locations: string[]) => (
    <div className="flex flex-wrap justify-center">
      {locations.map((location, idx) => (
        <motion.div
          key={idx}
          className="m-2 cursor-pointer"
          whileHover={{ scale: 1.2, color: '#FFC34D' }}
          whileTap={{ scale: 0.9 }}
        >
          <Link href={getUrlForLocation(location)} className="text-white hover:text-yellow-500">
            {location}
          </Link>
        </motion.div>
      ))}
    </div>
  );
  return (
    <div className="bg-black text-white py-8 border-b border-gray-700">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl mb-6 text-yellow-500">Our Locations
        <div className="flex justify-center pt-2 md:pt-2">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
        </h2>
        <div className="text-lg mb-6">
          <span onClick={() => setActiveCategory('all')} className={activeCategory === 'all' ? 'underline cursor-pointer' : 'cursor-pointer' }>All</span> <span className='text-yellow-500'>|</span>
          <span onClick={() => setActiveCategory('international')} className={activeCategory === 'international' ? 'underline cursor-pointer' : 'cursor-pointer'}> International</span> <span className='text-yellow-500'>|</span>
          <span onClick={() => setActiveCategory('northIndian')} className={activeCategory === 'northIndian' ? 'underline cursor-pointer' : 'cursor-pointer'}> North Indian</span> <span className='text-yellow-500'>|</span>
          <span onClick={() => setActiveCategory('southIndian')} className={activeCategory === 'southIndian' ? 'underline cursor-pointer' : 'cursor-pointer'}> South Indian</span>
        </div>
        <div className="text-gray-300 text-sm">
          {activeCategory === 'all' || activeCategory === 'international' ? displayLocations(internationalLocations) : null}
          {activeCategory === 'all' || activeCategory === 'northIndian' ? displayLocations(northIndianLocations) : null}
          {activeCategory === 'all' || activeCategory === 'southIndian' ? displayLocations(southIndianLocations) : null}
        </div>
      </div>
    </div>
  );
};
export default LocationListSection;