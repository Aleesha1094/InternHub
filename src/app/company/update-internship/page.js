"use client"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function UpdateInternship() {
  const [internship, setInternship] = useState(null);
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchInternship = async () => {
        try {
            const res = await fetch(`/api/cinternships/${id}`);
            const data = await res.json();
            setInternship(data.Company_Internshipss);
            console.log(data.Company_Internshipss);
          } catch (error) {
            console.error("Error fetching internship data:", error);
            setError("Error fetching internship data!");
        }
    };
    if (!id) {
        router.push("/company/view-Internship");
    }
    if (id) {
        fetchInternship();
    }
}, [id, router]);

    const isValidEmail = (contact_email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(contact_email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Title = e.target[0].value;
        const Location = e.target[2].value;
        const Description = e.target[6].value;
        const C_url = e.target[4].value;
        const Contact_email = e.target[1].value;
        const Duration = e.target[5].value;
        const EligibilityCriteria = e.target[3].value;
      
        if (!isValidEmail(Contact_email)) {
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
                Title,
                Location,
                Description,
                EligibilityCriteria,
                C_url,
                Contact_email,
                Duration
            }),
          });
          const errorData = await res.json();
          if (res.status === 500) {
            setError(errorData.error);
          }
          if (res.status === 404) {
            setError(errorData.error);
          }
          if (res.status === 200) { 
            setError("");
            setSuccess("Internship Updated Successfully");
            setTimeout(() => {
            router.push('/admin/viewinternship');
            }, 1500)  
          }
        } catch (error) {
          setError("Error, Try Again!");
          console.log(error);
        }
      };

      if (!internship) {
        return <div className="text-gray-700 font-bold text-center m-9 text-4xl">Loading...</div>;
    }

    return (  
      <div className="container mx-auto mt-10 mb-10">
      <h1 className="text-4xl text-center font-extrabold mb-6 text-purple-800">Update Internship</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="mb-3 mt-3">
          <label className="font-bold mb-2 p-1">Internship Title</label>
          <input
            type="title"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md hover:bg-purple-100"
            id="floatingInput"
            placeholder="Type of Internship"
            defaultValue={internship.title || ""}
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2 p-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md focus:bg-purple-100"
            id="floatingInput"
            placeholder="Email through which students can contact you"
            defaultValue={internship.contact_email || ""} 
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2 p-1">Location</label>
          <input
            type="location"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md focus:bg-purple-100"
            id="floatingInput"
            placeholder="Location"
            defaultValue={internship.location || ""} 
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2 p-1">Eligibility Criteria</label>
          <input
            type="eligibilityCriteria"
            className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md focus:bg-purple-100"
            id="floatingInput"
            defaultValue={internship.eligibilityCriteria || ""}
            placeholder="Eligibility Criteria for Internship"
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2 p-1">Website URL</label>
          <input
            type="c_url"
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:shadow-md focus:bg-purple-100"
            id="floatingInput"
            placeholder="Your website URL"
            defaultValue={internship.c_url || ""} 
          />
        </div>
        <div className="mb-4">
          <label className="font-bold mb-2 p-1">Duration</label>
          <input
            type="duration"
            className="form-control w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:shadow-md focus:ring-2 focus:ring-purple-500 focus:bg-purple-100"
            id="floatingInput"
            defaultValue={internship.duration || ""}
            placeholder="Internship Duration"
          />
        </div>
        <div className="mb-4">
          <label className="font-bold block mb-2 p-1" htmlFor="description">Description</label>
          <textarea 
            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-purple-100"
            id="description" rows="4" placeholder="Give a description of the internship"
            defaultValue={internship.description || ""}
          ></textarea>
        </div>
        {error && <p className="text-center text-red-500 font-bold text-base">{error}</p>}
        {success && <p className="text-center text-green-500 font-bold text-base">{success}</p>}        
        <div className="flex justify-center">
          <button type="submit" className="py-2 px-8 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:shadow-lg hover:scale-105">
            Update
          </button>
        </div>
      </form>
      <div className="pb-5"></div>
    </div>
    );
  }
  
export default UpdateInternship;