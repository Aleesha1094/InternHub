"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function ForgetPassword() {
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
    if (sessionStatus === "authenticated") {
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
    console.log(email);

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
                      <h1 class="text-center fw-bold mt-3">Forget Password</h1>
                      <div class="form-floating mb-3">
                        <input type="email" class="form-control mt-5 " id="floatingInput" placeholder="name@example.com" required/>
                        <label for="floatingInput">Email address</label>
                      </div>
                      {error && <p class="text-danger">{error}</p>}
                      <div className= "mt-3" >
                        <button type="submit" class="btn mb-3" style={{ backgroundColor: '#b100cd', color: 'white', display: 'inline-block', borderRadius: '10px' }}>Submit</button>
                        <br/>
                        <a href="/CompanyLogin">Login</a>
                      </div>
                  </form>                                                       
              </div>
          </div>
      </div>     
    ));
}
  
export default ForgetPassword;