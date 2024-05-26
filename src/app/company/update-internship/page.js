"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function UpdateInternship({ internship }) {
    const [error, setError] = useState(""); 
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [end_date, setEndDate] = useState('');

    const companyId = session.user.id;

    const isValidEmail = (contact_email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(contact_email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        const city = e.target[2].value;
        const description = e.target[5].value;
        const c_url = e.target[3].value;
        const contact_email = e.target[1].value;
        const end_date = e.target[4].value;
      
        if (!isValidEmail(contact_email)) {
          setError("Email is invalid!");
          return;
        }
      
        try {
          const res = await fetch(`/api/cinternships/${internship.id}`, { 
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                companyId,
                title,
                city,
                description,
                c_url,
                contact_email,
                end_date
            }),
          });
          if (res.status === 500) {
            setError(res.error);
          }
          if (res.status === 404) {
            setError(res.error);
          }
          if (res.status === 200) { 
            setError(res.message);
            router.push('/')
          }
        } catch (error) {
          setError("Error, Try Again!");
          console.log(error);
        }
      };

      // if (sessionStatus === "loading") {
      //   return <h1>Loading...</h1>;
      // }

    return (  
      <div className="container mt-5 mb-5">
      <h1 className="text-center fw-bold mt-5">Update Internship</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }} className="bg-light p-4 rounded shadow">
        <div className="mb-3 mt-3 ">
          <label className="fw-bold">Internship Title</label>
          <input
            type="title"
            className="form-control"
            id="floatingInput"
            placeholder="Title"
            // defaultValue={internship.title} 
            required
            style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}
          />
        </div>
        <div className="form-group mt-3">
             <label className="fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="Email through student can contact you"
                // defaultValue={internship.contact_email} 
                required
                style={{ backgroundColor: '#f0f0f0' , borderRadius: '10px'}}
              />
            </div>
        <div className="mb-3">
          <label className="fw-bold">City</label>
          <input
            type="city"
            className="form-control"
            id="floatingInput"
            placeholder="City"
            // defaultValue={internship.city} 
            required
            style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}
          />
        </div>
        <div className="mb-3">
          <label className="fw-bold">Website URL</label>
          <input
            type="url"
            className="form-control"
            id="floatingInput"
            placeholder="Your website URL(optional)"
            // defaultValue={internship.c_url} 
            style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}
          />
        </div>
        <div className="mb-3">
        <div > 
        <label className="fw-bold">Date</label> <br/>
        {/* <DatePicker 
          selected={end_date} 
          onChange={(date) => setEndDate(date)}
          className="form-control rounded bg-light"
        /> */}
        </div>
        </div>
          <div className="mb-3 form-outline">
          <label class="form-label"className="fw-bold" for="description">Description</label>
          <textarea  class="form-control" id="description" rows="4"  style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}></textarea>
          
        </div>
        <p style={{ color: 'red', fontSize: '14px' }}>{error && error}</p>
        <button type="submit" className="btn btn-block text-center fw-bold" style={{ backgroundColor: '#b100cd', color: 'white', display: 'block', margin: '0 auto', borderRadius: '10px' }}>
          Update
        </button>
          <div  className= "mt-3" style={{ textAlign: 'center' }}>
      </div> 
      </form>
      <div className="pb-5"></div>
      </div>  
    );
  }
  
export default UpdateInternship;

