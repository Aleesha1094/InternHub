import React from 'react'
import Banner from './../../public/banner-bg.png'
import Image from 'next/image'

function HeroSection() {
    return (
        <div className='flex sm:flex-row md:px-32 px-10 bg-[#F3F4FD] md:py-20 py-10 flex-col-reverse'>
            <div className='md:w-1/2 md:mt-0 mt-8'>
                <p className='md:text-[60px] text-[30px] text-[#1E1E1E] font-poppins font-semibold'>Pakistan Best Online Internship Platform</p>
                <p className='text-[#1268EB] md:text-[60px] text-[30px] font-poppins font-semibold'>Intern Hub.</p>
                <p className='text-[#1E1E1E99] mt-2 md:tracking-tighter tracking-tight'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni asperiores consequatur amet quibusdam nostrum! Facilis veritatis odio, aperiam distinctio tempora esse perferend</p>
                <input className='py-4 w-full outline-none bg-white rounded-lg px-4 border-l-4 border-[#1268EB] md:mt-12 mt-6 shadow-lg' type="text" name="" id="" placeholder='Search Internships' />
                <p className='md:mt-2 mt-4'>Have any Question? <a className='text-slate-500' href="">Get Free Help</a></p>
            </div>

            {/* Images Div */}
            <div className='md:pl-10 md:mt-16'>
                <Image src={Banner} alt="" />
            </div>
        </div>
    )
}

export default HeroSection