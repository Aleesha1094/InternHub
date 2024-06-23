"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Login from "./../../../public/login.jpg";
import Image from "next/image";

function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
        router.replace('/admin')
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
      setError("Password is invalid!");
      return;
    }

    const res = await signIn("admin-credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  return (
    sessionStatus !== "authenticated" && (   
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg bg-white p-9 drop-shadow-[0_0px_400px_rgba(0,0,0.20,0.23)] rounded-md"  data-aos="fade-up">
          <h1 className="text-3xl font-bold font-serif text-center mx-7">Login Account</h1>
          <div className="flex justify-center m-3">
            <Image src={Login} alt="" className='w-72 h-32' />
          </div>
          <form onSubmit={handleSubmit} className="font-serif">
            <div className="mt-2">
             <label className="block font-bold mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"                id="floatingInput"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="mt-3">
              <label className="block font-bold mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"                id="floatingPassword"
                placeholder="Password"
                required
              />
            </div>
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 mt-5 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300 hover:scale-110 hover:shadow-lg"> 
                Log In
              </button>
            </div>
          </form>
        </div>
    </div>
  ));
}

export default AdminLogin;