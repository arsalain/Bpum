
"use client";
import Head from 'next/head';
import { useState } from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import AccordionItem from '@/Components/Member/Accordian/Accordianitem';
import Footer from '@/Components/Navbar/Footer/Footer';
import Header from '@/Components/Navbar/Header/Header';

interface FormData {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    phonenumber: string;
    passtype: string;
  }
  
const page = () => {

  const [formData, setFormData] = useState<FormData>({
    // State for form data (as an example)
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: '',
    passtype: ''
  });

  // Generate an array of 20 items for the MembershipCard lists
  const formatDate = (date: Date) => {
    let dd: number | string = date.getDate();
    let mm: number | string = date.getMonth() + 1; // January is 0!
    const yyyy = date.getFullYear();
  
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
  
    return dd + '/' + mm + '/' + yyyy;
  };
  

// Calculate today's date
const today = new Date();
const activationDate = formatDate(today);

// Calculate expiring date (6 months from today)
today.setMonth(today.getMonth() + 6);
const expiringDate = formatDate(today);


  const [membershipPrice, setMembershipPrice] = useState(0); // Default price for BACKPACKER

//   const [gstRate, setGstRate] = useState(0.05);
  const getGstFirst = () => {
    return membershipPrice * 0.05;
  };
  
  const getTotalFirst = () => {
    return membershipPrice + getGstFirst();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'passtype') {
        if (value === 'Trek Pass') {
          setMembershipPrice(1); // Updated Trek Pass price
        } else if (value === 'Tour Pass') {
          setMembershipPrice(21000); // Updated Tour Pass price
        } else {
          setMembershipPrice(9999);
        }
      }
      
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    await initiateAndPayMembership();
};

  const initiateAndPayMembership = async () => {
    const loadRazorpayScript = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => initializeMembershipPayment().catch(console.error); // Call the payment initialization function when the script is loaded
        document.head.appendChild(script);
    };
