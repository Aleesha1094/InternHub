import React from 'react';
import Link from 'next/link';

const Test = () => {
  return (
    <div>
      <br/>
    <div className="relative bg-gray-200 rounded-3xl sm:rounded-none mt-60 p-7 flex items-center justify-center">
      <div className="p-5 w-full">
        <h1 className="text-center text-5xl font-bold mb-12">Internship Test</h1>
        <div className="flex items-center justify-center">      
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-20 w-9/12">
          <div className='grid grid-rows-1 gap-4'>
            <Link href="/testportal">
            <div className=" bg-purple-400 text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103" data-aos="fade-up">
              <span className="text-l font-bold">Web Development</span>
            </div>
            </Link>
            <Link href="/testportal">
            <div className="bg-purple-500 text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up">
              <span className="text-l font-bold">Mobile Development</span>
            </div>
            </Link>
            <Link href="/testportal">
            <div className="bg-purple-600 text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up">
              <span className="text-l font-bold">Information Security</span>
            </div>  
            </Link>
            <Link href="/testportal">
            <div className="bg-purple-700 text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up">
              <span className="text-l font-bold">Textile Engineering</span>
            </div>  
            </Link>
            <Link href="/testportal">
            <div className="bg-purple-800 text-white rounded-xl p-4 flex items-center justify-center hover:-translate-y-1 hover:scale-103 duration-300" data-aos="fade-up">
              <span className="text-l font-bold">Bank</span>
            </div>  
            </Link>
          </div>
          <div className="text-xl leading-relaxed text-justify text-black-500">
            Welcome to our Test Module! This platform is designed to help students practice and prepare for internship interviews and assessments. 
            <div className='hidden lg:block'>
              By taking these quizzes, you can enhance your knowledge, identify your strengths, and work on areas that need improvement. Get started now to boost your confidence and ace your upcoming internships!
            </div>
          </div>
        </div>
      </div>
      </div>
     </div></div>
  )
}

export default Test