"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DatePicker from "react-datepicker";

function AddInternship() {
    const [error, setError] = useState(""); 
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const [end_date, setEndDate] = useState('');

    // const companyId = session.user.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        const city = e.target[2].value;
        const description = e.target[4].value;
        const url = e.target[3].value;
        const company_title = e.target[1].value;
      
        try {
          const res = await fetch("/api/internships", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                city,
                description,
                url,
                company_title,
            }),
          });
          if (res.status === 500) {
            setError(res.error);
          }
          if (res.status === 201) {
            setError(res.message);
            router.push('/admin')
          }
        } catch (error) {
          setError("Error, Try Again!");
          console.log(error);
        }
      };

    //   if (sessionStatus === "loading") {
    //     return <h1>Loading...</h1>;
    //   }

    return (  
      <div className="container mt-5 mb-5">
      <h1 className="text-center fw-bold mt-5">Add Internship</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }} className="bg-light p-4 rounded shadow">
        <div className="mb-3 mt-3 ">
          <label className="fw-bold">Internship Title</label>
          <input
            type="title"
            className="form-control"
            id="floatingInput"
            placeholder="Title"
            required
            style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}
          />
        </div>
        <div className="form-group mt-3">
             <label className="fw-bold">Company Title</label>
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Company Name"
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
            style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}
          />
        </div>
        <div className="mb-3 form-outline">
          <label class="form-label"className="fw-bold" for="description">Description</label>
          <textarea class="form-control" id="description" rows="4"  style={{ backgroundColor: '#f0f0f0', borderRadius: '10px' }}></textarea>
        </div>
        <p style={{ color: 'red', fontSize: '14px' }}>{error && error}</p>
        <button type="submit" className="btn btn-block text-center fw-bold" style={{ backgroundColor: '#b100cd', color: 'white', display: 'block', margin: '0 auto', borderRadius: '10px' }}>
          Submit
        </button>
          <div  className= "mt-3" style={{ textAlign: 'center' }}>
      </div> 
      </form>
      <div className="pb-5"></div>
      </div>  
    );
  }
  
export default AddInternship;