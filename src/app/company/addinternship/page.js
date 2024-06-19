"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function AddInternship() {
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(""); 
    const router = useRouter();
    const { data: session } = useSession();
    const companyId = session.user.id;

    const isValidEmail = (contact_email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(contact_email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        const location = e.target[2].value;
        const description = e.target[6].value;
        const c_url = e.target[4].value;
        const contact_email = e.target[1].value;
        const duration = e.target[5].value;
        const eligibilityCriteria = e.target[3].value;
      
        if (!isValidEmail(contact_email)) {
          setError("Email is invalid!");
          return;
        }
        try {
          const res = await fetch("/api/cinternships", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              companyId,
              title,
              location,
              description,
              eligibilityCriteria,
              c_url,
              contact_email,
              duration
            }),
          });
          if (res.status === 500) {
            setError(res.error);
          }
          if (res.status === 201) {
            setError("");
            setSuccess("Internship Added Successfully");            
            setTimeout(() => {
              router.push('/company')
            }, 1500)   
          }
        } catch (error) {
          setError("Error, Try Again!");
          console.log(error);
        }
      };

    return (  
      <div className="container mx-auto p-10 bg-gray-50">
        <h1 className="text-4xl text-center font-extrabold mb-6 text-purple-800">Add Internship</h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl space-y-6">
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
              <label className="font-bold block mb-2">Email</label>
                <input
                  type="email"
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
              type="c_url"
              className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
              id="floatingInput"
              placeholder="Company Website URL"
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
          {error && <p className="text-center text-red-500 font-bold text-base">{error}</p>}
          {success && <p className="text-center text-green-500 font-bold text-base">{success}</p>}
          <div className="flex justify-center">
            <button type="submit" className="py-2 px-6 bg-purple-600 shadow-md text-white font-bold rounded-lg hover:bg-purple-700 hover:scale-110 transition duration-300">
                Submit
            </button> 
          </div>        
          <div className= "mt-3 text-center">
        </div> 
      </form>
      <div className="pb-5"></div>
    </div>  
  );
}
  
export default AddInternship;