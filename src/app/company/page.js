import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

async function CompanyHome(){
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "company") {
    redirect("/");
  }

  return (
    <div className="h-screen w-full mb-64">
      <div class="h-80 bg-gradient-to-r from-[#bac7fb] via-[#c46fb2] to-[#51588c] w-full"></div>
      <div className="w-9/12 absolute top-48 left-1/2 mb-4 transform -translate-x-1/2 bg-white shadow-purple-200 rounded-md flex flex-col items-center p-4 shadow-lg">
      <div class="h-24 w-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg mt-6 mb-3"></div>
        {/* <Image src={Design} className="h-24 w-24 rounded-full shadow-lg mt-6 mb-3" alt="Admin"/> */}
        <p className="mb-9 font-bold text-3xl">{session?.user?.username || 'Admin'}</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="w-72 h-48 bg-purple-300 border rounded-tl-lg cursor-pointer hover:bg-pink-400 transform hover:scale-105 transition duration-300"              >
            <Link href="/company/view-Internship" className="text-white no-underline text-xl font-bold flex items-center justify-center h-full">View Internship</Link>
          </div>
          <div className="h-48 w-72 bg-[#b7c2c6] border rounded-tr-lg cursor-pointer hover:bg-pink-500 transform hover:scale-105 transition duration-300">
            <Link href="/company/addinternship" className="text-white text-xl no-underline font-bold flex items-center justify-center h-full">Add Internship</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;