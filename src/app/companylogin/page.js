"use client"
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function CompanyLogin() {
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
    if (session?.status === "authenticated") {
        router.replace('/company')
    }
    }, [session, router]);

    const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
        setError("Email is invalid!");
        return;
    }

    if (!password || password.length < 8) {
        setError("Password is invalid");
        return;
    }

    try{
        const res = await signIn("company-credentials", {
            redirect: false,
            email,
            password,
        });
        if(res.error){
            setError("Invalid Email or Password!");
            return;
        }
        router.push("/company");
    }catch(error){
        setError("Error, Try Again!");
    }
    };

    if (sessionStatus === "loading") {
    return <h1 className="text-gray-700 font-bold text-center m-9 text-4xl">Loading...</h1>;
    }

    return (  
      sessionStatus !== "authenticated" && (   
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form 
            onSubmit={handleSubmit} 
            className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6 pb-5">
            <h1 className="text-3xl font-bold text-center">Welcome Back :)</h1>
            <p className="text-gray-600 text-base">To keep connected with us please login with your personal information by email address and password.</p>
            <div className="mb-3 mt-3">
              <label className="font-bold"> Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-purple-100"       
                id="floatingInput"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="mb-3">
              <label className="font-bold"> Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"       
                id="floatingPassword"
                placeholder="Password"
                required/>
            </div>
            {error && <p className="text-center text-red-500 font-bold text-base">{error}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 mt-5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:scale-110 transition duration-300"> 
                Log In
              </button>
            </div> 
            <div className= "text-center mt-3">
              <Link href="/forgetpassword" className="inline-block text-center text-blue-500 underline hover:text-purple-700">Forget Password!</Link>
            </div> 
          </form>
        </div> 
    )
  );
}
  
export default CompanyLogin;