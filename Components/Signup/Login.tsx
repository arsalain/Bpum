'use client'
import {useState} from 'react'
import Link from "next/link";
import axios from 'axios';
import ForgotPasswordModal from './Forgotpassword';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast  } from 'react-toastify';

const LoginForm = () => {
    const router = useRouter();
    const [isModalOpen, setModalOpen] = useState(false);
    const [login, setLogin] = useState({
        email: "",
        password: ""
      });
    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:4000/auth/signin", { email: login.email, password: login.password});
          if(response.data.users === false){
            toast.error("Email is not registered !", {
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
              else if( response.data.password === false){
                toast.error("Incorrect Password !", {
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
              else{
                    toast("Login Successfull !", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      })
                      router.push('/user');
              }
        } catch (err) {
          
        }
      };
      const onChangea = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
      };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
        <ToastContainer />
      <div>
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="mt-2">
          Don't have an account yet?{" "}
          <Link href="/signup" className="text-yellow-500">
   Sign up for free
          </Link>
        </p>
      </div>
      <div>
        <div className="relative">
          <input type="email" id="email" placeholder=" " name='email' value={login.email} onChange={onChangea}   required className="w-full h-full px-4 pt-8 pb-2 border focus:outline-none text-black input-phoneno"/>
          <label htmlFor="email" className="label-phoneno absolute left-4 bottom-5 transform transition-transform duration-200 text-gray-500" >Email</label>
        </div>
      </div>
      <div>
        <div className="relative">
          <input type="password" id="password"  placeholder=" " name='password' value={login.password} onChange={onChangea} required className="w-full h-full px-4 pt-8 pb-2 border focus:outline-none text-black input-email" />
          <label htmlFor="password" className="label-email absolute left-4 bottom-5 transform transition-transform duration-200 text-gray-500">Password</label>
        </div>
      </div>
      <div>
            <button onClick={() => setModalOpen(true)} className="text-sm font-semibold text-yellow-500 underline" >
          Forgot your password?
          </button>
      </div>

      <div>
        <button type="submit" className="bg-yellow-500 text-white w-full py-4">
          Sign In 
        </button>
      </div>
      <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </form>
  );
};

export default LoginForm;
