import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

async function AdminHome() {
  const session = await getServerSession(authOptions);
  if (!session || session?.user?.role !== "admin") {
    redirect("/");
  }

  const links = [
    {
      href: "/admin/addinternship",
      text: "Add Internship",
      colorClass: "bg-purple-400 hover:bg-pink-400",
      aos: "fade-right",
    },
    {
      href: "/admin/companydetails",
      text: "Company Details",
      colorClass: "bg-[#b7c2c6] hover:bg-pink-500",
      aos: "fade-left",
    },
    {
      href: "/admin/feedbackdetails",
      text: "Feedback Details",
      colorClass: "bg-purple-600 hover:bg-pink-600",
      aos: "fade-right",
    },
    {
      href: "/admin/viewinternship",
      text: "View Internship",
      colorClass: "bg-[#5c509c] hover:bg-pink-700",
      aos: "fade-left",
    },
  ];

  return (
    <div className="min-h-screen w-full sm:mb-72 mb-14">
      <div className="h-80 bg-gradient-to-r from-[#bac7fb] via-[#c46fb2] to-[#51588c] w-full"></div>
      <div className="w-9/12 absolute sm:top-60 top-40 left-1/2 mb-4 transform -translate-x-1/2 bg-white shadow-purple-200 rounded-md flex flex-col items-center p-4 shadow-lg">
        <div className="h-24 w-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-lg mt-6 mb-3">
          <div className="h-20 w-20 bg-white rounded-full shadow-lg m-2">
            <p className="ml-5 mt-3 bg-gradient-to-r from-blue-700 to-indigo-400 inline-block text-transparent bg-clip-text font-bold text-5xl italic font-serif" data-aos="fade-up">
              {session?.user?.username ? session.user.username.charAt(0) : 'A'}
            </p>
          </div>
        </div>
        <p className="mb-9 font-bold text-5xl italic font-sans text-gray-800">{session?.user?.username || 'Admin'}</p>
        <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
          {links.map((link, index) => (
            <div
              key={index}
              className={`sm:w-72 w-full sm:p-0 p-4 sm:h-48 h-24 ${link.colorClass} border rounded-lg cursor-pointer transform hover:scale-105 transition duration-300`}
              data-aos={link.aos}
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

export default AdminHome;