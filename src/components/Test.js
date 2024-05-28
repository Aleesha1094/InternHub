import React from 'react';
import Link from 'next/link';

const Test = () => {
  return (
    <div className="mt-96 flex items-center justify-center">
      <div className="p-8 mt-52 w-full">
        <h1 className="text-center text-5xl font-bold mb-6">Internship Test</h1>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/testportal">
          <div className="bg-[#e5ccf4] text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103" data-aos="fade-up" data-aos-duration='4000'>
            <span className="text-l font-bold">Web Development</span>
          </div>
          </Link>
          <Link href="/testportal">
          <div className="bg-[#b7c2c6] text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up" data-aos-duration='4000'>
            <span className="text-l font-bold">Mobile Development</span>
          </div>
          </Link>
          <Link href="/testportal">
          <div className="bg-[#a080e1] text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up" data-aos-duration='4000'>
            <span className="text-l font-bold">Information Security</span>
          </div>  
          </Link>
          <Link href="/testportal">
          <div className="bg-[#5c509c] text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up" data-aos-duration='4000'>
            <span className="text-l font-bold">Textile Engineering</span>
          </div>  
          </Link>
          <Link href="/testportal">
          <div className="bg-[#382d72] text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up" data-aos-duration='4000'>
            <span className="text-l font-bold">Bank</span>
          </div>  
          </Link>
        </div>
      </div>
     </div>
  )
}

export default Test