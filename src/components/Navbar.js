"use client"
import React, {useState} from 'react'
import Navpic from './../../public/Logo-removebg.png'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import Dropdown from './Dropdown'
import { useEffect } from 'react'

function Navbar() {
    const { data: session } = useSession();

    useEffect(() => {
      fetch('/api/puppeteer')
          .then(response => response.json())
          .then(data => console.log(data.message))
          .catch(error => console.error('Error scheduling scraping job:', error));
    }, []);

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
      <nav className="w-full bg-white shadow flex justify-between items-center px-4 md:px-32 py-3 relative">
      <div className='flex items-center px-6 md:px-9 border-r border-[#1E1E1E99]'>
        <Image src={Navpic} alt="" className='w-24 h-12 md:w-40 md:h-20' />
      </div>
      <div className="hidden sm:flex items-center justify-center p-6 mx-auto text-purple-800 font-bold space-x-4 md:space-x-[40px]">
        {
          navbar.map((nav, index) => (
            <Link key={index} className="border-b-2 border-transparent focus:text-black focus:border-purple-800" href={nav.url}>{nav.title}</Link>
          ))
        }
        {!session ? (
          <>
            <Dropdown name='Login As' links={dropdown1} />
          </>
        ) : (
          <>
            <Link href={GetUserRole()} className="border-b-2 border-transparent focus:text-black focus:border-purple-800">Profile</Link>
            <Dropdown name={session.user?.username} links={dropdown2} />
          </>
        )}
      </div>
      <div onClick={handlenav} className='sm:hidden z-10 cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="50" viewBox="0 0 30 30">
          <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
        </svg>
      </div>

      <div className={`fixed inset-0 z-20 inset-0 backdrop-blur-xl bg-opacity-50 bg-white py-7 flex flex-col transition-transform duration-300 ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex items-center justify-between px-4'>
          <Image src={Navpic} alt="" className='w-24 h-12' />
          <div onClick={handlenav} className='z-8'>
            <p className='cursor-pointer font-bold text-2xl text-purple-800'>X</p>
          </div>
        </div>
        <ul className='h-full w-full font-bold text-center pt-12'>
          <li className='text-2xl py-4'>
            <a href="/" className='text-purple-800 hover:text-black hover:border-b-2 border-transparent hover:border-purple-800'>Home</a>
          </li>
          <li className='text-2xl py-4'>
            <a href="/internships" className='text-purple-800 hover:text-black hover:border-b-2 border-transparent hover:border-purple-800'>Internship</a>
          </li>
          <li className='text-2xl py-4'>
            <a href="/adminlogin" className='text-purple-800 hover:text-black hover:border-b-2 border-transparent hover:border-purple-800'>Admin</a>
          </li>
          <li className='text-2xl py-4'>
            <a href="/register" className='text-purple-800 hover:text-black hover:border-b-2 border-transparent hover:border-purple-800'>Company</a>
          </li>
          <li className='text-2xl py-4'>
            <a href="/testportal" className='text-purple-800 hover:text-black hover:border-b-2 border-transparent hover:border-purple-800'>Test Bank</a>
          </li>
        </ul>
      </div>
    </nav>
    
  )}

export default Navbar;