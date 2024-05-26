"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function UpdateInternship({ internship }) {
    const [error, setError] = useState(""); 
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    const isValidEmail = (contact_email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(contact_email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target[0].value;
        const location = e.target[2].value;
        const description = e.target[6].value;
        const url = e.target[4].value;
        const company_title = e.target[1].value;
        const duration = e.target[5].value;
        const eligibilityCriteria = e.target[3].value;
              
        if (!isValidEmail(contact_email)) {
          setError("Email is invalid!");
          return;
        }
      
        try {
          const res = await fetch(`/api/internships/${internship.id}`, { 
            method: "PUT", 
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
          if (res.status === 200) { 
            setError(res.message);
            router.push('/')
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
      <div className="container mx-auto mt-10 mb-10">
      <h1 className="text-4xl text-center font-extrabold mb-6 text-purple-800">Update Internship</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
        <div className="mb-3 mt-3">
          <label className="font-bold mb-2 p-1">Internship Title</label>
          <input
            type="title"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
            id="floatingInput"
            placeholder="Title"
            // defaultValue={internship.title} 
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2 p-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
            id="floatingInput"
            placeholder="Email through which students can contact you"
            // defaultValue={internship.contact_email} 
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2 p-1">Location</label>
          <input
            type="location"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
            id="floatingInput"
            placeholder="Location"
            // defaultValue={internship.city} 
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2 p-1">Eligibility Criteria</label>
          <input
            type="criteria"
            className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
            id="floatingInput"
            placeholder="Eligibility Criteria for Internship"
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2 p-1">Website URL</label>
          <input
            type="url"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md"
            id="floatingInput"
            placeholder="Your website URL (optional)"
            // defaultValue={internship.c_url} 
          />
        </div>
        <div className="mb-4">
          <label className="font-bold mb-2 p-1">Duration</label>
          <input
            type="duration"
            className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:shadow-md focus:ring-2 focus:ring-purple-500"
            id="floatingInput"
            placeholder="Internship Duration"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2 p-1" htmlFor="description">Description</label>
          <textarea 
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="description" rows="4" placeholder="Give a description of the internship"
            // defaultValue={internship.description}
          ></textarea>
        </div>
        <p className="text-red-500 text-sm">{error && error}</p>
        <div className="flex items-center justify-center">
        <button type="submit" className="py-2 px-8 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300">
          Update
        </button></div>
      </form>
      <div className="pb-5"></div>
    </div>
    );
  }
  
export default UpdateInternship;