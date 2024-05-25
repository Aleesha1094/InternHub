"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

function ContactUs() {
    const [error, setError] = useState("");
    const router = useRouter();

    const isValidEmail = (user_email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(user_email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_email = e.target[1].value;
        const subject = e.target[2].value;
        const user_name = e.target[0].value;
        const message = e.target[3].value;
      
        if (!isValidEmail(user_email)) {
          setError("Email is Invalid!");
          return;
        }
      
        try {
          const res = await fetch("/api/feedback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_email,
              subject,
              message,
              user_name,
            }),
          });
          if (res.status === 500) {
            setError(res.error);
          }
          if (res.status === 201) {
            setError(res.message);
            router.push('/')
          }
        } catch (error) {
          setError("Error, Try Again!");
          console.log(error);
        }
      };

  return (     
    <div className="container  mb-5">
    <div className="row justify-content-center">
      <div className="col-md-6 p-4">      
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }} className="bg-light p-4 rounded shadow">
        <h1 className="fw-bold mt-5">Let’s Talk</h1>
            <div className="form-row mt-3">
            <div className="form-group col-md-6">
              <label className="fw-bold">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Full Name"
                required
                style={{ borderRadius: '10px', borderBottom: '2px solid black', transition: 'border-bottom-color 0.3s' }}
              />
            </div>
            <div className="form-group col-md-6 mt-3">
              <label className="fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                required
                style={{ borderRadius: '10px', borderBottom: '2px solid black', transition: 'border-bottom-color 0.3s' }}
              />
            </div>
          </div>
          <div className="form-group mt-3">
            <label className="fw-bold">Subject</label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Subject"
              required
              style={{ borderRadius: '10px', borderBottom: '2px solid black', transition: 'border-bottom-color 0.3s' }}
            />
          </div>
          <div className="mb-3 form-outline mt-3">
            <label   className="fw-bold" htmlFor="description">Description</label>
            <textarea className="form-control" id="description" rows="4" required style={{ borderRadius: '10px', borderBottom: '2px solid black', transition: 'border-bottom-color 0.3s' }}></textarea>
          </div>
          <p className="text-danger">{error && error}</p>
          <button type="submit" className="btn btn-block text-center fw-bold" style={{ backgroundColor: '#b100cd', color: 'white', borderRadius: '10px' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>    
  )      
}
  
export default ContactUs;