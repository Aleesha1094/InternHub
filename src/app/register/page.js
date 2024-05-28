"use client";
import React,{ useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

function RegisterCompany() {
const [error, setError] = useState("");
const router = useRouter();
const { data: session, status: sessionStatus } = useSession();

useEffect(() => {
  if (sessionStatus === "authenticated") {
    router.replace("/company");
  }
}, [sessionStatus, router]);

const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  const email = e.target[1].value;
  const password = e.target[2].value;
  const company_name = e.target[0].value;

  if (!isValidEmail(email)) {
    setError("Email is Invalid!");
    return;
  }

  if (!password || password.length < 8) {
    setError("Password is Invalid!");
    return;
  }

  try {
    const res = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        company_name,
      }),
    });
    if (res.status === 400) {
      setError(res.message);
    }
    if (res.status === 201) {
      setError(res.message);
      router.push('/companylogin')
    }
  } catch (error) {
    setError("Error, Try Again!");
    console.log(error);
  }
};

if (sessionStatus === "loading") {
  return <h1>Loading...</h1>;
}
    return (
        sessionStatus !== "authenticated" && (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold text-center">Create Account</h1>
              <div className="space-y-4 mt-6">
                  <label className='font-bold '>Company Name</label>
                  <input type="text"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"                   id="floatingName" placeholder="Company Name"
                   />
                </div>
                <div class="mb-3">
                  <label className="font-bold">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"                    id="floatingInput"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="font-bold">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"                    id="floatingPassword"
                    placeholder="Password"
                    required
                  />
                </div>  
                <p className="text-red-500 mt-2">{error && error}</p>
            <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 mt-5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300"> 
              Log In
            </button></div> 
                <div className= "text-center mt-3">                 
                  <a href="/companylogin" className="inline-block text-center text-blue-500 underline">Login with Existing Account</a></div>
              </form>
            </div>
          </div>
    ));
}
export default RegisterCompany;