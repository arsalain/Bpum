'use client'
import {useState} from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast  } from 'react-toastify';
const SignUpForm = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

        const response = await fetch(
          "http://localhost:4000/auth/signup",
          {
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
              name: credentials.name,
              phone: credentials.phone,
              email: credentials.email,
              password: credentials.password
            }),
          }
        );
        const json = await response.json();
      
        if (json.success === false) {
          console.log(json.succes)
          toast.warn("Email Already Exists !", {
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
        
          toast.success("Acccount Created, You can now Login to your account!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
            router.push('/login');
        }
      }
     catch (error) {
      toast.error("Something went wrong!", {
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
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <form className="grid gap-5" onSubmit={handleSignup}>
      <ToastContainer />
      <div className="text-2xl font-semibold">
        Welcome back
      </div>
      <p className="mt-2">
        Already have an account yet?{" "}
        <Link href="/login" className="text-yellow-500">
          Log in
        </Link>
      </p>

      <div >
<div className="relative">
  <input type="text" id="fullName" placeholder=" "  name="name" value={credentials.name} onChange={onChange} required className="w-full h-full px-4 pt-8 pb-2 border focus:outline-none text-black input-fullName"/>
  <label htmlFor="fullName" className="label-fullName absolute left-4 bottom-5 transform transition-transform duration-200 text-gray-500">Full Name</label>
</div>
</div>

      <div>
        <div className="relative">
          <input type="tel"  id="phoneno" placeholder=" "  name="phone" value={credentials.phone} onChange={onChange} required className="w-full h-full px-4 pt-8 pb-2 border focus:outline-none text-black input-phoneno"/>
          <label htmlFor="phoneno" className="label-phoneno absolute left-4 bottom-5 transform transition-transform duration-200 text-gray-500" >Phone Number</label>
        </div>
      </div>
      <div>
        <div className="relative">
          <input type="text"  id="email" placeholder=" " name="email" value={credentials.email} onChange={onChange} required className="w-full h-full px-4 pt-8 pb-2 border focus:outline-none text-black input-email" />
          <label htmlFor="email" className="label-email absolute left-4 bottom-5 transform transition-transform duration-200 text-gray-500">Email</label>
        </div>
      </div>

      <div>
        <div className="relative">
          <input type="password"  id="password" placeholder=" " name="password" value={credentials.password} onChange={onChange} required className="w-full h-full px-4 pt-8 pb-2 border focus:outline-none text-black input-password" />
          <label htmlFor="password" className="label-password absolute left-4 bottom-5 transform transition-transform duration-200 text-gray-500">Password</label>
        </div>
      </div>

      <div className="flex items-center mt-2">
        <input type="checkbox" name="checkbox" className="checkbox" required/>
        <div className="text-sm text-gray-500 ml-2">
          Email me exclusive Agoda promotions. I can opt out later as stated in the Privacy Policy.
        </div>
      </div>
     
      <button
        type="submit"
        className="btn bg-yellow-500 text-white w-full py-3"
      >
        Sign Up 
      </button>
    </form>
  );
};

export default SignUpForm;
