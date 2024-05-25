"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function ResetPassword ({params}) {
  console.log(params.token)
  const [error, setError] = useState('');
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

  useEffect(() => {
    if (sessionStatus === "authenticated") {
        router.replace('/company')
    }
    }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target[0].value;

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
          setError(res.message);
          router.push('/companylogin')
        }
      } catch (error) {
        setError("Error, Try Again!");
        console.log(error);
      }
    };


    if (sessionStatus === "loading" || !verified) {
      return <h1>Loading...</h1>;
      }
  
  return (  
    sessionStatus !== "authenticated" && (  
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
          />
        </div>
        <button 
          type="submit"
          disabled={error.length > 1}
          >Reset Password
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  ));
}

export default ResetPassword;
