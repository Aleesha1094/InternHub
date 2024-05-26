import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from 'next/image';
import Design from './../../../public/abc.avif'
import Link from "next/link";
async function AdminHome(){
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="h-screen w-full mb-64">
      <Image src={Design} className="h-80 bg-gradient-to-t from-transparent to-purple-100 w-screen" alt="Admin"/>
      <div className="w-9/12 absolute top-48 left-1/2 mb-4 transform -translate-x-1/2 bg-white shadow-purple-200 rounded-md flex flex-col items-center p-4 shadow-lg">
        <Image src={Design} className="h-24 w-24 rounded-full shadow-lg mt-6 mb-3" alt="Admin"/>
        <h2 className="mb-9">{session?.user?.username || 'Admin'}</h2>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          <div className="w-72 h-48 bg-purple-500 border rounded-tl-lg cursor-pointer hover:bg-pink-500 transform hover:scale-105 transition duration-300"              >
            <Link href="/admin/addinternship" className="text-white no-underline text-xl font-bold flex items-center justify-center h-full">Add Internship</Link>
          </div>
          <div className="h-48 w-72 bg-purple-600 border rounded-tr-lg cursor-pointer hover:bg-pink-600 transform hover:scale-105 transition duration-300">
            <Link href="/admin/companydetails" className="text-white text-xl no-underline font-bold flex items-center justify-center h-full">Company Details</Link>
          </div>
          <div className="h-48 w-72 bg-purple-700 border rounded-bl-lg cursor-pointer hover:bg-pink-700 transform hover:scale-105 transition duration-300">
            <Link href="/admin/feedbackdetails" className="text-white text-xl no-underline font-bold flex items-center justify-center h-full">Feedback Details</Link>
          </div>
          <div className="h-48 w-72 bg-purple-800 border rounded-br-lg cursor-pointer hover:bg-pink-800 transform hover:scale-105 transition duration-300">
            <Link href="/admin/viewinternship" className="text-white text-xl no-underline font-bold flex items-center justify-center h-full">View Internship</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;