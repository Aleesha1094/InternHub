"use client";
import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";

function StudentFeedback() {
  const [error, setError] = useState("");
//   const { data: session, status: sessionStatus } = useSession();
  const [feedbacks, setFeedback] = useState([]);

//   useEffect(() => {
//     if (sessionStatus === "authenticated") {
//         router.replace('/admin')
//     }
//   }, [session, router]);

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
    // sessionStatus !== "authenticated" && (   
        <div>
        <h1>Student Feedbacks</h1>
        <ul>
        {feedbacks && feedbacks.map((feedback) => (
        <div key={feedback._id}>
            <h4>Feedback</h4>
            {feedback.user_name && <li>Name: {feedback.user_name}</li>}
            {feedback.user_email && <li>Email: {feedback.user_email}</li>}
            {feedback.subject && <li>Subject: {feedback.subject}</li>}
            {feedback.message && <li>Message: {feedback.message}</li>}
        </div>
        ))}
        </ul>
        <p>{error && error}</p>
      </div>
  );
}

export default StudentFeedback;
