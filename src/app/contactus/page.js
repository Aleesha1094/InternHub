"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

function ContactUs() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); 
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
            setError("Error Adding Feedback!");
          }
          if (res.status === 201) {
            setError("");
            setSuccess("Form Added Successfully");
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
  <div className="container mx-auto sm:min-h-screen bg-gray-100 sm:p-14 p-2">
    <div className="flex justify-center">
    <div className="sm:mt-0 mt-32">
      <div class="mix-blend-multiply sm:w-24 sm:h-24 w-10 h-10 bg-purple-800 rounded-full" data-aos="fade-right" data-aos-duration='1500'></div>
      <div class="mix-blend-multiply sm:w-24 sm:h-24 w-10 h-10 bg-purple-700 rounded-full" data-aos="fade-right" data-aos-duration='2000'></div>
      <div class="mix-blend-multiply sm:w-24 sm:h-24 w-10 h-10 bg-purple-600 rounded-full"data-aos="fade-right" data-aos-duration='2300'></div>
      <div class="mix-blend-multiply sm:w-24 sm:h-24 w-10 h-10 bg-purple-500 rounded-full"data-aos="fade-right" data-aos-duration='2500'></div>
      <div class="mix-blend-multiply sm:w-24 sm:h-24 w-10 h-10 bg-purple-400 rounded-full"data-aos="fade-right" data-aos-duration='2700'></div>
    </div>
      <div className="w-full max-w-xl shadow-lg" data-aos="fade-up">
      <form onSubmit={handleSubmit} className="bg-white sm:p-8 p-4 rounded-lg">
        <h1 className="text-4xl font-bold text-center sm:my-5 my-1" data-aos="fade-up">Let’s Talk</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
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
          <div className="mt-3 md:mt-0">
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
          <label className="font-bold" for="description">Description</label>
          <textarea 
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-900 border-b-2  border-purple-900 transition duration-300"    
              id="description" rows="4"   placeholder="Share your Thoughts" required />
        </div>
        {error && <p className="text-center text-red-500 font-bold text-base">{error}</p>}
        {success && <p className="text-center text-green-500 font-bold text-base">{success}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 mt-5 bg-purple-600 text-white hover:shadow-xl font-bold rounded-lg hover:bg-purple-700 transition duration-300"> 
            Submit
          </button>
        </div> 
      </form>
    </div>
    <div className="sm:mt-0 mt-32">
      <div class="mix-blend-multiply sm:w-24 sm:h-24 w-10 h-10 bg-purple-800 rounded-full" data-aos="fade-left" data-aos-duration='1500'></div>
      <div class="mix-blend-multiply sm:w-24 sm:h-24 w-10 h-10 bg-purple-700 rounded-full" data-aos="fade-left" data-aos-duration='2000'></div>
      <div class="mix-blend-multiply sm:w-24 sm:h-24 w-10 h-10 bg-purple-600 rounded-full"data-aos="fade-left" data-aos-duration='2300'></div>
      <div class="mix-blend-multiply sm:w-24 sm:h-24 w-10 h-10 bg-purple-500 rounded-full"data-aos="fade-left" data-aos-duration='2500'></div>
      <div class="mix-blend-multiply sm:w-24 sm:h-24 w-10 h-10 bg-purple-400 rounded-full"data-aos="fade-left" data-aos-duration='2700'></div>
    </div>
  </div>
</div>
   
  )      
}
  
export default ContactUs;