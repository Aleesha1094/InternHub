"use client"
import React, {useState} from 'react'
import Navpic from './../../public/Logo-removebg.png'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import Dropdown from './Dropdown'

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

    const [nav , setnav] = useState(false);
    

    const handlenav = () => {
        setnav(!nav);
    }
    const navbar = [
      { title: 'Home', url: "/" },
      { title: 'Internships', url: "/internships"  },
      { title: 'Contact Us', url: "/contactus"  },
      { title: 'Internship Test', url: "/testportal"  },
  ]

  const dropdown1 = [
    { url: '/register', title: 'Company'},
    { url: '/adminlogin', title: 'Admin' }
];
const dropdown2 = [
  { signOut: true, title: 'Logout' }
];

    return (
        <nav className="w-full bg-white shadow flex justify-between items-center md:px-32 py-3">
            <div className='flex items-center border-r px-9 border-[#1E1E1E99]'>
                <Image src={Navpic} alt="" className='w-40 h-20'/>
            </div>
            <div className="container flex items-center justify-center p-6 mx-auto text-purple-800 font-bold space-x-[40px] sm:flex hidden">
              {/* <Link className="current:text-black border-b-2 border-transparent active active:text-black active:border-purple-800" href="/">Home</Link> */}
                {
                    navbar.map((nav, index) => (
                        <Link key={index} className="border-b-2 border-transparent focus:text-black focus:border-purple-800" href={nav.url}>{nav.title}</Link>
                    ))
                }
                {!session ? (
                  <>
                  <Dropdown name='Login As' links={dropdown1}/>
                  </>
                  ) : (
                  <>
                    <Link href={GetUserRole()} className="border-b-2 border-transparent focus:text-black focus:border-purple-800">Profile</Link>
                    <Dropdown name={session.user?.username} links={dropdown2}/>
                  </>
                )}
            </div>
            <div onClick={handlenav} className='sm:hidden z-10'>
                <p className='mr-4 cursor-pointer'>MENU</p>
            </div>

            <div className={nav ? 'overflow-y-hidden md:hidden ease-in duration-300 absolute text-gray-300 left-0 top-0 w-full h-screen bg-black/90 px-4 py-7 flex flex-col' 
                : 'absolute top-0 h-screen left-[-100%] ease-in duration-500'}>
                <ul className='h-full w-full text-center pt-12'>
                    <li className='text-2xl py-8'>
                        <a href="/">Home</a>
                    </li>
                    <li className='text-2xl py-8'>
                        <a href="/internships">Internship</a>
                    </li>
                    <li className='text-2xl py-8'>
                        <a href="/login">Admin</a>
                    </li>
                    <li className='text-2xl py-8'>
                        <a href="/register">Company</a>
                    </li>
                    <li className='text-2xl py-8'>
                        <a href="/testportal">Test Bank</a>
                    </li>
                </ul>
            </div>
          </nav>
  )}

export default Navbar;