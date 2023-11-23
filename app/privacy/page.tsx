'use client'
import Footer from '@/Components/Navbar/Footer/Footer'
import Header from '@/Components/Navbar/Header/Header'
import { motion } from 'framer-motion';
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
        <h1  className="text-center text-6xl text-yellow-500 ">Privacy Policy</h1>
        <div className="pt-2 md:pt-4 mb-6">
          <hr className="border-t-2 border-white md:w-[60px] w-[30px]" />
        </div>
        {/* Centered content */}
        <motion.div className="w-full max-w-6xl mx-auto">
                    <p className="pb-4">Welcome to Backpackers United! Your privacy is important to us, and we are committed to protecting it. This Privacy Policy outlines the types of personal information we collect, how we use it, and the measures we take to safeguard your privacy when you visit our website: https://backpackersunited.in/ (the "Website").
</p>
                    <p className="pb-4">By using our Website and agreeing to this Privacy Policy, you consent to the collection, use, and disclosure of your personal information in accordance with the terms outlined below.
</p>
<motion.h2  className="text-2xl font-bold pb-4">Information We Collect :
</motion.h2>
<motion.h2  className="text-2xl font-bold pb-4">Personal Information
</motion.h2>
            <p>When you use our Website, we may collect personal information that you voluntarily provide, such as your name, email address, phone number, and other contact details. This may occur when you sign up for our newsletter, create an account, or make a booking.
</p>
<motion.h2 className="text-2xl font-bold pb-4">Non-Personal Information
</motion.h2>
<p className="pb-4">We may also collect non-personal information about your visit to our Website, such as your IP address, browser type, operating system, referring website, pages viewed, and other anonymous usage data.
</p>
<p className="pb-4">Full payment is required at the time of booking unless otherwise specified. We accept various payment methods, including credit cards and online payment platforms. By providing your payment information, you authorize us to charge your chosen payment method for the total amount of your booking.
</p>
<motion.h2  className="text-2xl font-bold pb-4">Cookies
</motion.h2>
<p className="pb-4">Our Website uses cookies to enhance your browsing experience and gather information about your usage patterns. Cookies are small text files that are stored on your device. You can manage your cookie preferences through your browser settings.
</p>
<motion.h2  className="text-2xl font-bold pb-4">How We Use Your Information
</motion.h2>
<ul className="list-disc pl-5 pb-4">
  <li>To provide and improve our services.</li>
  <li>To respond to your inquiries and communicate with you.</li>
  <li>To process transactions and bookings.</li>
  <li>To personalize your user experience and tailor content.</li>
  <li>To send periodic emails with news, promotions, and special offers.</li>
  <li>To protect the security and integrity of our Website and services.</li>
  <li>To comply with legal obligations and enforce our policies.</li>
</ul>
<motion.h2 className="text-2xl font-bold pb-4">Sharing and Disclosing Your Information
</motion.h2>
<p className="pb-4">We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted third-party service providers to perform functions and provide services on our behalf, such as payment processing, marketing, and analytics. These third parties are bound by confidentiality agreements and are only permitted to use your information for the specific purposes outlined in this Privacy Policy.
</p>
<motion.h2  className="text-2xl font-bold pb-4">Security
</motion.h2>
<p className="pb-4">We take reasonable precautions to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
</p>
<motion.h2  className="text-2xl font-bold pb-4">Changes to This Privacy Policy
</motion.h2>
<p className="pb-4">We may update this Privacy Policy from time to time. Any changes will be effective when we post the updated policy on our Website. Your continued use of our Website after we post any modifications to the Privacy Policy will constitute your acceptance of those changes.
</p>
<motion.h2  className="text-2xl font-bold pb-4">Contact Us
</motion.h2>
<p className="pb-4">If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
</p>
<p className="pb-4">Backpackers United
</p>
<p className="pb-4">#817 Ground Floor, 10 A main, Indiranagar 1st Stage, Bengaluru- 560038
</p>
<p className="pb-4">Phone Number(s) : +91 83101 80586
</p>
<p className="pb-4">info@backpackersunited.in
</p>
<p className="pb-4">Thank you for trusting Backpackers United with your personal information. We are committed to ensuring your privacy and providing a secure and enjoyable experience on our Website.
</p>
<Link href="/contact">
              <div className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">Join Our Adventures</div>
            </Link>
          </motion.div>
      </motion.div>
      </div>
      <Footer />
      </div>
  );
};
export default page;
