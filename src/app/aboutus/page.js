import React from 'react'
import Image from 'next/image'
import Values from './../../../public/values.jpeg'

const Aboutus = () => {
    return (
      <div>
    <div className="bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="ml-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          About Us
        </h2>
        <p className="mt-4 text-lg text-gray-500 text-center">
        The Internship Cell at the Institute of Innovation in Technology & Management connects students with industry, providing crucial hands-on learning opportunities. Our main objective is to immerse students in real work environments, enabling them to translate academic concepts into practice and acquire key skills for their careers. The Internship Cell is dedicated to preparing students to be adaptable and skilled professionals, ready to make impactful contributions in their respective fields.
        </p>
      </div>
      <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 text-center">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-medium text-gray-900">Our Mission</h3>
            <p className="mt-4 text-gray-500">
            To equip students with the skills needed in today's industries, hands-on experience, and valuable professional connections, fostering their success in their chosen careers and their ability to contribute positively to society.
            </p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-medium text-gray-900">Our Vision</h3>
            <p className="mt-4 text-gray-500">
            To be acknowledged as a top institution promoting innovation, entrepreneurship, and career growth through engaging internship programs, insightful guest lectures, and industry visits, providing students with the skills and experiences needed to succeed in a fast-changing global environment.
            </p>
          </div>
                    </div>
                    <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
                            <h3 className="text-xl font-medium text-gray-900">Our Core Values</h3>
                            <ul className="p-6">
            <li>Student-Centric Approach</li>
    <li>Excellence</li>
    <li>Professionalism</li>
    <li>Innovation</li>
    <li>Collaboration</li></ul>
          </div>
                    </div>     
      </div>
            </div>
          
            <div className="flex justify-center items-center mx-auto px-4 py-16 text-center">
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold mb-4">Here with a Cause</h1>
    <p className="text-gray-600 text-lg text-bold">
    We aim to provide outstanding value to the business community by enabling companies to achieve <br />
    exceptional human resource efficiency and nurturing students to become exemplary professionals, <br/> ready to lead the future workforce.
    </p>
  </div>
  <div className="flex justify-center items-center">
    <Image src={Values} alt="Core Values Triangle" className="w-100 h-80" />
  </div>
            </div>
            
</div>
        
  )
}

export default Aboutus