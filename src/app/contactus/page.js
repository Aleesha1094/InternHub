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
            setError("Form Submit Successfully");
            setTimeout(() => {
              router.push('/');
            }, 1500);
          }
        } catch (error) {
          setError("Error, Try Again!");
          console.log(error);
        }
      };

  return (     
    <div className="container mx-auto py-9 min-h-screen bg-gray-100">
  <div className="flex justify-center">
    <div className="w-full max-w-xl shadow-lg">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold text-center my-5" data-aos="fade-up">Let’s Talk</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div data-aos="fade-up">
            <label className="font-bold">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-900 border-b-2 border-purple-900 transition duration-300"    
              id="floatingInput"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="mt-3 md:mt-0" data-aos="fade-up">
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
        <div className="mt-3" data-aos="fade-up">
          <label className="font-bold">Subject</label>
          <input
            type="text"
            className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-900 border-b-2  border-purple-900 transition duration-300"    
            id="floatingInput"
            placeholder="Subject"
            required
          />
        </div>
        <div className="mt-3" data-aos="fade-up">
          <label className="font-bold" for="description">Description</label>
          <textarea 
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-900 border-b-2  border-purple-900 transition duration-300"    
              id="description" rows="4"   placeholder="Share your Thoughts" required />
        </div>
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 mt-5 bg-purple-600 text-white hover:shadow-xl font-bold rounded-lg hover:bg-purple-700 transition duration-300"> 
            Submit
          </button>
        </div> 
      </form>
    </div>
  </div>
</div>
   
  )      
}
  
export default ContactUs;