'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
const Promo = () => {
  return (
    
    <div className='mx-auto max-w-screen-2xl'>
    <div className="flex flex-col md:flex-row justify-between items-stretch w-full md:max-w-screen-2xl md:py-10 pb-10 pt-5  sm:px-6 lg:px-8 xl:px-12 2xl:px-16 ">
      {/* Left Section */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative h-[20rem] md:h-[25rem] flex-grow bg-center rounded-lg shadow-lg md:mr-2  xl:mr-4"
      >
        <Image
          src="/home/promo1.jpg"
          alt="Travel Image"
          layout="fill"
          objectFit="cover"
          className="absolute rounded-lg"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 w-full h-full bg-black bg-opacity-30 text-base md:text-lg lg:text-xl">
          <h2 className="text-xl md:text-3xl font-semibold text-white mb-2">Why we Travel?</h2>
         <Link href='/blogs' > <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-2 px-4 py-2 bg-yellow-400 text-black font-bold rounded-full border-2 border-transparent hover:bg-black hover:text-yellow-400 hover:border-yellow-400 shadow-lg transition duration-300"
          >
            Learn More
          </motion.button></Link>
        </div>
      </motion.div>
      {/* Right Section */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative mt-4 md:mt-0 h-[20rem] md:h-[25rem]  flex-grow bg-center rounded-lg shadow-lg md:ml-2 xl:ml-4"
      >
        <Image
          src="/home/promo2.png"
          alt="Member Image"
          layout="fill"
          objectFit="cover"
          className="absolute rounded-lg"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 w-full h-full bg-black bg-opacity-40 text-base md:text-lg lg:text-xl">
          <h2 className="text-lg md:text-xl font-semibold text-white mb-2">Exclusive Offer!</h2>
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2">Buy our Travel pass and unlock a whopping 50% discount!</h1>
        <Link href="/travel-pass"><motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-full border-2 border-transparent hover:bg-black hover:text-yellow-500 hover:border-yellow-500 shadow-lg transition duration-300"
          >
            Join Now & Save Big!
          </motion.button></Link>  
        </div>
      </motion.div>
    </div>
    </div>
  )
}
export default Promo;