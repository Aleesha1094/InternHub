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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/internships?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setInternships(internships.filter(internship => internship._id !== id));
      } else {
          setError(response.error);
      }
    } catch (error) {
      console.error(error);
      setError('Error Deleting Internship!');
    }
  }

  const handleTitleFilter = (e) => {
    setSelectedTitle(e.target.value.toLowerCase());
  };

  const predefinedTitles = [
    { value: "all", label: "All" },
    { value: "Bank Internship", label: "Bank Internship" },
    { value: "Textile Internship", label: "Textile Internship" },
    { value: "CS-SE Internship", label: "CS & SE Internship" },
  ];

  const filteredInternships = selectedTitle === "all"
  ? internships
  : internships.filter(internship => internship.title.toLowerCase() === selectedTitle);

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="container mx-auto p-4">
        <div className="border-t-4 border-purple-800 py-1"></div>
        <h1 className="text-4xl font-bold text-center text-purple-800 cursor-default p-2">INTERNSHIPS</h1>
        <div className="border-t-4 border-purple-800 mb-8"></div>
        <div className="flex justify-center mb-8">
          <select
            onChange={handleTitleFilter}
            className="p-2 border rounded"
            value={selectedTitle}
          >
            {predefinedTitles.map((title, index) => (
              <option key={index} value={title.value.toLowerCase()}>
                {title.label}
              </option>
            ))}
          </select>
        </div>
        {filteredInternships && filteredInternships.length > 0 ? (
          <ul className="space-y-12 mt-9">
            {filteredInternships.map((internship) => (
              <div key={internship._id} className="p-6 sm:mx-24 mx-2 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow">
                <li className="mb-2">
                  <h4 className="flex items-center justify-center text-2xl font-bold text-purple-700 cursor-default">{internship.company_title}</h4>
                </li>
                <div className="space-y-2 cursor-default">
                  <p><span className="font-bold">Title:</span> {internship.title}</p>
                  <p><span className="font-bold">Location:</span> {internship.location}</p>
                  <p><span className="font-bold">Duration:</span> {internship.duration}</p>
                  <p><span className="font-bold">Eligibility Criteria:</span> {internship.eligibilityCriteria}</p>
                  <p><span className="font-bold">Description:</span> {internship.description}</p>
                  <p>
                    <span className="font-bold">URL:</span> 
                    <Link href={internship.url} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline ml-1 break-all whitespace-normal">
                      {internship.url}
                    </Link>
                  </p>
                  <div className="flex items-center justify-center space-x-4 sm:pt-9 pt-4">
                    <button
                      onClick={() => handleDelete(internship._id)}
                      className="bg-purple-700 font-semibold text-white py-2 px-4 sm:mr-9 mr-2 rounded hover:bg-pink-700 hover:shadow-lg hover:scale-105"
                    >
                      Delete Internship
                    </button>
                    <Link href={`/admin/updateinternship?id=${internship._id}`} 
                    className="bg-purple-700 font-semibold no-underline text-white py-2 px-4 rounded hover:bg-pink-700 text-center hover:shadow-lg hover:scale-105">
                        Update Internship                   
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 font-bold text-center m-9 text-3xl">Loading...</p>
        )}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default InternshipData;