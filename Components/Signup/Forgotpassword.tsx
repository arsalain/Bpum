// components/ForgotPasswordModal.js
'use client'
import { useState } from 'react';
import { toast  } from 'react-toastify';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ForgotPasswordModal : React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');

  const sendLink = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();


    if (email === "") {
        toast.error("email is required!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    } else if (!email.includes("@")) {
        toast.warning("includes @ in your email!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    } else {
        const res = await fetch("https://launch-api1.vercel.app/auth/passwordlink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (data.users === false) {
          toast.error("Email is not registered, Please Sign Up with your Email",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
        } else {
            toast.success("Password reset link has been sent Successfully to Your Email",{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            })
        }
    }
}
const setVal = (e: React.ChangeEvent<HTMLInputElement>)=> {
  setEmail(e.target.value)
}
  if (!isOpen) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Call API to send reset password email
//     console.log(`Send reset password link to ${email}`);
//   };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 borders shadow-2xl">
       
      <div className="flex flex-col p-2 bg-black text-white rounded w-[24rem] h-[19rem]">
        <div className='justify-end'>
      <button onClick={onClose} className="float-right rounded-full bg-white text-black w-5 h-5 flex justify-center items-center">
          x
        </button>
        </div >
        <div>
        <h2 className="text-lg font-bold text-center">Forgot Password</h2>
        </div>
        <div className='px-8 py-4'>
        Don’t worry, we'll send a mail to assist you in resetting your password.
        </div>
        <form  className="px-8">
          <div className="mb-4 relative">
             <input type="email" id="email" placeholder=" " value={email} onChange={setVal} name="email"  required className="w-full h-full px-4 pt-8 pb-2 border focus:outline-none text-black input-email"/>
          <label htmlFor="password" className="label-email absolute left-4 bottom-5 transform transition-transform duration-200 text-gray-500">Email</label>
          </div>
          <button type="submit" onClick={sendLink} className="flex px-8 py-3 bg-yellow-500 text-white rounded justify-center items-center mx-auto">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
export default ForgotPasswordModal;