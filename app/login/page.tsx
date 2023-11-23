import dynamic from "next/dynamic";
import Header from "@/Components/Navbar/Header/Header";
import Footer from "@/Components/Navbar/Footer/Footer";
import Image from "next/image";
import LoginForm from "@/Components/Signup/Login";
import Googlelogin from "@/Components/Signup/Google";

export const metadata = {
  title: "Sign In | Backpackers United ",
  description: "Backpackers United - Sign In",
};


// const DynamicGoogleLogin = dynamic(
//   () => import('../../Components/Signup/Google'),
//   { ssr: false }
// );
const LogIn = () => {
  return (
    <>
      <Header />
      {/* End Header 1 */}

      <section className="pt-24 pb-8 bg-yellow-100">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className=" lg:w-[34rem] ">
              <div className="px-12 py-12 bg-black text-white shadow-md rounded-md">
                {/* <LoginForm /> */}
                {/* End .Login */}
                    <LoginForm />
                <div className="flex flex-col space-y-2 pt-6">
                  <div className="text-center">or sign in with</div>
              <Googlelogin />
{/* <DynamicGoogleLogin /> */}
                  <div className="text-center px-8">
                    By creating an account, you agree to our Terms of Service
                    and Privacy Statement.
                  </div>
                </div>
                {/* End .flex */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End login section */}

    
      <Footer />
    </>
  );
};

export default dynamic(() => Promise.resolve(LogIn), { ssr: false });
