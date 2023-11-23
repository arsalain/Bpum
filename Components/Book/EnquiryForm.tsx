"use client"
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React ,{ useState, ChangeEvent } from 'react';

interface EnquiryFormProps {
  onClose: () => void; // Assuming onClose is a function that returns nothing
}
const EnquiryForm = ({ onClose }: EnquiryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    callback: 'Expecting Callback'
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    let value: string | boolean;

    // Check if the target is an input element and if it's a checkbox
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      value = target.checked;
    } else {
      value = target.value;
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [target.name]: value
    }));
  };

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/enquiry/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      alert("Thank you for contacting Backpackers United, We will reach out to you soon")
      console.log(responseData); // Handle the response as needed
      onClose();
       // Close the form on successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto z-10">
      <div className="bg-black text-white rounded shadow-lg mt-20 mb-2 p-4">
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between'>
            <h2 className="text-3xl font-bold mb-8 " id="enquiryFormTitle">Enquiry</h2>
            <button onClick={onClose} className='flex justify-center'>
              <FontAwesomeIcon icon={faXmark} className='mt-2'/>
            </button>
          </div>
          {/* Form Fields */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-yellow-500">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              className="mt-1 p-2 w-full border-2 border-gray-700 bg-white text-black rounded-md focus:border-yellow-500"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-yellow-500">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phone"
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 border-gray-700 bg-white text-black rounded-md focus:border-yellow-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-yellow-500">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                className="mt-1 p-2 w-full border-2 border-gray-700 bg-white text-black rounded-md focus:border-yellow-500"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-yellow-500">Message</label>
            <textarea
              id="message"
              name="message"
              onChange={handleChange}
              className="mt-1 p-1 w-full border-2 border-gray-700 bg-white text-black rounded-md focus:border-yellow-500"
              required
            ></textarea>
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="callbackCheckbox"
              name="callback"
              onChange={handleChange}
              checked={formData.callback === 'Expecting Callback'}
              className="h-4 w-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label htmlFor="callbackCheckbox" className="ml-2 block text-sm text-yellow-500">Expecting a Callback</label>
          </div>
          <button type="submit" className="bg-yellow-400 text-gray-900 py-2 px-4 rounded-md w-full hover:bg-yellow-500 transition-colors duration-300">Send</button>
        </form>
      </div>
    </div>
  );
};
export default EnquiryForm;