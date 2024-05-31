import React from 'react';
import Link from 'next/link';

const Test = () => {
  return (
    <div>
      <br/>
    <div className="relative bg-gray-200 rounded-3xl sm:rounded-none mt-60 p-9 flex items-center justify-center">
      <div className="p-8 w-full">
        <h1 className="text-center text-5xl font-bold mb-6">Internship Test</h1>
        <div className="flex items-center justify-center">      
        <div className="grid grid-cols-2 gap-4 w-9/12">
        <div className='grid grid-rows-1 gap-4'>
          <Link href="/testportal">
          <div className=" bg-purple-400 text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103" data-aos="fade-up" data-aos-duration='4000'>
            <span className="text-l font-bold">Web Development</span>
          </div>
          </Link>
          <Link href="/testportal">
          <div className="bg-purple-500 text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up" data-aos-duration='4000'>
            <span className="text-l font-bold">Mobile Development</span>
          </div>
          </Link>
          <Link href="/testportal">
          <div className="bg-purple-600 text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up" data-aos-duration='4000'>
            <span className="text-l font-bold">Information Security</span>
          </div>  
          </Link>
          <Link href="/testportal">
          <div className="bg-purple-700 text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up" data-aos-duration='4000'>
            <span className="text-l font-bold">Textile Engineering</span>
          </div>  
          </Link>
          <Link href="/testportal">
          <div className="bg-purple-800 text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up" data-aos-duration='4000'>
            <span className="text-l font-bold">Bank</span>
          </div>  
          </Link>
        </div>
        </div>
      </div>
      </div>
     </div></div>
  )
}

export default Test