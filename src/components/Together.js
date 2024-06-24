import React from 'react';
import Link from 'next/link';

const Together = () => {
  return (
    <div className="relative mb-96">
      <div 
        className="absolute h-[900px] inset-0 bg-fixed bg-center bg-cover" 
        style={{ backgroundImage: `url(/cartoon.jpg)`}}
      ></div>

      <div className="relative container mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-75 backdrop-filter backdrop-blur-lg">
        <div className="text-center">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-purple-800 sm:text-4xl sm:leading-10">
            Together We Advance
          </h2>
          <p className="mt-3 max-w-md mx-auto text-lg leading-6 text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
          We are at the forefront of innovation, partnering with the brightest minds to overcome the challenging obstacles of our time.          </p>
          <div className="mt-5 sm:mt-8 sm:flex justify-center">
            <div className="rounded-md shadow">
              <Link href="/aboutus"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                  Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Together;
