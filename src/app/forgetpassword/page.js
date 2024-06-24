"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ForgetPassword() {
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
    if (sessionStatus === "authenticated") {
        router.replace('/company')
    }
    }, [session, router, sessionStatus]);

    const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    if (!isValidEmail(email)) {
        setError("Email is invalid");
        return;
    }
    try {
        const res = await fetch("/api/forgetpassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });
        if (res.status === 400) {
          setError("User with this Email is not Registered!");
        }
        if (res.status === 200) {
          setError("Email Sended Successfully");
          setTimeout(() => {
          router.push('/companylogin')
          }, 1500)
        }
      } catch (error) {
        setError("Error, Try Again!");
        console.log(error);
      }
    };

    if (sessionStatus === "loading") {
    return <h1 className="text-gray-700 font-bold text-center m-9 text-4xl">Loading...</h1>;
    }

    return (  
      sessionStatus !== "authenticated" && (   
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center">Forget Password</h1>
          <p className="text-gray-600 text-base text-center m-3">First check Spam folder of your account if mail not found after submiting form otherwise Try Again!</p>
          <div className="space-y-4 mt-6 mx-5">
            <div>
              <label className="block font-bold">Email address</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-purple-100"
                id="floatingInput"
                placeholder="name@example.com"
                required
              />
            </div>
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:scale-110 transition duration-300"
            >
              Send Email
            </button>
          </div>
          <div className="text-center mt-4">
            <Link href="/companylogin" className="text-blue-600 underline hover:text-purple-700">Login</Link>
          </div>
        </form>
      </div>
    </div>
    ));
}
  
export default ForgetPassword;