'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF,  faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Header from '@/Components/Navbar/Header/Header';
import Footer from '@/Components/Navbar/Footer/Footer';
declare global {
    interface Window {
      google: {
        maps: {
          Map: new (element: HTMLElement, options: object) => any;
          // Add other Google Maps types as needed
        };
      };
    }
  }
  
const Page = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
        script.async = true;
        script.defer = true;
        script.onload = function () {
          const mapElement = document.getElementById('map');
          if (window.google && window.google.maps && mapElement) {
            new window.google.maps.Map(mapElement as HTMLElement, {
              center: { lat: 12.977323, lng: 77.638101 },
              zoom: 20,
            });
          }
        };
        document.head.appendChild(script);
      }, []);
      

    return (
        <div className='flex flex-col min-h-screen bg-black'>
          <Header />
          {/* Added top padding and centered content */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex-grow container mx-auto px-4 py-12 md:py-24"
          >
              <motion.h1
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center text-4xl text-yellow-500 mb-6"
              >
                  Contact Us
              </motion.h1>
              <div className="bg-yellow-500 h-1 w-24 mx-auto mb-10"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                  >
                      {/* Content sections have additional padding */}
                      <div className="space-y-8 mb-8 p-4 bg-gray-800 rounded-lg shadow-md">
                          {/* Each section now has its own card-like container for better visual separation */}
                          <div>
                              <h2 className="text-2xl text-yellow-500 mb-2">Address:-</h2>
                              <p className="text-white">Backpackers United, #817 Ground Floor, 10 A main, Indiranagar 1st Stage, Bengaluru- 560038</p>
                          </div>
                          <div>
                              <h2 className="text-2xl text-yellow-500 mb-2">Sales:-</h2>
                              <p className="text-white">For questions about our products, group bookings, or special requests, please reach out to our sales team.</p>
                              <p className="text-white">
                                  Email: <a href="mailto:info@backpackersunited.in" className="hover:text-yellow-500">info@backpackersunited.in</a><br />
                                  Phone: <a href="tel:+918310180586" className="hover:text-yellow-500">+91 8310180586</a>
                              </p>
                          </div>
                          <div>
                              <h2 className="text-2xl text-yellow-500 mb-2">Support:-</h2>
                              <p className="text-white">For questions about our products, group bookings, exclusive travel pass or special requests, please reach out to our sales team.</p>
                              <p className="text-white">
                                  Email: <a href="mailto:info@backpackersunited.in" className="hover:text-yellow-500">info@backpackersunited.in</a><br />
                                  Phone: <a href="tel:+919364099494" className="hover:text-yellow-500">+91 9364099494</a>
                              </p>
                          </div>
                          <div>
                              <h2 className="text-2xl text-yellow-500 mb-2">Stay Connected:-</h2>
                              <p className="text-white mb-4">Follow us on social media to stay updated on the latest adventures, offers, and travel stories.</p>
                              <div className="flex space-x-4">
                                  {/* Social icons now have a background hover effect */}
                                  <a href="https://www.facebook.com/backpackersunited1/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-yellow-500 transition-colors">
                                      <FontAwesomeIcon icon={faFacebookF} className="text-white text-3xl" />
                                  </a>
                                  <a href="https://api.whatsapp.com/send/?phone=918310180586&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-yellow-500 transition-colors">
                                      <FontAwesomeIcon icon={faWhatsapp} className="text-white text-3xl" />
                                  </a>
                                  <a href="https://www.instagram.com/backpackers_united_/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-yellow-500 transition-colors">
                                      <FontAwesomeIcon icon={faInstagram} className="text-white text-3xl" />
                                  </a>
                              </div>
                          </div>
                      </div>
                  </motion.div>
  
                  <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col space-y-8 p-4 bg-gray-800 rounded-lg shadow-md"
                  >
                      {/* Form and map also have their own card-like container */}
                      <div>
                          <h2 className="text-3xl text-yellow-500 mb-4">Get in Touch</h2>
                          <form className="flex flex-col gap-4 max-w-md">
                              <input type="text" placeholder="Your Name" className="p-2 bg-white rounded-md shadow-md" />
                              <input type="email" placeholder="Your Email" className="p-2 bg-white rounded-md shadow-md" />
                              <textarea placeholder="Your Message" className="p-2 bg-white h-32 rounded-md shadow-md"></textarea>
                              <button type="submit" className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors">Submit</button>
                          </form>
                      </div>
                      <div className="flex-grow">
                          <div id="map" style={{ height: '100%', width: '100%' }}></div>
                      </div>
                  </motion.div>
              </div>
          </motion.div>
          <Footer />
        </div>
      );
  };
  export default Page;