"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function InternshipData() {
  const [error, setError] = useState("");
  const [internships, setInternships] = useState([]); 

  useEffect(() => {
    async function fetchInternships() {
      try {
        const response = await fetch('/api/internships');
        if (response.ok) {
          const data = await response.json();
          setInternships(data.Internshipss);
        }  else {
            setError(response.error);
        }
      } catch (error) {
        console.error(error);
        setError('Error Fetching Internships!');
      }
    }
    fetchInternships();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="container p-4">
        <div className="border-t-4 border-purple-800 py-1"></div>
        <h1 className="text-4xl font-bold text-center text-purple-800 cursor-default p-2">INTERNSHIPS</h1>
        <div className="border-t-4 border-purple-800 mb-8"></div>
        {internships && internships.length > 0 ? (
          <ul className="space-y-6">
            {internships.map((internship) => (
              <div key={internship._id} className="mx-32 p-6 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
                <li className="mb-2">
                  <h4 className="flex items-center justify-center text-2xl font-bold text-purple-700 cursor-default">{internship.company_title}</h4>
                </li>
                <div className="space-y-2 cursor-default">
                  <p><span className="font-bold">Title:</span> {internship.title}</p>
                  <p><span className="font-bold">Location:</span> {internship.location}</p>
                  <p><span className="font-bold">Eligibility Criteria:</span> {internship.eligibilityCriteria}</p>
                  <p><span className="font-bold">Description:</span> {internship.description}</p>
                  <div className="flex items-center justify-center">
                    <Link href={internship.url} target="_blank" rel="noopener noreferrer" 
                        className="mt-6 px-6 py-2 ml-5 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-900 hover:shadow-lg hover:-translate-y-1 hover:scale-105">
                        Vist Official Page
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-center text-2xl text-gray-600">Loading...</p>
        )}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default InternshipData;