"use client";
import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
function CompanyData() {
  const [error, setError] = useState("");
//   const { data: session, status: sessionStatus } = useSession();
  const [internships, setInternships] = useState([]);

//   useEffect(() => {
//     if (sessionStatus === "authenticated") {
//         router.replace('/admin')
//     }
//   }, [session, router]);

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
    // sessionStatus !== "authenticated" && (   
      <div>
        <h1>Company Internships</h1>
        <ul>
        {internships && internships.map((internship) => (
        <div key={internship._id}>
            <h4>Company</h4>
            <li>{internship.title}</li>
            <li>{internship.city}</li>
            <li>{internship.description}</li>
            <li>{internship.c_url}</li>
            <li>{internship.contact_email}</li>
            <li>{internship.end_date}</li>
        </div>
        ))}
        </ul>
        <p>{error && error}</p>
      </div>
  );
}

export default CompanyData;