"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function ResetPassword ({params}) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(""); 
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: params.token,
          }),
        });
        if (res.status === 400) {
          setError("Invalid token or has expired");
          setVerified(true);
        }
        if (res.status === 200) {
          setError("");
          setVerified(true);
          const companyData = await res.json();
          setUser(companyData);
        }
      } catch (error) {
        setError("Error, try again");
        console.log(error);
      }
    };
    verifyToken();
  }, [params.token]);

  // useEffect(() => {
  //   if (sessionStatus === "authenticated") {
  //       router.replace('/company')
  //   }
  //   }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target[0].value;
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
        const res = await fetch("/api/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            email: user?.email,
          }),
        });
        if (res.status === 500) {
          setError(res.error);
        }
        if (res.status === 201) {
          setError("");
          setSuccess("Password Updated Successfully");
          setTimeout(() => {
            router.push('/companylogin')
          }, 1500);
        }
      } catch (error) {
        setError("Error, Try Again!");
        console.log(error);
      }
    };


    if (sessionStatus === "loading" || !verified) {
      return <h1 className="text-gray-700 font-bold text-center m-9 text-4xl">Loading...</h1>;
      }
  
  return (  
    sessionStatus !== "authenticated" && (  
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center">Reset Password</h1>
          <div className="space-y-4 mt-6 mx-5">
            <div>
              <label htmlFor="password" className="block font-bold">Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-purple-100"
                id="password"
                placeholder="Enter your new password"
                required
                aria-required="true"
                aria-invalid={error ? "true" : "false"}
              />
            </div>
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            {success && <p className="text-center text-green-500 font-bold text-base">{success}</p>}
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:scale-110 transition duration-300"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  ));
}

export default ResetPassword;
