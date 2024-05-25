"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
      setError("Login Successful!");
    }
  };

  return (
    sessionStatus !== "authenticated" && (   
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-light p-4 rounded shadow">
        <h1 className="text-center fw-bold mt-5">Login Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-5">
             <label className="fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
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
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                required
                style={{ backgroundColor: '#f0f0f0' , borderRadius: '10px'}}
              />
            </div>
            <p className="text-danger">{error && error}</p>
            <button type="submit" className="btn btn-block text-center fw-bold" style={{ backgroundColor: '#b100cd', color: 'white', display: 'block', margin: '0 auto' ,  borderRadius: '10px'}}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  ));
}

export default AdminLogin;