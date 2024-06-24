import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

async function CompanyHome() {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "company") {
    redirect("/");
  }

  const links = [
    {
      href: "/company/view-Internship",
      text: "View Internship",
      colorClass: "bg-purple-400 hover:bg-pink-400",
    },
    {
      href: "/company/addinternship",
      text: "Add Internship",
      colorClass: "bg-purple-500 hover:bg-pink-500",
    },
  ];

  return (
    <div className="min-h-screen w-full sm:mb-72 mb-0">
      <div className="h-80 bg-gradient-to-r from-[#bac7fb] via-[#c46fb2] to-[#51588c] w-full"></div>
      <div className="w-9/12 absolute sm:top-48 top-40 left-1/2 mb-4 transform -translate-x-1/2 bg-white shadow-purple-200 rounded-md flex flex-col items-center p-4 shadow-lg">
        <div className="h-24 w-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg mt-6 mb-3">
          <div className="h-20 w-20 bg-white rounded-full shadow-lg m-2">
            <p className="ml-5 mt-3 bg-gradient-to-r from-blue-700 to-indigo-400 inline-block text-transparent bg-clip-text font-bold text-5xl italic font-serif">
              {session?.user?.username ? session.user.username.charAt(0) : 'C'}
            </p>
          </div>
        </div>
        <p className="mb-9 font-bold sm:text-5xl text-4xl">{session?.user?.username || 'Company'}</p>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 pb-7">
          {links.map((link, index) => (
            <div
              key={index}
              className={`sm:w-72 w-full sm:p-0 p-4 sm:h-48 h-24 ${link.colorClass} border rounded-lg cursor-pointer transform hover:scale-105 transition duration-300`}
            >
              <Link href={link.href} className="text-white no-underline text-xl font-bold flex items-center justify-center h-full">
                {link.text}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <br />
    </div>
  );
}

export default CompanyHome;