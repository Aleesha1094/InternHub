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
          <div class="container mt-5">
          <div class="row justify-content-center">
              <div class="col-md-6">
              <form onSubmit={handleSubmit} class="bg-light p-4 rounded shadow">
                <h1 className="text-center fw-bold mt-3">Create Account</h1>
                <div class="mb-3 mt-3 ">
                  <label className='fw-bold '>Company Name</label>
                  <input type="text" class="form-control mt-3 " id="floatingName" placeholder="Company Name"
                   style={{ backgroundColor: '#f0f0f0' , borderRadius: '10px'}}/>
                </div>
                <div class="mb-3">
                  <label className="fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control mt-3 "
                    id="floatingInput"
                    placeholder="name@example.com"
                    required
                    style={{ backgroundColor: '#f0f0f0' , borderRadius: '10px'}}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="fw-bold">Password</label>
                  <input
                    type="password"
                    className="form-control mt-3 "
                    id="floatingPassword"
                    placeholder="Password"
                    required
                    style={{ backgroundColor: '#f0f0f0' , borderRadius: '10px'}}
                  />
                </div>  
                <p>{error && error}</p>
                <button type="submit" className="btn btn-block text-center fw-bold" style={{ backgroundColor: '#b100cd', color: 'white', display: 'block', margin: '0 auto' ,  borderRadius: '10px'}}>
                  Sign Up
                </button>
                <div className= "mt-3" style={{ textAlign: 'center' }}>                 
                  <a href="/companylogin" style={{ display: 'inline-block', marginLeft: '50px' }}>Login with Existing Account</a></div>
              </form>
            </div>
          </div>
      </div>    
    ));
}
export default RegisterCompany;