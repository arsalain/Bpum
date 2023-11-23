'use client'
import Image from 'next/image'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { useRouter } from 'next/navigation';
import { ToastContainer, toast  } from 'react-toastify';

const firebaseConfig = {
    apiKey: "AIzaSyAo9cGsw6Tbo9nrbsdXcoVxY0SGWgrJ4L8",
    authDomain: "backpack-b1f98.firebaseapp.com",
    projectId: "backpack-b1f98",
    storageBucket: "backpack-b1f98.appspot.com",
    messagingSenderId: "520329530780",
    appId: "1:520329530780:web:7da6a30492c1a9fa9d0c59"
  };
  // Initialize Firebase
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
const Googlelogin = () => {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
      setLoading(true);
      try {
        const result = await signInWithPopup(auth, provider);
        const { displayName, email, photoURL } = result.user;
        
        const res = await axios.post('http://localhost:4000/auth/google', {
          name: displayName,
          email: email,
          image: photoURL,
        });
        
        setLoading(false);
  
        // Set the JWT token here if needed
        // localStorage.setItem('token', res.data.token);
  
        // Navigate to home page or dashboard
        await router.push('/user');
      } catch (err) {
        setLoading(false);
        toast.error("Invalid Credentials ", {
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

  return (
    <div >
    <ToastContainer />
    <div className="flex justify-center items-center">
    <div className="w-[20rem] mt-4  ">
<button onClick={() => signInWithGoogle()} className="w-full border  text-black py-2 rounded-lg flex items-center justify-center bg-gray-300 ">
<Image src="/signup/glogo.png" alt="google logo" width={30} height={30} className="pr-2"/>
Sigin with Google Account
</button>
</div>
</div>
</div>
  )
}

export default Googlelogin
