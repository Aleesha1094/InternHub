import React from "react";
// import { getServerSession } from "next-auth";
// import { useRouter } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
import Link from "next/link";

async function CompanyHome(){
  // const session = await getServerSession(authOptions);
  // if (!session || session?.user?.role !== "company") {
  //   redirect("/");
  // }
  return (
    <div>
      <h1 className=" fw-bold mt-3">CompanyHome</h1>
      <button className="btn btn-primary" style={{backgroundColor: 'purple', borderColor: 'purple', marginLeft: '10px'}}>
        <Link href="/company/add-internship" style={{color: 'white', textDecoration: 'none'}}>Add Internship</Link>
      </button>
      <button className="btn btn-primary" style={{backgroundColor: 'purple', borderColor: 'purple', marginLeft: '10px'}}>
        <Link href="/company/view-Internship" style={{color: 'white', textDecoration: 'none'}}>View Internship</Link>
      </button>
    </div>
  );
};

export default CompanyHome;