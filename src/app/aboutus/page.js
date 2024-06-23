import React from 'react'
import Image from 'next/image'
import Values from './../../../public/values.jpeg'

const Aboutus = () => {
  return (
    <div className="bg-gray-100">
  <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="ml-5 text-3xl font-extrabold tracking-tight text-purple-800 sm:text-5xl">
        About Us
      </h2>
      <p className="mt-4 text-lg text-gray-500 text-center text-justify">
        The Internships at the Institute of Innovation in Technology & Management connects students with industry, providing crucial hands-on learning opportunities. Our main objective is to immerse students in real work environments, enabling them to learn academic concepts into practice and acquire key skills for their careers. The Internship Test is dedicated to preparing students to be adaptable and skilled professionals, ready to make impactful contributions in their respective fields.
      </p>
    </div>
    <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 gap-12 mx-5 sm:grid-cols-2 lg:grid-cols-3 text-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
          <p className="mt-4 text-gray-500 text-justify">
            To equip students with the skills needed in todays industries, hands-on experience, and valuable professional connections, fostering their success in their chosen careers and their ability to contribute positively to society.
          </p>
        </div>
      </div>
      <div className="bg-purple-100 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
          <p className="mt-4 text-gray-600 text-justify">
            To be acknowledged as a top institution promoting innovation, entrepreneurship, and career growth through engaging internship programs, insightful guest lectures, and industry visits, providing students with the skills and experiences needed to succeed in a fast-changing global environment.
          </p>
        </div>
      </div>
      <div className="bg-purple-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900">Our Core Values</h3>
          <ul className="p-6 text-left text-center text-gray-600">
            <li>Student-Centric Approach</li>
            <li>Excellence</li>
            <li>Professionalism</li>
            <li>Innovation</li>
            <li>Collaboration</li>
          </ul>
        </div>
      </div>     
    </div>
    <div className="grid sm:grid-cols-2 grid-cols-1 bg-white mx-auto px-4 py-10 rounded-3xl text-center mt-10 sm:mt-16">
      <div className="text-center flex flex-col justify-center ml-5">
        <h1 className="text-4xl font-bold mb-4">Here with a Cause</h1>
        <p className="text-gray-600 text-lg text-bold text-justify">
          We aim to provide outstanding value to the business community by enabling companies to achieve exceptional human resource efficiency and nurturing students to become exemplary professionals, ready to lead the future workforce.
        </p>
      </div>
      <div className="justify-center items-center">
        <Image src={Values} alt="Core Values Triangle" className="w-full h-80" />
      </div>
    </div>
    <div className='p-7'></div>
  </div>
</div>

  )
}

export default Aboutus;