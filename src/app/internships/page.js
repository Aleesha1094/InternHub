"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function InternshipData() {
  const [error, setError] = useState("");
  const [internships, setInternships] = useState([]); 
  const [selectedTitle, setSelectedTitle] = useState("all");

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

  const handleTitleFilter = (e) => {
    setSelectedTitle(e.target.value.toLowerCase());
  };

  const predefinedTitles = ["All", "Bank Internship", "Company Internship", "Textile Internship", "Web Development"];

  const filteredInternships = selectedTitle === "all"
    ? internships
    : internships.filter(internship => 
        internship.title.toLowerCase().includes(selectedTitle)
      );


  return (
    <div className="min-h-screen bg-gray-100 py-20">
    <div className="container mx-auto px-4">
      <div className="border-t-4 border-purple-800 py-1"></div>
      <h1 className="text-4xl font-bold text-center text-purple-800 my-4">INTERNSHIPS</h1>
      <div className="border-t-4 border-purple-800 mb-8"></div>
      {/* {internships && internships.length > 0 ? ( */}
      <div className="flex justify-center mb-8">
          <select
            onChange={handleTitleFilter}
            className="p-2 border rounded"
          >
            {predefinedTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
        {filteredInternships && filteredInternships.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 m-3">
          {filteredInternships.map((internship) => (
          // {internships.map((internship) => (
            <li key={internship._id} className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
              <div className="p-6">
                <h4 className="text-2xl font-bold text-purple-700 mb-2">{internship.company_title}</h4>
                <p className="mb-2"><span className="font-bold">Title:</span> {internship.title}</p>
                <p className="mb-2"><span className="font-bold">Location:</span> {internship.location}</p>
                <p className="mb-2"><span className="font-bold">Eligibility Criteria:</span> {internship.eligibilityCriteria}</p>
                <p className="mb-4 text-justify"><span className="font-bold">Description:</span> {internship.description}</p>
                <div className="flex justify-center">
                  <Link href={internship.url} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-900 hover:shadow-lg hover:-translate-y-1 hover:scale-105">
                    Visit Official Page
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 font-bold text-center m-9 text-4xl">Loading...</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  </div>
  
  );
}

export default InternshipData;