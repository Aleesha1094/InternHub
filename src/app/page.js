"use client";
import Categories from "@/components/Categories";
import HeroSection from "@/components/HeroSection";
import React, { useEffect, useState } from "react";
import Test from "@/components/Test";

export default function Home() {
  // const [error, setError] = useState("");
  // const [internships, setInternships] = useState([]); 

  // useEffect(() => {
  //   async function fetchInternships() {
  //     try {
  //       const response = await fetch('/api/internships');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setInternships(data.Internshipss);
  //       }  else {
  //           setError(response.error);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       throw new Error('Failed to Fetch Internships!');
  //     }
  //   }
  
  //   fetchInternships();
  // }, []);

  return (
    
    <main className="flex-grow">
      <HeroSection/>
      <Categories/>
      {/* <Footer/> */}
      {/* {internships && internships.length > 0 ? (
        <ul>
        {internships.map((internship) => (
          <div key={internship._id} className="m-8 border-double border-2 border-purple-300 shadow-md shadow-purple-300 rounded-lg">
            <li><h5>{internship.company_title}</h5></li>
            <div>
              <p>Title: {internship.title}</p>
              <p>Title: {internship.title}</p>
              <p>City: {internship.city}</p>
              <p>Description:{internship.description}</p>
              <button className="bg-purple-800 border border-purple-800 text-white px-4 py-2 rounded-md ml-4">
                <a href={internship.url} target="_blank" rel="noopener noreferrer" className="no-underline text-white hover:text-gray-100">View Details</a>
            </button>
            </div>
          </div>
        ))}
      </ul>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>{error}</p>} */}
    </main> 
  );
}