console.log("hey charlie")
    const initializeMembershipPayment = async () => {
 
        // Replace with the correct URL and amount calculation logic for membership
        console.log("hey saad")
        const resInitiate = await fetch('http://localhost:4000/member/initiatePayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalamount: getTotalFirst().toFixed(2) }) 
        });

        const dataInitiate = await resInitiate.json();

        const options = {
            key: process.env.RAZORPAY_KEY_ID, // Ensure this is configured correctly
            amount: getTotalFirst().toFixed(2),
            currency: 'INR',
            name: 'Your App Name',
            description: 'Membership Transaction',
            order_id: dataInitiate.orderId,
            handler: async function (response: {
                razorpay_order_id: string;
                razorpay_payment_id: string;
                razorpay_signature: string;
            }) 
               {
                // Handle the response after payment
                const resVerify = await fetch('http://localhost:4000/member/verifyPayment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature
                    })
                });

                const dataVerify = await resVerify.json();

                if(dataVerify.verified) {
                    // Save membership details to the backend
                    const resSave = await fetch('http://localhost:4000/member/savePayment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            passtype: formData.passtype,
                            activationdate: activationDate,
                            expiringdate: expiringDate, 
                            title: formData.title,
                            firstname: formData.firstName,
                            lastname: formData.lastName,
                            phonenumber: formData.phonenumber,
                            email: formData.email,
                            amount: membershipPrice, 
                            gst: getGstFirst().toFixed(2), 
                            totalamount: getTotalFirst().toFixed(2) ,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id
                        })
                    });

                    const dataSave = await resSave.json();
                    if(dataSave.success) {
                        alert('Membership payment successful and saved!');
                    } else {
                        alert('Error saving membership details.');
                    }
                } else {
                    alert('Membership payment verification failed.');
                }
            }
        };

        const rzp = new window.Razorpay(options);
        console.log("hey bob")
        rzp.open();
        console.log("hey harry")
    }

    loadRazorpayScript();
};
// initiateAndPayMembership().catch(console.error);
// Usage example



  return (

    <>
   <Header />
      <div className="container mx-auto p-8 bg-black">
        <div >
          {/* Guest Details Section  onSubmit={initiateAndPayMembership} */}
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
          <div className="md:w-2/3 p-4">
  <div className="bg-gray-400 p-6 shadow rounded-lg mb-4">
    <h2 className="text-xl font-bold text-black mb-4">Traveller's Details</h2>

  
      {/* Title Field */}
      <div className="mb-4 md:mb-0 md:col-span-2">
  <label htmlFor="title" className="block  mt-2 text-sm font-medium text-gray-800">
    Title
  </label>
  <select
    id="title"
    name="title"
    value={formData.title}
    onChange={handleChange}
    className="bg-white border border-gray-600 text-black sm:text-sm rounded-lg  focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2 mr-2"
    required
  >
    <option value="">Select...</option>
    <option value="Mr.">Mr.</option>
    <option value="Ms.">Ms.</option>
    <option value="Mrs.">Mrs.</option>
   
    {/* Add more options as needed */}
  </select>
</div>

      {/* First Name Field */}
      <div className='flex flex-row gap-4'>
      <div className="mb-4 md:mb-0 w-1/2 ">
        <label htmlFor="firstName" className="block mt-2 text-sm font-medium text-gray-800">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="bg-white border border-gray-600 text-black sm:text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3"
          required
        />
      </div>

      {/* Last Name Field */}
      <div className="mb-4 md:mb-0 w-1/2 ">
        <label htmlFor="lastName" className="block  mt-2text-sm font-medium text-gray-800">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="bg-white border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3"
          required
        />
      </div>
      </div>
      {/* Email Field */}
      {/* Email Field */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Email Field */}
        <div className="flex-1">
          <label htmlFor="email" className="block  mt-2 text-sm font-medium text-gray-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-white border border-gray-600 text-black sm:text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3"
            required
          />
        </div>

        {/* Phone Number Field */}
        <div className="flex-1">
          <label htmlFor="phonenumber" className="block  mt-2 text-sm font-medium text-gray-800">
            Phone Number
          </label>
          <input
            type="tel"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            className="bg-white border border-gray-600 text-black sm:text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3"
            required
          />
        </div>
      </div>


                {/* Other input fields */}
                {/* ... */}
       
              </div>
           
          {/* Membership Cards Section */}
        {/* Membership Cards Section */}
            <div className="bg-white p-8">
            <div className='flex flex-col items-center justify-center'>
    <h2 className="text-3xl font-bold mb-4 text-center">THE UNITED TRAVEL PASS</h2>
    <hr className="border-t-2 border-yellow-500 w-16 mb-10" /> {/* Fixed width for all viewports */}
</div>
              <div className="flex gap-4">
                <div className="w-full md:w-1/2 pr-2">
                  <div className='font-bold text-lg mb-2 text-center'>TREK PASS</div>
              <div className='text-justify words-break'> Unlock the world of adventure with our exclusive Trek Pass. Embark on thrilling journeys through breathtaking landscapes, conquer challenging trails, and immerse yourself in the beauty of nature. The Trek Pass is your ticket to unforgettable trekking experiences, connecting you with the essence of exploration. Plus, enjoy the flexibility to choose 6 treks worth RS 24,000 from a selection of 20 treks, all at a 50% discount, ensuring you get the most out of your adventure-packed journey.
              </div> 
              <div className="text-center">
    <button className="bg-yellow-500  text-white font-bold py-2 px-4 mt-4 rounded">
      AVAIL PASS
    </button>
  </div>
                </div>
                <div className="w-full md:w-1/2">
                <div className="w-full  pr-2">
                  <div className='font-bold text-lg mb-2 text-center'>TOUR PASS</div>
              <div className='text-justify words-break'> Embark on a journey with our exclusive Tour Pass. Immerse yourself in extraordinary travel experiences, from uncovering hidden gems in various destinations to savoring the flavors of diverse cuisines. The Tour Pass opens up a world of exploration, giving you the chance to create memories and connections with our community. Customize your adventure by selecting 6 tours worth RS 42,000 from a diverse array of 20 destinations, all available at flat 50% discounted rate. Make your travels amazing friends as you explore with us, one exciting adventure at a time.
              </div> 
              <div className="text-center">
    <button className="bg-yellow-500  text-white font-bold py-2 px-4 mt-4 rounded">
      AVAIL PASS
    </button>
  </div>
                </div>
                </div>
              </div>
            {/* ... (other sections) */}
          </div>

          {/* ... (other sections) */}
                  
          <AccordionItem
  title="Terms of Conditions "
  points={[
    "Passholders must read and agree to the terms and conditions before purchasing the United Trek or Tour Pass.    ",
    "Passholders are responsible for their own safety during treks/tours and must adhere to safety guidelines provided by Backpackers United.    ",
    "Passholders should inform Backpackers United of any health conditions or special requirements that may affect their participation in treks. ",
    "Changes to Itinerary: Backpackers United reserves the right to make changes to the trek itineraries due to unforeseen circumstances such as weather conditions, natural disasters, or other safety concerns.",
    "Liability Disclaimer: Backpackers United is not liable for any injury, loss, or damage to personal property that may occur during treks/tours. Passholders participate in treks/tours at their own risk, and Backpackers United is not responsible for any accidents or injuries. ",
    "Passholder Conduct: Passholders are expected to behave responsibly and respectfully towards fellow trekkers/travelers, guides, and the environment. ",
    "Promotional Materials: Backpackers United reserves the right to use photographs, videos, or testimonials featuring passholders for promotional purposes on its website, social media, or other marketing materials.   ",
     "Pass Revocation: Backpackers United reserves the right to revoke the Pass at any time if a passholder is found to be in violation of these terms and conditions. ",
     "Changes to Terms and Conditions: Backpackers United reserves the right to modify these terms and conditions at any time. Passholders will be notified of changes, and continued use of the Pass constitutes acceptance of the updated terms. ",
     "Force Majeure: Backpackers United is not liable for any failure to perform its obligations under these terms and conditions due to unforeseen circumstances beyond its control, including but not limited to acts of God, war, terrorism, or government regulations. ",


  ]}
/>
<AccordionItem
  title="Cancellation Policies"
  points={[
    "Refunds are not available once the Pass has been purchased.  ",
    "In exceptional circumstances, such as medical emergencies, passholders may request a deferral to the next month. Approval is at the discretion of Backpackers United.   ",
    "Lost or Stolen Passes: In the event of a lost or stolen Pass, passholders must report it immediately to Backpackers United. A replacement Pass may be issued for a fee, and the original Pass will be deactivated to prevent unauthorized use. "
  ]}
/>


       {/* Room Options Section */}
            {/* ... */}
            {/* Add room option cards here */}
          </div>

          {/* Summary Section */}
               {/* Summary Section */}
               <div className="md:w-1/3 p-4">
  {/* Summary Section */}
  <div className="bg-gray-400 shadow rounded-lg p-6 text-black">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">SUMMARY</h2>
                <FontAwesomeIcon icon={faTrashAlt} />
                <button  className="text-yellow-300 hover:text-yellow-200"></button>
              </div>

              {/* New dropdown for pass type */}
              <div className="mt-4">
                <label htmlFor="passtype" className="block mb-2 text-sm font-medium text-black">
                  Select Pass Type
                </label>
                <select
                  id="passtype"
                  name="passtype"
                  value={formData.passtype}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  required
                >
                  <option value="">Select...</option>
                  <option value="Trek Pass">Trek Pass</option>
                  <option value="Tour Pass">Tour Pass</option>
                </select>
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <span className="font-medium">BACKPACKER</span>
                  <span>₹{membershipPrice.toFixed(2)}</span>
                </div>
                <div className="text-sm">valid till: {expiringDate}</div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <span>Membership Charges</span>
                  <span>₹{membershipPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>G.S.T</span>
                  <span>₹{getGstFirst().toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total Price</span>
                  <span className="text-lg font-bold">₹{getTotalFirst().toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center mb-2">
                  <input id="confirmation" type="checkbox" className="w-4 h-4 text-blue-600 rounded" required />
                  <label htmlFor="confirmation" className="ml-2 text-sm">
                    Yes, I confirm all the guests are above 18 years old.
                  </label>
                </div>
                <div className="flex items-center">
                  <input id="policies" type="checkbox" className="w-4 h-4 text-blue-600 rounded" required />
                  <label htmlFor="policies" className="ml-2 text-sm">
                    I acknowledge and accept all the Membership Enrollment Policies, Terms & Conditions, and Cancellation Policies.
                  </label>
                </div>
              </div>

              <button className="w-full bg-yellow-500 text-white p-3 rounded-lg font-semibold hover:bg-yellow-600" type='submit' >
                Unlock Travel Pass
              </button>
            </div>
          
            <div className="bg-gray-400 p-6 rounded-lg shadow-md text-grey-800 mt-4">
            <h2 className="text-lg font-semibold mb-4 border-b border-gray-600 pb-2 text-black">
            Pass Details:
    </h2>
    <ul className="list-disc">
  <li className="mb-2">
    <span className="block font-medium">
    The United Travel Pass 2023 offers a semi-annual trekking and backpacking experience priced at ₹12,000 and ₹21,000, respectively, plus a 5% GST.
    </span>
  </li>
  <li className="mb-2">
    <span className="block font-medium">
   The Pass grants exclusive access to 6 free treks or 6 free tours within a span of 6 months.
    </span>
  </li>
  <li className="mb-2">
    <span className="block font-medium">
   Purchasing the Pass implies acceptance of these terms and conditions.
    </span>
  </li>
  <li className="mb-2">
    <span className="block font-medium">
      Pass Cost:
    </span>
  </li>
  <li className="mb-2">
    <span className="block font-medium">
    The cost of the United Trek Pass is ₹12,000 plus a 5% tax.
    </span>
  </li>
  <li className="mb-2">
    <span className="block font-medium">
     The cost of the United Tour Pass is ₹21,000 plus a 5% tax.
    </span>
  </li>
  <li className="mb-2">
    <span className="block font-medium">
       Our commitment is to make adventure accessible, ensuring exceptional value for your investment.
    </span>
  </li>
  <li className="mb-2">
    <span className="block font-medium">
    Pass Benefits:
    </span>
  </li>
  <li className="mb-2">
    <span className="block font-medium">
     Access to a variety of treks across different regions.
    </span>
  </li>
  <li className="mb-2">
    <span className="block font-medium">
      Exclusive discounts on specified treks.
    </span>
  </li>
  <li className="mb-2">
    <span className="block font-medium ">
     Convenient and hassle-free booking process.
    </span>
  </li>
</ul>


  </div>
          </div>
          </form>
            {/* SignUpSection */}
  

        </div>
      </div>
      <Footer />
    </>
  );
}

export default page