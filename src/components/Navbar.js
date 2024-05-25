"use client"
import React from 'react'
import Navpic from './../../public/Navpic.png'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react';

function Navbar() {
    const { data: session } = useSession();

    const GetUserRole = () => {
      if (session) {
        if (session.user.role === 'admin') {
          return '/admin';
        } else if (session.user.role === 'company') {
          return '/company';
        }
      }
      return null;
    };

    return (
        <nav class="w-full bg-white shadow flex justify-between items-center md:px-32 py-1 fixed">
            <div className='flex items-center border-r border-[#1E1E1E99]'>
                <Image src={Navpic} alt="" className='w-36'/>
                {/* <p className='text-[18px] text-[#1E1E1E99] font-poppins font-md mr-4'>Intern Hub</p> */}
            </div>
            <div class="container flex items-center justify-center p-6 mx-auto text-purple-600 pr-40 space-x-[40px] sm:flex hidden">
                <Link href="/" class="text-gray-800 border-b-2 border-purple-500 mx-1.5 sm:mx-6">Home</Link>
                <Link href="/" class="text-purple-700 border-b-2 border-transparent hover:text-gray-800 hover:border-purple-500 mx-1.5 sm:mx-6">Internships</Link>
                <Link href="/testportal" class="text-purple-700 border-b-2 border-transparent hover:text-gray-800 hover:border-purple-500 mx-1.5 sm:mx-6">Test Bank</Link>
                <Link href="/contactus" class="text-purple-700 border-b-2 border-transparent hover:text-gray-800 hover:border-purple-500 mx-1.5 sm:mx-6">Contact Us</Link>

                {!session ? (
                  <>
                      <Link href="/register" class="text-purple-700 border-b-2 border-transparent hover:text-gray-800 hover:border-purple-500 mx-1.5 sm:mx-6">Company</Link>
                      <Link href="/adminlogin" class="text-purple-700 border-b-2 border-transparent hover:text-gray-800 hover:border-purple-500 mx-1.5 sm:mx-6">Admin</Link>
                  </>
                    ) : (
                    <>
                    <Link href={GetUserRole()} class="border-b-2 border-transparent hover:text-gray-800 hover:border-purple-500 mx-1.5 sm:mx-6">Profile</Link>
                    {/* <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">{session.user?.email}
                      <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                      </svg>
                    </button> */}
                    {/* <div id="dropdownHover" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"> */}
                      {/* <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownHoverButton"> */}
                        {/* <li> */}
                          <button onClick={() => signOut()}>Logout</button>
                        {/* </li> */}
                      {/* </ul> */}
                    {/* </div> */}
                    </>
                    )}
            </div>
    </nav>
    )
}

export default Navbar