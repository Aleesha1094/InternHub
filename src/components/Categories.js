import React, { useEffect, useState } from 'react'
import Test from './Test'
import Link from 'next/link';
import Together from './Together';
function Categories() {
    const [internships, setInternships] = useState([]); 

    useEffect(() => {
      async function fetchInternships() {
        try {
          const response = await fetch('/api/internships');
          if (response.ok) {
            const data = await response.json();
            setInternships(data.Internshipss);
          }  else {
              setError(response.error);
          }
        } catch (error) {
          console.error(error);
          throw new Error('Failed to Fetch Internships!');
        }
      }
    
      fetchInternships();
    }, []);

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    return (
        <div className='py-16'>
            <div>
                <p className='flex justify-center md:text-[40px] text-[35px] font-poppins font-semibold md:mb-12 mb-6'>Explore &nbsp; <span className='text-purple-700'>Categories</span></p>
            </div>
          
            {internships && internships.length > 0 ? (
            <div className='md:px-32 px-20 grid md:grid-cols-3 gap-8'>
                {internships.slice(0,3).map((internship, index) => (
          <div
          key={internship._id}
          className={`p-6 my-5 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
            index % 3 === 0
              ? 'hover:bg-purple-100'
              : index % 3 === 1
              ? 'bg-purple-50 hover:bg-purple-100'
              : 'bg-purple-100 hover:bg-purple-200'
          }`}
          data-aos="fade-up"
        >
          <h4 className="flex items-center justify-center my-5 text-2xl font-bold text-gray-800 cursor-default">
            {internship.company_title}
          </h4>
          <div className="space-y-2 cursor-default my-5">
            <p>
              <span className="font-bold my-5">Title:</span> {internship.title}
            </p>
            <p className="text-justify">
              <span className="font-bold my-5">Description:</span>{' '}
              {truncateText(internship.description, 20)}   <Link href="/internships" className="font-semibold text-xs underline text-purple-600">
                view more →
              </Link>
            </p>
          </div>
          <div className="flex justify-center">
            <Link href={internship.url}
               className="text-white bg-purple-700 px-4 py-2 rounded-full mt-4 transition-transform transform hover:scale-105 hover:bg-purple-900">
                Apply Now
            </Link>
          </div>
        </div>
                ))} 
            </div> 
            ) : (
                <p className="text-center text-2xl text-gray-600">Loading...</p>
            )}
            <div className='text-center my-9 animate-bounce mb-20'>
            <Link href="/internships" className="ml-9 text-lg font-semibold underline text-purple-500">Explore Internships →</Link>
            </div>
            <Together/>
            <Test/>
            <div className='md:px-32 px-10 mt-16'>
                <div className='md:flex justify-center sm:text-center' data-aos="fade-left">
                    <p className='md:text-[48px] text-[25px] text-[#1E1E1E] font-poppins font-semibold tracking-tight'>Are You Ready To Start <br /><span className='md:pl-20 mt-0'>Your Internship</span></p>
                </div>

                <div className='flex justify-center mt-8'>
                    <div className="flex items-center shadow-xl rounded-lg p-2 md:w-[300px]">
                        <button href='/internships' className="animate-bounce px-5 text-semibold ml-9 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-800 md:block">
                            Start your career today!
                        </button>
                        {/* <button href='/internships' className="animate-bounce ml-2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-800 md:hidden">
                            Start
                        </button> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Categories;