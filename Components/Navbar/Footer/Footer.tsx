'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faWhatsapp, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const sections = [
  {
    title: 'LEGAL',
    links: [
      { text: 'Terms of Use', url: '/terms' },
      { text: 'Privacy Policy', url: '/privacy' },
      { text: 'Terms & Conditions', url: '/condition' },
    ],
  },
  {
    title: 'QUICK LINKS',
    links: [
      { text: 'Destinations', url: '/destinations' },
      { text: 'Book a Trip', url: '/destinations' },
      { text: 'International Trip', url: '/destinations' },
    ],
  },
  {
    title: 'JOIN US',
    links: [
      { text: 'About Us', url: '/about' },
      { text: 'Careers', url: '/career' },
      { text: 'Partner with Us', url: '/partner' },
    ],
  },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="bg-black text-white "
    >
      <div className="flex flex-col md:flex-row md:justify-around md:items-center py-6 px-4">
        {/* Logo and Social Media Icons */}
        <div className="flex flex-col items-start md:items-center mb-8 md:mb-0 space-y-4">
        <div className="flex flex-row items-center space-x-4">
  <Link href='/'>
  <motion.div whileHover={{ scale: 1.1 }}>
        <Image src="/home/bplogo.jpg" alt="logo image" className="rounded-full mt-3" width={40} height={40} />
      </motion.div>
  </Link>
    <div className="flex flex-col items-center relative">
    <Link href='/'>
        <motion.div whileHover={{ scale: 1.05 }} className="text-[22px] font-semibold text-white">
          BACKPACKERS
        </motion.div>
      
  
      <div className="flex items-center absolute inset-x-0 bottom-[-10px] ">
            <div className="flex-1 h-0.5 bg-white"></div> {/* Left line */}
            <motion.div whileHover={{ scale: 1.05 }} className="text-[12px] font-semibold uppercase tracking-widest text-red-600 mx-[2px]">
              United
            </motion.div>
            <div className="flex-1 h-0.5 bg-white"></div> {/* Right line */}
          </div>
      </Link>
     
  </div>
</div>
       
   {/* <div className="flex items-center">
          <div className="border-t border-white flex-grow"></div> 
          <motion.div whileHover={{ scale: 1.05 }} className="text-sm font-bold text-red-600 px-2">
            UNITED
          </motion.div>
          <div className="border-t border-red-600 flex-grow"></div>
        </div> */}
          {/* Social Media Icons */}
          <div className="hidden md:flex md:space-x-6 md:text-xl md:pt-4">
            <motion.a href="https://www.facebook.com/backpackersunited1/" className="text-white hover:text-yellow-500" whileHover={{ scale: 1.4 }}>
              <FontAwesomeIcon icon={faFacebookF} />
            </motion.a>
            <motion.a href="https://wa.me/message/PV2UGBFUYENKD1" className="text-white hover:text-yellow-500" whileHover={{ scale: 1.4 }}>
              <FontAwesomeIcon icon={faWhatsapp} />
            </motion.a>
            <motion.a href="https://www.instagram.com/backpackers_united_/" className="text-white hover:text-yellow-500" whileHover={{ scale: 1.4 }}>
              <FontAwesomeIcon icon={faInstagram} />
            </motion.a>
            <motion.a href="https://www.linkedin.com/company/backpackers-united/mycompany/" className="text-white hover:text-yellow-500" whileHover={{ scale: 1.4 }}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </motion.a>
          </div>
       </div>
       
          <div className="grid grid-cols-2 md:grid-cols-4  " >
        {sections.map((section, index) => (
  <motion.div key={section.title} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }} className="flex flex-col md:items-center md:mb-8 mb-4 md:space-y-2 space-y-0">
    <h2 className="font-semibold md:text-xl text-lg ">{section.title}</h2>
    <div className="flex justify-center pb-2">
        <hr className="border-t-2 border-yellow-500 md:w-[30PX] w-[10px]" />
      </div>
    <ul className="flex flex-col md:items-center md:space-y-2 space-y-0 mt-1">
      {section.links.map((link) => (
        <motion.li key={link.text} className="relative group hover:text-yellow-500" whileHover={{ y: -4, scale: 1.05 }}>
          <Link href={link.url} className="relative z-10  text-xs md:text-base">{link.text}</Link>
          <motion.div className="absolute h-[2px] bg-yellow-500 left-0 right-0 bottom-0 opacity-0 transform -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.div>
        </motion.li>
      ))}
    </ul>
  </motion.div>
))} 
<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 }} className="flex flex-col  md:space-y-4 space-y-2 overflow-x-hidden">
<div className="flex items-left">
      <div className="bg-yellow-500 w-1 h-5 mr-4 mt-1"></div>
  <h2 className="font-semibold md:text-xl  text-lg md:mb-1">CONTACT US</h2>
  </div>
  <Link href="tel:+918310180586" >
  <div className="flex flex-col md:items-left relative group p-1">
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex md:items-center md:space-x-3 space-x-1 z-10">
      <FontAwesomeIcon icon={faPhone} className="text-white group-hover:text-black" />
      <div className="text-xs group-hover:text-black md:text-lg relative">+91 8310180586</div>
    </motion.div>
    <motion.div className="absolute h-full w-full bg-yellow-500 left-0 top-0 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out"
    ></motion.div> 
  </div></Link>
  <Link href="mailto:info@backpackersunited.in" className="hover:text-yellow-500">
  <div className="flex flex-col items-center  relative group md:p-1">
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex items-center md:space-x-3 space-x-1 z-10">
      <FontAwesomeIcon icon={faEnvelope} className="text-white group-hover:text-black" />
      <div className="text-xs md:text-lg group-hover:text-black relative" >info@backpackersunited.in</div>
    </motion.div>
    <motion.div className="absolute h-full w-full bg-yellow-500 left-0 top-0 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out"
    ></motion.div> 
  </div></Link>
</motion.div>
      </div>
      </div>
      <div className="md:hidden flex space-x-6  text-lg items-center justify-center pt-4 border-t-2 border-white" >
      <motion.a href="https://www.facebook.com/backpackersunited1/" className="text-white hover:text-yellow-500" whileHover={{ scale: 1.4 }}>
              <FontAwesomeIcon icon={faFacebookF} />
            </motion.a>
            <motion.a href="https://wa.me/message/PV2UGBFUYENKD1" className="text-white hover:text-yellow-500" whileHover={{ scale: 1.4 }}>
              <FontAwesomeIcon icon={faWhatsapp} />
            </motion.a>
            <motion.a href="https://www.instagram.com/backpackers_united_/" className="text-white hover:text-yellow-500" whileHover={{ scale: 1.4 }}>
              <FontAwesomeIcon icon={faInstagram} />
            </motion.a>
            <motion.a href="https://www.linkedin.com/company/backpackers-united/mycompany/" className="text-white hover:text-yellow-500" whileHover={{ scale: 1.4 }}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </motion.a>
      </div>
      <div className="text-center text-sm md:mt-6 mt-4 px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          2023 Backpackers United Copyright Information
        </motion.div>
        </div> 
    </motion.footer>
  );
}

export default Footer;