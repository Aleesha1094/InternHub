"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function AddInternship() {
    const [error, setError] = useState(""); 
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        const location = e.target[2].value;
        const description = e.target[6].value;
        const url = e.target[4].value;
        const company_title = e.target[1].value;
        const duration = e.target[5].value;
        const eligibilityCriteria = e.target[3].value;
      
        try {
          const res = await fetch("/api/internships", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                location,
                description,
                url,
                eligibilityCriteria,
                duration,
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

      if (sessionStatus === "loading") {
        return <h1 className="text-center text-gray-500">Loading...</h1>;
      }

    return (  
      <div className="container mx-auto mt-10 mb-10">
      <h1 className="text-4xl text-center font-extrabold mb-6 text-purple-800">Add Internship</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        <div className="mb-6">
          <label className="block px-1 font-semibold mb-2">Internship Title</label>
          <input
            type="title"
            className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
            id="floatingInput"
            placeholder="Title"
            required
          />
        </div>
        <div className="mb-4">
             <label className="font-bold block mb-2">Company Title</label>
              <input
                type="text"
                className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
                id="floatingInput"
                placeholder="Company Name"
                required
              />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2">Location</label>
          <input
            type="location"
            className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
            id="floatingInput"
            placeholder="Location"
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2">Eligibility Criteria</label>
          <input
            type="criteria"
            className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
            id="floatingInput"
            placeholder="Eligibility Criteria for Internship"
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold mb-2">Website URL</label>
          <input
            type="url"
            className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
            id="floatingInput"
            placeholder="Company Website URL(optional)"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold mb-2">Duration</label>
          <input
            type="duration"
            className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:shadow-md focus:ring-2 focus:ring-purple-500"
            id="floatingInput"
            placeholder="Internship Duration"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2" for="description">Description</label>
          <textarea 
            className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="description" rows="4" placeholder="Gave Description of Internship"></textarea>
        </div>
        <p className="text-red-500 text-sm">{error && error}</p>
        <button type="submit" className="py-2 px-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300">
            Submit
          </button>         
    <div className= "mt-3 text-center">
      </div> 
      </form>
      <div className="pb-5"></div>
      </div>  
    );
  }
  
export default AddInternship;