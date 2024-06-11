"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

function ContactUs() {
    const [error, setError] = useState("");
    const router = useRouter();

    const isValidEmail = (user_email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(user_email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_email = e.target[1].value;
        const subject = e.target[2].value;
        const user_name = e.target[0].value;
        const message = e.target[3].value;
      
        if (!isValidEmail(user_email)) {
          setError("Email is Invalid!");
          return;
        }
      
        try {
          const res = await fetch("/api/feedback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_email,
              subject,
              message,
              user_name,
            }),
          });
          if (res.status === 500) {
            setError(res.error);
          }
          if (res.status === 201) {
            setError(res.message);
            router.push('/')
          }
        } catch (error) {
          setError("Error, Try Again!");
          console.log(error);
        }
      };

  return (     
    <div className="container my-9 min-h-screen" data-aos="fade-up"  data-aos-easing="ease-out">
    <div className="flex justify-center drop-shadow-[0_0px_300px_rgba(186,85,211,0.23)]" >
      <div className="w-full max-w-xl p-4">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center my-5" data-aos="fade-up">Let’s Talk</h1>
          <div className="grid grid-cols-1 gap-4 mt-3">
            <div>
              <label className="font-bold">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-900 border-b-2 border-purple-900 transition duration-300"    
                id="floatingInput"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="mt-3">
              <label className="font-bold">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-900 border-b-2  border-purple-900 transition duration-300"    
                id="floatingInput"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="font-bold">Subject</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-900 border-b-2  border-purple-900 transition duration-300"    
              id="floatingInput"
              placeholder="Subject"
              required
            />
          </div>
          <div className="mt-3">
            <label   className="font-bold" htmlFor="description">Description</label>
            <textarea 
                className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-900 border-b-2  border-purple-900 transition duration-300"    
                id="description" rows="4"   placeholder="Share your Thoughts" required />
          </div>
          <p className="text-red-500 mt-2">{error && error}</p>
            <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 mt-5 bg-purple-600 text-white hover:shadow-xl font-bold rounded-lg hover:bg-purple-700 transition duration-300"> 
              Submit
            </button></div> 
        </form>
      </div>
    </div>
  </div>    
  )      
}
  
export default ContactUs;