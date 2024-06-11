"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
function CompanyData() {
  const [error, setError] = useState("");
  const [internships, setInternships] = useState([]);

useEffect(() => {
    async function fetchInternships() {
      try {
        const response = await fetch('/api/cinternships');
        if (response.ok) {
          const data = await response.json();
          setInternships(data.data);
        }  else {
            setError(response.error);
        }
      } catch (error) {
        console.error(error);
        throw new Error('Failed to Fetch Internships!');
      }
    }
  
    fetchInternships();
  }, []);
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/cinternships?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setInternships(internships.filter(internship => internship._id !== id));
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to Delete Internship!');
    }
  }  

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="container mx-auto p-4">
        <div className="border-t-4 border-purple-800 py-1"></div>
        <h1 className="text-4xl font-bold text-center text-purple-800 cursor-default p-2">INTERNSHIPS</h1>
        <div className="border-t-4 border-purple-800 mb-8"></div>
        {internships && internships.length > 0 ? (
          <ul className="space-y-12 mt-9">
            {internships.map((internship) => (
              <div key={internship._id} className="mx-9 p-6 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow">
                <li className="mb-2">
                  <h4 className="flex items-center justify-center text-2xl font-bold text-purple-700 cursor-default">{internship.company_title}</h4>
                </li>
                <div className="space-y-2 cursor-default">
                <p><span className="font-bold">Title :</span> {internship.title}</p>
                <p><span className="font-bold">Location :</span> {internship.location}</p>
                <p><span className="font-bold">Eligibility Criteria :</span> {internship.eligibilityCriteria}</p>
                <p><span className="font-bold">Description :</span> {internship.description}</p>
                <p><span className="font-bold">Duration :</span> {internship.duration}</p>
                <p><span className="font-bold">contact_email:</span> {internship.contact_email}</p>
                  <p>
                    <span className="font-bold">URL:</span> 
                    <a href={internship.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-purple-500 hover:underline ml-1 break-all whitespace-normal">
                      {internship.c_url}
                    </a>
                  </p>
                  <div className="flex items-center justify-center space-x-2 pt-9">
                    <button
                      onClick={() => handleDelete(internship._id)}
                      className="bg-purple-700 font-semibold text-white py-2 px-4 mr-9 rounded hover:bg-pink-700 hover:shadow-lg hover:scale-110 transition duration-300"
                    >
                      Delete Internship
                    </button>
                    <Link href={`/company/update-internship?id=${internship._id}`} 
                    className="bg-purple-700 font-semibold no-underline text-white py-2 px-4 rounded hover:bg-pink-700 text-center hover:shadow-lg hover:scale-110 transition duration-300">
                        Update Internship                   
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 font-bold text-center m-9 text-3xl">Loading...</p>
        )}
        {error && <p className="text-center text-red-500 font-bold text-base">{error}</p>}
      </div>
    </div>
  );
}

export default CompanyData;
