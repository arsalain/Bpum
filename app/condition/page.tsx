'use client'
import Footer from '@/Components/Navbar/Footer/Footer'
import Header from '@/Components/Navbar/Header/Header'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// AboutUs Component
const page = () => {

  return (
    <div className='bg-black text-white flex flex-col min-h-screen'>
    <Header />
    {/* Full width container with flex-grow to push footer to the bottom */}
    <div className='pt-10'></div>
    <div className='flex-grow'>
      <motion.div initial="initial" animate="animate"  className="flex flex-col items-center justify-center px-4 py-6">
        <h1  className="text-center text-6xl text-yellow-500 ">Terms And Conditions</h1>
        <div className="pt-2 md:pt-4 mb-6">
          <hr className="border-t-2 border-white md:w-[60px] w-[30px]" />
        </div>
        {/* Centered content */}
        <motion.div className="w-full max-w-6xl mx-auto">
                    <p className="pb-4">These Terms and Conditions ("Terms") govern your access and use of the website https://backpackersunited.in/ ("Website") and any services provided by Backpackers United ("we", "us", "our"). By accessing, browsing, or using our Website and services, you ("user", "you", "your") agree to be bound by these Terms.</p>
                    <p className="pb-4">Please read these Terms carefully. If you do not agree with any part of these Terms, you must not access or use our Website or services.
</p>
<motion.h2  className="text-2xl font-bold pb-4">Use of the Website</motion.h2>
            <p>By using our Website, you warrant that you are at least 18 years of age and possess the legal authority to enter into these Terms. You agree to use the Website and services only for lawful purposes and in compliance with all applicable laws and regulations. You are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer.
</p>
<motion.h2 className="text-2xl font-bold pb-4">Booking and Payment</motion.h2>
<p className="pb-4">When you make a booking through our Website, you agree to provide accurate, current, and complete information. You are responsible for all charges and fees associated with your booking, including any taxes, levies, or additional fees imposed by third parties.
</p>
<p className="pb-4">Full payment is required at the time of booking unless otherwise specified. We accept various payment methods, including credit cards and online payment platforms. By providing your payment information, you authorize us to charge your chosen payment method for the total amount of your booking.
</p>
<motion.h2  className="text-2xl font-bold pb-4">Cancellations, Changes, and Refunds
</motion.h2>
<p className="pb-4">Cancellation and refund policies may vary depending on the final call taken by the Backpackers United, and it is your responsibility to review these policies before making a booking. In general, cancellations and changes to bookings must be made within the time frame specified by the Backpackers United to be eligible for a refund.</p>
<p className="pb-4">Please note that cancellation fees may apply and that refunds may not be available for certain non-refundable bookings. Any changes or cancellations must be made through our Website or by contacting our customer support.
</p>
<motion.h2  className="text-2xl font-bold pb-4">Travel Insurance
</motion.h2>
<p className="pb-4">We strongly recommend that you purchase comprehensive travel insurance to cover any unforeseen circumstances that may occur during your trip. Travel insurance can help protect you against financial loss in case of trip cancellation, medical emergencies, lost luggage, and other travel-related incidents.</p>
<motion.h2 className="text-2xl font-bold pb-4">Health and Safety
</motion.h2>
<p className="pb-4">You are responsible for considering any health and safety risks associated with your travel and taking appropriate precautions. We recommend that you consult with a healthcare professional before traveling to ensure you are aware of any vaccinations or health precautions that may be necessary.
</p>
<motion.h2  className="text-2xl font-bold pb-4">Limitation of Liability
</motion.h2>
<p className="pb-4">To the maximum extent permitted by law, Backpackers United and its affiliates, partners, and suppliers shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with your use of the Website, services, or these Terms. This limitation applies regardless of the legal theory on which the claim is based and whether we have been advised of the possibility of such damages.
</p>
        
          </motion.div>
      
    
    
      </motion.div>
      </div>
      <Footer />
      </div>
  );
};
export default page;
