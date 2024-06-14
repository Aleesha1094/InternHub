import React from 'react'
import Banner from './../../public/banner-bg.png'
import Image from 'next/image'
import Link from 'next/link'

function HeroSection() {
    return (
        <div className='flex sm:flex-row md:px-32 px-10 bg-[#F3F4FD] md:py-10 py-5 flex-col-reverse'>
            <div className='md:w-1/2 md:mt-0 mt-2' data-aos="fade-up">
                <p className='md:text-[60px] text-[30px] text-[#1E1E1E] font-poppins font-semibold'>Pakistans Online Internship Platform</p>
                <p className='text-purple-700 md:text-[60px] text-[30px] font-poppins font-semibold'>Future Interns</p>
                <p className='text-[#1E1E1E99] mt-2 md:tracking-tighter tracking-tight'>
                    Discover, Learn, and Excel with Top Industry Internships Begin Your Journey Today!                 
                </p>
                <p className='md:mt-2 mt-4'>Have any Question? <Link className='text-purple-500 underline' href="/contactus">Get Free Help</Link></p>
            </div>

            <div className='md:pl-10 md:mt-16' data-aos="slide-left">
                <Image src={Banner} alt="" />
            </div>
        </div>
    )
}

export default HeroSection