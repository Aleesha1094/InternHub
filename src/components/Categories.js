import React from 'react'

import Image from 'next/image'
import RJS from './../../public/ReactJS.jpg'
import RN from './../../public/ReactNative.jpg'
import Flutter from './../../public/Flutter.jpg'
import CloudCompute from './../../public/CloudComputing.jpg'
import Devops from './../../public/Devops.jpg'
import Banker from './../../public/Banker.jpg'
import Textile from './../../public/TextileEng.webp'
import UIUX from './../../public/UIUX.jpg'

function Categories() {
    const Internshipdata = [
        { heading: 'React Js', subheading: '22 Items', image: RJS },
        { heading: 'React Native', subheading: '16 Items', image: RN },
        { heading: 'Flutter', subheading: '25 Items', image: Flutter },
        { heading: 'DevOps Engineer', subheading: '13 Items', image: Devops },
        { heading: 'Cloud Computing', subheading: '19 Items', image: CloudCompute },
        { heading: 'Textile Engineer', subheading: '29 Items', image: Textile },
        { heading: 'Banker', subheading: '33 Items', image: Banker },
        { heading: 'UI/UX Design', subheading: '29 Items', image: UIUX },
    ]


    


    return (
        <div className='py-24'>
            <div>
                <p className='flex justify-center md:text-[40px] text-[35px] font-poppins font-semibold md:mb-12 mb-6'>Explore &nbsp; <span className='text-[#1268EB]'>Categories</span></p>
            </div>

            {/* Div For Categories */}

            <div className='md:px-32 px-20 grid md:grid-cols-4 md:gap-x-1 md:gap-y-8'>
                {Internshipdata.map((intern, index) => (
                    <div key={index} className='flex items-center border border-black rounded-lg w-[230px] p-2 mb-4'>
                        <div className=''>
                            <Image className='w-20 h-14 object-cover' src={intern.image} alt="" />
                        </div>
                        <div className='ml-4'>
                            <p className='text-black font-poppins font-semibold hover:text-[#1268EB]'>{intern.heading}</p>
                            <p>{intern.subheading}</p>
                            <button className='text-white bg-[#1268EB] p-2 rounded-full border-2 border-black mt-2'>Apply Now</button>
                        </div>
                    </div>
                ))}

                {/* {
                    Internshipdata.map((intern , index) => (
                    <div className='flex items-center border border-black rounded-lg w-[230px] p-2 mb-4'>
                    <div className=''>
                        <img className='w-18 h-14 object-cover' src={RJS} alt="" />
                    </div>
                    <div className='ml-4'>
                        <p className='text-black font-poppins font-semibold hover:text-[#1268EB]'>{intern.heading}</p>
                        <p>{intern.subheading}</p>
                        <button className='text-white bg-[#1268EB] p-2 rounded-full border-2  border-black'>Apply Now</button>
                    </div>
                </div>
                    ))
                } */}
                {/* <div className='flex items-center border border-black rounded-lg w-[230px] p-2'>
                    <div className=''>
                        <img className='w-18 h-14 object-cover' src={RJS} alt="" />
                    </div>
                    <div className='ml-4'>
                        <p className='text-black font-poppins font-semibold hover:text-[#1268EB]'>React JS</p>
                        <p>22 Items</p>
                        <button className='text-white bg-[#1268EB] p-2 rounded-full border-2  border-black'>Apply Now</button>
                    </div>
                </div> */}

                {/* <div className='flex items-center border border-black rounded-lg w-[230px] p-2'>
                    <div className=''>
                        <img className='w-18 h-14 object-cover' src={RJS} alt="" />
                    </div>
                    <div className='ml-4'>
                        <p className='text-black font-poppins font-semibold hover:text-[#1268EB]'>React JS</p>
                        <p>22 Items</p>
                        <button className='text-white bg-[#1268EB] p-2 rounded-full border-2  border-black'>Apply Now</button>
                    </div>
                </div>
                <div className='flex items-center border border-black rounded-lg w-[230px] p-2'>
                    <div className=''>
                        <img className='w-18 h-14 object-cover' src={RJS} alt="" />
                    </div>
                    <div className='ml-4'>
                        <p className='text-black font-poppins font-semibold hover:text-[#1268EB]'>React JS</p>
                        <p>22 Items</p>
                        <button className='text-white bg-[#1268EB] p-2 rounded-full border-2  border-black'>Apply Now</button>
                    </div>
                </div>
                <div className='flex items-center border border-black rounded-lg w-[230px] p-2'>
                    <div className=''>
                        <img className='w-18 h-14 object-cover' src={RJS} alt="" />
                    </div>
                    <div className='ml-4'>
                        <p className='text-black font-poppins font-semibold hover:text-[#1268EB]'>React JS</p>
                        <p>22 Items</p>
                        <button className='text-white bg-[#1268EB] p-2 rounded-full border-2  border-black'>Apply Now</button>
                    </div>
                </div>

                <div className='flex items-center border border-black rounded-lg w-[230px] p-2'>
                    <div className=''>
                        <img className='w-18 h-14 object-cover' src={RJS} alt="" />
                    </div>
                    <div className='ml-4'>
                        <p className='text-black font-poppins font-semibold hover:text-[#1268EB]'>React JS</p>
                        <p>22 Items</p>
                        <button className='text-white bg-[#1268EB] p-2 rounded-full border-2  border-black'>Apply Now</button>
                    </div>
                </div>

                <div className='flex items-center border border-black rounded-lg w-[230px] p-2'>
                    <div className=''>
                        <img className='w-18 h-14 object-cover' src={RJS} alt="" />
                    </div>
                    <div className='ml-4'>
                        <p className='text-black font-poppins font-semibold hover:text-[#1268EB]'>React JS</p>
                        <p>22 Items</p>
                        <button className='text-white bg-[#1268EB] p-2 rounded-full border-2  border-black'>Apply Now</button>
                    </div>
                </div>

                <div className='flex items-center border border-black rounded-lg w-[230px] p-2'>
                    <div className=''>
                        <img className='w-18 h-14 object-cover' src={RJS} alt="" />
                    </div>
                    <div className='ml-4'>
                        <p className='text-black font-poppins font-semibold hover:text-[#1268EB]'>React JS</p>
                        <p>22 Items</p>
                        <button className='text-white bg-[#1268EB] p-2 rounded-full border-2  border-black'>Apply Now</button>
                    </div>
                </div>

                <div className='flex items-center border border-black rounded-lg w-[230px] p-2'>
                    <div className=''>
                        <img className='w-18 h-14 object-cover' src={RJS} alt="" />
                    </div>
                    <div className='ml-4'>
                        <p className='text-black font-poppins font-semibold hover:text-[#1268EB]'>React JS</p>
                        <p>22 Items</p>
                        <button className='text-white bg-[#1268EB] p-2 rounded-full border-2  border-black'>Apply Now</button>
                    </div>
                </div> */}
            </div>

            

            {/* Searchign for Internship */}

            <div className='md:px-32 px-10 mt-20'>
                <div className='md:flex justify-center'>
                    <p className='md:text-[48px] text-[25px] text-[#1E1E1E] font-poppins font-semibold tracking-tight'>Are You Ready To Start <br /><span className='md:pl-20 mt-0'>Your Internship</span></p>
                </div>

                <div className='flex justify-center mt-8'>
                    <div className="flex items-center shadow-xl rounded-lg p-2 md:w-[540px]">
                        <input
                            type="text"
                            className="md:flex-grow p-2 rounded-lg focus:outline-none"
                            placeholder="Search Internship"
                        />
                        <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 hidden md:block">
                            Start your career today!
                        </button>
                        <button className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 md:hidden">
                            Start
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Categories
