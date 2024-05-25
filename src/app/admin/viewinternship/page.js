"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function InternshipData() {
  const [error, setError] = useState("");
  const [internships, setInternships] = useState([]); 
  const [selectedTitle, setSelectedTitle] = useState("All");


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

  const handleTitleFilter = (title) => {
    setSelectedTitle(title.toLowerCase());
  };
  

  const filteredInternships = selectedTitle === "all"
  ? internships
  : internships.filter(internship => 
      internship.title.toLowerCase().includes(selectedTitle.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-100 py-28">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8 cursor-default">INTERNSHIPS</h1>
        <label htmlFor="titleFilter">Filter by Title:</label>
        <select
          id="titleFilter"
          onChange={(e) => handleTitleFilter(e.target.value)}
          value={selectedTitle}>
          <option value="all">All Titles</option>
          <option value="app development">App Development</option>
          <option value="web development">Web Development</option>
          <option value="backend development">Backend Development</option>
          <option value="it">IT</option>
          <option value="computer science">Computer Science</option>
          <option value="banking">Banking</option>
          <option value="textile engineering">Textile Engineering</option>          
        </select>
        
        {internships && internships.length > 0 ? (
          <ul className="space-y-6">
            {internships.map((internship) => (
              <div key={internship._id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
                <li className="mb-2">
                  <h4 className="text-2xl font-bold text-purple-700 cursor-default">{internship.title}</h4>
                </li>
                <div className="space-y-2 cursor-default">
                  <p><span className="font-bold">Company Title:</span> {internship.company_title}</p>
                  <p><span className="font-bold">City:</span> {internship.city}</p>
                  <p><span className="font-bold">Description:</span> {internship.description}</p>
                  <p>
                    <span className="font-bold">URL:</span> 
                    <a href={internship.url} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline ml-1 break-all whitespace-normal">
                      {internship.url}
                    </a>
                  </p>
                  <div className="flex items-center justify-center space-x-4 mt-4">
                    <button
                      onClick={() => handleDelete(internship._id)}
                      className="bg-purple-700 text-white py-2 px-4 mr-9 rounded hover:bg-pink-700"
                    >
                      Delete Internship
                    </button>
                    <Link href={`/admin/updateinternship?id=${internship._id}`} className="bg-purple-700 no-underline text-white py-2 px-4 rounded hover:bg-pink-700 text-center">
                        Update Internship                   
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-center text-xl text-gray-600">No internships available!</p>
        )}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default InternshipData;