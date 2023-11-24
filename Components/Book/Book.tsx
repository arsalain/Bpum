'use client'
import React,{useState,useEffect} from 'react'
import {IoIosArrowDropleft} from 'react-icons/io'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'
import {FaRupeeSign} from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
interface BookingProps {
  onClose: () => void;
  Batch: { date: string }[]; // Modify according to the actual structure of Batch
  reserveamount: number;
  foramount: number;
  withoutamount: number;
  name: string;
}
type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  // Add other properties you expect in the response
};
declare global {
  interface Window {
    Razorpay: any; // Use 'any' or a more specific type if available
  }
}
export {};
const Booking = ({ onClose, Batch, reserveamount, foramount, withoutamount ,name}: BookingProps) => {
    const ticketPrice = foramount;
    const firstTicketPrice = reserveamount;
    const transportPrice = withoutamount;
    const [isTabOneActive, setIsTabOneActive] = useState(true);
    const [ticketCount, setTicketCount] = useState(1);
    const [ticketCount1, setTicketCount1] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [isCheckboxTicked, setIsCheckboxTicked] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [subtractedAmount, setSubtractedAmount] = useState(0);
    // Function to handle the checkbox change event
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
    }

    const getSubtotal = (
      ticketPrice: number, 
      ticketCount: number, 
      transportPrice: number, 
      ticketCount1: number
    ): number => {
    
      let subtotal = 0;
      
      if (transportPrice !== null && transportPrice !== undefined) {
        subtotal = ticketPrice * ticketCount + transportPrice * ticketCount1;
      } else {
        subtotal = ticketPrice * ticketCount;
      }
    
      console.log("Calculated Subtotal:", subtotal);
      
      return subtotal;
    };

    const getGst = () => {
      const gstValue = getSubtotal(ticketPrice, ticketCount, transportPrice, ticketCount1) * 0.05;
      return gstValue;
    };
    
    const getTotal = () => {
      const totalValue = getSubtotal(ticketPrice, ticketCount, transportPrice, ticketCount1) + getGst();
      return totalValue;
    };
    const getSubtotalFirst = () => {
        return firstTicketPrice  * (ticketCount + ticketCount1);
      };
    
      const getGstFirst = () => {
        return getSubtotalFirst() * 0.05;
      };
    
      const getTotalFirst = () => {
        return getSubtotalFirst() + getGstFirst();
      };
    const toggleDiv = () => {
        setIsShow(!isShow);
    };
    const handleIncreaseTicket = () => {
        setTicketCount(prev => prev + 1);
      };
    
      const handleDecreaseTicket = () => {
        if (ticketCount > 0) {
          setTicketCount(prev => prev - 1);
        }
      };
      const handleIncreaseTicket1 = () => {
        setTicketCount1(prev => prev + 1);
      };
    
      const handleDecreaseTicket1 = () => {
        if (ticketCount1 > 0) {
          setTicketCount1(prev => prev - 1);
        }
      };
  
    const [inputValue, setInputValue] = useState({
        date: '',
        name: '',
        email: '',
        number: '',
      });
      const [amount, setAmount] = useState(
        isCheckboxTicked ? parseFloat(getTotal().toFixed(2)) : parseFloat(getTotalFirst().toFixed(2))
      );
      // const [amount, setAmount] = useState()
      useEffect(() => {
        if (isCheckboxTicked) {
          setAmount(parseFloat(getTotal().toFixed(2)));
        } else {
          setAmount(parseFloat(getTotalFirst().toFixed(2)));
        }
      }, [isCheckboxTicked, ticketCount, ticketCount1]);
      useEffect(() => {
        const result = Math.abs(getTotalFirst() - amount);
        console.log("result", result)
        setSubtractedAmount(result);
      }, [amount]);
      console.log("subtractedAmount",subtractedAmount)
      console.log(amount,"amount")
    const allFieldsFilled = Object.values(inputValue).every(input => input !== '');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setInputValue(prev => ({
        ...prev,
        [name]: value
      }));
    };
    
    
      
    const switchToTabTwo = () => {
        if (allFieldsFilled) {
            setIsTabOneActive(false);
        }
    };

    const switchToTabOne = () => {
    
            setIsTabOneActive(true)
        
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // Prevents the default form submission behavior
        switchToTabTwo();
    };
    const initiateAndPay = async () => {
      const loadRazorpayScript = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = initializePayment; // Call the payment initialization function when the script is loaded
        document.head.appendChild(script);
      };
      
  const initializePayment = async () => {
      const resInitiate = await fetch('https://bpu-images-v1.s3.eu-north-1.amazonaws.com/book/initiatePayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: isCheckboxTicked ? getTotalFirst().toFixed(2) :getTotal().toFixed(2)  })  // Replace with the desired amount
      });
    
      const dataInitiate = await resInitiate.json();
    
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: isCheckboxTicked ? getTotalFirst().toFixed(2) : getTotal().toFixed(2)  ,
        currency: 'INR',
        name: 'Your App Name',
        description: 'Test Transaction',
        order_id: dataInitiate.orderId,
        handler: async (response: RazorpayResponse) =>{
          const resVerify = await fetch('http://localhost:4000/book/verifyPayment', {
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
            // Save to DB
            const resSave = await fetch('http://localhost:4000/book/savePayment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                eventName: name,
                selecteddate: inputValue.date,
                username: inputValue.name,  // Replace with actual data
                phonenumber: inputValue.number,  // Replace with actual data
                email: inputValue.email, 
                amount: foramount,
                tickets: ticketCount + ticketCount1,
                payableamount: getTotalFirst().toFixed(2),
                pendingamount: subtractedAmount,
                source: 'Razorpay',
                gst:  isCheckboxTicked ? getGstFirst().toFixed(2) : getGst().toFixed(2) ,
                withtransport: ticketCount,
                withouttransport : ticketCount1,
                totalamount:    isCheckboxTicked ? getTotalFirst().toFixed(2) : getTotal().toFixed(2) ,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id
              })
            });
    
            const dataSave = await resSave.json();
            if(dataSave.success) {
              alert('Payment successful and saved!');
              onClose()
            } else {
              alert('Error saving payment details.');
            }
          } else {
            alert('Payment verification failed.');
          }
        }
      };

    
      const rzp = new window.Razorpay(options);
      rzp.open();
    }

      loadRazorpayScript();
    };
    

   
    // useEffect(() => {
    //   // Assuming you want to instantiate on component mount
    //   if (window.Razorpay) {
    //     initiateAndPay();
    //   }
    // }, []);
    return (
        <div className="fixed top-0 left-0 w-full h-full   flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto z-10">
            <div className="bg-black text-white rounded shadow-lg mt-32 mb-2">

                {isTabOneActive ? (
                    <div className='w-auto' >
                    <div className='flex flex-row bg-form1 p-4 border-b border-gray-400 justify-between md:gap-20 gap-10 '>
                        <button onClick={onClose} ><IoIosArrowDropleft className="text-3xl text-gray-400 hover:text-yellow-500" /></button>
                        <div className='flex flex-col justify-center pt-4'>
                            <div className='text-xl font-bold text-center'>
                                Who Is Booking ?
                                </div>
                                <div className='text-sm text-gray-400 pt-1 text-center'>
                                {name}
                                </div>
                            </div>
                            <div >
                            <div className="flex mt-5 ">
      {/* First rounded circle */}
      <div className="relative">
      
  <FontAwesomeIcon icon={faPlay} className={`text-2xl ${isTabOneActive ? 'text-yellow-500' : 'text-blue-200'} flex items-center justify-center`}/>
 
        <div className="absolute h-0.5 w-[12px] bg-blue-200 top-[11px] left-[18px]"></div>
      </div>

       <FontAwesomeIcon icon={faPlay} className={`text-2xl ${!isTabOneActive ? 'text-yellow-500' : 'text-blue-200'} flex items-center justify-center ml-3`}/>

    </div>
                                </div>
                    </div>
                    <div className='p-4'>
                    <form onSubmit={handleSubmit}>
                    <div className="mb-2  rounded-lg">
        <label className="block text-sm  mb-2 text-center  text-yellow-500 ">Select Dates</label>
                             <select className="w-full p-2 border rounded text-black" name="date"  value={inputValue.date}
                            onChange={handleChange}  required>
                               <option value="" >Please select the Date</option>
          {Batch ? Batch.map((batch, idx) => (
          <option value={batch.date} key={idx}>{batch.date}</option>
          )) : null}
            {/*  // <option value="Instagram">Instagram</option>
          // <option value="Google">Google</option>
          // <option value="Whatsapp">Whatsapp</option>
          // <option value="Other">Other</option>
       Add more sources as required */}
        </select>
      </div>
    
      <div className="mb-2   rounded-lg">
        <label className="block text-sm text-yellow-500  mb-2">Full Name</label>
        <input type="text" className="w-full p-2 border rounded text-black" placeholder="Full Name" name="name"  value={inputValue.name}
                            onChange={handleChange}   required/>
      </div>
      <div className='flex flex-row gap-2'>
         <div className="mb-2   rounded-lg md:w-1/2 w-[58%]">
          <label className="block text-sm text-yellow-500 mb-2">Phone Number </label>
          <input type="text" className="w-full p-2 border rounded text-black" placeholder="Phone Number" name="number" value={inputValue.number}
                            onChange={handleChange}  required/>
        </div>
      <div className="mb-2 rounded-lg w-full">
        <label className="block text-sm text-yellow-500 mb-2">Email Address</label>
        <input type="email" className="w-full p-2 border rounded text-black" placeholder="Email Address" name="email" value={inputValue.email}
                            onChange={handleChange}  required/>
      </div>
      </div>
      <button type='submit' className="w-full bg-yellow-500 text-white p-3 rounded mt-2" >Next</button>
      </form>
          </div>
                    </div>
                ) : (
                    <div className='md:w-[420px] w-[375px]'>
                    <div className='flex flex-row bg-form1 justify-between p-2 border-b border-gray-400'>
                        <button onClick={switchToTabOne} ><IoIosArrowDropleft className="text-3xl text-gray-400 hover:text-yellow-500" /></button>
                        <div className='flex flex-col justify-center  pt-4'>
                            <div className='text-xl font-bold text-center'>
                                Book Your Event Now
                                </div>
                                <div className='text-sm text-gray-400 pt-1 text-center'>
                               {name}
                                </div>
                            </div>
                            
                            <div className="flex mt-5 ">
      {/* First rounded circle */}
      <div className="relative">
        {/* <div className={`w-4 h-4 rounded-full ${isTabOneActive ? 'bg-yellow-500' : 'bg-blue-200'} flex items-center justify-center text-white`}>
        </div> */}
  <FontAwesomeIcon icon={faPlay} className={`text-2xl ${isTabOneActive ? 'text-yellow-500' : 'text-blue-200'} flex items-center justify-center`}/>
 
        <div className="absolute h-0.5 w-[12px] bg-blue-200 top-[11px] left-[18px]"></div>
      </div>

       <FontAwesomeIcon icon={faPlay} className={`text-2xl ${!isTabOneActive ? 'text-yellow-500' : 'text-blue-200'} flex items-center justify-center ml-3`}/>

    </div>
        </div>
        <div className={isShow ? 'block' : 'hidden'} >
                 <div className='px-6 border-t-5 border-gray-400 border-t-4 mt-5 text-gray-600 h-[250px]' >
                      <h3 className="text-xl font-semibold mb-3 mt-5">Bill Summary</h3>

<div className="mb-2 flex flex-row">
  <div className="w-[200px]">Total Price:</div>
  {/* <span>INR {getSubtotal().toFixed(2)}/-</span> */}
<span> INR { getSubtotal(ticketPrice, ticketCount, transportPrice, ticketCount1).toFixed(2) }</span>
</div>

<div className="mb-2 flex flex-row">
  <div className="w-[200px]">GST (5%):</div>
  <span>INR {getGst().toFixed(2)}/-</span>
</div>



<div className="mb-2 flex flex-row">
  <div className="w-[200px] font-bold">Final Payable Amount:</div>
  <span className='font-bold'>INR {getTotal().toFixed(2)}/-</span>
</div>

<div className="mb-2 flex flex-row">
  <div className="w-[200px] text-green-500 font-bold">Payable Now:</div>
  <span className='text-green-500 font-bold'> {isCheckboxTicked ? (
    <div>INR {getTotalFirst().toFixed(2)} /-</div>
  ) : (
    <div>INR {getTotal().toFixed(2)}/-</div>
  )}</span>
</div>
<div>The remaining amount should be paid before one day departure
  </div>
                 </div>
</div>
                    <div className={isShow ? 'hidden' : 'block'}>
                    <div className=" p-4 pb-2">
                    <label className="block text-sm mb-2 mt-6 text-yellow-500 ">Select Ticket(s)</label>
                    <div className="flex items-center  justify-between space-x-4 rounded-xl p-3 bg-form1 border border-gray-400">
                      <span className='font-bold text-sm'>With transport: ₹ {ticketPrice}</span>
                      <button onClick={handleDecreaseTicket} className='pl-[100px]'>-</button>
                      <span>{ticketCount}</span>
                      <button onClick={handleIncreaseTicket}>+</button>
                    </div>
                  </div>
                 {transportPrice && <div className=" p-4 pt-0">
                    <div className="flex items-center  justify-between space-x-4 rounded-xl p-3 bg-form1 border border-gray-400">
                      <span className='font-bold text-sm'>Without transport: ₹ {transportPrice}</span>
                      <button onClick={handleDecreaseTicket1} className='pl-20'>-</button>
                      <span>{ticketCount1}</span>
                      <button onClick={handleIncreaseTicket1}>+</button>
                    </div>
                  </div>
}
                  <div className="flex items-center justify-between  px-6 text-sm">
                  <label>
                      <input type="checkbox" className="mr-2 " onChange={() => setIsCheckboxTicked(!isCheckboxTicked)}/>
                     Reserve your slot by paying : INR  {getSubtotalFirst().toFixed(2)}/-
                    </label>
                    </div>
                    <div className="flex items-center justify-between mt-2 px-6 text-sm">
                    <label>
                      <input type="checkbox" className="mr-2" onChange={handleCheckboxChange} />
                      I have read and accept the Refunds, <Link href='/condition' className='text-yellow-500 hover:underline'>Cancellation Policy & Terms & Conditions</Link>
                    </label>
                  </div>
                  </div>
                
                  <div className="flex items-center justify-between mb-4 p-4">
                  
                  </div>
                  <div className='p-4 border-t border-gray-400 flex justify-between bg-form1'>
                    <div className='flex flex-col '> 
                        <div > {isCheckboxTicked ? (
    <div><FaRupeeSign className='float-left text-xl pt-1 font-bold'/>{getTotalFirst().toFixed(2)} </div>
  ) : (
    <div><FaRupeeSign className='float-left text-xl pt-1 font-bold'/>{getTotal().toFixed(2)}</div>
  )}</div>
                        <div className='text-xxs text-blue-500 pl-2 cursor-pointer'   onClick={toggleDiv}>   {isShow ? 'Hide Details' : 'Show Details'} </div>
                    </div>
                  <button className= {`${isChecked ? 'bg-yellow-500' : 'bg-yellow-200'}  text-white w-40 h-10 rounded-lg`} onClick={initiateAndPay}  disabled={!isChecked} >Pay Now</button>
                </div>
                  </div>
                )}
            </div>
            </div>
    );

}

export default Booking
