"use client";
import React, { useEffect, useState } from "react";
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
  
  return (
        <div className="min-h-screen bg-gray-100 py-20">
        <div className="container mx-auto p-4">
          <div className="border-t-4 border-purple-800 py-1"></div>
          <h1 className="text-3xl font-bold text-center text-purple-800 cursor-default p-3">COMPANY INTERNSHIPS</h1>
          <div className="border-t-4 border-purple-800 mb-16"></div>
          {internships && internships.length > 0 ? (
            <ul className="space-y-6">
              {internships.map((internship) => (
                <div key={internship._id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
                  <li className="mb-2">
                    <h4 className="flex items-center justify-center text-2xl font-bold text-purple-700 cursor-default">{internship.title}</h4>
                  </li>
                  <div className="space-y-2 cursor-default">
                    <p><span className="font-bold">Location :</span>  {internship.city}</p>
                    <p><span className="font-bold">Eligibility Criteria :</span>  {internship.eligibilityCriteria}</p>
                    <p><span className="font-bold">Description :</span>  {internship.description}</p>
                    <p><span className="font-bold">Company Website URL :</span>  {internship.c_url}</p>
                    <p><span className="font-bold">Company Email :</span>  {internship.contact_email}</p>
                    <p>
                      <span className="font-bold">URL :</span> 
                      <a href={internship.url} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline ml-1 break-all whitespace-normal">
                        {internship.url}
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 font-bold text-center m-9 text-4xl">Loading...</p>
          )}
        {error && <p className="text-center text-red-500 font-bold text-base">{error}</p>}
        </div>
      </div>
  );
}

export default CompanyData;