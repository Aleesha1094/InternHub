import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
async function AdminHome(){
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen w-full mb-72">
      <div className="h-80 bg-gradient-to-r from-[#bac7fb] via-[#c46fb2] to-[#51588c] w-full"></div>
      <div className="w-9/12 absolute sm:top-60 top-40 left-1/2 mb-4 transform -translate-x-1/2 bg-white shadow-purple-200 rounded-md flex flex-col items-center p-4 shadow-lg">
      <div className="h-24 w-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg mt-6 mb-3">
        <div className="h-20 w-20 bg-white rounded-full shadow-lg m-2">
          <p className="ml-5 mt-3 bg-gradient-to-r from-blue-700 to-indigo-400 inline-block text-transparent bg-clip-text font-bold text-5xl italic font-serif" data-aos="fade-up"> 
            {session?.user?.username ? session.user.username.charAt(0) : 'U'}</p>
        </div>
      </div>
        <p className="mb-9 font-bold text-5xl italic font-sans text-gray-800">{session?.user?.username || 'Admin'}</p>
        <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
          <div className="w-72 sm:h-48 h-24 bg-purple-400 border rounded-tl-lg cursor-pointer hover:bg-pink-400 transform hover:scale-105 transition duration-300" data-aos="fade-right"             >
            <Link href="/admin/addinternship" className="text-white no-underline text-xl font-bold flex items-center justify-center h-full">Add Internship</Link>
          </div>
          <div className="w-72 sm:h-48 h-24 bg-[#b7c2c6] border rounded-tr-lg cursor-pointer hover:bg-pink-500 transform hover:scale-105 transition duration-300" data-aos="fade-left">
            <Link href="/admin/companydetails" className="text-white text-xl no-underline font-bold flex items-center justify-center h-full">Company Details</Link>
          </div>
          <div className="w-72 sm:h-48 h-24 bg-purple-600 border rounded-bl-lg cursor-pointer hover:bg-pink-600 transform hover:scale-105 transition duration-300" data-aos="fade-right">
            <Link href="/admin/feedbackdetails" className="text-white text-xl no-underline font-bold flex items-center justify-center h-full">Feedback Details</Link>
          </div>
          <div className="w-72 sm:h-48 h-24 bg-[#5c509c] border rounded-br-lg cursor-pointer hover:bg-pink-700 transform hover:scale-105 transition duration-300" data-aos="fade-left">
            <Link href="/admin/viewinternship" className="text-white text-xl no-underline font-bold flex items-center justify-center h-full">View Internship</Link>
          </div>
        </div>
      </div>
      <br/>
    </div>
  );
};

export default AdminHome;