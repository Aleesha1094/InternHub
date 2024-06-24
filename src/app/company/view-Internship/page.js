"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function CompanyData() {
  const [error, setError] = useState("");
  const [internships, setInternships] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();
 
  useEffect(() => {
    if (status === 'authenticated') {
      const loggedInId = session.user.id;

    async function fetchInternships() {
      try {
        const response = await fetch('/api/cinternships');
        if (response.ok) {
          const data = await response.json();
          const filteredInternships = data.data.filter(internship => internship.companyId === loggedInId);
          setInternships(filteredInternships);
        }  else {
            setError(response.error);
        }
      } catch (error) {
        console.error(error);
        setError('Failed to Fetch Internships!');
      }
    }
  
    fetchInternships();
  }else
  {
    router.replace('/company');
  }
  }, [session, router, status]);
  
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
  };

  return (
    <div className="min-h-screen bg-gray-100 sm:py-20 py-9">
      <div className="container mx-auto p-4">
        <h1 className="border-y-4 border-purple-800 sm:text-4xl text-3xl font-bold text-center py-4 text-purple-800 cursor-default p-2">COMPANY INTERNSHIPS</h1>
        {internships && internships.length > 0 ? (
          <ul className="space-y-12 mt-9">
            {internships.map((internship) => (
              <div key={internship._id} className="sm:mx-9 mx-2 p-6 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow">
                <li className="mb-2">
                  <h4 className="flex items-center justify-center text-2xl font-bold text-purple-700 cursor-default">{internship.title}</h4>
                </li>
                <div className="space-y-2 cursor-default">
                <p><span className="font-bold">Location :</span> {internship.location}</p>
                <p><span className="font-bold">Eligibility Criteria :</span> {internship.eligibilityCriteria}</p>
                <p><span className="font-bold">Description :</span> {internship.description}</p>
                <p><span className="font-bold">Duration :</span> {internship.duration}</p>
                <p><span className="font-bold">Contact Email:</span> {internship.contact_email}</p>
                  <p>
                    <span className="font-bold">URL:</span> 
                    <a href={internship.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer text-purple-500 hover:underline ml-1 break-all whitespace-normal">
                      {internship.url}
                    </a>
                  </p>
                  <div className="flex items-center justify-center space-x-2 sm:pt-9 pt-3">
                    <button
                      onClick={() => handleDelete(internship._id)}
                      className="bg-purple-700 font-semibold text-white py-2 sm:px-4 px-1 sm:mr-9 mr-2 rounded hover:bg-pink-700 hover:shadow-lg hover:scale-110 transition duration-300"
                    >
                      Delete Internship
                    </button>
                    <Link href={`/company/update-internship?id=${internship._id}`} 
                    className="bg-purple-700 font-semibold no-underline text-white py-2 sm:px-4 px-0 rounded hover:bg-pink-700 text-center hover:shadow-lg hover:scale-110 transition duration-300">
                        Update Internship                   
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 font-bold text-center m-9 text-3xl">No Internship Added</p>
        )}
        {error && <p className="text-center text-red-500 font-bold text-base">{error}</p>}
      </div>
    </div>
  );
}

export default CompanyData;
