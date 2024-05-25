"use client"
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function CompanyLogin() {
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    // useEffect(() => {
    // if (session?.status === "authenticated") {
    //     router.replace('/company')
    // }
    // }, [session, router]);

    const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email, password);

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
        console.log(res);
        if(res.error){
            setError("Invalid Email or Password!");
            return;
        }
        router.push("/company");
    }catch(error){
        setError("Error, Try Again!");
    }
    };

    if (sessionStatus === "Loading...") {
    return <h1>Loading...</h1>;
    }

    return (  
        // sessionStatus !== "authenticated" && (   
          <div className="container mt-5">
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }} className="bg-light p-4 rounded shadow">
        <h1 className=" fw-bold mt-5">Welcome Back :) </h1>
        <p  style={{ color: ' #696969' }}>To keep connected with us please login with your personal information by email address and password.</p>
        <div className="mb-3 mt-3 ">
          <label className="fw-bold">Email</label>
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}
          />
        </div>
        <div className="mb-3">
          <label className="fw-bold">Password</label>
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}
          />
        </div>
        <p style={{ color: 'red', fontSize: '14px' }}>{error && error}</p>
        <button type="submit" className="btn btn-block text-center fw-bold" style={{ backgroundColor: '#b100cd', color: 'white', display: 'block', margin: '0 auto', borderRadius: '10px' }}>
          Log In
        </button>   
        <div className="text-center fw-bold mt-3">OR</div>
        <div  className= "mt-3" style={{ textAlign: 'center' }}>
          <a href="/forgetpassword" style={{ display: 'inline-block', marginLeft: '50px' }}>I've lost my password</a>
        </div> 
      </form>
      <div className="pb-5"></div>
    </div>      
  )
// );
}
  
export default CompanyLogin;