'use client'
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { faQuoteLeft, faQuoteRight} from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';
const testimonials = [
    {
        name: 'SANDEEP GANGULY',
        content: 'Recently went on a trip to Wayanad organised by Backpackers United. We made new friends, had fun, explored new places, gained new experiences and memories. The arrangements done by the team was too good. Also a shoutout to our trip leader Suraj for making the trip so memorable. Also would like to thank Tejas and Ashwin for being so supportive in the booking process.',
        rating: 5,
      },
      {
        name: 'KESAVAN R',
        content: 'Netravathi trek with Backpackers United was lit:fire::fire:. We had great memories. Much recommended. Kudos to trek leads, well planned and executed.',
        rating: 4,
      },
      {
        name: 'DEEPTI VIJE',
        content: 'Went on a 3 day trip to Coorg Mysore with BU and had the best time making new friends and exploring new places. Everything was well coordinated from the start till end with a neatly planned itinerary and a special shoutout to our trip captain Suraj for making this an even more amazing memorable experience!',
        rating: 5,
      },
      {
        name: 'KRITIKA SRIVASTAVA',
        content: 'Had a wonderful experience!! It was my first trip without family, just with a friend to Wayanad. And the place is just amazing and beautiful. Special kudos to the Backpackers United team. What a team!! These guys were amazing. The way they managed and all the arrangements were fantastic. They were very supportive, friendly and fun. Really looking forward to many more trips with them.',
        rating: 5,
      },
      {
        name: 'JASEELA JALEEL',
        content: 'I m so happy that I chose Backpackers United for my netravati trek. Even though we all started as strangers this trip have given me a bunch of friends with the same vibe. The trek leads (Hemanth and Keerthan) has done an amazing job, they kept us together and made sure that we enjoy every moment of this trek.Thank you Backpackers united for this wonderful experience and I am gonna come back again.:koala:',
        rating: 5,
      },
      {
        name: 'AAKASH DONGRE',
        content: 'One of the best solo trip i had till now, the trip was very professionally managed by Backpackers united Team and our trip lead Pradeep was very flexible just like a family and would guide you about the places which they showcase you with utmost zeal. Accommodations and food was osm.',
        rating: 5,
      },
      {
        name: 'SAYESHA KALE',
        content: 'This was the first time I travelled with Backpackers United and I had an amazing experience. I went to Chikkamagaluru trip with them it was worth every penny their itinerary is perfect for a weekend trip. I would specially thank my Trip Lead Jaswanth to be so supportive, friendly and managing everything on time. I have already recommended them to my friends. And cannot wait to plan another weekend trip with them',
        rating: 5,
      },
      {
        name: 'SHARMILA V',
        content: 'I fully enjoyed my 2days of trip which was very very comfortable and safe. Jeep safari travel was too good. The most important part is the trekking, where I faced many difficulties but still sreekanth(trek lead)who helped me a lot in all the ways he can. The only reason to reach the view was him. The team helped us in all the ways. The stay and the food was also too good. Campfire was also a added fun. Thoroughly enjoyed the 2whole days trip. Thank you backpackers united..!!',
        rating: 5,
      },
      {
        name: 'R ANITHA BT',
        content: 'Completely enjoyed this trip with backpackers to Kodaikanal :heart: our guide Abhishek was the best! He mingled with us very well, made us feel very comfortable. Overall had an amazing experience  :skin-tone-2:,  if you want to make everlasting memories, choose backpackers!',
        rating: 4,
      },
      {
        name: 'DHIMAN GOSH',
        content: 'It was a nice experience with BU at wayanad and special thanks to pranav who was very patient ,helpful and humble and most importantly dedicated for his job and work ! Overall experience was enriching and will look forward for  next trip with backpackers !',
        rating: 5,
      },
      {
        name: 'GEETANJALI DESHMUKH',
        content: 'Hey, guys plan your next trip with Backpakers United, my first time experience was super cool. We went to Dandeli & Dhudhdagar trek with cute compact group of people and the trek coordinator Pradeep Bhardwaj took care of everything and everyone. So thankyou Backpakers United, will look forward for more such amazing trips with you guys:heart:',
        rating: 5,
      },
      {
        name: 'JAINIT SHARMA',
        content: 'It was brilliant experience with Backpackers United. Trekking experience was just amazing with the entire group becoming one big family. Treak leads were amazing and special shout to Hemanth Prabhakar and Keerthan K L for making sure that entire team makes it to Netravati Peak. If you are considering to treak consider Backpackers United',
        rating: 5,
      },
      {
        name: 'JAHNAVI KIRAN',
        content: 'Adventures trek to Paithalmala peak accompanied by lots of leaches :confounded: and :rain_cloud: . The stay was pleasing with delicious food. An amazing experience and came with bag full of memories   :heavy_heart_exclamation_mark_ornament::revolving_hearts:',
        rating: 5,
      },
      {
        name: 'CHARISHMA JALLA',
        content: 'It was fun joining backpackers_united. The trek leads were too understanding, helpful and kind. The stay (hotel) which they have provided was unbelievable. I strongly recommend backpackers_united for trips for treks.',
        rating: 5,
      },
      {
        name: 'TAMARA ROBINS',
        content: 'One of the best treks I have been on. It was well organised and led by experienced and enthusiastic trek guides. The homestay was near, served local kannadiga food and was located at the foothills, providing an exceptionally beautiful view of the Shola hills and the coffee plantations beside it. All in all, it was worth every penny.',
        rating: 5,
      },
      {
        name: 'SIVANI GOVINI',
        content: 'Its my second time with backpackers. This time I went to paithalmala which is very beautiful. Suraj and Mohammed were our trek guides. They were so friendly and caring. Thanks backpackers for this wonderful memories. Looking forward!!!',
        rating: 5,
      },
      {
        name: 'RAHUL CHAUHAN',
        content: 'Keerthan, baby and other trek leads were  were awesome. It was a truly enjoyable experience. I would recommend united backpackers again.',
        rating: 5,
      }
];
const TestimonialSection = () => {
  // const containerRef = useRef(null);
  const controls = useAnimation();
  const [pauseScroll, setPauseScroll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
  
    if (!scrollContainer) return;
  
    const scrollTestimonials = () => {
      if (pauseScroll) return;
      if (scrollContainer.scrollTop >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
        controls.start({
          opacity: 0,
          transition: { duration: 0.5 },
        }).then(() => {
          scrollContainer.scrollTop = 0;
          controls.start({
            opacity: 1,
            transition: { duration: 0.5 },
          });
        });
      } else {
        scrollContainer.scrollTop += 2;
      }
    };
  
    const scrollTimer = setInterval(scrollTestimonials, 50);
  
    return () => {
      clearInterval(scrollTimer);
    };
  }, [controls, pauseScroll]);
  
  
     return (
    <motion.section
      initial={{ backgroundColor: 'white' }}
      animate={{ backgroundColor: 'black' }}
      transition={{ duration: 1 }}
      className="text-white  flex flex-col items-center md:mt-6 "
    >
           <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl md:text-4xl font-semibold mb-4 text-center text-yellow-500"
      >
        What Our Customers Say
        <div className="flex justify-center pt-2 md:pt-5">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
      </motion.h2>
      <div className='relative md:p-16 md:px-8  py-10' >
      <div className='absolute md:top-5 md:left-10 top-3 left-3 text-xl md:text-4xl text-yellow-500'><FontAwesomeIcon icon={faQuoteLeft} /></div>
      <div className='absolute md:bottom-8 md:right-10 bottom-3 right-3 text-xl md:text-4xl text-yellow-500'><FontAwesomeIcon icon={faQuoteRight} /></div>
 
      <div
        ref={containerRef}
        className="relative flex flex-wrap justify-center overflow-hidden rounded-lg shadow-lg md:h-[600px] h-[400px] bg-black"
        style={{ overflowY: 'scroll' }}
        onMouseEnter={() => setPauseScroll(true)}
        onMouseLeave={() => setPauseScroll(false)}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative bg-gradient-to-r from-gray-900 to-black rounded-lg shadow-lg md:p-4 p-1 m-2 flex-none w-[100px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-auto text-white"
          >
            <div className="flex items-center mb-4">
              {/* <div className="w-10 h-10 bg-cover rounded-full" style={{ backgroundImage: "url('https://i.picsum.photos/id/237/200/300.jpg')" }}></div> */}
              <h3 className="md:text-xl text-sm font-semibold md:ml-4 ml-1">{testimonial.name}</h3>
            </div>
            <p className="md:text-base text-xs mb-4">{testimonial.content}</p>
            <div className="text-yellow-500 flex">
              {Array.from({ length: testimonial.rating }, (_, index) => (
                <FontAwesomeIcon icon={faStar} key={index} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </motion.section>
  );
};
export default TestimonialSection;