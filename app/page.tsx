import PopularDestinations from '@/Components/Home/Destinations/PopularDestinations'
import Footer from '@/Components/Navbar/Footer/Footer'
import Header from '@/Components/Navbar/Header/Header'
import Hero from '@/Components/Home/Hero/Hero'
import Image from 'next/image'
import TestimonialSection from '@/Components/Home/Testimonials/Testimonials'
import Promo from '@/Components/Home/Promo/Promo'
import TrekSlider from '@/Components/Home/Trekslider/Trekslide'
import Popular from '@/Components/Home/Popular/Popular'
import LocationListSection from '@/Components/Home/Location/Location'


export default function Home() {
  return (
    <main className="flex flex-col bg-black">
      <div >
    <Header />
    <Hero />
    <section className='mx-auto md:px-10 px-4' data-aos="fade-up">
    <Popular />
    </section>
     <section className="md:pb-10 pb-5" data-aos="fade-up">
  <div className="mx-auto md:px-10 px-4">
    <div className="flex flex-wrap items-center justify-center md:mb-10 mb-5 space-y-5 md:space-y-0 md:space-x-5">
      <div className="flex-none">
        <div className="text-center md:text-center">
          <h2 className="text-center text-xl md:text-3xl font-bold text-yellow-500">International Destinations</h2>
          <div className="flex justify-center pt-2 md:pt-5">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
        </div>
      </div>
    </div>
    
    <div className="md:pt-3 ">

      <PopularDestinations />
  
    </div>
  </div>

</section> 

<div className='md:mx-10 mx-6 mt-4'>
<div className="text-center md:text-center">
          <h2 className="text-xl md:text-3xl font-bold text-yellow-500  ">Adventure Explorations</h2>
          <div className="flex justify-center pt-2 md:pt-5 md:pb-10">
        <hr className="border-t-2 border-white md:w-[60PX] w-[30px]" />
      </div>
  <TrekSlider />
  </div>
</div>
<section data-aos="fade-up">
<div className='mx-4'>
    <Promo />
  </div>

</section>
<section data-aos="fade-up">
<TestimonialSection />
</section>
<section data-aos="fade-up">
<LocationListSection />
</section>
    <Footer />
      </div>
    </main>
  )
}
