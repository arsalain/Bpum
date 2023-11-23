'use client'
import Footer from '@/Components/Navbar/Footer/Footer'
import Header from '@/Components/Navbar/Header/Header'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
const Page = () => {
  // Initialize state for the form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    position: '',
    whyHire: '',
  });
 const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Your signup logic goes here
  };
  return (
    <div className='bg-black text-white flex flex-col  '>
      <Header />
      <div className='pt-10'></div>
      <div className='flex-grow mx-auto'>
      <div className="flex items-center  pt-8">
      <div className="bg-yellow-500 w-1 h-16 mr-8 self-center"></div>
      <h1 className="text-7xl inline-block">
      Careers
      </h1>
      <span className="text-yellow-500 text-9xl inline-block  relative" style={{top: '-0.1em'}}>.</span>
    </div>
    <motion.div initial="initial" animate="animate" className="flex px-4 ">
            {/* Content on the left side */}
            <div className="flex flex-col items-start w-full max-w-6xl">
            <div className="pt-2 md:pt-4 mb-6">
              <hr className="border-t-2 border-white md:w-[60px] w-[30px]" />
            </div>
            {/* The rest of your content */}
            <motion.div>
            <motion.h2  className="text-2xl font-bold pb-4">Who We Are
</motion.h2>
              <p>Backpackers United is a passionate community of travelers who believe in the transformative power of travel. We're dedicated to empowering backpackers across the globe with resources, tips, and a supportive network of fellow adventurers.
</p>
<motion.h2  className="text-2xl font-bold pb-4">Why Join Us
</motion.h2>
<p>Working with Backpackers United means becoming part of a vibrant, innovative team that's committed to redefining the backpacking experience. Our team members enjoy:
</p>
              <p>Our team members enjoy:</p>
              <ul className="list-disc pl-5 pb-4">
  <li>The opportunity to shape the future of backpacking and travel.</li>
  <li> A collaborative and supportive work environment.</li>
  <li>The chance to meet and learn from fellow travel enthusiasts.</li>
  <li> Flexible work arrangements to support your own travel aspirations.</li>
</ul>
<motion.h2  className="text-2xl font-bold pb-4">Open Roles
</motion.h2>
              <p>We are currently looking for talented individuals to join our team in the following roles:
</p>
<motion.h2  className="text-2xl font-bold pb-4">Content Creators:
</motion.h2>
              <p>Do you have a knack for storytelling and a passion for travel? We're looking for writers and photographers to help bring backpacking experiences to life</p>
              <motion.h2  className="text-2xl font-bold pb-4">Community Managers:
</motion.h2>
              <p>Help us foster and grow our community of backpackers. Experience in social media and community engagement is a plus.</p>
              <motion.h2  className="text-2xl font-bold pb-4">Partnership Managers:
</motion.h2>
              <p>We're looking for individuals to cultivate and manage relationships with our travel and gear partners.</p>
              <motion.h2  className="text-2xl font-bold pb-4">How to Apply
</motion.h2>
<p>Interested in one of our open positions? Send us your resume and a brief cover letter explaining why you'd be a great fit for Backpackers United. Email your application to info@backpackersunited.in.</p>
<p>Please note that while we appreciate all applications, only those selected for an interview will be contacted.</p>
<p>We're excited to hear from you!
</p>
 <div className="md:w-1/2 md:pr-8">
              {/* ... (rest of your content) */}
              <Link href="/contact">
                <div className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Join Our Adventures</div>
              </Link>
              </div>
            </motion.div>
          </div>
          {/* Image on the right side */}
       
        </motion.div>
       {/* Form on the right side below the image */}
      {/* Form on the right side below the image */}
      <div className='flex flex-row'>
      <div className="md:w-1/2 mt-4 md:mt-20">
    <Image src="/destination/Careers.jpg" alt="Image Alt Text" width={500} height={250} />
  </div>
      <form onSubmit={handleSignup} className="md:w-1/2 max-w-md p-4 mt-4">
    <div>     <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
               type="text"
               id="fullName"
               name="fullName"
               value={formData.fullName}
               onChange={handleChange}
               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
               required
             />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              What Position are you looking for?
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="whyHire" className="block text-sm font-medium text-gray-700">
              Why should we hire you?
            </label>
            <textarea
              id="whyHire"
              name="whyHire"
              value={formData.whyHire}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit Application
            </button>
          </div>
        </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Page;
