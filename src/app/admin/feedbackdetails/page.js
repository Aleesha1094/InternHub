"use client";
import React, { useEffect, useState } from "react";

function StudentFeedback() {
  const [error, setError] = useState("");
  const [feedbacks, setFeedback] = useState([]);

useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await fetch('/api/feedback');
        if (response.ok) {
          const data = await response.json();
          setFeedback(data.data);
        } else {
            setError(response.error);
        }
      } catch (error) {
        console.error(error);
        setError('Error Fetching Feedback!');
      }
    }
    fetchFeedback();
  }, []);

  return (
      <div className="min-h-screen bg-gray-100 sm:py-20 py-10">
        <div className="container mx-auto p-4">
          <div className="border-t-4 border-purple-800 py-1"></div>
            <h1 className="text-2xl font-bold text-center text-purple-800 cursor-default p-3">STUDENT FEEDBACKS</h1>
            <div className="border-t-4 border-purple-800 mb-16"></div>
              {feedbacks && feedbacks.length > 0 ? (
                <ul className="space-y-6">
                  {feedbacks && feedbacks.map((feedback) => (
                     <div key={feedback._id} className="sm:p-6 p-3 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
                       <li className="mb-2 text-center">
                          <h4 className="sm:text-3xl text-xl font-bold text-purple-700 cursor-default">
                            <span className="sm:px-9 px-2 text-sm text-black">Feedback from : </span>
                            {feedback.user_name}
                          </h4>
                       </li>
                       <div className="space-y-2 cursor-default">
                         <p><span className="font-bold">User Email :</span>  {feedback.user_email}</p>
                         <p><span className="font-bold">Subject :</span>  {feedback.subject}</p>
                         <p><span className="font-bold">Message :</span>  {feedback.message}</p>                
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

export default StudentFeedback;